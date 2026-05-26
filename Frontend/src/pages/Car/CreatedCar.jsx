import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "~/components/Button";

import FormCard from "~/components/Form/FormCard";
import FormActions from "~/components/Form/FormActions";

import carAccount from "~/apis/admin/CarAccount";

import CarGeneralInfo from "./Components/CarGeneralInfo";
import CarSpecifications from "./Components/CarSpecifications";
import CarPricing from "./Components/CarPricing";
import CarFeatures from "./Components/CarFeatures";
import CarMedia from "./Components/CarMedia";
import useGetAllType from "~/hooks/Booking/useGetAllType";



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

export default function CreateCarPage() {
  const navigate = useNavigate();
  const { types } = useGetAllType();

  const [formData, setFormData] = useState(initialForm);
  const [imageFiles, setImageFiles] = useState([]);
  const [features, setFeatures] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    return () => {
      imageFiles.forEach((image) => {
        URL.revokeObjectURL(image.previewUrl);
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

    const newImages = files.map((file) => ({
      id: crypto.randomUUID(),
      file,
      name: file.name,
      previewUrl: URL.createObjectURL(file),
    }));

    setImageFiles((prev) => [...prev, ...newImages]);

    event.target.value = "";
  };

  const handleRemoveImage = (imageId) => {
    setImageFiles((prev) => {
      const removedImage = prev.find(
        (image) => image.id === imageId
      );

      if (removedImage) {
        URL.revokeObjectURL(
          removedImage.previewUrl
        );
      }

      return prev.filter(
        (image) => image.id !== imageId
      );
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);
      setError("");

      const selectedFeatures = featureOptions
        .filter((feature) => features[feature.key])
        .map((feature) => feature.label);

      const payload = {
        type_id: formData.type_id,
        owner_name: formData.owner_name,
        owner_phone: formData.owner_phone,
        brand: formData.brand,
        model: formData.model,
        year: formData.year
          ? Number(formData.year)
          : null,
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
        description: [
          formData.description,
          selectedFeatures.length
            ? `Features: ${selectedFeatures.join(", ")}`
            : "",
        ]
          .filter(Boolean)
          .join("\n"),
        price_per_day: Number(
          formData.price_per_day
        ),
        location: formData.location,

        videos: formData.embedding.trim()
          ? [
              {
                youtube_url:
                  formData.embedding.trim(),
                is_thumbnail: true,
              },
            ]
          : [],
      };

      const response =
        await carAccount.createCar(payload);

      const carId =
        response?.data?.id || response?.id;

      if (!carId) {
        throw new Error(
          "Create car succeeded but car id missing"
        );
      }

      if (imageFiles.length > 0) {
        await carAccount.uploadImages(
          carId,
          imageFiles.map((image) => image.file)
        );
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
      <form
        className="mx-auto max-w-7xl"
        onSubmit={handleSubmit}
      >
        <FormCard
          title="Add New Vehicle"
          subtitle="Create a fleet listing, attach gallery images, and add video embedding data."
        >
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

            <div className="space-y-6 lg:col-span-2">
              <CarGeneralInfo
                formData={formData}
                handleChange={handleChange}
                carTypes={types}
              />

              <CarSpecifications
                formData={formData}
                handleChange={handleChange}
              />
            </div>

            <div className="space-y-6">
              <CarPricing
                formData={formData}
                handleChange={handleChange}
              />

              <CarFeatures
                features={features}
                featureOptions={featureOptions}
                handleFeatureChange={
                  handleFeatureChange
                }
              />
            </div>

            <div className="lg:col-span-3">
              <CarMedia
                imageFiles={imageFiles}
                formData={formData}
                handleChange={handleChange}
                handleImageFilesChange={
                  handleImageFilesChange
                }
                handleRemoveImage={
                  handleRemoveImage
                }
              />
            </div>

          </div>

          {error && (
            <p className="mt-6 text-sm font-semibold text-(--color-error)">
              {error}
            </p>
          )}

          <FormActions className="mt-8">
            <Button
              type="button"
              variant="ghost"
              onClick={() =>
                navigate("/dashboard/cars")
              }
            >
              Cancel
            </Button>

            <Button
              type="submit"
              variant="admin"
              disabled={loading}
            >
              {loading
                ? "Saving..."
                : "Save Vehicle"}
            </Button>
          </FormActions>
        </FormCard>
      </form>
    </section>
  );
}
