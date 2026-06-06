export default function InputField({
  label,
  children,
}) {
  return (
    <div className="field-control">
      {label && (
        <label className="field-control__label">
          {label}
        </label>
      )}

      {children}
    </div>
  );
}