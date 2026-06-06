import FormSection from "~/components/Form/FormSection";
import Input from "~/components/Inputs";
import InputField from "~/components/Inputs/InputField";

export default function EditPricingModal({
  formData,
  handleChange,
}) {
  return (
    <FormSection
      icon="payments"
      title="Pricing"
    >
      <div className="grid gap-6 md:grid-cols-2">
        <InputField label="Daily Rental Rate">
          <Input
            type="number"
            name="price_per_day"
            value={formData.price_per_day}
            onChange={handleChange}
            placeholder="2500000"
            className="font-bold text-(--color-secondary)"
            min="0"
            required
          />
        </InputField>

        <InputField label="Location">
          <Input
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Ho Chi Minh City"
            required
          />
        </InputField>
      </div>
    </FormSection>
  );
}
