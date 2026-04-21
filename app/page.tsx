import Link from "next/link";

const Rule = () => (
  <div
    aria-hidden
    className="text-[var(--color-line)] select-none overflow-hidden whitespace-nowrap"
  >
    {"─".repeat(200)}
  </div>
);

const Section = ({
  heading,
  children,
}: {
  heading: string;
  children: React.ReactNode;
}) => (
  <section className="mt-10">
    <h2 className="text-[var(--color-accent)] tracking-wider">{heading}</h2>
    <div className="mt-3 pl-6">{children}</div>
  </section>
);

export default function HomePage() {
  return (
    <article className="mx-auto max-w-3xl px-6 pt-10 pb-16 sm:pt-14">
      {/* man-page header strip */}
      <div className="flex items-center justify-between text-xs text-[var(--color-fg-muted)] uppercase tracking-wider">
        <span>justin-chan(1)</span>
        <span>portfolio manual</span>
        <span>justin-chan(1)</span>
      </div>
      <Rule />

      <Section heading="NAME">
        <p>
          <span className="text-[var(--color-fg)]">justin chan</span>
          {" — "}
          <span className="text-[var(--color-fg-muted)]">
            software engineer based in brentwood, ca
          </span>
        </p>
      </Section>

      <Section heading="SYNOPSIS">
        <pre className="whitespace-pre-wrap font-[inherit] text-[var(--color-fg)]">
{`justin [--hire] [--collaborate] [--chat]
       [--location=brentwood,ca]
       [--stack=python,typescript,sql]
       [--status=available]`}
        </pre>
      </Section>

      <Section heading="DESCRIPTION">
        <p className="text-[var(--color-fg-muted)]">
          Recent <span className="text-[var(--color-fg)]">B.S.</span> graduate
          in Software Engineering from{" "}
          <span className="text-[var(--color-fg)]">UC Irvine</span> (Mar 2025).
          I build scalable, clean, and efficient software — search engines,
          full-stack web apps, and social platforms.
        </p>
        <p className="mt-3 text-[var(--color-fg-muted)]">
          Currently looking for software engineering roles where I can
          contribute to a cross-functional team and keep growing as an
          engineer.
        </p>
      </Section>

      <Section heading="OPTIONS">
        <ul className="space-y-2">
          <li>
            <Link
              href="/projects"
              className="hover:text-[var(--color-accent)] transition-colors"
            >
              <span className="text-[var(--color-accent)]">-p</span>,{" "}
              <span className="text-[var(--color-accent)]">--projects</span>
              <span className="text-[var(--color-fg-muted)]">
                {"   "}list selected work
              </span>
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className="hover:text-[var(--color-accent)] transition-colors"
            >
              <span className="text-[var(--color-accent)]">-a</span>,{" "}
              <span className="text-[var(--color-accent)]">--about</span>
              <span className="text-[var(--color-fg-muted)]">
                {"      "}longer biography
              </span>
            </Link>
          </li>
          <li>
            <Link
              href="/resume"
              className="hover:text-[var(--color-accent)] transition-colors"
            >
              <span className="text-[var(--color-accent)]">-r</span>,{" "}
              <span className="text-[var(--color-accent)]">--resume</span>
              <span className="text-[var(--color-fg-muted)]">
                {"     "}printed CV (PDF)
              </span>
            </Link>
          </li>
          <li>
            <a
              href="mailto:justinochan16@gmail.com"
              className="hover:text-[var(--color-accent)] transition-colors"
            >
              <span className="text-[var(--color-accent)]">-c</span>,{" "}
              <span className="text-[var(--color-accent)]">--contact</span>
              <span className="text-[var(--color-fg-muted)]">
                {"    "}justinochan16@gmail.com
              </span>
            </a>
          </li>
        </ul>
      </Section>

      <Section heading="EXAMPLES">
        <pre className="whitespace-pre-wrap font-[inherit] text-[var(--color-fg-muted)]">
{`# browse what I've built
$ open ~/projects

# read more about me
$ open ~/about

# get in touch
$ mail justinochan16@gmail.com`}
        </pre>
      </Section>

      <Section heading="SEE ALSO">
        <p className="text-[var(--color-fg-muted)]">
          <Link
            href="/about"
            className="text-[var(--color-fg)] hover:text-[var(--color-accent)] transition-colors"
          >
            about(1)
          </Link>
          {", "}
          <Link
            href="/projects"
            className="text-[var(--color-fg)] hover:text-[var(--color-accent)] transition-colors"
          >
            projects(1)
          </Link>
          {", "}
          <Link
            href="/resume"
            className="text-[var(--color-fg)] hover:text-[var(--color-accent)] transition-colors"
          >
            resume(1)
          </Link>
        </p>
      </Section>

      <Section heading="VERSION">
        <p className="text-[var(--color-fg-muted)]">
          portfolio v1.0 · last updated 2026-04-21
        </p>
      </Section>

      <div className="mt-12">
        <Rule />
        <div className="flex items-center justify-between text-xs text-[var(--color-fg-muted)] uppercase tracking-wider mt-1">
          <span>justin-chan(1)</span>
          <span>portfolio manual</span>
          <span>justin-chan(1)</span>
        </div>
      </div>

      <div className="mt-10 text-[var(--color-fg-muted)]">
        <span className="text-[var(--color-accent)]">$</span> _
        <span className="cursor" aria-hidden />
      </div>
    </article>
  );
}
