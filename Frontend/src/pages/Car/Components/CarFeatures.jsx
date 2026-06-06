import FormSection from "~/components/Form/FormSection";

export default function CarFeatures({
  features,
  featureOptions,
  handleFeatureChange,
}) {
  return (
    <FormSection
      icon="checklist"
      title="Features"
    >
      <div className="grid grid-cols-1 gap-3">
        {featureOptions.map((feature) => (
          <label
            key={feature.key}
            className="flex cursor-pointer items-center justify-between rounded-lg border border-transparent p-3 transition hover:border-(--color-border) hover:bg-(--color-surface-low)"
          >
            <span className="flex items-center gap-3 text-sm font-semibold text-(--color-text-secondary)">
              <span className="material-symbols-outlined text-[20px]">
                {feature.icon}
              </span>

              {feature.label}
            </span>

            <input
              type="checkbox"
              checked={Boolean(features[feature.key])}
              onChange={() =>
                handleFeatureChange(feature.key)
              }
              className="h-5 w-5 accent-(--color-secondary)"
            />
          </label>
        ))}
      </div>
    </FormSection>
  );
}