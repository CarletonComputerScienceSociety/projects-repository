import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { TextInput } from "./TextInput";

describe("TextInput", () => {
  it("renders the search input field", () => {
    render(<TextInput />);
    const input = screen.getByPlaceholderText(
      "Search projects, authors, or descriptions...",
    );
    expect(input).toBeInTheDocument();
  });

  it("renders the search icon", () => {
    render(<TextInput />);
    const icon = screen.getByTestId("search-icon");
    expect(icon).toBeInTheDocument();
  });
});
