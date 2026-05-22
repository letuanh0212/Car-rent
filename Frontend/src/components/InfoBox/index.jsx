export default function InfoBox({
  title,
  icon,
  children,
  className = "",
}) {
  return (
    <section
      className={`space-y-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm ${className}`}
    >
      <div className="flex items-center gap-2 text-sm font-semibold text-(--color-secondary)">
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