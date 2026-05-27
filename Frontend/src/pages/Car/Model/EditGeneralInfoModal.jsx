import { useEffect, useState } from "react";

import FormRow from "~/components/Form/FormRow";
import FormSection from "~/components/Form/FormSection";
import Input from "~/components/Inputs";
import InputField from "~/components/Inputs/InputField";

import Button from "~/components/Button";
import { useUpdateCar } from "~/hooks/Car/useUpdateCar";
import CarSpecifications from "../Components/CarSpecifications";
import EditPricingModal from "./EditPricingSection";


const initialForm = {
  title: "",
  brand: "",
  model: "",
  type_id: "",
  owner_name: "",
  owner_phone: "",
  year: "",
  license_plate: "",
  seat_count: "",
  transmission: "Automatic",
  fuel_type: "Petrol",
  odometer: "",
  price_per_day: "",
  location: "",
  description: "",
};

export default function EditGeneralInfoModal({
  open,
  onClose,
  car,
  onUpdated,
}) {
  const [form, setForm] = useState(initialForm);
  const [saving, setSaving] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const { updateCar } = useUpdateCar();

    useEffect(() => {
    if (!open || !car) return;

    setForm({
        title: car.title || "",
        brand: car.brand || "",
        model: car.model || "",
        type_id: car.type_id || "",
        owner_name: car.owner_name || "",
        owner_phone: car.owner_phone || "",
        year: car.year || "",
        license_plate: car.license_plate || "",
        seat_count: car.seat_count || "",
        transmission: car.transmission || "Automatic",
        fuel_type: car.fuel_type || "Petrol",
        odometer: car.odometer || "",
        price_per_day: car.price_per_day || "",
        location: car.location || "",
        description: car.description || "",
    });
    }, [open, car]);
  useEffect(() => {
    if (!open) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose?.();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);


  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!car?.id) return;

    try {
      setSaving(true);
      setSubmitError("");

      await updateCar(car.id, form);
      await onUpdated?.();
      onClose?.();
    } catch (err) {
      setSubmitError(
        err?.message || err?.data?.message || "Update car failed"
      );
    } finally {
      setSaving(false);
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="edit-car-general-title"
    >
      <div
        className="absolute inset-0"
        aria-hidden="true"
        onClick={onClose}
      />

      <form
        className="relative flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-lg border border-(--color-border) bg-(--color-surface-lowest) shadow-(--shadow-lg)"
        onSubmit={handleSubmit}
      >
        <header className="flex items-center justify-between gap-4 border-b border-(--color-border) px-6 py-4">
          <div>
            <h2
              id="edit-car-general-title"
              className="text-xl font-bold text-(--color-text-primary)"
            >
              Edit General Information
            </h2>

            <p className="mt-1 text-sm text-(--color-text-secondary)">
              {car?.title || "Update vehicle details"}
            </p>
          </div>

          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-md text-(--color-text-secondary) transition hover:bg-(--color-surface-low) hover:text-(--color-text-primary)"
            aria-label="Close edit general information modal"
            onClick={onClose}
          >
            <span className="material-symbols-outlined text-[20px]">
              close
            </span>
          </button>
        </header>

        <div className="overflow-y-auto px-6 py-5">
          {submitError && (
            <p className="mb-4 rounded-md border border-(--color-error) px-4 py-3 text-sm text-(--color-error)">
              {submitError}
            </p>
          )}

          <FormSection
            icon="info"
            title="General Information"
            className="border-t-0 pt-0"
          >
            <FormRow>
              <InputField label="Vehicle Name">
                <Input
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="Porsche 911 Carrera"
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
                  className="min-h-12 w-full rounded-lg border border-(--color-border) bg-(--color-surface-low) px-4 text-base text-(--color-text-primary) outline-none transition focus:border-(--color-secondary) focus:ring-2 focus:ring-(--color-secondary)/20"
                >
                  <option value="">
                    Select car type
                  </option>

                  {form.type_id && (
                    <option value={form.type_id}>
                      Current type #{form.type_id}
                    </option>
                  )}
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
          </FormSection>

          <CarSpecifications
            formData={form}
            handleChange={handleChange}
          />

          <EditPricingModal
            formData={form}
            handleChange={handleChange}
          />
        </div>

        <footer className="flex flex-col-reverse gap-3 border-t border-(--color-border) px-6 py-4 sm:flex-row sm:justify-end">
          <Button
            type="button"
            variant="ghost"
            className="min-h-10 border border-(--color-border) px-4 normal-case"
            onClick={onClose}
          >
            Cancel
          </Button>

          <Button
            type="submit"
            variant="admin"
            className="min-h-10 px-4 normal-case"
            disabled={saving}
          >
            {saving ? "Saving..." : "Save changes"}
          </Button>
        </footer>
      </form>
    </div>
  );
}
