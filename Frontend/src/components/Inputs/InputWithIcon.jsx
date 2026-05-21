import Input from "./index";

export default function InputWithIcon({
  icon,
  className = "",
  ...props
}) {
  return (
    <div className="relative">
      {/* Icon */}
      <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#7a7d85]">
        {icon}
      </span>

      {/* Input */}
      <Input
        className={`pl-12 ${className}`}
        {...props}
      />
    </div>
  );
}