import styles from "./Footer.module.scss";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <p>
          © {new Date().getFullYear()} Carleton University Student Project
          Showcase
        </p>
      </div>
    </footer>
  );
}
