export default function Footer() {
  return (
    <footer className="mt-24 border-t border-[var(--color-line)]">
      <div className="mx-auto max-w-5xl px-6 py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-[var(--color-fg-muted)]">
        <p>
          [<span className="text-[var(--color-fg)]">eof</span>] © {new Date().getFullYear()} justin chan
        </p>
        <div className="flex flex-wrap gap-x-5 gap-y-1">
          <a
            href="https://github.com/JustinoChan"
            target="_blank"
            rel="noreferrer"
            className="hover:text-[var(--color-accent)] transition-colors"
          >
            github.com/JustinoChan
          </a>
          <a
            href="mailto:justinochan16@gmail.com"
            className="hover:text-[var(--color-accent)] transition-colors"
          >
            justinochan16@gmail.com
          </a>
        </div>
      </div>
    </footer>
  );
}
