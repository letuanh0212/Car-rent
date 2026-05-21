export default function Button({
  children,
  variant = "primary",
  fullWidth = false,
  className = "",
  ...props
}) {
  const variants = {
    primary: "bg-black text-white hover:opacity-90",
    secondary: "bg-[#0058be] text-white hover:bg-[#2170e4]",
    ghost: "bg-transparent text-[#45464d] hover:text-[#0058be]",
    outline: "border border-black text-black hover:bg-black hover:text-white",
  };

  return (
    <button
      className={[
        "inline-flex min-h-12 items-center justify-center gap-2 rounded-lg px-6 text-sm font-semibold uppercase transition active:scale-95",
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