import { Code } from "lucide-react";
import styles from "./TagBadge.module.scss";

interface TagBadgeProps {
  label: string;
  borderColor: string;
  backgroundColor: string;
  icon?: React.ReactNode;
  onClick?: () => void;
}

export function TagBadge({
  label,
  borderColor,
  backgroundColor,
  icon = <Code size={14} />,
  onClick,
}: TagBadgeProps) {
  return (
    <span
      className={styles.tagBadge}
      style={{
        borderColor,
        backgroundColor,
      }}
      onClick={onClick}
    >
      <span className={styles.icon}>{icon}</span>
      <span>{label}</span>
    </span>
  );
}
