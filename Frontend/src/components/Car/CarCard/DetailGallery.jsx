import { useMemo, useState } from "react";

import Badge from "~/components/Badge";

import {
  carStatusLabel,
  carStatusVariant,
} from "~/config/carStatus";

const fallbackImage =
  "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200&auto=format&fit=crop";

function getImageUrl(image) {
  const value =
    typeof image === "string"
      ? image
      : image?.image_url || image?.url || image?.src;

  if (!value) return null;

  if (
    value.startsWith("http://") ||
    value.startsWith("https://") ||
    value.startsWith("/uploads/")
  ) {
    return value;
  }

  if (value.startsWith("src/public/")) {
    return `/${value}`;
  }

  return value;
}

export default function DetailGallery({ car }) {
  const images = useMemo(() => {
    if (!car) return [fallbackImage];

    if (Array.isArray(car.images) && car.images.length > 0) {
      return car.images
        .map(getImageUrl)
        .filter(Boolean);
    }

    if (car.thumbnail) {
      return [getImageUrl(car.thumbnail)].filter(Boolean);
    }

    return [fallbackImage];
  }, [car]);

  const [selectedImage, setSelectedImage] = useState(null);
  const activeImage = images.includes(selectedImage)
    ? selectedImage
    : images[0];

  if (!car) return null;

  return (
    <section className="space-y-4">
      <div className="group relative aspect-video w-full overflow-hidden rounded-xl shadow-lg">
        <img
          src={activeImage}
          alt={car.title || `${car.brand} ${car.model}`}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
        />

        <Badge
          variant={carStatusVariant[car.status] || "warning"}
          className="absolute left-4 top-4"
        >
          {carStatusLabel[car.status] || car.status}
        </Badge>
      </div>

      {images.length > 1 && (
        <div className="flex gap-4 overflow-x-auto py-2">
          {images.map((image) => {
            const isActive = image === activeImage;

            return (
              <button
                key={image}
                type="button"
                onClick={() => setSelectedImage(image)}
                className={[
                  "relative aspect-video min-w-28 overflow-hidden rounded-lg border-2 transition",
                  isActive
                    ? "border-(--color-primary) ring-2 ring-(--color-primary) ring-offset-2"
                    : "border-transparent hover:border-(--color-border)",
                ].join(" ")}
              >
                <img
                  src={image}
                  alt={car.title || "Car gallery thumbnail"}
                  className="h-full w-full object-cover"
                />
              </button>
            );
          })}
        </div>
      )}
    </section>
  );
}
