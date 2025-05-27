import styles from "./page.module.scss";
import { getAllProjects } from "@/lib/markdown";
import { Footer, Header, ProjectCard, Search } from "@/components";

export default function HomePage() {
  const projects = getAllProjects();

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Header />
        {/* TODO: Search will be added in the future */}
        <div hidden>
          <Search />
        </div>
        <br />
        <div className={styles.projectList}>
          {projects.map((p, i) => (
            <div key={`project-${i}`}>
              <ProjectCard
                title={p.title}
                description={p.description}
                previewImageUrl={p.previewImageUrl}
                githubUrl={p.githubUrl}
                liveUrl={p.liveUrl}
                tags={p.tags}
                author={p.author}
              />
            </div>
          ))}
        </div>
        <br />
        <br />
        <Footer />
      </main>
    </div>
  );
}
