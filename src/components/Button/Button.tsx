import styles from "./Button.module.scss";
import { type ReactNode } from "react";

interface ButtonProps {
  label: string;
  icon?: ReactNode;
  onClick?: () => void;
  type?: "primary" | "ghost" | "outline";
}

export function Button({
  label,
  icon,
  onClick,
  type = "primary",
}: ButtonProps) {
  return (
    <button
      className={`${styles.button} ${styles[type]}`}
      onClick={onClick}
      type="button"
      aria-label={label}
    >
      {icon && <span className={styles.icon}>{icon}</span>}
      <span>{label}</span>
    </button>
  );
}
