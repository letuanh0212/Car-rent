export default function FormActions({
  children,
  className = "",
  ...props
}) {
  return (
    <div
      className={[
        "flex items-center justify-end gap-4 border-t border-(--color-border) pt-6",
        className,
      ].join(" ")}
      {...props}
    >
      {children}
    </div>
  );
}   
