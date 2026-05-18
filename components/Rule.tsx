export default function Rule({ char = "─", className = "" }: { char?: string; className?: string }) {
  return (
    <div
      aria-hidden
      className={
        "text-[var(--color-line)] select-none overflow-hidden whitespace-nowrap leading-none " +
        className
      }
    >
      {char.repeat(400)}
    </div>
  );
}

export function ManStrip({
  left = "justin-chan(1)",
  center = "portfolio manual",
  right = "justin-chan(1)",
}: {
  left?: string;
  center?: string;
  right?: string;
}) {
  return (
    <div className="flex items-center justify-between text-[10px] text-[var(--color-fg-muted)] uppercase tracking-[0.18em]">
      <span>{left}</span>
      <span>{center}</span>
      <span>{right}</span>
    </div>
  );
}
