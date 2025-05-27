import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Header } from "./Header";

describe("Header", () => {
  it("will render the logo image", () => {
    render(<Header />);
    const logo = screen.getByAltText("Logo") as HTMLImageElement;
    expect(logo).toBeInTheDocument();
    expect(logo.src).toContain("/ccss-logo-2022.png");
  });

  it("will display the main title", () => {
    render(<Header />);
    expect(
      screen.getByRole("heading", { name: "Projects Repository" }),
    ).toBeInTheDocument();
  });

  it("will display the subtitle", () => {
    render(<Header />);
    expect(
      screen.getByText(
        /Showcasing innovative projects from Carleton University students/i,
      ),
    ).toBeInTheDocument();
  });

  it("will render the About button", () => {
    render(<Header />);
    expect(screen.getByRole("button", { name: "About" })).toBeInTheDocument();
  });

  it("will render the Contribute button", () => {
    render(<Header />);
    expect(
      screen.getByRole("button", { name: "Contribute" }),
    ).toBeInTheDocument();
  });
});
