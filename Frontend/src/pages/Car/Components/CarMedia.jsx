import FormSection from "~/components/Form/FormSection";
import InputField from "~/components/Inputs/InputField";

export default function CarMedia({
  imageFiles,
  formData,
  handleChange,
  handleImageFilesChange,
  handleRemoveImage,
}) {
  return (
    <FormSection
      icon="photo_library"
      title="Media Assets"
    >
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="space-y-4">
          <InputField label="Vehicle Images">
            <label className="flex min-h-44 cursor-pointer flex-col items-center justify-center gap-4 rounded-lg border border-dashed border-(--color-border) bg-(--color-surface-low) px-4 py-8 text-center transition hover:border-(--color-secondary)">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-(--color-secondary)/10 text-(--color-secondary)">
                <span className="material-symbols-outlined text-[32px]">
                  cloud_upload
                </span>
              </span>

              <span>
                <span className="block text-base font-bold text-(--color-text-primary)">
                  Choose images from your device
                </span>

                <span className="mt-1 block text-sm font-semibold text-(--color-text-muted)">
                  Select multiple JPG, PNG, or WEBP files.
                </span>
              </span>

              <input
                type="file"
                accept="image/*"
                multiple
                className="sr-only"
                onChange={handleImageFilesChange}
              />
            </label>
          </InputField>

          <p className="text-sm font-semibold text-(--color-text-muted)">
            {imageFiles.length} image file
            {imageFiles.length === 1 ? "" : "s"} selected
          </p>
        </div>

        <div className="space-y-4">
          <InputField label="Youtube Embed URL">
            <textarea
              name="embedding"
              value={formData.embedding}
              onChange={handleChange}
              rows={7}
              placeholder="https://youtube.com/embed/..."
              className="min-h-44 w-full rounded-lg border border-dashed border-(--color-border) bg-(--color-surface-low) px-4 py-3 font-mono text-sm text-(--color-text-primary) outline-none transition focus:border-(--color-secondary) focus:ring-2 focus:ring-(--color-secondary)/20"
            />
          </InputField>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">
        {imageFiles.map((image, index) => (
          <div
            key={image.id}
            className="group relative aspect-square overflow-hidden rounded-lg border border-(--color-border)"
          >
            <img
              src={image.previewUrl}
              alt={image.name}
              className="h-full w-full object-cover"
            />

            {index === 0 && (
              <span className="absolute left-2 top-2 rounded-full bg-(--color-secondary) px-2 py-1 text-xs font-bold text-white">
                Thumbnail
              </span>
            )}

            <button
              type="button"
              onClick={() =>
                handleRemoveImage(image.id)
              }
              className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white opacity-0 transition group-hover:opacity-100"
            >
              <span className="material-symbols-outlined text-[18px]">
                close
              </span>
            </button>
          </div>
        ))}

        {imageFiles.length === 0 && (
          <div className="col-span-full flex min-h-32 items-center justify-center rounded-lg border border-dashed border-(--color-border) bg-(--color-surface-low) text-(--color-text-muted)">
            <span className="material-symbols-outlined text-[40px] opacity-40">
              image
            </span>
          </div>
        )}
      </div>
    </FormSection>
  );
}