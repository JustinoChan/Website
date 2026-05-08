import PageHeader from "@/components/PageHeader";

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
  { label: "email", value: "justinochan16@gmail.com", href: "mailto:justinochan16@gmail.com" },
  { label: "phone", value: "925-483-3178", href: "tel:9254833178" },
  { label: "location", value: "brentwood, ca" },
  { label: "github", value: "github.com/JustinoChan", href: "https://github.com/JustinoChan" },
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
      <span className="uppercase tracking-wider">{heading}</span>
    </h2>
    <div
      aria-hidden
      className="mt-2 text-[var(--color-line)] select-none overflow-hidden whitespace-nowrap"
    >
      {"─".repeat(200)}
    </div>
    <div className="mt-4">{children}</div>
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
              I&apos;m{" "}
              <span className="text-[var(--color-fg)]">Justin</span>, a software
              engineer based in Brentwood, CA. I graduated from{" "}
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
              <span className="text-[var(--color-fg)]">AscensionAI</span>, a
              Python RL system that learns to play Slay the Spire through
              behavior cloning and PPO fine-tuning, with a 530-dimensional
              observation encoder, action masking over 134 discrete actions,
              and parallel rollout workers across multiple live game instances.
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

        <Section index="03" heading="contact">
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
