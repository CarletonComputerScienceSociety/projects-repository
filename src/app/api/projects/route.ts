import { NextRequest, NextResponse } from "next/server";
import { getAllProjects } from "@/lib/markdown";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const search = searchParams.get("search")?.toLowerCase() || "";
  const tags = searchParams.getAll("tags");
  const page = parseInt(searchParams.get("page") || "1");
  const pageSize = parseInt(searchParams.get("pageSize") || "20");

  const allProjects = getAllProjects();

  // filter by search string
  const searched = search
    ? allProjects.filter(p =>
        p.title.toLowerCase().includes(search) ||
        p.description.toLowerCase().includes(search) ||
        p.author.toLowerCase().includes(search)
      )
    : allProjects;

  // filter by tag list
  const filtered = tags.length > 0
    ? searched.filter(p =>
        tags.some(tag => p.tags.map(t => t.toLowerCase()).includes(tag.toLowerCase()))
      )
    : searched;

  // paginate
  const start = (page - 1) * pageSize;
  const paginated = filtered.slice(start, start + pageSize);

  return NextResponse.json({
    total: filtered.length,
    page,
    pageSize,
    results: paginated,
  });
}
