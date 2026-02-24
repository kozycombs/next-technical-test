import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { render } from "../../test/testUtils";
import SearchPage from "./SearchPage";

describe("SearchPage", () => {
  it("should render the page title", () => {
    render(<SearchPage />);
    expect(screen.getByText("Search iTunes")).toBeInTheDocument();
  });

  it("should render the page description", () => {
    render(<SearchPage />);
    expect(
      screen.getByText("Search for music, movies, apps, and more"),
    ).toBeInTheDocument();
  });

  it("should render the search bar", () => {
    render(<SearchPage />);
    const input = screen.getByPlaceholderText(/search itunes/i);
    expect(input).toBeInTheDocument();
  });

  it("should render the search button", () => {
    render(<SearchPage />);
    const button = screen.getByRole("button", { name: /search/i });
    expect(button).toBeInTheDocument();
  });

  it("should render the library music icon", () => {
    render(<SearchPage />);
    const icon = screen.getByTestId("LibraryMusicIcon");
    expect(icon).toBeInTheDocument();
  });

  it("should have proper container structure", () => {
    const { container } = render(<SearchPage />);
    // Check that the MUI Container is rendered
    const muiContainer = container.querySelector(".MuiContainer-root");
    expect(muiContainer).toBeInTheDocument();
  });
});

