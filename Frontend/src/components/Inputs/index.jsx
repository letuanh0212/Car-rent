export default function Input({ className = "", ...props }) {
  return (
    <input
      className={[
        "w-full min-h-12 rounded-lg border border-[#c6c6cd] bg-[#f2f4f6] px-4 text-base text-[#191c1e] outline-none transition focus:border-[#0058be] focus:ring-2 focus:ring-[#0058be]/20",
        className,
      ].join(" ")}
      {...props}
    />
  );
}