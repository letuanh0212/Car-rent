export default function Input({ className = "", ...props }) {
  return (
    <input
      className={[
        "w-full min-h-12 rounded-lg border border-(--color-border) bg-(--color-surface-low) px-4 text-base text-(--color-text-primary) outline-none transition focus:border-(--color-secondary) focus:ring-2 focus:ring-(--color-secondary)/20",
        className,
      ].join(" ")}
      {...props}
    />
  );
}
