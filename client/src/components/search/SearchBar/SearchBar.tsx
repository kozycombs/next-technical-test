import { useState } from "react";
import {
  Box,
  TextField,
  Button,
  IconButton,
  CircularProgress,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { searchNames, setQuery, clearSearch } from "../../../features/search";

export default function SearchBar() {
  const dispatch = useAppDispatch();
  const { query, loading } = useAppSelector((state) => state.search);
  const [inputValue, setInputValue] = useState(query);

  const handleSearch = () => {
    dispatch(setQuery(inputValue));
    dispatch(searchNames(inputValue));
  };

  const handleClear = () => {
    setInputValue("");
    dispatch(clearSearch());
  };

  return (
    <Box sx={{ mb: 3 }}>
      <Box sx={{ display: "flex", gap: 1, alignItems: "flex-start" }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search iTunes (songs, albums, artists, apps, etc.)..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          disabled={loading}
          slotProps={{
            input: {
              endAdornment: inputValue && (
                <IconButton
                  size="small"
                  onClick={handleClear}
                  edge="end"
                  aria-label="clear search"
                >
                  <ClearIcon />
                </IconButton>
              ),
            },
          }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSearch}
          disabled={loading || !inputValue.trim()}
          startIcon={
            loading ? (
              <CircularProgress size={20} color="inherit" />
            ) : (
              <SearchIcon />
            )
          }
          sx={{ minWidth: 120, height: 56 }}
        >
          {loading ? "Searching..." : "Search"}
        </Button>
      </Box>
    </Box>
  );
}
