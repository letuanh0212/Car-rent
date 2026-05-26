import FormRow from "~/components/Form/FormRow";
import FormSection from "~/components/Form/FormSection";

import Input from "~/components/Inputs";
import InputField from "~/components/Inputs/InputField";

export default function CarGeneralInfo({
  formData,
  handleChange,
}) {
  return (
    <FormSection
      icon="info"
      title="General Information"
    >
      <FormRow>
        <InputField label="Vehicle Name">
          <Input
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Porsche 911 Carrera"
          />
        </InputField>

        <InputField label="Brand">
          <Input
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            placeholder="Porsche"
            required
          />
        </InputField>

        <InputField label="Model">
          <Input
            name="model"
            value={formData.model}
            onChange={handleChange}
            placeholder="911 Carrera"
            required
          />
        </InputField>

        <InputField label="Type ID">
          <Input
            name="type_id"
            value={formData.type_id}
            onChange={handleChange}
            placeholder="UUID Type ID"
            required
          />
        </InputField>

        <InputField label="Owner Name">
          <Input
            name="owner_name"
            value={formData.owner_name}
            onChange={handleChange}
            placeholder="Owner full name"
            required
          />
        </InputField>

        <InputField label="Owner Phone">
          <Input
            name="owner_phone"
            value={formData.owner_phone}
            onChange={handleChange}
            placeholder="Owner phone"
            required
          />
        </InputField>
      </FormRow>

      <InputField label="Description">
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={4}
          placeholder="Detailed vehicle description..."
          className="min-h-32 w-full rounded-lg border border-(--color-border) bg-(--color-surface-low) px-4 py-3 text-base text-(--color-text-primary) outline-none transition focus:border-(--color-secondary) focus:ring-2 focus:ring-(--color-secondary)/20"
        />
      </InputField>
    </FormSection>
  );
}