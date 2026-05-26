import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "~/components/Button";
import Input from "~/components/Inputs";
import InputField from "~/components/Inputs/InputField";

import carAccount from "~/apis/admin/CarAccount";

const initialForm = {
  type_id: "",
  owner_name: "",
  owner_phone: "",
  brand: "",
  model: "",
  year: "",
  license_plate: "",
  seat_count: "",
  transmission: "Automatic",
  fuel_type: "Petrol",
  odometer: "",
  title: "",
  description: "",
  price_per_day: "",
  location: "",
  embedding: "",
};

const featureOptions = [
  { key: "gps", label: "GPS Navigation", icon: "map" },
  { key: "bluetooth", label: "Bluetooth Audio", icon: "bluetooth" },
  { key: "leather", label: "Leather Seats", icon: "airline_seat_recline_extra" },
  { key: "sunroof", label: "Sunroof", icon: "wb_sunny" },
  { key: "heated", label: "Heated Seats", icon: "heat_pump" },
  { key: "childSeat", label: "Child Seat Ready", icon: "child_care" },
];

export default function CreatedCar() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState(initialForm);
  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [features, setFeatures] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const previews = imageFiles.map((file) => ({
      name: file.name,
      url: URL.createObjectURL(file),
    }));

    setImagePreviews(previews);

    return () => {
      previews.forEach((preview) => {
        URL.revokeObjectURL(preview.url);
      });
    };
  }, [imageFiles]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFeatureChange = (key) => {
    setFeatures((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleImageFilesChange = (event) => {
    const files = Array.from(event.target.files || []);
    setImageFiles(files);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);
      setError("");

      const selectedFeatures = featureOptions
        .filter((feature) => features[feature.key])
        .map((feature) => feature.label);

      const descriptionParts = [
        formData.description,
        selectedFeatures.length
          ? `Features: ${selectedFeatures.join(", ")}`
          : "",
      ].filter(Boolean);

      const payload = {
        type_id: Number(formData.type_id),
        owner_name: formData.owner_name,
        owner_phone: formData.owner_phone,
        brand: formData.brand,
        model: formData.model,
        year: formData.year ? Number(formData.year) : null,
        license_plate: formData.license_plate,
        seat_count: formData.seat_count
          ? Number(formData.seat_count)
          : null,
        transmission: formData.transmission,
        fuel_type: formData.fuel_type,
        odometer: formData.odometer
          ? Number(formData.odometer)
          : null,
        title: formData.title,
        description: descriptionParts.join("\n"),
        price_per_day: Number(formData.price_per_day),
        location: formData.location,
        videos: formData.embedding.trim()
          ? [
              {
                video_url: formData.embedding.trim(),
                metadata: {
                  title: formData.title || "Vehicle video",
                },
              },
            ]
          : [],
      };

      const response = await carAccount.createCar(payload);
      const carId = response?.data?.id || response?.id;

      if (!carId) {
        throw new Error("Create car succeeded but car id was missing");
      }

      if (imageFiles.length > 0) {
        await carAccount.uploadImages(carId, imageFiles);
      }

      navigate("/dashboard/cars");
    } catch (err) {
      setError(
        err?.message ||
          err?.data?.message ||
          "Create car failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-(--color-surface) p-6">
      <form className="mx-auto max-w-7xl space-y-8" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-(--color-text-primary)">
              Add New Vehicle
            </h1>
            <p className="mt-1 text-sm font-semibold text-(--color-text-muted)">
              Create a fleet listing, attach gallery images, and add video embedding data.
            </p>
          </div>

          <div className="flex gap-3">
            <Button
              type="button"
              variant="ghost"
              className="min-h-10 border border-(--color-border) px-4 normal-case"
              onClick={() => navigate("/dashboard/cars")}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              variant="admin"
              className="min-h-10 px-5 normal-case"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save Vehicle"}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <Panel icon="info" title="General Information">
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
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
                    type="number"
                    name="type_id"
                    value={formData.type_id}
                    onChange={handleChange}
                    placeholder="1"
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

                <InputField label="Description">
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Detailed vehicle description and rental notes..."
                    rows={4}
                    className="min-h-32 w-full rounded-lg border border-(--color-border) bg-(--color-surface-low) px-4 py-3 text-base text-(--color-text-primary) outline-none transition focus:border-(--color-secondary) focus:ring-2 focus:ring-(--color-secondary)/20 md:col-span-2"
                  />
                </InputField>
              </div>
            </Panel>

            <Panel icon="settings_input_component" title="Specifications">
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
            </Panel>
          </div>

          <div className="space-y-6">
            <Panel icon="payments" title="Pricing">
              <div className="space-y-5">
                <InputField label="Daily Rental Rate">
                  <Input
                    type="number"
                    name="price_per_day"
                    value={formData.price_per_day}
                    onChange={handleChange}
                    placeholder="2500000"
                    className="font-bold text-(--color-secondary)"
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
            </Panel>

            <Panel icon="checklist" title="Features">
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
                      onChange={() => handleFeatureChange(feature.key)}
                      className="h-5 w-5 accent-(--color-secondary)"
                    />
                  </label>
                ))}
              </div>
            </Panel>
          </div>

          <div className="lg:col-span-3">
            <Panel icon="photo_library" title="Media Assets">
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
                          Select multiple JPG, PNG, or WEBP files. First image becomes thumbnail.
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
                    {imageFiles.length} image file{imageFiles.length === 1 ? "" : "s"} ready to upload.
                  </p>
                </div>

                <div className="space-y-4">
                  <InputField label="Embedding Video Data">
                    <textarea
                      name="embedding"
                      value={formData.embedding}
                      onChange={handleChange}
                      placeholder="Paste iframe/embed code or video embedding payload here."
                      rows={7}
                      className="min-h-44 w-full rounded-lg border border-dashed border-(--color-border) bg-(--color-surface-low) px-4 py-3 font-mono text-sm text-(--color-text-primary) outline-none transition focus:border-(--color-secondary) focus:ring-2 focus:ring-(--color-secondary)/20"
                    />
                  </InputField>

                  <p className="text-sm font-semibold text-(--color-text-muted)">
                    Saved after vehicle creation through the embedding video endpoint.
                  </p>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">
                {imagePreviews.slice(0, 6).map((preview) => (
                  <div
                    key={preview.url}
                    className="aspect-square overflow-hidden rounded-lg border border-(--color-border) bg-(--color-surface-low)"
                  >
                    <img
                      src={preview.url}
                      alt={preview.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ))}

                {imagePreviews.length === 0 && (
                  <div className="col-span-full flex min-h-32 items-center justify-center rounded-lg border border-dashed border-(--color-border) bg-(--color-surface-low) text-(--color-text-muted)">
                    <span className="material-symbols-outlined text-[40px] opacity-40">
                      image
                    </span>
                  </div>
                )}
              </div>
            </Panel>
          </div>
        </div>

        {error && (
          <p className="text-sm font-semibold text-(--color-error)">
            {error}
          </p>
        )}
      </form>
    </section>
  );
}

function Panel({
  icon,
  title,
  children,
}) {
  return (
    <section className="rounded-xl border border-(--color-border) bg-(--color-surface-lowest) p-6 shadow-(--shadow-sm)">
      <div className="mb-6 flex items-center gap-3">
        <span className="material-symbols-outlined text-(--color-secondary)">
          {icon}
        </span>
        <h2 className="text-xl font-bold text-(--color-text-primary)">
          {title}
        </h2>
      </div>

      {children}
    </section>
  );
}
