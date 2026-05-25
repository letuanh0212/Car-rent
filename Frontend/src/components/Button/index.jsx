export default function Button({
  children,
  variant = "primary",
  fullWidth = false,
  className = "",
  ...props
}) {
  const variants = {
    primary:
      "bg-(--color-primary) text-(--color-on-primary) hover:opacity-90",
    secondary:
      "bg-(--color-secondary) text-(--color-on-secondary) hover:bg-(--color-secondary-hover)",
    admin:
      "bg-(--color-admin-primary) text-(--color-on-admin-primary) hover:bg-(--color-admin-primary-hover)",
    ghost:
      "bg-transparent text-(--color-text-secondary) hover:text-(--color-secondary)",
    danger:
      "bg-transparent text-(--color-error) hover:bg-(--color-error-bg) hover:text-(--color-error)",
    outline:
      "border border-(--color-primary) text-(--color-primary) hover:bg-(--color-primary) hover:text-(--color-on-primary)",
  };

  return (
    <button
      className={[
        "inline-flex min-h-12 items-center justify-center gap-2 rounded-md px-6 text-sm font-semibold uppercase transition active:scale-95",
        variants[variant],
        fullWidth ? "w-full" : "",
        className,
      ].join(" ")}
      {...props}
    >
      {children}
    </button>
  );
}
