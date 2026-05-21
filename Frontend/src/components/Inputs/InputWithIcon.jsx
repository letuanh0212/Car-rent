import Input from "./index";

export default function InputWithIcon({
  icon,
  ...props
}) {
  return (
    <div className="input-with-icon">
      <span className="material-symbols-outlined">
        {icon}
      </span>

      <Input {...props} />
    </div>
  );
}