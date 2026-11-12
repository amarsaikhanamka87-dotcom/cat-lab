import type { Guess } from "../_features/test/guess-photo";

export const ResultLine = ({
  result,
  answer,
}: {
  result?: Guess;
  answer?: "CAT" | "NOT_CAT" | null;
}) => {
  if (!result)
    return <p className="p-2 text-[13px] text-[var(--muted)]">Thinking…</p>;
  const sure = result.guess === "CAT" ? result.score : 1 - result.score;
  const mark = answer ? (result.guess === answer ? "✅ " : "❌ ") : "";
  return (
    <p className="p-2 text-[13px] font-extrabold text-[var(--text)]">
      {mark}
      {result.guess === "CAT" ? "🐱 Cat" : "🚫 Not cat"}{" "}
      {Math.round(sure * 100)}%
    </p>
  );
};
