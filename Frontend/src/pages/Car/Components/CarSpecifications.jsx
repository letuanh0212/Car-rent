import FormRow from "~/components/Form/FormRow";
import FormSection from "~/components/Form/FormSection";

import Input from "~/components/Inputs";
import InputField from "~/components/Inputs/InputField";

export default function CarSpecifications({
  formData,
  handleChange,
}) {
  return (
    <FormSection
      icon="settings_input_component"
      title="Specifications"
    >
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        <InputField label="Year">
          <Input
            type="number"
            name="year"
            value={formData.year}
            onChange={handleChange}
            placeholder="2024"
          />
        </InputField>

        <InputField label="License Plate">
          <Input
            name="license_plate"
            value={formData.license_plate}
            onChange={handleChange}
            placeholder="LD-8821"
          />
        </InputField>

        <InputField label="Seats">
          <Input
            type="number"
            name="seat_count"
            value={formData.seat_count}
            onChange={handleChange}
            placeholder="4"
          />
        </InputField>

        <InputField label="Transmission">
          <select
            name="transmission"
            value={formData.transmission}
            onChange={handleChange}
            className="w-full min-h-12 rounded-lg border border-(--color-border) bg-(--color-surface-low) px-4 text-base text-(--color-text-primary) outline-none transition focus:border-(--color-secondary) focus:ring-2 focus:ring-(--color-secondary)/20"
          >
            <option>Automatic</option>
            <option>Manual</option>
          </select>
        </InputField>

        <InputField label="Fuel Type">
          <select
            name="fuel_type"
            value={formData.fuel_type}
            onChange={handleChange}
            className="w-full min-h-12 rounded-lg border border-(--color-border) bg-(--color-surface-low) px-4 text-base text-(--color-text-primary) outline-none transition focus:border-(--color-secondary) focus:ring-2 focus:ring-(--color-secondary)/20"
          >
            <option>Petrol</option>
            <option>Diesel</option>
            <option>Electric</option>
            <option>Hybrid</option>
          </select>
        </InputField>

        <InputField label="Odometer">
          <Input
            type="number"
            name="odometer"
            value={formData.odometer}
            onChange={handleChange}
            placeholder="12000"
          />
        </InputField>
      </div>
    </FormSection>
  );
}