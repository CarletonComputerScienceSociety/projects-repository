import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "./Button";
import { Plus } from "lucide-react";

describe("Button", () => {
  it("will render with label", () => {
    render(<Button label="Click Me" />);
    expect(
      screen.getByRole("button", { name: "Click Me" }),
    ).toBeInTheDocument();
  });

  it("will render with icon", () => {
    render(<Button label="Add" icon={<Plus />} />);
    expect(screen.getByTestId("icon")).toBeInTheDocument();
  });

  it("will call onClick when clicked", () => {
    const handleClick = jest.fn();
    render(<Button label="Click" onClick={handleClick} />);
    fireEvent.click(screen.getByRole("button", { name: "Click" }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("will apply correct class for type 'primary'", () => {
    render(<Button label="Primary" type="primary" />);
    const button = screen.getByRole("button", { name: "Primary" });
    expect(button.className).toMatch(/button/);
    expect(button.className).toMatch(/primary/);
  });

  it("will apply correct class for type 'ghost'", () => {
    render(<Button label="Ghost" type="ghost" />);
    expect(screen.getByRole("button", { name: "Ghost" }).className).toMatch(
      /ghost/,
    );
  });

  it("will apply correct class for type 'outline'", () => {
    render(<Button label="Outline" type="outline" />);
    expect(screen.getByRole("button", { name: "Outline" }).className).toMatch(
      /outline/,
    );
  });
});
