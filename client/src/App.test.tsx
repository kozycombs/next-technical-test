import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { render } from "./test/testUtils";
import App from "./App";

describe("App", () => {
  it("should render without crashing", () => {
    render(<App />);
    expect(screen.getByText("Search iTunes")).toBeInTheDocument();
  });

  it("should render SearchPage component", () => {
    render(<App />);
    expect(
      screen.getByText("Search for music, movies, apps, and more"),
    ).toBeInTheDocument();
  });

  it("should render search input", () => {
    render(<App />);
    const input = screen.getByPlaceholderText(/search itunes/i);
    expect(input).toBeInTheDocument();
  });

  it("should have MUI theme applied", () => {
    const { container } = render(<App />);
    // CssBaseline should be applied
    expect(container).toBeInTheDocument();
  });

  it("should render back to top anchor", () => {
    render(<App />);
    const anchor = document.getElementById("back-to-top-anchor");
    expect(anchor).toBeInTheDocument();
  });

  it("should render scroll to top button", () => {
    render(<App />);
    const scrollButton = screen.getByLabelText(/scroll back to top/i);
    expect(scrollButton).toBeInTheDocument();
  });
});

