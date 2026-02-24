import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Stack,
  Typography,
} from "@mui/material";
import { ITunesItem } from "../../../features/search";
import MusicNoteIcon from "@mui/icons-material/MusicNote";

type SearchItemProps = {
  item: ITunesItem;
};

export default function SearchItem({ item }: SearchItemProps) {
  return (
    <Card
      sx={{
        transition: "transform 0.2s, box-shadow 0.2s",
        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: 4,
        },
      }}
    >
      {item.artworkUrl100 ? (
        <CardMedia
          component="img"
          sx={{ objectPosition: "top", maxHeight: 250 }}
          image={item.artworkUrl100}
          alt={item.trackName || item.collectionName || ""}
        />
      ) : (
        <Box
          sx={{
            height: 250,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: "grey.200",
          }}
        >
          <MusicNoteIcon sx={{ fontSize: 40, color: "grey.400" }} />
        </Box>
      )}
      <CardContent sx={{ flex: 1 }}>
        <Typography variant="h6" component="div" gutterBottom>
          {item.trackName || item.collectionName || item.artistName}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {item.artistName}
        </Typography>
        <Stack direction="column" spacing={1} sx={{ mt: 1 }}>
          {item.primaryGenreName && (
            <Chip
              label={item.primaryGenreName}
              size="small"
              color="primary"
              variant="outlined"
              style={{ width: "fit-content" }}
            />
          )}
          {item.kind && (
            <Chip
              label={item.kind}
              size="small"
              variant="outlined"
              style={{ width: "fit-content" }}
            />
          )}
          {item.trackPrice !== undefined && (
            <Chip
              label={`$${item.trackPrice}`}
              size="small"
              color="success"
              style={{ width: "fit-content" }}
            />
          )}
        </Stack>
      </CardContent>
    </Card>
  );
}
