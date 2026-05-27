import Button from "~/components/Button";
import EditPriicingModal from "./EditPricingModal";
import FormRow from "~/components/Form/FormRow";
import FormSection from "~/components/Form/FormSection";

import Input from "~/components/Inputs";
import InputField from "~/components/Inputs/InputField";
import {  useEffect,useState } from "react";
export default function EditGeneralInfoModal({ open, onClose, car }) {
    

    const [form, setForm] = useState({
        title: "",
        brand: "",
        model: "",
        type_id: "",
        owner_name: "",
        owner_phone: "",
        description: "",
    });
    useEffect(() => {
        if (car) {
            setForm({
            title: car.title || "",
            brand: car.brand || "",
            model: car.model || "",
            type_id: car.type_id || "",
            owner_name: car.owner_name || "",
            owner_phone: car.owner_phone || "",
            description: car.description || "",
            });
        }
    }, [car]);
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };
    if (!open) return null;
  return (
    <FormSection
      icon="info"
      title="General Information"
    >
      <FormRow>
        <InputField label="Vehicle Name">
            <Input
            name="title"
            value={form.title}
            onChange={handleChange}
            />
        </InputField>

        <InputField label="Brand">
          <Input
            name="brand"
            value={form.brand}
             onChange={handleChange}
            placeholder="Porsche"
            required
          />
        </InputField>

        <InputField label="Model">
          <Input
            name="model"
            value={form.model}
             onChange={handleChange}
            placeholder="911 Carrera"
            required
          />
        </InputField>

        <InputField label="Car Type">
        <select
            name="type_id"
            value={form.type_id}
             onChange={handleChange}
            required
            className="w-full min-h-12 rounded-lg border border-(--color-border) bg-(--color-surface-low) px-4 text-base text-(--color-text-primary) outline-none transition focus:border-(--color-secondary) focus:ring-2 focus:ring-(--color-secondary)/20"
        >
            <option value="">
            Select car type
            </option>

            {/* {carTypes.map((type) => (
            <option
                key={type.id}
                value={type.id}
            >
                {type.name}
            </option>
            ))} */}
        </select>
        </InputField>

        <InputField label="Owner Name">
          <Input
            name="owner_name"
            value={form.owner_name}
             onChange={handleChange}
            placeholder="Owner full name"
            required
          />
        </InputField>

        <InputField label="Owner Phone">
          <Input
            name="owner_phone"
            value={form.owner_phone}
            onChange={handleChange}
            placeholder="Owner phone"
            required
          />
        </InputField>
      </FormRow>

      <InputField label="Description">
        <textarea
          name="description"
          value={form.description}
           onChange={handleChange}
          rows={4}
          placeholder="Detailed vehicle description..."
          className="min-h-32 w-full rounded-lg border border-(--color-border) bg-(--color-surface-low) px-4 py-3 text-base text-(--color-text-primary) outline-none transition focus:border-(--color-secondary) focus:ring-2 focus:ring-(--color-secondary)/20"
        />
      </InputField>
      <EditPriicingModal car={form} />

      <Button
        type="button"
        variant="secondary"
        onClick={onClose}>
            Cancel
      </Button>
    </FormSection>
  );
}