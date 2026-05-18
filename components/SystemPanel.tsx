import type { ReactNode } from "react";

export function StatusDot({ label = "LIVE" }: { label?: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-[10px] text-[var(--color-accent)]">
      <span className="inline-block w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] animate-pulse" />
      {label}
    </span>
  );
}

export function SysCard({
  title,
  badge,
  children,
}: {
  title: string;
  badge?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="border border-[var(--color-line)] bg-[var(--color-bg-soft)]/40">
      <div className="px-3 py-2 border-b border-[var(--color-line)] flex items-center justify-between">
        <p className="text-[11px] tracking-wider text-[var(--color-fg-muted)]">
          {title}
        </p>
        {badge}
      </div>
      <div className="p-3 space-y-1">{children}</div>
    </div>
  );
}

export function SysRow({ k, v }: { k: string; v: ReactNode }) {
  return (
    <div className="grid grid-cols-[5.5rem_1fr] gap-2 text-xs items-baseline">
      <span className="text-[var(--color-fg-muted)]">{k}</span>
      <span className="text-[var(--color-fg)] truncate">{v}</span>
    </div>
  );
}

export function AsciiBar({ label, v }: { label: string; v: number }) {
  const cells = 18;
  const filled = Math.round(v * cells);
  return (
    <div className="grid grid-cols-[6rem_1fr_2.5rem] gap-2 text-xs items-baseline">
      <span className="text-[var(--color-fg-muted)] whitespace-pre">
        {label}
      </span>
      <span className="text-[var(--color-fg)] tracking-tight">
        <span className="text-[var(--color-accent)]">
          {"█".repeat(filled)}
        </span>
        <span className="text-[var(--color-line)]">
          {"░".repeat(cells - filled)}
        </span>
      </span>
      <span className="text-[var(--color-fg-muted)] text-right tabular-nums">
        {Math.round(v * 100)}%
      </span>
    </div>
  );
}
