const specs = [
  {
    label: "Brand",
    icon: "directions_car",
    getValue: (car) => car.brand,
  },
  {
    label: "Model",
    icon: "drive_eta",
    getValue: (car) => car.model,
  },
  {
    label: "Year",
    icon: "event",
    getValue: (car) => car.year,
  },
  {
    label: "Transmission",
    icon: "settings_suggest",
    getValue: (car) => car.transmission,
  },
  {
    label: "Fuel Type",
    icon: "local_gas_station",
    getValue: (car) => car.fuel_type,
  },
  {
    label: "Seats",
    icon: "airline_seat_recline_extra",
    getValue: (car) =>
      car.seat_count ? `${car.seat_count} seats` : null,
  },
  {
    label: "Odometer",
    icon: "speed",
    getValue: (car) =>
      car.odometer ? `${car.odometer.toLocaleString()} km` : null,
  },
  {
    label: "Location",
    icon: "location_on",
    getValue: (car) => car.location,
  },
];
import InfoBox from "../InfoBox";
export default function DetailInfo({ car }) {
  if (!car) return null;

  return (
    <div className="space-y-10">
      <section className="space-y-3">
        <h1 className="text-4xl font-bold leading-tight text-(--color-text-primary)">
          {car.title || `${car.brand} ${car.model}`}
        </h1>

        {car.description && (
          <p className="max-w-3xl text-lg leading-7 text-(--color-text-secondary)">
            {car.description}
          </p>
        )}
      </section>

        <div className="grid grid-cols-1 gap-4">
            <InfoBox
              title="Owner Information"
              icon="person"
              className="col-span-1"
            >
              <div className="flex items-center gap-3 text-gray-700">
                <span className="material-symbols-outlined">badge</span>
                <span className="font-medium">{car.owner_name || "N/A"}</span>
              </div>

              <div className="flex items-center gap-3 text-gray-700">
                <span className="material-symbols-outlined">call</span>
                <span className="font-medium">{car.owner_phone || "N/A"}</span>
              </div>
            </InfoBox>
        </div>

      <section className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {specs.map((spec) => {
          const value = spec.getValue(car);

          if (!value) return null;

          return (
            <SpecCard
              key={spec.label}
              icon={spec.icon}
              label={spec.label}
              value={value}
            />
          );
        })}
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-(--color-text-primary)">
          Vehicle Details
        </h2>

        <p className="text-base leading-7 text-(--color-text-secondary)">
          {car.description ||
            "This vehicle is available for rental. Check the booking panel for date availability and estimated pricing."}
        </p>
      </section>
    </div>
  );
}

function SpecCard({ icon, label, value }) {
  return (
    <div className="flex min-h-32 flex-col items-center justify-center rounded-xl border border-(--color-border) bg-(--color-surface-low) p-4 text-center">
      <span className="material-symbols-outlined mb-2 text-3xl text-(--color-secondary)">
        {icon}
      </span>

      <span className="text-sm font-semibold text-(--color-text-secondary)">
        {label}
      </span>

      <span className="mt-1 font-bold text-(--color-text-primary)">
        {value}
      </span>
    </div>
  );
}
