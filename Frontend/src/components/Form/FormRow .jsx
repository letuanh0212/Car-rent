export default function FormRow({
  children,
}) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {children}
    </div>
  );
}