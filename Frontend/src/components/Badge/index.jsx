export default function Badge({
  children,
  variant = "success",
  className = "",
}) {
  const variants = {
    success: "bg-(--color-success-bg) text-(--color-success)",
    warning: "bg-(--color-warning-bg) text-(--color-warning)",
    error: "bg-(--color-error-bg) text-(--color-error)",
  };

  return (
    <span
      className={[
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-bold uppercase",
        variants[variant],
        className,
      ].join(" ")}
    >
      {children}
    </span>
  );
}
