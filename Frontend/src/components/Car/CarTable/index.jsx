import Table from "~/components/Table";
import Badge from "~/components/Badge";
import CarActionsMenu from "~/components/Car/CarActionsMenu";

import {
  carStatusLabel,
  carStatusVariant,
} from "~/config/carStatus";

import { formatCurrency } from "~/utils/currency";

function getImageUrl(image) {
  const value =
    typeof image === "string"
      ? image
      : image?.image_url || image?.url || image?.src;

  if (!value) return "";

  if (value.startsWith("src/public/")) {
    return `/${value}`;
  }

  return value;
}

export default function CarTable({
  cars = [],
  isAdmin = false,
  onView,
  onEdit,
  onDelete,
  onAddImage,
  onVD,
}) {
  const columns = [
    {
      key: "title",
      title: "Car",
      render: (row) => {
        const thumbnail = getImageUrl(row.thumbnail);

        return (
          <div className="flex items-center gap-3">
            {thumbnail ? (
              <img
                src={thumbnail}
                alt={row.title || `${row.brand} ${row.model}`}
                className="h-12 w-16 rounded object-cover"
              />
            ) : (
              <div className="flex h-12 w-16 items-center justify-center rounded bg-(--color-surface-low) text-(--color-text-muted)">
                <span className="material-symbols-outlined text-xl">
                  directions_car
                </span>
              </div>
            )}

            <div className="flex flex-col">
              <span className="font-semibold">
                {row.title || `${row.brand} ${row.model}`}
              </span>

              <span className="text-xs text-(--color-text-muted)">
                {row.brand} {row.model}
              </span>
            </div>
          </div>
        );
      },
    },
    {
      key: "license_plate",
      title: "Plate",
      render: (row) => row.license_plate || "-",
    },
    {
      key: "year",
      title: "Year",
    },
    {
      key: "seats",
      title: "Seats",
      render: (row) => row.seat_count || row.seats || "-",
    },
    {
      key: "transmission",
      title: "Transmission",
    },
    {
      key: "fuel_type",
      title: "Fuel",
    },
    {
      key: "mileage",
      title: "Mileage",
      render: (row) => (
        <span>
          {Number(row.odometer || row.mileage || 0).toLocaleString()} km
        </span>
      ),
    },
    {
      key: "price_per_day",
      title: "Price / Day",
      render: (row) => (
        <span className="font-semibold text-(--color-primary)">
          {formatCurrency(row.price_per_day)}
        </span>
      ),
    },
    {
      key: "location",
      title: "Location",
    },
    {
      key: "status",
      title: "Status",
      render: (row) => (
        <Badge variant={carStatusVariant[row.status] || "warning"}>
          {carStatusLabel[row.status] || row.status || "Unknown"}
        </Badge>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      data={cars}
      emptyText="No cars found"
      renderActions={
        isAdmin
          ? (row) => (
              <CarActionsMenu
                car={row}
                onView={onView}
                onEdit={onEdit}
                onDelete={onDelete}
                onAddImage={onAddImage}
                onVD={onVD}
              />
            )
          : undefined
      }
    />
  );
}
