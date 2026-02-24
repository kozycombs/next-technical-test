import { describe, it, expect, beforeEach, vi } from "vitest";
import searchReducer, {
  setQuery,
  clearSearch,
  loadMoreResults,
  searchNames,
} from "./searchSlice";
import { mockITunesItems } from "../../test/mockData";

describe("searchSlice", () => {
  const initialState = {
    query: "",
    allResults: [],
    displayedResults: [],
    loading: false,
    error: null,
    displayCount: 10,
    hasMore: false,
  };

  describe("reducers", () => {
    it("should handle setQuery", () => {
      const state = searchReducer(initialState, setQuery("Beatles"));
      expect(state.query).toBe("Beatles");
    });

    it("should handle clearSearch", () => {
      const stateWithData = {
        ...initialState,
        query: "Beatles",
        allResults: mockITunesItems,
        displayedResults: mockITunesItems,
        displayCount: 3,
        hasMore: false,
      };
      const state = searchReducer(stateWithData, clearSearch());
      expect(state).toEqual(initialState);
    });

    it("should handle loadMoreResults", () => {
      // Create 25 mock items
      const manyItems = Array.from({ length: 25 }, (_, i) => ({
        trackId: i + 1,
        trackName: `Song ${i + 1}`,
        artistName: `Artist ${i + 1}`,
      }));

      const stateWithData = {
        ...initialState,
        allResults: manyItems,
        displayedResults: manyItems.slice(0, 10),
        displayCount: 10,
        hasMore: true,
      };

      const state = searchReducer(stateWithData, loadMoreResults());
      expect(state.displayedResults).toHaveLength(20);
      expect(state.displayCount).toBe(20);
      expect(state.hasMore).toBe(true);
    });

    it("should set hasMore to false when all results are displayed", () => {
      const stateWithData = {
        ...initialState,
        allResults: mockITunesItems, // Only 3 items
        displayedResults: mockITunesItems,
        displayCount: 3,
        hasMore: false,
      };

      const state = searchReducer(stateWithData, loadMoreResults());
      expect(state.displayedResults).toHaveLength(3);
      expect(state.displayCount).toBe(13);
      expect(state.hasMore).toBe(false);
    });
  });

  describe("async thunks", () => {
    beforeEach(() => {
      global.fetch = vi.fn();
    });

    it("should handle searchNames.pending", () => {
      const action = { type: searchNames.pending.type };
      const state = searchReducer(initialState, action);
      expect(state.loading).toBe(true);
      expect(state.error).toBe(null);
    });

    it("should handle searchNames.fulfilled", () => {
      const action = {
        type: searchNames.fulfilled.type,
        payload: mockITunesItems,
      };
      const state = searchReducer(initialState, action);
      expect(state.loading).toBe(false);
      expect(state.allResults).toEqual(mockITunesItems);
      expect(state.displayedResults).toEqual(mockITunesItems);
      expect(state.displayCount).toBe(10);
      expect(state.hasMore).toBe(false);
    });

    it("should handle searchNames.fulfilled with more than 10 results", () => {
      const manyItems = Array.from({ length: 25 }, (_, i) => ({
        trackId: i + 1,
        trackName: `Song ${i + 1}`,
      }));

      const action = {
        type: searchNames.fulfilled.type,
        payload: manyItems,
      };
      const state = searchReducer(initialState, action);
      expect(state.loading).toBe(false);
      expect(state.allResults).toHaveLength(25);
      expect(state.displayedResults).toHaveLength(10);
      expect(state.hasMore).toBe(true);
    });

    it("should handle searchNames.rejected", () => {
      const action = {
        type: searchNames.rejected.type,
        error: { message: "Network error" },
      };
      const state = searchReducer(initialState, action);
      expect(state.loading).toBe(false);
      expect(state.error).toBe("Network error");
    });
  });
});

