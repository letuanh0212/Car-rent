export default function FormSection({
  title,
  icon,
  children,
  className = "",
  ...props
}) {
  return (
    <section
      className={[
        "border-t border-(--color-border) pt-8",
        className,
      ].join(" ")}
      {...props}
    >
      <div className="mb-6 flex items-center gap-3">
        {icon && (
          <span className="material-symbols-outlined text-(--color-secondary)">
            {icon}
          </span>
        )}

        <h3 className="text-xl font-bold">
          {title}
        </h3>
      </div>

      <div className="space-y-6">
        {children}
      </div>
    </section>
  );
}