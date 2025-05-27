import styles from "./page.module.scss";
import { Footer, Header, Search } from "@/components";
import tags from "../../data/tags.json";

export default function HomePage() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Header />
        <Search
          tags={tags.map((tag) => ({
            id: tag.id,
            label: tag.label,
            lucideIcon: tag.lucideIcon,
            borderColor: tag.borderColor,
            backgroundColor: tag.backgroundColor ?? "",
          }))}
        />
        <br />
        <br />
        <Footer />
      </main>
    </div>
  );
}
