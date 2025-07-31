import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { TagList } from "./TagList";

export interface Tag {
  id: string;
  label: string;
  lucideIcon: string;
  borderColor: string;
  backgroundColor: string;
}

const mockTagLabel = "Atom";
const secondTagLabel = "Beta";
const mockTag = {
  id: "atom",
  label: mockTagLabel,
  lucideIcon: "",
  borderColor: "red",
  backgroundColor: "white",
};
const secondTag = {
  id: "beta",
  label: secondTagLabel,
  lucideIcon: "",
  borderColor: "red",
  backgroundColor: "white",
};

describe("TagList", () => {
  it("hides tags", () => {
    render(
      <TagList tags={[mockTag]} onTagClick={() => {}} selectedTagIds={[]} />,
    );
    expect(screen.getByText(mockTagLabel)).toBeInTheDocument();
  });
  it("test click event", () => {
    const mockClick = jest.fn();
    render(
      <TagList tags={[mockTag]} onTagClick={mockClick} selectedTagIds={[]} />,
    );
    const tag = screen.getByText("Atom");
    fireEvent.click(tag);
    expect(mockClick).toHaveBeenCalledWith(mockTag);
    expect(mockClick).toHaveBeenCalledTimes(1);
  });
  it("will hide 13th element after clicking show less", () => {
    const mockClick = jest.fn();
    const tags = Array(13).fill(mockTag);
    tags.push(secondTag);
    render(<TagList tags={tags} onTagClick={mockClick} selectedTagIds={[]} />);
    const showLessButton = screen.getByText("Show Less");
    fireEvent.click(showLessButton);
    const tag = screen.queryByText(secondTagLabel);
    expect(tag).toBeNull();
  });
});
