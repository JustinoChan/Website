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
    <header className="mx-auto max-w-6xl px-6 pt-16 pb-10 sm:pt-24">
      {eyebrow && (
        <p className="text-sm uppercase tracking-[0.2em] text-[var(--color-fg-muted)]">
          {eyebrow}
        </p>
      )}
      <h1 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight">
        {title}
      </h1>
      {description && (
        <p className="mt-4 max-w-2xl text-lg text-[var(--color-fg-muted)] leading-relaxed">
          {description}
        </p>
      )}
    </header>
  );
}
