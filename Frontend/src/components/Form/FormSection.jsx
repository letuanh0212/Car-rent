export default function FormSection({
  title,
  children,
}) {
  return (
    <section className="border-t border-black/10 pt-8">

      <h3 className="mb-6 text-xl font-bold">
        {title}
      </h3>

      <div className="space-y-6">
        {children}
      </div>

    </section>
  );
}