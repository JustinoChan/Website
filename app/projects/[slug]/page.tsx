import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject, projects } from "@/lib/projects";
import Rule, { ManStrip } from "@/components/Rule";
import ProjectSpec from "@/components/ProjectSpec";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Params }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Project not found" };
  return {
    title: `${project.slug} — justin-chan(1)`,
    description: project.tagline,
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Params;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const hasSpec = Boolean(project.spec);
  const statusLabel =
    project.status === "active"
      ? "ACTIVE"
      : project.status === "shipped"
      ? "SHIPPED"
      : "ARCHIVED";

  return (
    <article className="mx-auto max-w-3xl px-6 pt-10 pb-4">
      <ManStrip
        left={`${project.slug}(7)`}
        center="project specification"
        right={`${project.slug}(7)`}
      />
      <Rule />

      {/* Breadcrumb */}
      <div className="mt-8 flex items-baseline gap-3 text-[11px] text-[var(--color-fg-muted)]">
        <span className="text-[var(--color-accent)]">$</span>
        <Link
          href="/projects"
          className="hover:text-[var(--color-accent)] transition-colors"
        >
          cd ../
        </Link>
        <span>← back to projects</span>
      </div>

      {/* Title */}
      <header className="mt-6">
        <div className="flex items-baseline justify-between flex-wrap gap-4">
          <h1 className="text-[36px] tracking-tight leading-none">
            <span className="text-[var(--color-fg-muted)]">./</span>
            {project.slug}
            <span className="text-[var(--color-fg-muted)]">/</span>
          </h1>
          <span className="text-[11px] text-[var(--color-accent)] flex items-center gap-1.5">
            {project.status === "active" && (
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] animate-pulse" />
            )}
            {statusLabel} · {project.period}
          </span>
        </div>
        <p className="mt-3 text-[var(--color-fg-muted)] text-[15px] max-w-2xl">
          {project.tagline}
        </p>
      </header>

      {/* Quick links bar */}
      <div className="mt-5 flex flex-wrap gap-2">
        {project.repoUrl && (
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noreferrer"
            className="text-[12px] border border-[var(--color-line)] px-3 py-1.5 hover:border-[var(--color-fg)] hover:text-[var(--color-fg)] transition-colors text-[var(--color-fg-muted)]"
          >
            <span className="text-[var(--color-accent)]">git</span>{" "}
            {project.repoUrl.replace(/^https?:\/\//, "")}
          </a>
        )}
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noreferrer"
            className="text-[12px] border border-[var(--color-line)] px-3 py-1.5 hover:border-[var(--color-fg)] hover:text-[var(--color-fg)] transition-colors text-[var(--color-fg-muted)]"
          >
            <span className="text-[var(--color-accent)]">open</span>{" "}
            {project.liveUrl.replace(/^https?:\/\//, "")}
          </a>
        )}
        {project.writeupUrl && (
          <a
            href={project.writeupUrl}
            target="_blank"
            rel="noreferrer"
            className="text-[12px] border border-[var(--color-line)] px-3 py-1.5 hover:border-[var(--color-fg)] hover:text-[var(--color-fg)] transition-colors text-[var(--color-fg-muted)]"
          >
            <span className="text-[var(--color-accent)]">writeup ↓</span>{" "}
            technical pdf
          </a>
        )}
      </div>

      {/* Tag row */}
      <div className="mt-4 flex flex-wrap gap-x-2 gap-y-1 text-xs text-[var(--color-fg-muted)]">
        {project.tags.map((t) => (
          <span key={t}>
            [
            <span className="text-[var(--color-fg)]">{t.toLowerCase()}</span>
            ]
          </span>
        ))}
      </div>

      {/* If project has a rich spec, render the spec sheet — otherwise fall back to plain description */}
      {hasSpec ? (
        <ProjectSpec spec={project.spec!} />
      ) : (
        <section className="mt-10">
          <h2 className="flex items-baseline gap-3">
            <span className="text-[var(--color-accent)]">§01</span>
            <span className="uppercase tracking-[0.18em] text-[12px]">
              description
            </span>
          </h2>
          <Rule className="mt-2" />
          <div className="mt-4 pl-6 space-y-4 text-[var(--color-fg-muted)]">
            {project.description.split("\n\n").map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </section>
      )}

      {/* Gallery */}
      {project.media.length > 0 && (
        <section className="mt-12">
          <h2 className="flex items-baseline gap-3">
            <span className="text-[var(--color-accent)]">§G</span>
            <span className="uppercase tracking-[0.18em] text-[12px]">
              gallery
            </span>
          </h2>
          <Rule className="mt-2" />
          <div className="mt-6 pl-6 grid gap-6">
            {project.media.map((m, i) =>
              m.type === "image" ? (
                <figure key={i}>
                  <p className="text-xs text-[var(--color-fg-muted)] mb-2">
                    [
                    <span className="text-[var(--color-accent)]">
                      img.{String(i + 1).padStart(2, "0")}
                    </span>
                    ] {m.alt}
                  </p>
                  <div className="relative aspect-[16/10] overflow-hidden border border-[var(--color-line)] bg-[var(--color-bg-soft)]">
                    <Image
                      src={m.src}
                      alt={m.alt}
                      fill
                      className="object-cover"
                      sizes="(min-width: 768px) 720px, 100vw"
                    />
                  </div>
                </figure>
              ) : (
                <figure key={i}>
                  <p className="text-xs text-[var(--color-fg-muted)] mb-2">
                    [
                    <span className="text-[var(--color-accent)]">
                      vid.{String(i + 1).padStart(2, "0")}
                    </span>
                    ] {m.alt}
                  </p>
                  <video
                    src={m.src}
                    poster={m.poster}
                    controls
                    preload="metadata"
                    aria-label={m.alt}
                    className="w-full border border-[var(--color-line)] bg-[var(--color-bg-soft)]"
                  />
                </figure>
              )
            )}
          </div>
        </section>
      )}

      <div className="mt-16">
        <Rule />
        <div className="mt-1">
          <ManStrip
            left={`${project.slug}(7)`}
            center="project specification"
            right={`${project.slug}(7)`}
          />
        </div>
      </div>
    </article>
  );
}
