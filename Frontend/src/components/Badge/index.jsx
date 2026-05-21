export default function Badge({
  children,
  variant = "success",
  className = "",
}) {
  const variants = {
    success: "bg-emerald-100 text-emerald-700",
    warning: "bg-orange-100 text-orange-700",
    error: "bg-red-100 text-red-700",
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