import React from "react";

const steps = ["Upload", "Label", "Train", "Test"];

type Props = {
  current: number; // 0-based index into steps
  eyebrow?: string;
  title: string;
  children: React.ReactNode;
};

export function StepShell({
  current,
  eyebrow = "part 3 · training ground",
  title,
  children,
}: Props) {
  return (
    <div className="min-h-screen w-full bg-[var(--page-bg)] px-4 py-6 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-5xl rounded-[24px] border border-[var(--surface-border)] bg-[var(--surface-card-strong)] p-5 shadow-sm sm:p-8">
        <header className="mb-8 flex flex-col gap-2">
          <p className="text-[12px] font-bold uppercase tracking-[0.12em] text-[var(--primary)] sm:text-[13px]">
            {eyebrow}
          </p>
          <h1 className="font-display text-[30px] leading-tight tracking-[-0.03em] text-[var(--text)] sm:text-[40px]">
            {title}
          </h1>
        </header>

        <ol className="mb-8 flex w-full max-w-2xl items-center">
          {steps.map((label, index) => {
            const isActive = index === current;
            const isDone = index < current;
            return (
              <li
                key={label}
                className="flex flex-1 items-center last:flex-none"
              >
                <div className="flex flex-col items-center gap-2">
                  <div
                    className={[
                      "flex h-11 w-11 items-center justify-center rounded-full text-sm font-extrabold sm:h-12 sm:w-12 sm:text-base",
                      isActive || isDone
                        ? "bg-[var(--primary)] text-white"
                        : "border-2 border-[var(--surface-border)] bg-[var(--surface-card)] text-[var(--muted)]",
                    ].join(" ")}
                  >
                    {isDone ? "✓" : index + 1}
                  </div>
                  <span
                    className={[
                      "text-[11px] font-bold uppercase tracking-[0.08em]",
                      isActive || isDone
                        ? "text-[var(--text)]"
                        : "text-[var(--muted)]",
                    ].join(" ")}
                  >
                    {label}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={[
                      "mx-2 mb-6 h-[2px] flex-1",
                      isDone
                        ? "bg-[var(--primary)]"
                        : "bg-[var(--surface-border)]",
                    ].join(" ")}
                  />
                )}
              </li>
            );
          })}
        </ol>

        {children}
      </div>
    </div>
  );
}

export const primaryBtn =
  "inline-flex items-center justify-center rounded-[12px] bg-[var(--primary)] px-6 py-3 text-[16px] font-extrabold text-white transition-colors hover:bg-[var(--primary-hover)] disabled:cursor-not-allowed disabled:opacity-50";

export const secondaryBtn =
  "inline-flex items-center justify-center rounded-[12px] border border-[var(--surface-border)] bg-[var(--surface-card)] px-6 py-3 text-[16px] font-extrabold text-[var(--text)] transition-colors hover:bg-[var(--info-bg)]";
