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
    title: `${project.slug} — justin-chan(1)`,
    description: project.tagline,
  };
}

const Rule = () => (
  <div
    aria-hidden
    className="text-[var(--color-line)] select-none overflow-hidden whitespace-nowrap"
  >
    {"─".repeat(200)}
  </div>
);

export default async function ProjectDetailPage({
  params,
}: {
  params: Params;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const meta: { label: string; value: React.ReactNode }[] = [
    { label: "project", value: project.slug },
    { label: "title", value: project.title },
    { label: "period", value: project.period },
    {
      label: "tags",
      value: project.tags.map((t) => `[${t.toLowerCase()}]`).join(" "),
    },
  ];
  if (project.repoUrl) {
    meta.push({
      label: "repo",
      value: (
        <a
          href={project.repoUrl}
          target="_blank"
          rel="noreferrer"
          className="hover:text-[var(--color-accent)] transition-colors underline decoration-dotted underline-offset-4"
        >
          {project.repoUrl.replace(/^https?:\/\//, "")}
        </a>
      ),
    });
  }
  if (project.liveUrl) {
    meta.push({
      label: "live",
      value: (
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noreferrer"
          className="hover:text-[var(--color-accent)] transition-colors underline decoration-dotted underline-offset-4"
        >
          {project.liveUrl.replace(/^https?:\/\//, "")}
        </a>
      ),
    });
  }
  if (project.writeupUrl) {
    meta.push({
      label: "writeup",
      value: (
        <a
          href={project.writeupUrl}
          target="_blank"
          rel="noreferrer"
          className="hover:text-[var(--color-accent)] transition-colors underline decoration-dotted underline-offset-4"
        >
          AscensionAI_Technical_Writeup.pdf ↓
        </a>
      ),
    });
  }

  return (
    <article className="mx-auto max-w-3xl px-6 pt-10 sm:pt-14">
      <Link
        href="/projects"
        className="text-xs text-[var(--color-fg-muted)] hover:text-[var(--color-accent)] transition-colors"
      >
        <span className="text-[var(--color-accent)]">$</span> cd ../
        <span className="ml-2">← back to projects</span>
      </Link>

      <header className="mt-8">
        <p className="text-xs text-[var(--color-fg-muted)] uppercase tracking-wider">
          project specification
        </p>
        <Rule />
        <dl className="mt-3 space-y-1.5">
          {meta.map((m) => (
            <div
              key={m.label}
              className="grid grid-cols-[6rem_1fr] gap-x-4 items-baseline"
            >
              <dt className="text-[var(--color-accent)]">[{m.label}]</dt>
              <dd className="break-words">{m.value}</dd>
            </div>
          ))}
        </dl>
        <Rule />
      </header>

      <section className="mt-10">
        <h2 className="flex items-baseline gap-3">
          <span className="text-[var(--color-accent)]">§01</span>
          <span className="uppercase tracking-wider">description</span>
        </h2>
        <Rule />
        <div className="mt-4 pl-6 space-y-4 text-[var(--color-fg-muted)]">
          {project.description.split("\n\n").map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </section>

      {project.media.length > 0 && (
        <section className="mt-12">
          <h2 className="flex items-baseline gap-3">
            <span className="text-[var(--color-accent)]">§02</span>
            <span className="uppercase tracking-wider">gallery</span>
          </h2>
          <Rule />
          <div className="mt-6 pl-6 grid gap-6">
            {project.media.map((m, i) =>
              m.type === "image" ? (
                <figure key={i}>
                  <p className="text-xs text-[var(--color-fg-muted)] mb-2">
                    [<span className="text-[var(--color-accent)]">img.{String(i + 1).padStart(2, "0")}</span>] {m.alt}
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
                    [<span className="text-[var(--color-accent)]">vid.{String(i + 1).padStart(2, "0")}</span>] {m.alt}
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
    </article>
  );
}
