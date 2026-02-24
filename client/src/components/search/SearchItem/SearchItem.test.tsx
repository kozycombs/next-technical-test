import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { render } from "../../../test/testUtils";
import SearchItem from "./SearchItem";
import { mockITunesItem } from "../../../test/mockData";

describe("SearchItem", () => {
  it("should render item with all details", () => {
    render(<SearchItem item={mockITunesItem} />);

    expect(screen.getByText("Test Song")).toBeInTheDocument();
    expect(screen.getByText("Test Artist")).toBeInTheDocument();
    expect(screen.getByText("Rock")).toBeInTheDocument();
    expect(screen.getByText("song")).toBeInTheDocument();
    expect(screen.getByText("$1.29")).toBeInTheDocument();
  });

  it("should render artwork image when artworkUrl100 is provided", () => {
    render(<SearchItem item={mockITunesItem} />);

    const image = screen.getByRole("img");
    expect(image).toHaveAttribute("src", mockITunesItem.artworkUrl100);
    expect(image).toHaveAttribute("alt", mockITunesItem.trackName);
  });

  it("should render placeholder icon when no artwork is provided", () => {
    const itemWithoutArtwork = {
      ...mockITunesItem,
      artworkUrl100: undefined,
    };

    render(<SearchItem item={itemWithoutArtwork} />);

    // MusicNoteIcon should be rendered
    const icon = screen.getByTestId("MusicNoteIcon");
    expect(icon).toBeInTheDocument();
  });

  it("should render track name when available", () => {
    render(<SearchItem item={mockITunesItem} />);
    expect(screen.getByText("Test Song")).toBeInTheDocument();
  });

  it("should render collection name when track name is not available", () => {
    const itemWithoutTrackName = {
      ...mockITunesItem,
      trackName: undefined,
    };

    render(<SearchItem item={itemWithoutTrackName} />);
    expect(screen.getByText("Test Album")).toBeInTheDocument();
  });

  it("should render artist name when neither track nor collection name is available", () => {
    const itemWithOnlyArtist = {
      ...mockITunesItem,
      trackName: undefined,
      collectionName: undefined,
    };

    render(<SearchItem item={itemWithOnlyArtist} />);
    // Artist name appears twice: once as title, once as artist name
    const artistElements = screen.getAllByText("Test Artist");
    expect(artistElements).toHaveLength(2);
  });

  it("should not render genre chip when primaryGenreName is not provided", () => {
    const itemWithoutGenre = {
      ...mockITunesItem,
      primaryGenreName: undefined,
    };

    render(<SearchItem item={itemWithoutGenre} />);
    expect(screen.queryByText("Rock")).not.toBeInTheDocument();
  });

  it("should not render kind chip when kind is not provided", () => {
    const itemWithoutKind = {
      ...mockITunesItem,
      kind: undefined,
    };

    render(<SearchItem item={itemWithoutKind} />);
    expect(screen.queryByText("song")).not.toBeInTheDocument();
  });

  it("should not render price chip when trackPrice is not provided", () => {
    const itemWithoutPrice = {
      ...mockITunesItem,
      trackPrice: undefined,
    };

    render(<SearchItem item={itemWithoutPrice} />);
    expect(screen.queryByText("$1.29")).not.toBeInTheDocument();
  });

  it("should render price as $0.00 when trackPrice is 0", () => {
    const freeItem = {
      ...mockITunesItem,
      trackPrice: 0,
    };

    render(<SearchItem item={freeItem} />);
    expect(screen.getByText("$0")).toBeInTheDocument();
  });
});
