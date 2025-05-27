interface ProjectCardProps {
  title: string;
  description: string;
  previewImageUrl: string;
  githubUrl: string;
  liveUrl?: string;
  tags: string[];
  author: string;
}

export function ProjectCard({
  title,
  description,
  githubUrl,
  liveUrl,
  tags,
  author,
}: ProjectCardProps) {
  return (
    <div>
      <h2>{title}</h2>
      <p>{description}</p>
      <img src={"/placeholder.svg"} alt={`${title} preview`} />
      <p>
        <strong>{author}</strong>
      </p>
      <p>{tags.length > 0 && <span> - Tags: {tags.join(", ")}</span>}</p>
      <a href={githubUrl} target="_blank" rel="noopener noreferrer">
        View Code
      </a>
      {liveUrl && (
        <a href={liveUrl} target="_blank" rel="noopener noreferrer">
          View Live
        </a>
      )}
    </div>
  );
}
