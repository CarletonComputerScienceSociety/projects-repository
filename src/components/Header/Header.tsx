import { Button } from "@/components";
import styles from "./Header.module.scss";
import { Info, Plus } from "lucide-react";

export function Header() {
  return (
    <div className={styles.header}>
      <div className={styles.headerContent}>
        <img src="/ccss-logo-2022.png" alt="Logo" className={styles.logo} />
        <div className={styles.buttons}>
          <Button label="About" icon={<Info size={18} />} type="ghost" />
          <Button label="Contribute" icon={<Plus size={16} />} type="outline" />
        </div>
      </div>
      <div className={styles.titleContainer}>
        <h1 className={styles.title}>Projects Repository</h1>
        <p className={styles.subtitle}>
          Projects from the Carleton University computer science community
        </p>
      </div>
    </div>
  );
}
