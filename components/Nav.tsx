import Link from "next/link";

const links = [
  { href: "/about", label: "~/about" },
  { href: "/projects", label: "~/projects" },
  { href: "/resume", label: "~/resume" },
];

export default function Nav() {
  return (
    <header className="sticky top-0 z-50 bg-[var(--color-bg)] border-b border-[var(--color-line)]">
      <nav className="mx-auto max-w-5xl px-6 h-12 flex items-center justify-between text-sm">
        <Link
          href="/"
          className="hover:text-[var(--color-accent)] transition-colors"
        >
          <span className="text-[var(--color-accent)]">$</span>{" "}
          <span>justinchan.dev</span>
        </Link>
        <ul className="flex items-center gap-4 sm:gap-6">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-[var(--color-fg-muted)] hover:text-[var(--color-accent)] transition-colors"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
