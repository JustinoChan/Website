import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject, projects } from "@/lib/projects";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Params }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Project not found" };
  return {
    title: `${project.title} — Your Name`,
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

  return (
    <article className="mx-auto max-w-4xl px-6 pt-16 pb-20 sm:pt-24">
      <Link
        href="/projects"
        className="text-sm text-[var(--color-fg-muted)] hover:text-[var(--color-fg)] transition-colors"
      >
        ← All projects
      </Link>

      <header className="mt-6">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
          {project.title}
        </h1>
        <p className="mt-3 text-lg text-[var(--color-fg-muted)]">
          {project.tagline}
        </p>
        <p className="mt-2 text-sm text-[var(--color-fg-muted)]">
          {project.period}
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          {project.tags.map((t) => (
            <span
              key={t}
              className="rounded-full border border-white/10 px-2.5 py-0.5 text-xs text-[var(--color-fg-muted)]"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[var(--color-accent)] px-4 py-2 text-sm font-medium text-white hover:opacity-90 transition-opacity"
            >
              Live demo <span aria-hidden>↗</span>
            </a>
          )}
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm font-medium hover:bg-white/5 transition-colors"
            >
              Source code <span aria-hidden>↗</span>
            </a>
          )}
        </div>
      </header>

      <div className="mt-10 space-y-4 text-[var(--color-fg-muted)] leading-relaxed">
        {project.description.split("\n\n").map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>

      {project.media.length > 0 && (
        <section className="mt-12 space-y-6">
          <h2 className="text-xl font-semibold">Gallery</h2>
          <div className="grid gap-6">
            {project.media.map((m, i) =>
              m.type === "image" ? (
                <div
                  key={i}
                  className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-white/10 bg-black/40"
                >
                  <Image
                    src={m.src}
                    alt={m.alt}
                    fill
                    className="object-cover"
                    sizes="(min-width: 768px) 768px, 100vw"
                  />
                </div>
              ) : (
                <video
                  key={i}
                  src={m.src}
                  poster={m.poster}
                  controls
                  preload="metadata"
                  aria-label={m.alt}
                  className="w-full rounded-2xl border border-white/10 bg-black/40"
                />
              )
            )}
          </div>
        </section>
      )}
    </article>
  );
}
