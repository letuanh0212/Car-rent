export default function FormCard({
  title,
  subtitle,
  children,
  className = "",
  ...props
}) {
  return (
    <div
      className={[
        "rounded-2xl bg-(--color-surface-lowest) p-8 shadow-(--shadow-xl)",
        className,
      ].join(" ")}
      {...props}
    >

      {(title || subtitle) && (
        <div className="mb-8">

          {title && (
            <h2 className="text-3xl font-bold">
              {title}
            </h2>
          )}

          {subtitle && (
            <p className="mt-2 text-sm text-(--color-text-muted)">
              {subtitle}
            </p>
          )}

        </div>
      )}

      {children}

    </div>
  );
}
