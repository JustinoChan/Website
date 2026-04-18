import Link from "next/link";
import PageHeader from "@/components/PageHeader";

export const metadata = { title: "Resume — Justin Chan" };

const education = [
  {
    school: "University of California, Irvine",
    degree: "B.S. in Software Engineering",
    period: "Sep 2021 — Mar 2025",
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
    title: "Search Engine",
    period: "Feb 2023 — Mar 2023",
    bullets: [
      "Engineered a Python search engine indexing 56,000+ web pages.",
      "Reduced average query response time by 35% via custom tokenization and algorithm optimization.",
    ],
  },
  {
    title: "Capstone Project Archive",
    period: "Jan 2024 — Jun 2024",
    bullets: [
      "Built a React + Django web app for hosting student capstone projects.",
      "Integrated Firebase Authentication and a MySQL8 database; ran the team on Agile workflows via Jira and Discord.",
    ],
  },
  {
    title: "BitLink",
    period: "Mar 2024 — Jun 2024",
    bullets: [
      "Shipped a full-stack Angular + Node.js social platform with real-time messaging and social interactions.",
      "Implemented secure auth with Passport.js and BCrypt; designed a responsive UI in Angular + TypeScript.",
    ],
  },
];

const skillGroups = [
  {
    heading: "Programming Languages",
    items: "Java, Python, C, C++, JavaScript, TypeScript",
  },
  { heading: "Web Development", items: "HTML, CSS, AngularJS, React.js, Django" },
  { heading: "Data Management", items: "SQL, MongoDB, Firebase" },
  {
    heading: "Software Engineering",
    items:
      "Software Development, Software Testing, Algorithms, Design Principles, Design Patterns, API Integrations",
  },
  { heading: "Methodologies", items: "Agile/Scrum, DevOps Practices, Project Management" },
];

export default function ResumePage() {
  return (
    <>
      <PageHeader
        eyebrow="Resume"
        title="Justin Chan"
        description="Brentwood, CA · 925-483-3178 · justinochan16@gmail.com"
      />
      <section className="mx-auto max-w-6xl px-6 space-y-12">
        <div>
          <a
            href="/resume.pdf"
            download
            className="inline-flex items-center gap-2 rounded-full bg-[var(--color-accent)] px-5 py-3 text-sm font-medium text-white hover:opacity-90 transition-opacity"
          >
            Download PDF
            <span aria-hidden>↓</span>
          </a>
        </div>

        <section>
          <h2 className="text-xl font-semibold mb-3">Summary</h2>
          <p className="text-[var(--color-fg-muted)] leading-relaxed max-w-3xl">
            Recent Software Engineering graduate from UC Irvine with solid
            skills in Python, Java, and SQL. Strong understanding of data
            structures, algorithms, and design principles. Experienced in
            software development, testing, and project management through
            academic projects. Eager to contribute in cross-functional teams
            and build scalable, clean, and efficient software solutions.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-6">Education</h2>
          <ul className="space-y-6">
            {education.map((e) => (
              <li key={e.school}>
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <div>
                    <h3 className="text-lg font-medium">{e.school}</h3>
                    <p className="text-[var(--color-fg-muted)]">{e.degree}</p>
                  </div>
                  <p className="text-sm text-[var(--color-fg-muted)]">
                    {e.period}
                  </p>
                </div>
                <ul className="mt-3 text-[var(--color-fg-muted)] list-disc list-outside ml-5 space-y-1">
                  {e.details.map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                  <li>
                    <span className="font-medium text-[var(--color-fg)]">
                      Coursework:
                    </span>{" "}
                    {e.coursework.join(", ")}
                  </li>
                </ul>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <div className="flex items-baseline justify-between flex-wrap gap-2 mb-6">
            <h2 className="text-xl font-semibold">Featured Projects</h2>
            <Link
              href="/projects"
              className="text-sm text-[var(--color-fg-muted)] hover:text-[var(--color-accent)]"
            >
              See all projects →
            </Link>
          </div>
          <ol className="relative border-l border-white/10 space-y-8 pl-6">
            {projectHighlights.map((p) => (
              <li key={p.title} className="relative">
                <span className="absolute -left-[31px] top-1.5 h-3 w-3 rounded-full bg-[var(--color-accent)] ring-4 ring-[var(--color-bg)]" />
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-lg font-medium">{p.title}</h3>
                  <p className="text-sm text-[var(--color-fg-muted)]">
                    {p.period}
                  </p>
                </div>
                <ul className="mt-3 space-y-1.5 text-[var(--color-fg-muted)] list-disc list-outside ml-5">
                  {p.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-6">Skills</h2>
          <dl className="grid gap-4 sm:grid-cols-2">
            {skillGroups.map((g) => (
              <div
                key={g.heading}
                className="rounded-xl border border-white/10 bg-[var(--color-bg-soft)] p-4"
              >
                <dt className="text-sm font-medium">{g.heading}</dt>
                <dd className="mt-1 text-sm text-[var(--color-fg-muted)]">
                  {g.items}
                </dd>
              </div>
            ))}
          </dl>
        </section>
      </section>
    </>
  );
}
