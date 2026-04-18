export default function Footer() {
  return (
    <footer className="border-t border-white/5 mt-24">
      <div className="mx-auto max-w-6xl px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-[var(--color-fg-muted)]">
        <p>© {new Date().getFullYear()} Justin Chan. All rights reserved.</p>
        <div className="flex gap-4">
          <a
            href="https://github.com/JustinoChan"
            target="_blank"
            rel="noreferrer"
            className="hover:text-[var(--color-fg)] transition-colors"
          >
            GitHub
          </a>
          <a
            href="mailto:justinochan16@gmail.com"
            className="hover:text-[var(--color-fg)] transition-colors"
          >
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}
