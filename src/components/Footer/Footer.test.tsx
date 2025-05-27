import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Footer } from "./Footer";

describe("Footer", () => {
  it("will render without crashing", () => {
    render(<Footer />);
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
  });

  it("will display the current year", () => {
    const currentYear = new Date().getFullYear().toString();
    render(<Footer />);
    expect(
      screen.getByText((content) => content.includes(currentYear)),
    ).toBeInTheDocument();
  });

  it("will contain the correct site title", () => {
    render(<Footer />);
    expect(
      screen.getByText(/Carleton University Student Project Showcase/i),
    ).toBeInTheDocument();
  });
});
