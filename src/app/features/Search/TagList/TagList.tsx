import { useState } from "react";
import { ChevronDown, ChevronUp, Code } from "lucide-react";
import { TagBadge } from "@/components";
import styles from "./TagList.module.scss";
import {
  Atom,
  Bot,
  Brain,
  Database,
  FileText,
  Gamepad2,
  GitBranch,
  GitCommit,
  GitMerge,
  GitPullRequest,
  Globe,
  Music,
  Package,
  Shield,
  ShieldCheck,
  Smartphone,
  Tag,
  Terminal,
} from "lucide-react";

const LUCIDE_ICON_MAP: Record<string, React.ReactNode> = {
  Atom: <Atom size={14} />,
  Bot: <Bot size={14} />,
  Brain: <Brain size={14} />,
  Code: <Code size={14} />,
  Database: <Database size={14} />,
  FileText: <FileText size={14} />,
  Gamepad2: <Gamepad2 size={14} />,
  GitBranch: <GitBranch size={14} />,
  GitCommit: <GitCommit size={14} />,
  GitMerge: <GitMerge size={14} />,
  GitPullRequest: <GitPullRequest size={14} />,
  Globe: <Globe size={14} />,
  Music: <Music size={14} />,
  Package: <Package size={14} />,
  Shield: <Shield size={14} />,
  ShieldCheck: <ShieldCheck size={14} />,
  Smartphone: <Smartphone size={14} />,
  Tag: <Tag size={14} />,
  Terminal: <Terminal size={14} />,
};

interface Tag {
  id: string;
  label: string;
  lucideIcon: string;
  borderColor: string;
  backgroundColor: string;
}

interface TagListProps {
  tags: Tag[];
  selectedTagIds?: string[];
  onTagClick: (tag: Tag) => void;
}

const COLLAPSED_COUNT = 12;

export function TagList({ tags, selectedTagIds, onTagClick }: TagListProps) {
  const [showAll, setShowAll] = useState(true);
  const visibleTags = showAll ? tags : tags.slice(0, COLLAPSED_COUNT);
  const hiddenCount = tags.length - COLLAPSED_COUNT;

  return (
    <div className={styles.tagContainer}>
      <div className={styles.tagList}>
        {visibleTags.map((tag) => (
          <TagBadge
            key={tag.id}
            label={tag.label}
            borderColor={tag.borderColor}
            backgroundColor={tag.backgroundColor}
            icon={LUCIDE_ICON_MAP[tag.lucideIcon] || <Code size={14} />}
            onClick={() => onTagClick(tag)}
            selected={selectedTagIds?.includes(tag.id) || false}
          />
        ))}

        {hiddenCount > 0 && (
          <button
            className={styles.toggleButton}
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? (
              <>
                <ChevronUp size={14} style={{ marginRight: 4 }} />
                Show Less
              </>
            ) : (
              <>
                <ChevronDown size={14} style={{ marginRight: 4 }} />
                Show More ({hiddenCount})
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
}
