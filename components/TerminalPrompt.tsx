"use client";

import { usePathname, useRouter } from "next/navigation";
import { type FormEvent, type ReactNode, useMemo, useState } from "react";
import { projects } from "@/lib/projects";

type Output =
  | { type: "help"; heading?: string }
  | { type: "lines"; heading?: string; lines: ReactNode[] }
  | { type: "error"; command: string };

const email = "justinochan16@gmail.com";
const githubProfile = "https://github.com/JustinoChan";
const sourceRepo = "https://github.com/JustinoChan/Website";

const commandHelp = [
  ["help", "show this command list"],
  ["home", "go to the front page"],
  ["about", "read the longer biography"],
  ["projects", "browse selected work"],
  ["project <slug>", "open a specific project"],
  ["resume", "open the resume page"],
  ["resume.pdf", "open the printable PDF"],
  ["contact", `start an email to ${email}`],
  ["github", "open Justin's GitHub profile"],
  ["source", "open this site's GitHub repo"],
  ["ls", "list pages and project slugs"],
  ["pwd", "print the current page path"],
  ["whoami", "print a short bio"],
  ["clear", "clear the terminal output"],
] as const;

const normalizeCommand = (command: string) =>
  command.trim().replace(/^\$\s*/, "").replace(/\s+/g, " ").toLowerCase();

const isOneOf = (command: string, aliases: string[]) =>
  aliases.includes(command);

const openExternal = (url: string) => {
  window.open(url, "_blank", "noopener,noreferrer");
};

function CommandHelp({ projectSlugs }: { projectSlugs: string }) {
  return (
    <>
      <dl className="mt-3 grid gap-x-6 gap-y-1 sm:grid-cols-[10rem_1fr]">
        {commandHelp.map(([command, description]) => (
          <div key={command} className="contents">
            <dt className="text-[var(--color-fg)]">{command}</dt>
            <dd className="text-[var(--color-fg-muted)]">{description}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-3 text-[var(--color-fg-muted)]">
        project slugs: {projectSlugs}
      </p>
    </>
  );
}

export default function TerminalPrompt() {
  const router = useRouter();
  const pathname = usePathname();
  const [command, setCommand] = useState("");
  const [output, setOutput] = useState<Output | null>(null);

  const projectSlugs = useMemo(
    () => projects.map((project) => project.slug).join(", "),
    []
  );

  const goTo = (href: string) => {
    setCommand("");
    setOutput(null);
    router.push(href);
  };

  const runCommand = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const rawCommand = command.trim();
    const normalized = normalizeCommand(command);

    if (!normalized) {
      setOutput({ type: "help", heading: "empty input" });
      setCommand("");
      return;
    }

    if (isOneOf(normalized, ["help", "?", "man help"])) {
      setOutput({ type: "help" });
      setCommand("");
      return;
    }

    if (isOneOf(normalized, ["clear", "cls"])) {
      setOutput(null);
      setCommand("");
      return;
    }

    if (
      isOneOf(normalized, [
        "home",
        "open ~",
        "open ~/",
        "open /",
        "cd ~",
        "cd /",
        "justin",
        "justin --home",
      ])
    ) {
      goTo("/");
      return;
    }

    if (
      isOneOf(normalized, [
        "projects",
        "open ~/projects",
        "open /projects",
        "cd ~/projects",
        "cd /projects",
        "justin -p",
        "justin --projects",
      ])
    ) {
      goTo("/projects");
      return;
    }

    const requestedProject = projects.find((project) =>
      isOneOf(normalized, [
        project.slug,
        `project ${project.slug}`,
        `open ${project.slug}`,
        `open ~/projects/${project.slug}`,
        `open /projects/${project.slug}`,
        `cd ~/projects/${project.slug}`,
        `cd /projects/${project.slug}`,
      ])
    );

    if (requestedProject) {
      goTo(`/projects/${requestedProject.slug}`);
      return;
    }

    if (
      isOneOf(normalized, [
        "about",
        "open ~/about",
        "open /about",
        "cd ~/about",
        "cd /about",
        "justin -a",
        "justin --about",
      ])
    ) {
      goTo("/about");
      return;
    }

    if (
      isOneOf(normalized, [
        "resume",
        "open ~/resume",
        "open /resume",
        "cd ~/resume",
        "cd /resume",
        "justin -r",
        "justin --resume",
      ])
    ) {
      goTo("/resume");
      return;
    }

    if (
      isOneOf(normalized, [
        "resume.pdf",
        "open resume.pdf",
        "open ~/resume.pdf",
        "wget resume.pdf",
        "download resume",
      ])
    ) {
      window.location.href = "/resume.pdf";
      setCommand("");
      setOutput(null);
      return;
    }

    if (
      isOneOf(normalized, [
        "contact",
        "email",
        "mail",
        `mail ${email}`,
        `mailto ${email}`,
        "open ~/contact",
        "justin -c",
        "justin --contact",
      ])
    ) {
      window.location.href = `mailto:${email}`;
      setCommand("");
      setOutput(null);
      return;
    }

    if (isOneOf(normalized, ["github", "open github", "open ~/github"])) {
      openExternal(githubProfile);
      setCommand("");
      setOutput(null);
      return;
    }

    if (
      isOneOf(normalized, [
        "source",
        "repo",
        "open source",
        "open repo",
        "open ~/source",
      ])
    ) {
      openExternal(sourceRepo);
      setCommand("");
      setOutput(null);
      return;
    }

    if (isOneOf(normalized, ["ls", "ls ~", "ls ~/"])) {
      setOutput({
        type: "lines",
        heading: "home",
        lines: ["about", "projects", "resume", "contact", "github"],
      });
      setCommand("");
      return;
    }

    if (isOneOf(normalized, ["ls ~/projects", "ls /projects"])) {
      setOutput({
        type: "lines",
        heading: "projects",
        lines: projects.map((project) => `${project.slug} - ${project.tagline}`),
      });
      setCommand("");
      return;
    }

    if (isOneOf(normalized, ["pwd"])) {
      setOutput({
        type: "lines",
        lines: [pathname || "/"],
      });
      setCommand("");
      return;
    }

    if (isOneOf(normalized, ["whoami", "id"])) {
      setOutput({
        type: "lines",
        lines: [
          "justin chan - software engineer based in brentwood, ca",
          "stack: python, typescript, sql, react, django, node.js",
          `projects: ${projectSlugs}`,
        ],
      });
      setCommand("");
      return;
    }

    setOutput({ type: "error", command: rawCommand });
    setCommand("");
  };

  return (
    <section className="mx-auto mt-10 max-w-3xl px-6 pb-10">
      <form onSubmit={runCommand}>
        <label className="sr-only" htmlFor="terminal-command">
          Portfolio command
        </label>
        <div className="flex items-center text-[var(--color-fg-muted)]">
          <span className="text-[var(--color-accent)]">$</span>
          <input
            id="terminal-command"
            value={command}
            onChange={(event) => setCommand(event.target.value)}
            className="ml-2 min-w-0 flex-1 bg-transparent text-[var(--color-fg-muted)] outline-none caret-[var(--color-accent)] placeholder:text-[var(--color-fg-muted)]"
            placeholder="_"
            autoComplete="off"
            spellCheck={false}
            aria-describedby={output ? "terminal-output" : undefined}
          />
        </div>
      </form>

      {output ? (
        <div
          id="terminal-output"
          className="mt-3 pl-6 text-[var(--color-fg-muted)]"
          aria-live="polite"
        >
          {output.type === "error" ? (
            <>
              <p className="text-[var(--color-accent)]">
                command not found: {output.command}
              </p>
              <CommandHelp projectSlugs={projectSlugs} />
            </>
          ) : null}

          {output.type === "help" ? (
            <>
              {output.heading ? (
                <p className="text-[var(--color-accent)]">{output.heading}</p>
              ) : null}
              <CommandHelp projectSlugs={projectSlugs} />
            </>
          ) : null}

          {output.type === "lines" ? (
            <>
              {output.heading ? (
                <p className="text-[var(--color-accent)]">{output.heading}</p>
              ) : null}
              <ul className="mt-2 space-y-1">
                {output.lines.map((line, index) => (
                  <li key={index}>{line}</li>
                ))}
              </ul>
            </>
          ) : null}
        </div>
      ) : null}
    </section>
  );
}
