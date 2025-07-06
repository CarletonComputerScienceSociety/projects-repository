"use client";

import { useState, useEffect } from "react";
import { TagList } from "./TagList";
import styles from "./Search.module.scss";
import { ProjectCard, TextInput } from "@/components";

export interface Tag {
  id: string;
  label: string;
  lucideIcon: string;
  borderColor: string;
  backgroundColor: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  author: string;
  tags: string[];
  previewImageUrl?: string;
  githubUrl: string;
  liveUrl?: string;
}

interface SearchProps {
  tags: Tag[];
}

export function Search({ tags }: SearchProps) {
  const [selectedTagIds, setSelectedTagIds] = useState<string[]>([]);
  const [searchText, setSearchText] = useState("");
  const [projects, setProjects] = useState<Project[]>([]);

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const fetchProjects = async (pageToFetch = 1, reset = false) => {
    if (isLoadingMore || (!hasMore && !reset)) return;

    if (reset) setProjects([]);
    setIsLoadingMore(true);

    await new Promise((resolve) => setTimeout(resolve, 500));

    const params = new URLSearchParams();
    params.set("page", pageToFetch.toString());
    params.set("pageSize", "20");

    if (searchText.trim()) params.set("search", searchText);
    if (selectedTagIds.length > 0) {
      selectedTagIds.forEach((tag) => params.append("tags", tag));
    }

    try {
      const res = await fetch(`/api/projects?${params.toString()}`);
      const data = await res.json();

      setProjects((prev) =>
        pageToFetch === 1 || reset
          ? (data.results ?? [])
          : [...prev, ...(data.results ?? [])],
      );

      setHasMore((data.results?.length ?? 0) >= 20);
      setPage(pageToFetch);
    } catch (err) {
      console.error("Failed to load projects", err);
    } finally {
      setIsLoadingMore(false);
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setPage(1);
    setHasMore(true);
    fetchProjects(1, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTagIds, searchText]);

  useEffect(() => {
    const handleScroll = () => {
      const nearBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 200;

      if (nearBottom && hasMore && !isLoadingMore) {
        fetchProjects(page + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [page, hasMore, isLoadingMore]);

  const onTagClick = (tag: Tag) => {
    setSelectedTagIds((prev) =>
      prev.includes(tag.id)
        ? prev.filter((id) => id !== tag.id)
        : [...prev, tag.id],
    );
  };

  const clearSelectedTags = () => setSelectedTagIds([]);
  const unSelectTag = (tagId: string) =>
    setSelectedTagIds((prev) => prev.filter((id) => id !== tagId));

  const SelectionMarkup = selectedTagIds.length > 0 && (
    <div className={styles.activeFilters}>
      <span className={styles.activeFiltersLabel}>Active filters:</span>
      <div className={styles.selectedTags}>
        {selectedTagIds
          .map((id) => tags.find((tag) => tag.id === id))
          .filter(Boolean)
          .map((tag) => (
            <span
              key={tag!.id}
              className={styles.selectedTag}
              onClick={() => unSelectTag(tag!.id)}
            >
              <strong>{tag!.label}</strong> <span className={styles.x}>×</span>
            </span>
          ))}
      </div>
      <div>
        <button className={styles.button} onClick={() => clearSelectedTags()}>
          Clear filters
        </button>
      </div>
    </div>
  );

  const SpinnerMarkup = (
    <div style={{ textAlign: "center", marginTop: "1rem", width: "100%" }}>
      <div className={styles.spinner}></div>
    </div>
  );

  const NoResultsMarkup = (
    <div className={styles.noResults}>
      <h2>No Projects Found 🔍</h2>
      <p>Try adjusting your search or removing some filters.</p>
    </div>
  );

  const ProjectsMarkup = (
    <>
      {isLoadingMore && SpinnerMarkup}
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
    </>
  );

  return (
    <div className={styles.search}>
      <div className={styles.searchInner}>
        <TextInput
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <br />
        <TagList
          tags={tags}
          onTagClick={onTagClick}
          selectedTagIds={selectedTagIds}
        />
        {SelectionMarkup}
        <div style={{ marginBottom: "3rem" }} />
        {projects.length === 0 ? <>{NoResultsMarkup}</> : <>{ProjectsMarkup}</>}
      </div>
    </div>
  );
}
