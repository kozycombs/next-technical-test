import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

// iTunes API response item interface
export interface ITunesItem {
  trackId?: number;
  collectionId?: number;
  artistId?: number;
  trackName?: string;
  collectionName?: string;
  artistName?: string;
  artworkUrl100?: string;
  artworkUrl60?: string;
  trackPrice?: number;
  collectionPrice?: number;
  releaseDate?: string;
  primaryGenreName?: string;
  kind?: string;
  trackViewUrl?: string;
  previewUrl?: string;
}

interface SearchState {
  query: string;
  allResults: ITunesItem[]; // All fetched results
  displayedResults: ITunesItem[]; // Results currently displayed
  loading: boolean;
  error: string | null;
  displayCount: number; // Number of results to display
  hasMore: boolean; // Whether there are more results to display
}

const initialState: SearchState = {
  query: "",
  allResults: [],
  displayedResults: [],
  loading: false,
  error: null,
  displayCount: 10,
  hasMore: false,
};

// Async thunk for searching - fetches all results at once
export const searchNames = createAsyncThunk(
  "search/searchNames",
  async (query: string) => {
    // Use the Node.js proxy endpoint to avoid CORS issues
    // Fetch up to 200 results (iTunes API max)
    const response = await fetch(
      `/api/search?q=${encodeURIComponent(query)}&limit=200&offset=0`,
    );
    if (!response.ok) {
      throw new Error("Failed to fetch search results");
    }
    const data = await response.json();
    // iTunes API returns { resultCount: number, results: ITunesItem[] }
    return data.results as ITunesItem[];
  },
);

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
    clearSearch: (state) => {
      state.query = "";
      state.allResults = [];
      state.displayedResults = [];
      state.error = null;
      state.displayCount = 10;
      state.hasMore = false;
    },
    // Action to load more results from the already-fetched allResults
    loadMoreResults: (state) => {
      const nextCount = state.displayCount + 10;
      state.displayedResults = state.allResults.slice(0, nextCount);
      state.displayCount = nextCount;
      state.hasMore = nextCount < state.allResults.length;
    },
  },
  extraReducers: (builder) => {
    builder
      // Search - fetch all results
      .addCase(searchNames.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchNames.fulfilled, (state, action) => {
        state.loading = false;
        state.allResults = action.payload;
        // Initially display first 10 results
        state.displayedResults = action.payload.slice(0, 10);
        state.displayCount = 10;
        state.hasMore = action.payload.length > 10;
      })
      .addCase(searchNames.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "An error occurred";
      });
  },
});

export const { setQuery, clearSearch, loadMoreResults } = searchSlice.actions;

export default searchSlice.reducer;
