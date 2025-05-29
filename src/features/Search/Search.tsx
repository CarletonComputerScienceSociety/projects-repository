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

  const fetchProjects = async () => {
    const params = new URLSearchParams();
    if (searchText) params.set("search", searchText);
    selectedTagIds.forEach((tag) => params.append("tags", tag));

    try {
      const res = await fetch(`/api/projects?${params.toString()}`);
      const data = await res.json();
      setProjects(data.results ?? data);
    } catch (err) {
      console.error("Failed to load projects", err);
    }
  };

  useEffect(() => {
    fetchProjects();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTagIds, searchText]);

  const onTagClick = (tag: Tag) => {
    setSelectedTagIds((prev) =>
      prev.includes(tag.id)
        ? prev.filter((id) => id !== tag.id)
        : [...prev, tag.id],
    );
  };

  const clearSelectedTags = () => setSelectedTagIds([]);

  const unSelectTag = (tagId: string) => {
    setSelectedTagIds((prev) => prev.filter((id) => id !== tagId));
  };

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
    </div>
  );

  const ProjectsMarkup = (
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
  );

  return (
    <div className={styles.search}>
      <div className={styles.searchInner}>
        <TextInput
          value={searchText || ""}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <br />
        <TagList
          tags={tags}
          onTagClick={onTagClick}
          selectedTagIds={selectedTagIds}
        />
        {SelectionMarkup}
        <br />
        {ProjectsMarkup}
      </div>
    </div>
  );
}
