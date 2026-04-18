import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/projects";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[var(--color-bg-soft)] hover:border-[var(--color-accent)]/50 transition-all"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-black/40">
        <Image
          src={project.cover}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(min-width: 768px) 50vw, 100vw"
        />
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg font-semibold">{project.title}</h3>
          <span
            aria-hidden
            className="text-[var(--color-fg-muted)] group-hover:text-[var(--color-accent)] group-hover:translate-x-1 transition-all"
          >
            →
          </span>
        </div>
        <p className="mt-1 text-sm text-[var(--color-fg-muted)] leading-relaxed">
          {project.tagline}
        </p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.tags.map((t) => (
            <span
              key={t}
              className="rounded-full border border-white/10 px-2.5 py-0.5 text-xs text-[var(--color-fg-muted)]"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
