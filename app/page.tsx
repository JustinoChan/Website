import Link from "next/link";

const sections = [
  {
    href: "/about",
    title: "About Me",
    desc: "Who I am, what I care about, and how I work.",
  },
  {
    href: "/projects",
    title: "Projects",
    desc: "Selected work with demos, videos, and source code.",
  },
  {
    href: "/resume",
    title: "Resume",
    desc: "Experience, education, and skills — also as a PDF.",
  },
];

export default function HomePage() {
  return (
    <div className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 -left-40 h-[480px] w-[480px] rounded-full blur-3xl opacity-40 animate-float-slow"
        style={{
          background:
            "radial-gradient(circle at center, var(--color-accent), transparent 60%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-40 -right-40 h-[520px] w-[520px] rounded-full blur-3xl opacity-30 animate-float-slower"
        style={{
          background:
            "radial-gradient(circle at center, var(--color-accent-2), transparent 60%)",
        }}
      />

      <section className="relative mx-auto max-w-6xl px-6 pt-24 pb-20 sm:pt-32 sm:pb-28">
        <p className="text-sm uppercase tracking-[0.2em] text-[var(--color-fg-muted)] animate-fade-up">
          Hi, I&apos;m
        </p>
        <h1
          className="mt-3 text-5xl sm:text-7xl font-bold tracking-tight animate-fade-up"
          style={{ animationDelay: "0.05s" }}
        >
          <span className="bg-gradient-to-r from-white via-[var(--color-accent)] to-[var(--color-accent-2)] bg-clip-text text-transparent">
            Justin Chan
          </span>
        </h1>
        <p
          className="mt-6 max-w-2xl text-lg sm:text-xl text-[var(--color-fg-muted)] leading-relaxed animate-fade-up"
          style={{ animationDelay: "0.1s" }}
        >
          Software engineer and recent UC Irvine grad. I build scalable, clean,
          and efficient software — from search engines and full-stack web apps
          to social platforms.
        </p>

        <div
          className="mt-10 flex flex-wrap gap-3 animate-fade-up"
          style={{ animationDelay: "0.15s" }}
        >
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 rounded-full bg-[var(--color-accent)] px-5 py-3 text-sm font-medium text-white hover:opacity-90 transition-opacity"
          >
            See my work
            <span aria-hidden>→</span>
          </Link>
          <Link
            href="/about"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 px-5 py-3 text-sm font-medium hover:bg-white/5 transition-colors"
          >
            About me
          </Link>
        </div>
      </section>

      <section className="relative mx-auto max-w-6xl px-6 pb-24">
        <div className="grid gap-4 sm:grid-cols-3">
          {sections.map((s, i) => (
            <Link
              key={s.href}
              href={s.href}
              className="group relative rounded-2xl border border-white/10 bg-[var(--color-bg-soft)] p-6 hover:border-[var(--color-accent)]/50 transition-all animate-fade-up"
              style={{ animationDelay: `${0.2 + i * 0.05}s` }}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">{s.title}</h3>
                <span
                  aria-hidden
                  className="text-[var(--color-fg-muted)] group-hover:text-[var(--color-accent)] group-hover:translate-x-1 transition-all"
                >
                  →
                </span>
              </div>
              <p className="mt-2 text-sm text-[var(--color-fg-muted)] leading-relaxed">
                {s.desc}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
