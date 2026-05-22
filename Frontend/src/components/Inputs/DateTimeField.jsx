import Input from "~/components/Inputs";

export default function DateTimeField({
  label,
  value,
  onChange,
  min,
  max,
  required = false,
}) {
  return (
    <label className="block space-y-2">
      <span className="text-sm font-semibold text-(--color-text-secondary)">
        {label}
      </span>

      <div className="relative">
        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-(--color-text-muted)">
          calendar_today
        </span>

        <Input
          type="datetime-local"
          value={value}
          min={min}
          max={max}
          required={required}
          onChange={(event) =>
            onChange?.(event.target.value)
          }
          className="pl-11"
        />
      </div>
    </label>
  );
}