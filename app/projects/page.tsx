import PageHeader from "@/components/PageHeader";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/lib/projects";

export const metadata = { title: "projects — justin-chan(1)" };

export default function ProjectsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Projects"
        title="projects(1) — selected work"
        description="A list of things I've built. Click any entry for description, source, and gallery."
      />
      <section className="mx-auto max-w-3xl px-6">
        <p className="text-[var(--color-fg-muted)] mb-6">
          <span className="text-[var(--color-accent)]">$</span> ls -la ~/projects
          <span className="text-[var(--color-fg-muted)]">
            {" "}
            | wc -l{" → "}
          </span>
          <span className="text-[var(--color-fg)]">{projects.length}</span>
        </p>

        <ol className="space-y-10">
          {projects.map((p, i) => (
            <ProjectCard
              key={p.slug}
              project={p}
              index={String(i + 1).padStart(2, "0")}
            />
          ))}
        </ol>

        <div className="mt-16 text-[var(--color-fg-muted)]">
          <span className="text-[var(--color-accent)]">$</span> _
          <span className="cursor" aria-hidden />
        </div>
      </section>
    </>
  );
}
