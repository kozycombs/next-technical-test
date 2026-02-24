import { describe, it, expect, vi } from "vitest";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { render } from "../../../test/testUtils";
import SearchBar from "./SearchBar";

describe("SearchBar", () => {
  it("should render search input and button", () => {
    render(<SearchBar />);

    const input = screen.getByPlaceholderText(/search itunes/i);
    const button = screen.getByRole("button", { name: /search/i });

    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it("should update input value when typing", async () => {
    const user = userEvent.setup();
    render(<SearchBar />);

    const input = screen.getByPlaceholderText(/search itunes/i);
    await user.type(input, "Beatles");

    expect(input).toHaveValue("Beatles");
  });

  it("should disable search button when input is empty", () => {
    render(<SearchBar />);

    const button = screen.getByRole("button", { name: /search/i });
    expect(button).toBeDisabled();
  });

  it("should enable search button when input has value", async () => {
    const user = userEvent.setup();
    render(<SearchBar />);

    const input = screen.getByPlaceholderText(/search itunes/i);
    const button = screen.getByRole("button", { name: /search/i });

    await user.type(input, "Beatles");
    expect(button).toBeEnabled();
  });

  it("should show clear button when input has value", async () => {
    const user = userEvent.setup();
    render(<SearchBar />);

    const input = screen.getByPlaceholderText(/search itunes/i);
    await user.type(input, "Beatles");

    const clearButton = screen.getByLabelText(/clear search/i);
    expect(clearButton).toBeInTheDocument();
  });

  it("should clear input when clear button is clicked", async () => {
    const user = userEvent.setup();
    render(<SearchBar />);

    const input = screen.getByPlaceholderText(/search itunes/i);
    await user.type(input, "Beatles");

    const clearButton = screen.getByLabelText(/clear search/i);
    await user.click(clearButton);

    expect(input).toHaveValue("");
  });

  it("should trigger search when search button is clicked", async () => {
    const user = userEvent.setup();
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ results: [] }),
      } as Response),
    );

    render(<SearchBar />);

    const input = screen.getByPlaceholderText(/search itunes/i);
    const button = screen.getByRole("button", { name: /search/i });

    await user.type(input, "Beatles");
    await user.click(button);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining("/api/search?q=Beatles"),
      );
    });
  });

  it("should trigger search when Enter key is pressed", async () => {
    const user = userEvent.setup();
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ results: [] }),
      } as Response),
    );

    render(<SearchBar />);

    const input = screen.getByPlaceholderText(/search itunes/i);
    await user.type(input, "Beatles{Enter}");

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining("/api/search?q=Beatles"),
      );
    });
  });

  it("should show loading state during search", async () => {
    const user = userEvent.setup();
    global.fetch = vi.fn(
      () =>
        new Promise((resolve) =>
          setTimeout(
            () =>
              resolve({
                ok: true,
                json: () => Promise.resolve({ results: [] }),
              } as Response),
            100,
          ),
        ),
    );

    render(<SearchBar />);

    const input = screen.getByPlaceholderText(/search itunes/i);
    const button = screen.getByRole("button", { name: /search/i });

    await user.type(input, "Beatles");
    await user.click(button);

    await waitFor(() => {
      expect(screen.getByText(/searching/i)).toBeInTheDocument();
    });
  });

  it("should disable input and button during loading", async () => {
    const user = userEvent.setup();
    render(<SearchBar />, {
      preloadedState: {
        search: {
          query: "",
          allResults: [],
          displayedResults: [],
          loading: true,
          error: null,
          displayCount: 10,
          hasMore: false,
        },
      },
    });

    const input = screen.getByPlaceholderText(/search itunes/i);
    const button = screen.getByRole("button", { name: /searching/i });

    expect(input).toBeDisabled();
    expect(button).toBeDisabled();
  });
});

