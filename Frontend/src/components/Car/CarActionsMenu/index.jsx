import { useState } from "react";

export default function CarActionsMenu({
  car,
  onView,
  onEdit,
  onDelete,
  onAddImage,
  onVD,
}) {
  const [open, setOpen] = useState(false);

  const handleAction = (action) => {
    setOpen(false);
    action?.(car);
  };

  return (
    <div className="relative inline-flex justify-end">
      <button
        type="button"
        className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-(--color-border) bg-(--color-surface-lowest) text-(--color-text-secondary) transition hover:border-(--color-admin-primary) hover:text-(--color-admin-primary)"
        aria-label="Car actions"
        onClick={() => setOpen((value) => !value)}
      >
        <span className="material-symbols-outlined text-[20px]">
          more_vert
        </span>
      </button>

      {open && (
        <div className="absolute right-0 top-11 z-20 min-w-36 overflow-hidden rounded-lg border border-(--color-border) bg-(--color-surface-lowest) py-1 text-left shadow-(--shadow-lg)">
          <MenuItem
            icon="visibility"
            label="View"
            onClick={() => handleAction(onView)}
          />

          <MenuItem
            icon="edit"
            label="Edit"
            onClick={() => handleAction(onEdit)}
          />

          <MenuItem
            icon="image"
            label="Images"
            onClick={() => handleAction(onAddImage)}
          />
          <MenuItem
            icon="video_library"
            label="Video"
            onClick={() => handleAction(onVD)}
          />
          <MenuItem
            icon="delete"
            label="Delete"
            danger
            onClick={() => handleAction(onDelete)}
          />

        </div>
      )}
    </div>
  );
}

function MenuItem({
  icon,
  label,
  danger = false,
  onClick,
}) {
  return (
    <button
      type="button"
      className={[
        "flex w-full items-center gap-2 px-3 py-2 text-sm font-semibold transition hover:bg-(--color-surface-low)",
        danger
          ? "text-(--color-error) hover:bg-(--color-error-bg)"
          : "text-(--color-text-secondary) hover:text-(--color-text-primary)",
      ].join(" ")}
      onClick={onClick}
    >
      <span className="material-symbols-outlined text-[18px]">
        {icon}
      </span>
      {label}
    </button>
  );
}
