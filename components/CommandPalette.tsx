"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { projects } from "@/lib/projects";

type Cmd = {
  cmd: string;
  desc: string;
  group: "navigate" | "projects" | "actions" | "info";
  icon: string;
  run: (ctx: { router: ReturnType<typeof useRouter> }) => void;
};

const email = "justinochan16@gmail.com";
const githubProfile = "https://github.com/JustinoChan";
const sourceRepo = "https://github.com/JustinoChan/Website";

function buildCommands(): Cmd[] {
  const navCommands: Cmd[] = [
    {
      cmd: "home",
      desc: "go to the front page",
      group: "navigate",
      icon: "~/",
      run: ({ router }) => router.push("/"),
    },
    {
      cmd: "about",
      desc: "read the longer biography",
      group: "navigate",
      icon: "~/",
      run: ({ router }) => router.push("/about"),
    },
    {
      cmd: "projects",
      desc: "browse selected work",
      group: "navigate",
      icon: "~/",
      run: ({ router }) => router.push("/projects"),
    },
    {
      cmd: "resume",
      desc: "open the resume page",
      group: "navigate",
      icon: "~/",
      run: ({ router }) => router.push("/resume"),
    },
  ];

  const projectCommands: Cmd[] = projects.map((p) => ({
    cmd: `open ${p.slug}`,
    desc: p.tagline,
    group: "projects",
    icon: "./",
    run: ({ router }) => router.push(`/projects/${p.slug}`),
  }));

  const actionCommands: Cmd[] = [
    {
      cmd: "mail",
      desc: `start an email — ${email}`,
      group: "actions",
      icon: "$ ",
      run: () => {
        window.location.href = `mailto:${email}`;
      },
    },
    {
      cmd: "wget resume.pdf",
      desc: "download the printable PDF",
      group: "actions",
      icon: "$ ",
      run: () => {
        window.location.href = "/resume.pdf";
      },
    },
    {
      cmd: "github",
      desc: "open Justin's GitHub profile",
      group: "actions",
      icon: "$ ",
      run: () => {
        window.open(githubProfile, "_blank", "noopener,noreferrer");
      },
    },
    {
      cmd: "source",
      desc: "open this site's GitHub repo",
      group: "actions",
      icon: "$ ",
      run: () => {
        window.open(sourceRepo, "_blank", "noopener,noreferrer");
      },
    },
  ];

  const infoCommands: Cmd[] = [
    {
      cmd: "whoami",
      desc: "justin chan — software engineer, brentwood, ca",
      group: "info",
      icon: "$ ",
      run: ({ router }) => router.push("/about"),
    },
    {
      cmd: "ls",
      desc: "list pages and project slugs",
      group: "info",
      icon: "$ ",
      run: ({ router }) => router.push("/projects"),
    },
  ];

  return [...navCommands, ...projectCommands, ...actionCommands, ...infoCommands];
}

const GROUP_ORDER: Cmd["group"][] = ["navigate", "projects", "actions", "info"];

export default function CommandPalette({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const router = useRouter();
  const [q, setQ] = useState("");
  const [selected, setSelected] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const commands = useMemo(buildCommands, []);

  // Reset on open
  useEffect(() => {
    if (open) {
      setQ("");
      setSelected(0);
      // Defer focus until after the input mounts
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  // Reset selection on filter change
  useEffect(() => setSelected(0), [q]);

  // Filter
  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return commands;
    return commands.filter(
      (c) =>
        c.cmd.toLowerCase().includes(needle) ||
        c.desc.toLowerCase().includes(needle)
    );
  }, [q, commands]);

  const groups = useMemo(() => {
    const m: Partial<Record<Cmd["group"], Cmd[]>> = {};
    filtered.forEach((c) => {
      (m[c.group] = m[c.group] || []).push(c);
    });
    return m;
  }, [filtered]);

  const ordered = GROUP_ORDER.filter((g) => groups[g]?.length);
  const flat = ordered.flatMap((g) => groups[g] || []);

  // Keyboard nav
  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onOpenChange(false);
        return;
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelected((s) => Math.min(s + 1, Math.max(flat.length - 1, 0)));
        return;
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelected((s) => Math.max(s - 1, 0));
        return;
      }
      if (e.key === "Enter") {
        e.preventDefault();
        const c = flat[selected];
        if (c) {
          c.run({ router });
          onOpenChange(false);
        }
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, flat, selected, router, onOpenChange]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-start justify-center pt-[14vh] px-6"
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[var(--color-fg)]/30 backdrop-blur-[2px]"
        onClick={() => onOpenChange(false)}
      />

      {/* Palette */}
      <div className="relative w-full max-w-[640px] bg-[var(--color-bg)] border border-[var(--color-fg)] shadow-[8px_8px_0_var(--color-fg)]">
        {/* Header */}
        <div className="px-3 py-1.5 border-b border-[var(--color-line)] flex items-center justify-between text-[10px] tracking-[0.18em] uppercase text-[var(--color-fg-muted)]">
          <span>justin-shell · v1.4</span>
          <span>
            press{" "}
            <span className="text-[var(--color-fg)]">esc</span> to close
          </span>
        </div>

        {/* Input */}
        <div className="px-4 py-3 border-b border-[var(--color-line)] flex items-center gap-2">
          <span className="text-[var(--color-accent)]">$</span>
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="type a command, slug, or destination…"
            className="flex-1 bg-transparent outline-none text-[var(--color-fg)] placeholder:text-[var(--color-fg-muted)] caret-[var(--color-accent)]"
            autoComplete="off"
            spellCheck={false}
          />
          <span className="text-[10px] text-[var(--color-fg-muted)] border border-[var(--color-line)] px-1 py-0.5">
            ↵
          </span>
        </div>

        {/* Results */}
        <div className="max-h-[360px] overflow-auto">
          {ordered.length === 0 ? (
            <div className="px-4 py-6 text-[var(--color-fg-muted)] text-xs">
              <p>
                <span className="text-[var(--color-accent)]">
                  command not found:
                </span>{" "}
                <span className="text-[var(--color-fg)]">{q}</span>
              </p>
              <p className="mt-1">
                try <span className="text-[var(--color-fg)]">help</span>.
              </p>
            </div>
          ) : (
            ordered.map((g) => (
              <div key={g}>
                <p className="px-4 pt-3 pb-1 text-[10px] uppercase tracking-[0.18em] text-[var(--color-fg-muted)]">
                  {g}
                </p>
                <ul>
                  {groups[g]!.map((c) => {
                    const idx = flat.indexOf(c);
                    const isSel = idx === selected;
                    return (
                      <li key={c.cmd}>
                        <button
                          type="button"
                          onMouseEnter={() => setSelected(idx)}
                          onClick={() => {
                            c.run({ router });
                            onOpenChange(false);
                          }}
                          className={
                            "w-full text-left px-4 py-1.5 grid grid-cols-[2rem_14rem_1fr_auto] items-baseline gap-3 text-xs " +
                            (isSel
                              ? "bg-[var(--color-accent)] text-[var(--color-bg)]"
                              : "")
                          }
                        >
                          <span
                            className={
                              isSel
                                ? "text-[var(--color-bg)]"
                                : "text-[var(--color-fg-muted)]"
                            }
                          >
                            {c.icon}
                          </span>
                          <span
                            className={
                              isSel
                                ? "text-[var(--color-bg)]"
                                : "text-[var(--color-fg)]"
                            }
                          >
                            {c.cmd}
                          </span>
                          <span
                            className={
                              "truncate " +
                              (isSel
                                ? "text-[var(--color-bg)]/80"
                                : "text-[var(--color-fg-muted)]")
                            }
                          >
                            {c.desc}
                          </span>
                          <span
                            className={
                              "text-[10px] " +
                              (isSel
                                ? "text-[var(--color-bg)]/80"
                                : "text-[var(--color-fg-muted)]")
                            }
                          >
                            ↵
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-2 border-t border-[var(--color-line)] flex items-center justify-between text-[10px] text-[var(--color-fg-muted)]">
          <span>
            <span className="border border-[var(--color-line)] px-1">↑</span>
            <span className="border border-[var(--color-line)] px-1 ml-1">
              ↓
            </span>
            <span className="ml-2">navigate</span>
            <span className="border border-[var(--color-line)] px-1 ml-3">
              ↵
            </span>
            <span className="ml-2">run</span>
          </span>
          <span>
            {filtered.length} of {commands.length}
          </span>
        </div>
      </div>
    </div>
  );
}

const PaletteContext = createContext<{
  open: boolean;
  setOpen: (open: boolean) => void;
}>({ open: false, setOpen: () => {} });

export function PaletteProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <PaletteContext.Provider value={{ open, setOpen }}>
      {children}
      <CommandPalette open={open} onOpenChange={setOpen} />
    </PaletteContext.Provider>
  );
}

export function usePalette() {
  const ctx = useContext(PaletteContext);
  return {
    open: ctx.open,
    openPalette: useCallback(() => ctx.setOpen(true), [ctx]),
    closePalette: useCallback(() => ctx.setOpen(false), [ctx]),
    togglePalette: useCallback(() => ctx.setOpen(!ctx.open), [ctx]),
  };
}
