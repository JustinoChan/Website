import PageHeader from "@/components/PageHeader";

export const metadata = { title: "About — Justin Chan" };

const skillGroups: { heading: string; items: string[] }[] = [
  {
    heading: "Languages",
    items: ["Java", "Python", "C", "C++", "JavaScript", "TypeScript"],
  },
  {
    heading: "Web",
    items: ["HTML", "CSS", "React.js", "Angular", "Django", "Node.js"],
  },
  {
    heading: "Data",
    items: ["SQL", "MySQL", "MongoDB", "Firebase"],
  },
  {
    heading: "Practices",
    items: [
      "Agile / Scrum",
      "DevOps",
      "Software Testing",
      "API Integrations",
      "Design Patterns",
    ],
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="A bit about me"
        description="Recent Software Engineering graduate from UC Irvine — building scalable, clean, and efficient software."
      />
      <section className="mx-auto max-w-6xl px-6 grid gap-12 md:grid-cols-3">
        <div className="md:col-span-2 space-y-4 text-[var(--color-fg-muted)] leading-relaxed">
          <p>
            I&apos;m Justin, a software engineer based in Brentwood, CA. I
            graduated from UC Irvine in March 2025 with a degree in Software
            Engineering, where I focused on algorithms, data structures, and
            full-stack web development.
          </p>
          <p>
            I love working on problems that span the stack — from designing
            indexing strategies that shave milliseconds off query times, to
            shipping responsive UIs that feel good to use. My favorite projects
            so far have been a search engine over 56,000+ web pages, a capstone
            archive built with React and Django, and a full-stack social
            platform with real-time messaging.
          </p>
          <p>
            I&apos;m currently looking for software engineering roles where I
            can contribute to a cross-functional team and keep growing as an
            engineer. If you&apos;re hiring or just want to chat, reach out
            anytime.
          </p>
        </div>

        <aside className="space-y-6">
          <div>
            <h2 className="text-sm uppercase tracking-[0.2em] text-[var(--color-fg-muted)]">
              Skills
            </h2>
            <div className="mt-4 space-y-4">
              {skillGroups.map((group) => (
                <div key={group.heading}>
                  <p className="text-xs font-medium text-[var(--color-fg)] mb-2">
                    {group.heading}
                  </p>
                  <ul className="flex flex-wrap gap-1.5">
                    {group.items.map((s) => (
                      <li
                        key={s}
                        className="rounded-full border border-white/10 px-2.5 py-0.5 text-xs"
                      >
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-sm uppercase tracking-[0.2em] text-[var(--color-fg-muted)]">
              Get in touch
            </h2>
            <ul className="mt-3 space-y-1 text-sm">
              <li>
                <a
                  href="mailto:justinochan16@gmail.com"
                  className="hover:text-[var(--color-accent)]"
                >
                  justinochan16@gmail.com
                </a>
              </li>
              <li className="text-[var(--color-fg-muted)]">
                Brentwood, CA · 925-483-3178
              </li>
            </ul>
          </div>
        </aside>
      </section>
    </>
  );
}
