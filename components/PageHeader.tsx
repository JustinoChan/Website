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
    <header className="mx-auto max-w-3xl px-6 pt-10 pb-6 sm:pt-14">
      {eyebrow && (
        <p className="text-[11px] text-[var(--color-fg-muted)] uppercase tracking-[0.18em]">
          <span className="text-[var(--color-accent)]">$</span> man{" "}
          <span className="text-[var(--color-fg)]">{eyebrow.toLowerCase()}</span>
        </p>
      )}
      <h1 className="mt-3 text-3xl sm:text-[32px] tracking-tight leading-tight">
        {title}
      </h1>
      {description && (
        <p className="mt-2 max-w-2xl text-[var(--color-fg-muted)]">
          {description}
        </p>
      )}
    </header>
  );
}
