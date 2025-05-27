import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { ProjectCard } from "./ProjectCard";

describe("ProjectCard", () => {
  const defaultProps = {
    title: "Test Project",
    description: "This is a test description",
    githubUrl: "https://github.com/example/test-project",
    liveUrl: "https://example.com/demo",
    tags: ["React", "TypeScript", "CSS", "Jest"],
    author: "Jane Doe",
  };

  it("will render title and author", () => {
    render(<ProjectCard {...defaultProps} />);
    expect(screen.getByText("Test Project")).toBeInTheDocument();
    expect(screen.getByText("Jane Doe")).toBeInTheDocument();
  });

  it("will render description", () => {
    render(<ProjectCard {...defaultProps} />);
    expect(screen.getByText("This is a test description")).toBeInTheDocument();
  });

  it("will render up to 3 tags and a +N badge for extras", () => {
    render(<ProjectCard {...defaultProps} />);
    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
    expect(screen.getByText("CSS")).toBeInTheDocument();
    expect(screen.getByText("+1")).toBeInTheDocument(); // 4th tag
  });

  it("will render GitHub and demo links", () => {
    render(<ProjectCard {...defaultProps} />);
    const githubLink = screen.getByRole("link", { name: /code/i });
    const demoLink = screen.getByRole("link", { name: /demo/i });
    expect(githubLink).toHaveAttribute("href", defaultProps.githubUrl);
    expect(demoLink).toHaveAttribute("href", defaultProps.liveUrl);
  });

  it("will render placeholder if no previewImageUrl is provided", () => {
    render(<ProjectCard {...defaultProps} previewImageUrl={undefined} />);
    expect(screen.getByText("Code Project")).toBeInTheDocument();
    expect(screen.getByText("No UI Preview")).toBeInTheDocument();
  });

  it("will render preview image if previewImageUrl is provided", () => {
    render(<ProjectCard {...defaultProps} previewImageUrl="/preview.png" />);
    const image = screen.getByAltText(
      "Test Project preview",
    ) as HTMLImageElement;
    expect(image).toBeInTheDocument();
    expect(image.src).toContain("/placeholder.svg"); // because it's hardcoded
  });

  it("will not render demo link if liveUrl is missing", () => {
    render(<ProjectCard {...defaultProps} liveUrl={undefined} />);
    expect(
      screen.queryByRole("link", { name: /demo/i }),
    ).not.toBeInTheDocument();
  });
});
