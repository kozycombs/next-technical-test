import { useEffect } from "react";
import { Box, Typography, Alert, Grid } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { loadMoreResults } from "../../../features/search";
import SearchItem from "../SearchItem/SearchItem";

export default function SearchResults() {
  const dispatch = useAppDispatch();
  const { query, displayedResults, allResults, loading, error, hasMore } =
    useAppSelector((state) => state.search);

  // Infinite scroll handler - loads more from client-side cache on page scroll
  useEffect(() => {
    const handleScroll = () => {
      // Get the scroll position and page dimensions
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = window.innerHeight;
      const scrollThreshold = 300; // pixels from bottom

      // Check if scrolled near bottom of the page
      if (
        scrollTop + clientHeight >= scrollHeight - scrollThreshold &&
        !loading &&
        hasMore
      ) {
        // Load more results from client-side cache
        dispatch(loadMoreResults());
      }
    };

    // Add scroll listener to window
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [dispatch, loading, hasMore]);

  if (error) {
    return (
      <Alert severity="error" sx={{ mt: 2 }}>
        {error}
      </Alert>
    );
  }

  if (!loading && !error && query && displayedResults.length === 0) {
    return (
      <Alert severity="info" sx={{ mt: 2 }}>
        No results found for "{query}"
      </Alert>
    );
  }

  if (!loading && !error && displayedResults.length > 0) {
    return (
      <Box>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Showing {displayedResults.length} of {allResults.length} result
          {allResults.length !== 1 ? "s" : ""}
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Grid
            container
            rowSpacing={2}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            {displayedResults.map((item) => (
              <Grid
                key={item.trackId || item.collectionId || item.artistId}
                size={3}
              >
                <SearchItem item={item} />
              </Grid>
            ))}
          </Grid>
          {!hasMore && displayedResults.length > 0 && (
            <Typography
              variant="body2"
              color="text.secondary"
              align="center"
              sx={{ py: 2 }}
            >
              All results loaded
            </Typography>
          )}
        </Box>
      </Box>
    );
  }

  return null;
}
