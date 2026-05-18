import type { ProjectSpec } from "@/lib/projects";
import Rule from "./Rule";

export default function ProjectSpec({ spec }: { spec: ProjectSpec }) {
  return (
    <>
      {/* Spec facts block */}
      <section className="mt-8 border border-[var(--color-line)] bg-[var(--color-bg-soft)]/40">
        <div className="px-4 py-2 border-b border-[var(--color-line)] flex items-center justify-between text-[11px] uppercase tracking-[0.18em] text-[var(--color-fg-muted)]">
          <span>project specification</span>
          <span>v0.4 — internal</span>
        </div>
        <dl className="px-4 py-3 grid grid-cols-[8rem_1fr] gap-x-4 gap-y-1.5 text-[13px]">
          {spec.facts.map((f) => (
            <div key={f.label} className="contents">
              <dt className="text-[var(--color-accent)]">[{f.label}]</dt>
              <dd className="text-[var(--color-fg)]">{f.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Problem */}
      {spec.problem && spec.problem.length > 0 && (
        <SpecSection index="P1" heading="problem">
          <div className="space-y-3 text-[var(--color-fg-muted)]">
            {spec.problem.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </SpecSection>
      )}

      {/* Architecture diagram */}
      {spec.architectureAscii && (
        <SpecSection index="P2" heading="architecture">
          {spec.architectureCaption && (
            <p className="text-[var(--color-fg-muted)] mb-4">
              {spec.architectureCaption}
            </p>
          )}
          <pre className="text-[var(--color-fg)] text-[11px] leading-[1.45] overflow-x-auto bg-[var(--color-bg-soft)]/40 border border-[var(--color-line)] p-4">
            {spec.architectureAscii}
          </pre>
        </SpecSection>
      )}

      {/* Observation encoder */}
      {spec.observation && (
        <SpecSection index="P3" heading={spec.observation.title}>
          {spec.observation.intro && (
            <p className="text-[var(--color-fg-muted)] mb-4">
              {spec.observation.intro}
            </p>
          )}
          <div className="border border-[var(--color-line)]">
            <div className="grid grid-cols-[5rem_1fr_8rem] px-3 py-1.5 border-b border-[var(--color-line)] text-[11px] uppercase tracking-[0.12em] text-[var(--color-fg-muted)] bg-[var(--color-bg-soft)]/40">
              <span>dim</span>
              <span>component</span>
              <span className="text-right">type</span>
            </div>
            {spec.observation.rows.map((r, i) => (
              <div
                key={i}
                className="grid grid-cols-[5rem_1fr_8rem] px-3 py-1.5 border-b border-[var(--color-line)] last:border-b-0 text-[12px] items-baseline"
              >
                <span className="text-[var(--color-accent)] tabular-nums">
                  {r.dims}
                </span>
                <span className="text-[var(--color-fg)]">{r.component}</span>
                <span className="text-right text-[var(--color-fg-muted)]">
                  {r.type}
                </span>
              </div>
            ))}
          </div>
        </SpecSection>
      )}

      {/* Action space */}
      {spec.actions && (
        <SpecSection index="P4" heading={spec.actions.title}>
          {spec.actions.intro && (
            <p className="text-[var(--color-fg-muted)] mb-4">
              {spec.actions.intro}
            </p>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[12px]">
            {spec.actions.rows.map((a) => (
              <div
                key={a.range}
                className="border border-[var(--color-line)] p-3"
              >
                <p className="text-[var(--color-accent)] text-[11px] tabular-nums">
                  {a.range}
                </p>
                <p className="text-[var(--color-fg)] mt-1">{a.desc}</p>
              </div>
            ))}
          </div>
        </SpecSection>
      )}

      {/* Training */}
      {spec.training && (
        <SpecSection index="P5" heading={spec.training.title}>
          <div className="grid grid-cols-1 md:grid-cols-[1fr_280px] gap-6 items-start">
            <div className="space-y-3 text-[var(--color-fg-muted)]">
              {spec.training.paras.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            <div className="border border-[var(--color-line)] p-3 space-y-1.5 text-[12px]">
              <p className="text-[11px] uppercase tracking-[0.12em] text-[var(--color-fg-muted)] pb-2 border-b border-[var(--color-line)]">
                hyperparameters
              </p>
              {spec.training.hyperparams.map((h) => (
                <div
                  key={h.k}
                  className="grid grid-cols-[1fr_auto] gap-2"
                >
                  <span className="text-[var(--color-fg-muted)]">{h.k}</span>
                  <span className="text-[var(--color-fg)] tabular-nums">
                    {h.v}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </SpecSection>
      )}

      {/* Next */}
      {spec.next && spec.next.length > 0 && (
        <SpecSection index="P6" heading="next">
          <ul className="text-[var(--color-fg-muted)] space-y-1">
            {spec.next.map((n, i) => (
              <li key={i}>· {n}</li>
            ))}
          </ul>
        </SpecSection>
      )}
    </>
  );
}

function SpecSection({
  index,
  heading,
  children,
}: {
  index: string;
  heading: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-10">
      <h2 className="flex items-baseline gap-3">
        <span className="text-[var(--color-accent)]">§{index}</span>
        <span className="uppercase tracking-[0.18em] text-[var(--color-fg)] text-[12px]">
          {heading}
        </span>
      </h2>
      <Rule className="mt-2" />
      <div className="mt-4 pl-6">{children}</div>
    </section>
  );
}
