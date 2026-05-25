export default function FormRow({
  children,
  className = "",
  ...props
}) {
  return (
    <div
      className={[
        "grid gap-6 md:grid-cols-2",
        className,
      ].join(" ")}
      {...props}
    >
      {children}
    </div>
  );
}
