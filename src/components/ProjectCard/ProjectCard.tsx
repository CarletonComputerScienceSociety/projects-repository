import styles from "./ProjectCard.module.scss";
import { Github, ExternalLink, Code } from "lucide-react";

interface ProjectCardProps {
  title: string;
  description: string;
  previewImageUrl?: string;
  githubUrl: string;
  liveUrl?: string;
  tags: string[];
  author: string;
}

export function ProjectCard({
  title,
  description,
  previewImageUrl,
  githubUrl,
  liveUrl,
  tags,
  author,
}: ProjectCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.preview}>
        {previewImageUrl ? (
          <img src={"/placeholder.svg"} alt={`${title} preview`} />
        ) : (
          <div className={styles.placeholder}>
            <Code className={styles.codeIcon} />
            <div className={styles.placeholderText}>
              <p>Code Project</p>
              <p className={styles.subtle}>No UI Preview</p>
            </div>
          </div>
        )}
      </div>

      <div className={styles.content}>
        <div className={styles.header}>
          <div className={styles.titleSection}>
            <h2 className={styles.title}>{title}</h2>
            <p className={styles.author}>{author}</p>
          </div>
        </div>


        <p className={styles.description}>{description}</p>

        <div className={styles.tags}>
          {tags.slice(0, 3).map((tag) => (
            <span className={styles.tag} key={tag}>
              {tag}
            </span>
          ))}
          {tags.length > 3 && (
            <span className={styles.tag}>+{tags.length - 3}</span>
          )}
        </div>

        <div className={styles.links}>
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.codeButton}
          >
            <Github className={styles.icon} />
            Code
          </a>
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.demoButton}
            >
              <ExternalLink className={styles.icon} />
              Demo
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
