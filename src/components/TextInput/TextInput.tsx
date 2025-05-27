import { Search } from "lucide-react";
import styles from "./TextInput.module.scss";

interface TextInputProps {
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  value?: string;
}

export function TextInput({ onChange, value }: TextInputProps) {
  return (
    <div className={styles.textInput}>
      <span data-testid="search-icon">
        <Search className={styles.icon} />
      </span>
      <input
        type="text"
        className={styles.input}
        placeholder="Search projects, authors, or descriptions..."
        onChange={onChange}
        value={value}
      />
    </div>
  );
}
