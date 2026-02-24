import { describe, it, expect, vi, beforeEach } from "vitest";
import { screen, waitFor } from "@testing-library/react";
import { render } from "../../../test/testUtils";
import SearchResults from "./SearchResults";
import { mockITunesItems } from "../../../test/mockData";

describe("SearchResults", () => {
  beforeEach(() => {
    // Mock window scroll properties
    Object.defineProperty(window, "scrollY", { value: 0, writable: true });
    Object.defineProperty(document.documentElement, "scrollTop", {
      value: 0,
      writable: true,
    });
    Object.defineProperty(document.documentElement, "scrollHeight", {
      value: 1000,
      writable: true,
    });
    Object.defineProperty(window, "innerHeight", {
      value: 800,
      writable: true,
    });
  });

  it("should render nothing when no search has been performed", () => {
    const { container } = render(<SearchResults />);
    expect(container.firstChild).toBeNull();
  });

  it("should display error message when there is an error", () => {
    render(<SearchResults />, {
      preloadedState: {
        search: {
          query: "Beatles",
          allResults: [],
          displayedResults: [],
          loading: false,
          error: "Network error",
          displayCount: 10,
          hasMore: false,
        },
      },
    });

    expect(screen.getByText("Network error")).toBeInTheDocument();
  });

  it("should display no results message when search returns empty", () => {
    render(<SearchResults />, {
      preloadedState: {
        search: {
          query: "NonexistentArtist",
          allResults: [],
          displayedResults: [],
          loading: false,
          error: null,
          displayCount: 10,
          hasMore: false,
        },
      },
    });

    expect(
      screen.getByText(/no results found for "NonexistentArtist"/i),
    ).toBeInTheDocument();
  });

  it("should display search results", () => {
    render(<SearchResults />, {
      preloadedState: {
        search: {
          query: "Beatles",
          allResults: mockITunesItems,
          displayedResults: mockITunesItems,
          loading: false,
          error: null,
          displayCount: 10,
          hasMore: false,
        },
      },
    });

    expect(screen.getByText("Song One")).toBeInTheDocument();
    expect(screen.getByText("Song Two")).toBeInTheDocument();
    expect(screen.getByText("Song Three")).toBeInTheDocument();
  });

  it("should display result count", () => {
    render(<SearchResults />, {
      preloadedState: {
        search: {
          query: "Beatles",
          allResults: mockITunesItems,
          displayedResults: mockITunesItems,
          loading: false,
          error: null,
          displayCount: 10,
          hasMore: false,
        },
      },
    });

    expect(screen.getByText(/showing 3 of 3 results/i)).toBeInTheDocument();
  });

  it("should show singular 'result' when only one result", () => {
    render(<SearchResults />, {
      preloadedState: {
        search: {
          query: "Beatles",
          allResults: [mockITunesItems[0]],
          displayedResults: [mockITunesItems[0]],
          loading: false,
          error: null,
          displayCount: 10,
          hasMore: false,
        },
      },
    });

    expect(screen.getByText(/showing 1 of 1 result$/i)).toBeInTheDocument();
  });

  it("should display 'All results loaded' when no more results", () => {
    render(<SearchResults />, {
      preloadedState: {
        search: {
          query: "Beatles",
          allResults: mockITunesItems,
          displayedResults: mockITunesItems,
          loading: false,
          error: null,
          displayCount: 10,
          hasMore: false,
        },
      },
    });

    expect(screen.getByText(/all results loaded/i)).toBeInTheDocument();
  });

  it("should not display 'All results loaded' when more results available", () => {
    const manyItems = Array.from({ length: 25 }, (_, i) => ({
      trackId: i + 1,
      trackName: `Song ${i + 1}`,
      artistName: `Artist ${i + 1}`,
    }));

    render(<SearchResults />, {
      preloadedState: {
        search: {
          query: "Beatles",
          allResults: manyItems,
          displayedResults: manyItems.slice(0, 10),
          loading: false,
          error: null,
          displayCount: 10,
          hasMore: true,
        },
      },
    });

    expect(screen.queryByText(/all results loaded/i)).not.toBeInTheDocument();
  });
});

