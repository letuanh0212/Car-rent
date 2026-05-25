export default function FormSection({
  title,
  children,
  className = "",
  ...props
}) {
  return (
    <section
      className={[
        "border-t border-black/10 pt-8",
        className,
      ].join(" ")}
      {...props}
    >

      <h3 className="mb-6 text-xl font-bold">
        {title}
      </h3>

      <div className="space-y-6">
        {children}
      </div>

    </section>
  );
}
