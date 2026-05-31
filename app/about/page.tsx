import PageHeader from "@/components/PageHeader";
import Rule from "@/components/Rule";

export const metadata = { title: "about — justin-chan(1)" };

const stack: { label: string; items: string[] }[] = [
  {
    label: "languages",
    items: ["java", "python", "c", "c++", "javascript", "typescript"],
  },
  {
    label: "web",
    items: ["html", "css", "react", "angular", "django", "node.js"],
  },
  {
    label: "data",
    items: ["sql", "mysql", "mongodb", "firebase"],
  },
  {
    label: "ml/ai",
    items: ["pytorch", "gymnasium", "ppo", "behavior cloning", "action masking"],
  },
  {
    label: "practices",
    items: [
      "agile/scrum",
      "devops",
      "software testing",
      "api integrations",
      "design patterns",
    ],
  },
];

const contact: { label: string; value: string; href?: string }[] = [
  {
    label: "email",
    value: "justinochan16@gmail.com",
    href: "mailto:justinochan16@gmail.com",
  },
  { label: "location", value: "brentwood, ca" },
  {
    label: "github",
    value: "github.com/JustinoChan",
    href: "https://github.com/JustinoChan",
  },
];

const Section = ({
  index,
  heading,
  children,
}: {
  index: string;
  heading: string;
  children: React.ReactNode;
}) => (
  <section className="mt-12 first:mt-0">
    <h2 className="flex items-baseline gap-3">
      <span className="text-[var(--color-accent)]">§{index}</span>
      <span className="uppercase tracking-[0.18em] text-[12px]">
        {heading}
      </span>
    </h2>
    <Rule className="mt-2" />
    <div className="mt-4 pl-6">{children}</div>
  </section>
);

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="about(1) — a longer biography"
        description="Recent UC Irvine software engineering grad — building scalable, clean, and efficient software."
      />
      <article className="mx-auto max-w-3xl px-6">
        <Section index="01" heading="background">
          <div className="space-y-4 text-[var(--color-fg-muted)]">
            <p>
              I&apos;m <span className="text-[var(--color-fg)]">Justin</span>, a
              software engineer based in Brentwood, CA. I graduated from{" "}
              <span className="text-[var(--color-fg)]">UC Irvine</span> in March
              2025 with a degree in Software Engineering, where I focused on
              algorithms, data structures, and full-stack web development.
            </p>
            <p>
              I love working on problems that span the stack — from designing
              indexing strategies that shave milliseconds off query times, to
              shipping responsive UIs that feel good to use, to training
              reinforcement learning agents on real games. My most recent
              project is{" "}
              <a href="https://justinochan.github.io/AscensionAI/" target="_blank" rel="noreferrer" className="text-[var(--color-fg)] hover:text-[var(--color-accent)] transition-colors">AscensionAI</a>, a
              distributed RL system that trains an AI to play Slay the Spire through
              behavior cloning and PPO fine-tuning, with a 530-dimensional
              observation encoder, a 66-monster knowledge base, action masking over 134 discrete actions,
              and parallel rollout workers feeding a central offline trainer across multiple live game instances —
              deployed headless on a GPU-less GCP spot VM via a one-shot installer, with each game instance running
              under its own Xvfb virtual display and software OpenGL.
            </p>
            <p>
              Other projects include a search engine over 56,000+ web pages, a
              capstone archive built with React and Django, and a full-stack
              social platform with real-time messaging.
            </p>
            <p>
              I&apos;m currently looking for software engineering roles where I
              can contribute to a cross-functional team and keep growing as an
              engineer. If you&apos;re hiring or just want to chat, reach out
              anytime.
            </p>
          </div>
        </Section>

        <Section index="02" heading="stack">
          <dl className="space-y-3">
            {stack.map((row) => (
              <div
                key={row.label}
                className="grid grid-cols-[7rem_1fr] gap-x-4 items-baseline"
              >
                <dt className="text-[var(--color-accent)]">[{row.label}]</dt>
                <dd className="text-[var(--color-fg)]">
                  {row.items.join(", ")}
                </dd>
              </div>
            ))}
          </dl>
        </Section>

        <Section index="03" heading="education">
          <div>
            <div className="flex items-baseline justify-between flex-wrap gap-2">
              <h3 className="text-[var(--color-fg)]">
                University of California, Irvine
              </h3>
              <p className="text-[11px] text-[var(--color-fg-muted)]">
                [2021-09 → 2025-03]
              </p>
            </div>
            <p className="text-[var(--color-fg-muted)]">
              B.S. in Software Engineering · GPA 3.459
            </p>
            <p className="text-[var(--color-fg-muted)] mt-3 text-[13px]">
              <span className="text-[var(--color-accent)]">[coursework]</span>{" "}
              algorithms, internet applications, data structures, software
              design, HCI, operating systems, information retrieval, databases,
              software testing.
            </p>
          </div>
        </Section>

        <Section index="04" heading="contact">
          <dl className="space-y-2">
            {contact.map((row) => (
              <div
                key={row.label}
                className="grid grid-cols-[7rem_1fr] gap-x-4 items-baseline"
              >
                <dt className="text-[var(--color-accent)]">[{row.label}]</dt>
                <dd>
                  {row.href ? (
                    <a
                      href={row.href}
                      className="hover:text-[var(--color-accent)] transition-colors"
                    >
                      {row.value}
                    </a>
                  ) : (
                    row.value
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </Section>
      </article>
    </>
  );
}
