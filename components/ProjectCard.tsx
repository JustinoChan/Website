import Link from "next/link";
import type { Project } from "@/lib/projects";

export default function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: string;
}) {
  return (
    <li className="group">
      <Link href={`/projects/${project.slug}`} className="block">
        <div className="flex items-baseline gap-3">
          <span className="text-[var(--color-accent)]">§{index}</span>
          <span className="text-[var(--color-fg-muted)] text-xs">
            [{project.period}]
          </span>
        </div>
        <div
          aria-hidden
          className="mt-1 text-[var(--color-line)] select-none overflow-hidden whitespace-nowrap"
        >
          {"─".repeat(200)}
        </div>
        <div className="mt-3 pl-6">
          <h3 className="text-lg group-hover:text-[var(--color-accent)] transition-colors">
            <span className="text-[var(--color-fg-muted)]">./</span>
            {project.slug}
            <span className="text-[var(--color-fg-muted)]">/</span>
          </h3>
          <p className="mt-2 text-[var(--color-fg-muted)]">
            {project.tagline}
          </p>
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
        </div>
      </Link>
    </li>
  );
}
