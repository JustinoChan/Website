import Link from "next/link";
import type { Project } from "@/lib/projects";

export default function ProjectCard({ project }: { project: Project }) {
  const statusClass =
    project.status === "active"
      ? "text-[var(--color-accent)] border-[var(--color-accent)]"
      : project.status === "shipped"
      ? "text-[var(--color-fg)] border-[var(--color-line)]"
      : "text-[var(--color-fg-muted)] border-[var(--color-line)]";

  return (
    <li className="relative pl-10 pb-12 group last:pb-2">
      {/* node */}
      <span
        aria-hidden
        className="absolute left-0 top-1 text-[var(--color-accent)] bg-[var(--color-bg)] pr-1"
      >
        ●
      </span>

      <Link href={`/projects/${project.slug}`} className="block">
        <div className="flex items-baseline gap-3 flex-wrap">
          <span className="text-[var(--color-accent)] text-xs">
            commit {project.commit}
          </span>
          <span className="text-[11px] text-[var(--color-fg-muted)]">
            [{project.period}]
          </span>
          <span className={"text-[10px] px-1.5 py-0.5 border " + statusClass}>
            {project.status}
          </span>
        </div>

        <h3 className="mt-2 text-lg group-hover:text-[var(--color-accent)] transition-colors">
          <span className="text-[var(--color-fg-muted)]">./</span>
          {project.slug}
          <span className="text-[var(--color-fg-muted)]">/</span>
        </h3>

        <p className="mt-1 text-[var(--color-fg-muted)]">{project.tagline}</p>

        <div className="mt-3 flex flex-wrap gap-x-2 gap-y-1 text-xs text-[var(--color-fg-muted)]">
          {project.tags.map((t) => (
            <span key={t}>
              [<span className="text-[var(--color-fg)]">{t.toLowerCase()}</span>]
            </span>
          ))}
        </div>

        <p className="mt-3 text-xs text-[var(--color-fg-muted)] group-hover:text-[var(--color-accent)] transition-colors">
          → cd /projects/{project.slug}
        </p>
      </Link>
    </li>
  );
}
