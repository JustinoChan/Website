import PageHeader from "@/components/PageHeader";
import ProjectCard from "@/components/ProjectCard";
import Rule from "@/components/Rule";
import { projects } from "@/lib/projects";

export const metadata = { title: "projects — justin-chan(1)" };

export default function ProjectsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Projects"
        title="projects(1) — selected work"
        description="Click any commit for its description, source, and gallery."
      />
      <section className="mx-auto max-w-3xl px-6">
        <div className="flex items-baseline gap-3 text-[12px] text-[var(--color-fg-muted)]">
          <span className="text-[var(--color-accent)]">$</span>
          <span>git log --graph --oneline --all --pretty=portfolio</span>
        </div>
        <Rule className="mt-2" />

        <ol className="mt-6 relative">
          {/* vertical line behind the nodes */}
          <div
            aria-hidden
            className="absolute left-[7px] top-1 bottom-1 w-px bg-[var(--color-line)]"
          />

          {projects.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}

          {/* terminator */}
          <li className="relative pl-10">
            <span
              aria-hidden
              className="absolute left-0 top-1 text-[var(--color-fg-muted)] bg-[var(--color-bg)] pr-1"
            >
              ◌
            </span>
            <p className="text-[11px] text-[var(--color-fg-muted)]">
              (initial commit · uc irvine, 2021)
            </p>
          </li>
        </ol>
      </section>
    </>
  );
}
