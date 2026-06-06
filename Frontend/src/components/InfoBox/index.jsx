export default function InfoBox({
  title,
  icon,
  children,
  className = "",
}) {
  return (
    <section
      className={`space-y-4 rounded-2xl border border-(--color-border) bg-(--color-surface-lowest) p-5 shadow-(--shadow-sm) ${className}`}
    >
      <div className="flex items-center gap-2 text-sm font-semibold text-(--color-admin-primary)">
        <span className="material-symbols-outlined text-base">
          {icon}
        </span>
        <span>{title}</span>
      </div>

      <div className="space-y-3">
        {children}
      </div>
    </section>
  );
}
