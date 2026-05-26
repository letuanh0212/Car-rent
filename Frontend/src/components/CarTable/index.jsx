import Table from "~/components/Table";
import Button from "~/components/Button";
// import 
export default function CarTable({
  cars = [],
  isAdmin = false,
  onEdit,
  onDelete,
  onAddImage,
}) {
  const columns = [
    {
      key: "title",
      title: "Car",
      render: (row) => (
        <div className="flex flex-col">
          <span className="font-semibold">
            {row.brand} {row.model}
          </span>

          <span className="text-xs text-(--color-text-muted)">
            {row.title}
          </span>
        </div>
      ),
    },

    {
      key: "license_plate",
      title: "Plate",
    },

    {
      key: "year",
      title: "Year",
    },

    {
      key: "seats",
      title: "Seats",
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
          {Number(row.mileage).toLocaleString()} km
        </span>
      ),
    },

    {
      key: "price_per_day",
      title: "Price / Day",
      render: (row) => (
        <span className="font-semibold text-(--color-primary)">
          {Number(row.price_per_day).toLocaleString()}₫
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
        <span
          className={[
            "rounded-full px-3 py-1 text-xs font-semibold capitalize",
            row.status === "available"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700",
          ].join(" ")}
        >
          {row.status}
        </span>
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
              <div className="flex justify-end gap-2">
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => onEdit?.(row)}
                >
                  Edit
                </Button>

                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => onAddImage?.(row)}
                >
                  Images
                </Button>

                <Button
                  size="sm"
                  variant="danger"
                  onClick={() => onDelete?.(row)}
                >
                  Delete
                </Button>
              </div>
            )
          : undefined
      }
    />
  );
}

