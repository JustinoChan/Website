import Link from "next/link";
import PageHeader from "@/components/PageHeader";

export const metadata = { title: "resume — justin-chan(1)" };

const meta: { label: string; value: string; href?: string }[] = [
  { label: "name", value: "justin chan" },
  { label: "email", value: "justinochan16@gmail.com", href: "mailto:justinochan16@gmail.com" },
  { label: "phone", value: "925-483-3178", href: "tel:9254833178" },
  { label: "location", value: "brentwood, ca" },
];

const education = [
  {
    school: "University of California, Irvine",
    degree: "B.S. in Software Engineering",
    period: "2021-09 → 2025-03",
    details: ["GPA: 3.459"],
    coursework: [
      "Design and Analysis of Algorithms",
      "Internet Applications Engineering",
      "Data Structure Implementation and Analysis",
      "Software Design: Structure and Implementation",
      "Software Design: Applications",
      "Human-Computer Interaction",
      "Principles of Operating Systems",
      "Information Retrieval",
      "Project in Databases and Web Applications",
      "Software Testing, Analysis, and Quality Assurance",
    ],
  },
];

const projectHighlights = [
  {
    title: "search-engine",
    period: "2023-02 → 2023-03",
    bullets: [
      "Engineered a Python search engine indexing 56,000+ web pages.",
      "Reduced average query response time by 35% via custom tokenization and algorithm optimization.",
    ],
  },
  {
    title: "capstone-archive",
    period: "2024-01 → 2024-06",
    bullets: [
      "Built a React + Django web app for hosting student capstone projects.",
      "Integrated Firebase Authentication and a MySQL8 database; ran the team on Agile workflows via Jira and Discord.",
    ],
  },
  {
    title: "bitlink",
    period: "2024-03 → 2024-06",
    bullets: [
      "Shipped a full-stack Angular + Node.js social platform with real-time messaging and social interactions.",
      "Implemented secure auth with Passport.js and BCrypt; designed a responsive UI in Angular + TypeScript.",
    ],
  },
];

const skillGroups: { label: string; items: string }[] = [
  { label: "languages", items: "java, python, c, c++, javascript, typescript" },
  { label: "web", items: "html, css, angular, react, django" },
  { label: "data", items: "sql, mongodb, firebase" },
  {
    label: "engineering",
    items:
      "software development, software testing, algorithms, design principles, design patterns, api integrations",
  },
  { label: "methods", items: "agile/scrum, devops practices, project management" },
];

const Rule = () => (
  <div
    aria-hidden
    className="text-[var(--color-line)] select-none overflow-hidden whitespace-nowrap"
  >
    {"─".repeat(200)}
  </div>
);

const Section = ({
  index,
  heading,
  children,
  right,
}: {
  index: string;
  heading: string;
  children: React.ReactNode;
  right?: React.ReactNode;
}) => (
  <section className="mt-12">
    <div className="flex items-baseline justify-between gap-3">
      <h2 className="flex items-baseline gap-3">
        <span className="text-[var(--color-accent)]">§{index}</span>
        <span className="uppercase tracking-wider">{heading}</span>
      </h2>
      {right}
    </div>
    <Rule />
    <div className="mt-4 pl-6">{children}</div>
  </section>
);

export default function ResumePage() {
  return (
    <>
      <PageHeader
        eyebrow="Resume"
        title="resume(1) — curriculum vitae"
        description="Education, projects, and skills. Also available as a printed PDF."
      />
      <article className="mx-auto max-w-3xl px-6">
        <header>
          <p className="text-xs text-[var(--color-fg-muted)] uppercase tracking-wider">
            personal record
          </p>
          <Rule />
          <dl className="mt-3 space-y-1.5">
            {meta.map((m) => (
              <div
                key={m.label}
                className="grid grid-cols-[6rem_1fr] gap-x-4 items-baseline"
              >
                <dt className="text-[var(--color-accent)]">[{m.label}]</dt>
                <dd>
                  {m.href ? (
                    <a
                      href={m.href}
                      className="hover:text-[var(--color-accent)] transition-colors"
                    >
                      {m.value}
                    </a>
                  ) : (
                    m.value
                  )}
                </dd>
              </div>
            ))}
          </dl>
          <Rule />
          <div className="mt-5">
            <a
              href="/resume.pdf"
              download
              className="inline-flex items-center gap-2 border border-[var(--color-fg)] px-3 py-1.5 text-sm hover:bg-[var(--color-accent)] hover:text-[var(--color-bg)] hover:border-[var(--color-accent)] transition-colors"
            >
              <span>$</span> wget resume.pdf
            </a>
          </div>
        </header>

        <Section index="01" heading="summary">
          <p className="text-[var(--color-fg-muted)]">
            Recent Software Engineering graduate from UC Irvine with solid
            skills in Python, Java, and SQL. Strong understanding of data
            structures, algorithms, and design principles. Experienced in
            software development, testing, and project management through
            academic projects. Eager to contribute in cross-functional teams
            and build scalable, clean, and efficient software solutions.
          </p>
        </Section>

        <Section index="02" heading="education">
          <ul className="space-y-6">
            {education.map((e) => (
              <li key={e.school}>
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-[var(--color-fg)]">{e.school}</h3>
                  <p className="text-xs text-[var(--color-fg-muted)]">
                    [{e.period}]
                  </p>
                </div>
                <p className="text-[var(--color-fg-muted)]">{e.degree}</p>
                <ul className="mt-3 text-[var(--color-fg-muted)] space-y-1">
                  {e.details.map((d) => (
                    <li key={d}>· {d}</li>
                  ))}
                  <li>
                    ·{" "}
                    <span className="text-[var(--color-accent)]">
                      [coursework]
                    </span>{" "}
                    {e.coursework.join(", ")}
                  </li>
                </ul>
              </li>
            ))}
          </ul>
        </Section>

        <Section
          index="03"
          heading="featured projects"
          right={
            <Link
              href="/projects"
              className="text-xs text-[var(--color-fg-muted)] hover:text-[var(--color-accent)]"
            >
              ls ~/projects →
            </Link>
          }
        >
          <ol className="space-y-6">
            {projectHighlights.map((p, i) => (
              <li key={p.title}>
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3>
                    <span className="text-[var(--color-accent)]">
                      §03.{String(i + 1).padStart(2, "0")}
                    </span>{" "}
                    <span className="text-[var(--color-fg)]">./{p.title}/</span>
                  </h3>
                  <p className="text-xs text-[var(--color-fg-muted)]">
                    [{p.period}]
                  </p>
                </div>
                <ul className="mt-2 text-[var(--color-fg-muted)] space-y-1">
                  {p.bullets.map((b) => (
                    <li key={b}>· {b}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </Section>

        <Section index="04" heading="skills">
          <dl className="space-y-2">
            {skillGroups.map((g) => (
              <div
                key={g.label}
                className="grid grid-cols-[8rem_1fr] gap-x-4 items-baseline"
              >
                <dt className="text-[var(--color-accent)]">[{g.label}]</dt>
                <dd>{g.items}</dd>
              </div>
            ))}
          </dl>
        </Section>

        <div className="mt-16 text-[var(--color-fg-muted)]">
          <span className="text-[var(--color-accent)]">$</span> cat resume |
          tail
          <span className="cursor" aria-hidden />
        </div>
      </article>
    </>
  );
}
