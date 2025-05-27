import styles from "./page.module.scss";
import { getAllProjects } from "@/lib/markdown";
import { Footer, Header, ProjectCard, Search } from "@/components";

export default function HomePage() {
  const projects = getAllProjects();

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Header />
        <Search />
        <div className="grid">
          {projects.map((p, i) => (
            <div key={`project-${i}`}>
              <ProjectCard
                title={p.title}
                description={p.description}
                previewImageUrl={p.image || "/default-preview.png"}
                githubUrl={p.githubUrl}
                liveUrl={p.liveUrl}
                tags={p.tags}
                author={p.author}
              />
            </div>
          ))}
        </div>
        <Footer />
      </main>
    </div>
  );
}
