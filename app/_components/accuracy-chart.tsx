export const AccuracyChart = ({ points }: { points: number[] }) => (
  <div className="flex h-32 items-end gap-1 rounded-[12px] border border-[var(--surface-border)] bg-[var(--surface-card)] p-2">
    {points.map((accuracy, i) => (
      <div
        key={i}
        title={`Round ${i + 1}: ${Math.round(accuracy * 100)}%`}
        className="flex-1 rounded-t-[4px] bg-[var(--primary)]"
        style={{ height: `${Math.max(accuracy * 100, 2)}%` }}
      />
    ))}
  </div>
);
