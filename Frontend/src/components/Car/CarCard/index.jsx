import Button from "~/components/Button";
import Badge from "~/components/Badge";

import {
  carStatusLabel,
  carStatusVariant,
} from "~/config/carStatus";

import { formatCurrency } from "~/utils/currency";

export default function CardCar({
  car,
  variant = "public",
  onView,
  onEdit,
  onDelete,
  onAddImage,
}) {
  if (!car) return null;

  const isAdmin = variant === "admin";

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-xl border border-(--color-border) bg-(--color-surface-lowest) shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl">
      <div className="relative h-64 overflow-hidden">
        <img
          className="h-full w-full object-cover transition duration-700 hover:scale-110"
          src={car.thumbnail}
          alt={car.title}
        />

        <Badge
          variant={carStatusVariant[car.status] || "warning"}
          className="absolute left-4 top-4"
        >
          {carStatusLabel[car.status] || car.status}
        </Badge>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="mb-3 text-2xl font-semibold leading-8 text-(--color-text-primary)">
          {car.title}
        </h3>

        <div className="mb-6 flex flex-wrap gap-4 text-sm text-(--color-text-secondary)">
          <Meta icon="directions_car">
            {car.brand} {car.model}
          </Meta>

          <Meta icon="event">{car.year}</Meta>

          <Meta icon="settings">
            {car.transmission}
          </Meta>

          <Meta icon="airline_seat_recline_normal">
            {car.seat_count} seats
          </Meta>

          <Meta icon="local_gas_station">
            {car.fuel_type}
          </Meta>

          <Meta icon="location_on">
            {car.location}
          </Meta>
        </div>

        <p className="mb-6 text-base leading-6 text-(--color-text-secondary)">
          {car.description}
        </p>

        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-(--color-border) pt-4">
          <p className="m-0 text-lg font-extrabold text-(--color-secondary)">
            {formatCurrency(car.price_per_day)}
            <span className="text-sm font-normal text-(--color-text-secondary)">
              /day
            </span>
          </p>

          {!isAdmin && (
            <Button className="min-h-10 px-4">
              Book Now
            </Button>
          )}

          {isAdmin && (
            <div className="grid w-full grid-cols-2 gap-2">
              <Button
                type="button"
                variant="admin"
                className="min-h-9 px-3 text-xs normal-case"
                onClick={() => onView?.(car)}
              >
                View
              </Button>

              <Button
                type="button"
                variant="outline"
                className="min-h-9 px-3 text-xs normal-case"
                onClick={() => onEdit?.(car)}
              >
                Edit
              </Button>

              <Button
                type="button"
                variant="ghost"
                className="min-h-9 border border-(--color-border) px-3 text-xs normal-case"
                onClick={() => onAddImage?.(car)}
              >
                Images
              </Button>

              <Button
                type="button"
                variant="danger"
                className="min-h-9 border border-(--color-error-bg) px-3 text-xs normal-case"
                onClick={() => onDelete?.(car)}
              >
                Delete
              </Button>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

function Meta({ icon, children }) {
  return (
    <span className="inline-flex items-center gap-1">
      <span className="material-symbols-outlined text-lg">
        {icon}
      </span>
      {children}
    </span>
  );
}
