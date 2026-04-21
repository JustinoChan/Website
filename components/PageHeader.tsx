export default function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <header className="mx-auto max-w-5xl px-6 pt-12 pb-8 sm:pt-16">
      {eyebrow && (
        <p className="text-xs text-[var(--color-fg-muted)]">
          <span className="text-[var(--color-accent)]">$</span> man{" "}
          <span className="text-[var(--color-fg)]">{eyebrow.toLowerCase()}</span>
        </p>
      )}
      <h1 className="mt-4 text-3xl sm:text-4xl font-bold tracking-tight">
        {title}
      </h1>
      {description && (
        <p className="mt-3 max-w-3xl text-[var(--color-fg-muted)]">
          {description}
        </p>
      )}
      <div
        aria-hidden
        className="mt-6 text-[var(--color-line)] select-none overflow-hidden whitespace-nowrap"
      >
        {"─".repeat(160)}
      </div>
    </header>
  );
}
