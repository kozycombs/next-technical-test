import { Container, Typography, Box, Paper } from "@mui/material";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import SearchBar from "../../components/search/SearchBar/SearchBar";
import SearchResults from "../../components/search/SearchResults/SearchResults";

export default function SearchPage() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper
        elevation={0}
        sx={{
          p: 4,
          mb: 4,
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "white",
          borderRadius: 2,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
          <LibraryMusicIcon sx={{ fontSize: 48 }} />
          <Typography variant="h1" component="h1">
            Search iTunes
          </Typography>
        </Box>
        <Typography variant="h6" sx={{ opacity: 0.9 }}>
          Search for music, movies, apps, and more
        </Typography>
      </Paper>
      <SearchBar />
      <SearchResults />
    </Container>
  );
}
