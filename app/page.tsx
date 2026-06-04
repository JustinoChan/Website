import Link from "next/link";
import { projects } from "@/lib/projects";
import Rule, { ManStrip } from "@/components/Rule";
import {
  AsciiBar,
  StatusDot,
  SysCard,
  SysRow,
} from "@/components/SystemPanel";

const Section = ({
  index,
  heading,
  right,
  children,
}: {
  index: string;
  heading: string;
  right?: React.ReactNode;
  children: React.ReactNode;
}) => (
  <section className="mt-10">
    <div className="flex items-baseline justify-between gap-3">
      <h2 className="flex items-baseline gap-3">
        <span className="text-[var(--color-accent)]">§{index}</span>
        <span className="uppercase tracking-[0.18em] text-[12px]">
          {heading}
        </span>
      </h2>
      {right ? (
        <div className="text-[11px] text-[var(--color-fg-muted)]">{right}</div>
      ) : null}
    </div>
    <Rule className="mt-2" />
    <div className="mt-4 pl-6">{children}</div>
  </section>
);

export default function HomePage() {
  return (
    <article className="mx-auto max-w-5xl px-6 pt-10 pb-4">
      <ManStrip />
      <Rule />

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10 mt-10">
        {/* LEFT — primary content */}
        <div className="min-w-0">
          <h1 className="text-[var(--color-fg)] text-[40px] sm:text-[44px] leading-[1.05] tracking-tight">
            justin chan
            <span className="text-[var(--color-accent)]">.</span>
          </h1>
          <p className="text-[var(--color-fg-muted)] mt-2 text-[15px] max-w-xl">
            software engineer building scalable, clean, and efficient software
            — search engines, full-stack platforms, and reinforcement-learning
            agents.
          </p>

          {/* Quick actions */}
          <div className="mt-8 flex flex-wrap gap-2">
            <Link
              href="/projects"
              className="border border-[var(--color-fg)] px-3 py-1.5 text-[12px] hover:bg-[var(--color-accent)] hover:text-[var(--color-bg)] hover:border-[var(--color-accent)] transition-colors group"
            >
              <span className="text-[var(--color-accent)] group-hover:text-[var(--color-bg)]">
                $
              </span>{" "}
              ls ~/projects
            </Link>
            <Link
              href="/about"
              className="border border-[var(--color-line)] px-3 py-1.5 text-[12px] hover:border-[var(--color-fg)] hover:text-[var(--color-fg)] transition-colors text-[var(--color-fg-muted)]"
            >
              cat ~/about
            </Link>
            <a
              href="/resume.pdf"
              download
              className="border border-[var(--color-line)] px-3 py-1.5 text-[12px] hover:border-[var(--color-fg)] hover:text-[var(--color-fg)] transition-colors text-[var(--color-fg-muted)]"
            >
              wget resume.pdf
            </a>
          </div>

          <Section index="01" heading="DESCRIPTION">
            <p className="text-[var(--color-fg-muted)]">
              Recent <span className="text-[var(--color-fg)]">B.S.</span>{" "}
              graduate in Software Engineering from{" "}
              <span className="text-[var(--color-fg)]">UC Irvine</span> (Mar
              2025). I focus on the unglamorous parts of systems — the indexer
              that shaves milliseconds off a query, the checkpoint that
              survives a 24-hour run, the auth flow that doesn&apos;t leak.
            </p>
            <p className="text-[var(--color-fg-muted)] mt-3">
              Currently looking for software engineering roles where I can
              contribute to a cross-functional team and keep growing as an
              engineer.
            </p>
          </Section>

          <Section
            index="02"
            heading="SELECTED WORK"
            right={
              <Link
                href="/projects"
                className="hover:text-[var(--color-accent)] transition-colors"
              >
                see all →
              </Link>
            }
          >
            <ul className="space-y-3">
              {projects.map((p) => (
                <li key={p.slug} className="group">
                  <Link
                    href={`/projects/${p.slug}`}
                    className="grid grid-cols-[12rem_1fr_5rem] gap-4 items-baseline"
                  >
                    <span className="text-[var(--color-fg)] group-hover:text-[var(--color-accent)] transition-colors">
                      <span className="text-[var(--color-fg-muted)]">./</span>
                      {p.slug}
                      <span className="text-[var(--color-fg-muted)]">/</span>
                    </span>
                    <span className="text-[var(--color-fg-muted)] truncate">
                      {p.tagline}
                    </span>
                    <span className="text-[11px] text-[var(--color-fg-muted)] text-right">
                      [{p.period.split(" ").pop()}]
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </Section>

          <Section index="03" heading="CURRENTLY">
            <div className="grid grid-cols-[7rem_1fr] gap-x-4 gap-y-1.5 items-baseline">
              <span className="text-[var(--color-accent)]">[building]</span>
              <span className="text-[var(--color-fg)]">
                <a href="https://justinochan.github.io/AscensionAI/" target="_blank" rel="noreferrer" className="hover:text-[var(--color-accent)] transition-colors">AscensionAI</a> · RL agent for Slay the Spire · <Link href="/projects/job-application-agent" className="hover:text-[var(--color-accent)] transition-colors">Job-Application-Agent</Link>
              </span>
              <span className="text-[var(--color-accent)]">[reading]</span>
              <span className="text-[var(--color-fg-muted)]">
                Schulman et al. — &ldquo;Proximal Policy Optimization
                Algorithms&rdquo;
              </span>
              <span className="text-[var(--color-accent)]">[stack]</span>
              <span className="text-[var(--color-fg-muted)]">
                python · pytorch · gymnasium · multiprocessing · numpy
              </span>
              <span className="text-[var(--color-accent)]">[looking-for]</span>
              <span className="text-[var(--color-fg-muted)]">
                full-time swe roles · backend, ml infra, or full-stack
              </span>
            </div>
          </Section>
        </div>

        {/* RIGHT — system panel */}
        <aside className="space-y-6 lg:sticky lg:top-20 self-start">
          <SysCard title="// status" badge={<StatusDot />}>
            <SysRow
              k="state"
              v={
                <span className="text-[var(--color-accent)]">available</span>
              }
            />
            <SysRow k="location" v="brentwood, ca" />
            <SysRow k="timezone" v="UTC-08:00" />
            <SysRow k="education" v="uci · b.s. swe" />
          </SysCard>

          <SysCard title="// now">
            <p className="text-[var(--color-fg-muted)] text-xs">
              <span className="text-[var(--color-accent)]">building</span> ·{" "}
              <a href="https://justinochan.github.io/AscensionAI/" target="_blank" rel="noreferrer" className="text-[var(--color-fg)] hover:text-[var(--color-accent)] transition-colors">AscensionAI</a>, an RL agent that plays Slay the Spire end-to-end
              via PPO + behavior cloning, and{" "}
              <Link href="/projects/job-application-agent" className="text-[var(--color-fg)] hover:text-[var(--color-accent)] transition-colors">Job-Application-Agent</Link>.
            </p>
            <p className="text-[var(--color-fg-muted)] text-xs mt-2">
              <span className="text-[var(--color-accent)]">reading</span> ·
              Schulman et al. (2017), &ldquo;Proximal Policy Optimization&rdquo;.
            </p>
          </SysCard>

          <SysCard title="// load">
            <AsciiBar label="python   " v={0.92} />
            <AsciiBar label="typescript" v={0.74} />
            <AsciiBar label="react    " v={0.68} />
            <AsciiBar label="pytorch  " v={0.6} />
            <AsciiBar label="sql      " v={0.55} />
            <AsciiBar label="c/c++    " v={0.4} />
          </SysCard>

          <SysCard title="// contact">
            <SysRow
              k="mail"
              v={
                <a
                  href="mailto:justinochan16@gmail.com"
                  className="hover:text-[var(--color-accent)]"
                >
                  justinochan16@gmail.com
                </a>
              }
            />
            <SysRow
              k="git"
              v={
                <a
                  href="https://github.com/JustinoChan"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[var(--color-accent)]"
                >
                  @JustinoChan
                </a>
              }
            />
          </SysCard>
        </aside>
      </div>

      <div className="mt-16">
        <Rule />
        <div className="mt-1">
          <ManStrip center="portfolio manual · v1.4 · 2026-06-03" />
        </div>
      </div>
    </article>
  );
}
