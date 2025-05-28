import { Code } from "lucide-react";
import styles from "./TagBadge.module.scss";
import tinycolor from "tinycolor2";

interface TagBadgeProps {
  label: string;
  borderColor: string;
  backgroundColor: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  selected?: boolean;
}

export function TagBadge({
  label,
  borderColor,
  backgroundColor,
  icon = <Code size={14} />,
  onClick,
  selected = false,
}: TagBadgeProps) {
  const appliedBackground = selected
    ? tinycolor(backgroundColor).darken(10).toString()
    : backgroundColor;

  return (
    <span
      className={styles.tagBadge}
      style={{
        borderColor,
        backgroundColor: appliedBackground,
        fontWeight: selected ? "normal" : "normal",
      }}
      onClick={onClick}
    >
      <span className={styles.icon}>{icon}</span>
      <span>{label}</span>
    </span>
  );
}
