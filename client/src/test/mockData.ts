import { ITunesItem } from "../features/search";

export const mockITunesItem: ITunesItem = {
  trackId: 1,
  trackName: "Test Song",
  artistName: "Test Artist",
  collectionName: "Test Album",
  artworkUrl100: "https://example.com/artwork.jpg",
  artworkUrl60: "https://example.com/artwork-small.jpg",
  trackPrice: 1.29,
  primaryGenreName: "Rock",
  kind: "song",
  trackViewUrl: "https://example.com/track",
  previewUrl: "https://example.com/preview.mp3",
};

export const mockITunesItems: ITunesItem[] = [
  {
    trackId: 1,
    trackName: "Song One",
    artistName: "Artist One",
    collectionName: "Album One",
    artworkUrl100: "https://example.com/artwork1.jpg",
    trackPrice: 1.29,
    primaryGenreName: "Rock",
    kind: "song",
  },
  {
    trackId: 2,
    trackName: "Song Two",
    artistName: "Artist Two",
    collectionName: "Album Two",
    artworkUrl100: "https://example.com/artwork2.jpg",
    trackPrice: 0.99,
    primaryGenreName: "Pop",
    kind: "song",
  },
  {
    trackId: 3,
    trackName: "Song Three",
    artistName: "Artist Three",
    collectionName: "Album Three",
    artworkUrl100: "https://example.com/artwork3.jpg",
    trackPrice: 1.49,
    primaryGenreName: "Jazz",
    kind: "song",
  },
];

export const mockSearchResponse = {
  resultCount: 3,
  results: mockITunesItems,
};

