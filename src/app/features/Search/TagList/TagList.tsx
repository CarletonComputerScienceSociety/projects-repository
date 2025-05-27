import { TagBadge } from "@/components";
import styles from "./TagList.module.scss";
import {
  Atom,
  Bot,
  Brain,
  Code,
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
  onTagClick: (tag: Tag) => void;
}

export function TagList({ tags, onTagClick }: TagListProps) {
  return (
    <div className={styles.tagContainer}>
      {tags?.length > 0 && (
        <div className={styles.tagList}>
          {tags.map((tag) => (
            <TagBadge
              key={tag.id}
              label={tag.label}
              borderColor={tag.borderColor}
              backgroundColor={tag.backgroundColor}
              icon={LUCIDE_ICON_MAP[tag.lucideIcon] || <Code size={14} />}
              onClick={() => onTagClick(tag)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
