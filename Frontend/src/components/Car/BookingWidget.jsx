import { useMemo, useState } from "react";

import Button from "~/components/Button";
import Input from "~/components/Inputs";

import { formatCurrency } from "~/utils/currency";

const insuranceFee = 45000;

function getDateValue(offsetDays = 0) {
  const date = new Date();
  date.setDate(date.getDate() + offsetDays);
  date.setHours(10, 0, 0, 0);

  return date.toISOString().slice(0, 16);
}

function calculateRentalDays(startDate, endDate) {
  const start = new Date(startDate);
  const end = new Date(endDate);

  if (!startDate || !endDate || end <= start) {
    return 1;
  }

  const diff = end.getTime() - start.getTime();

  return Math.max(
    1,
    Math.ceil(diff / (1000 * 60 * 60 * 24))
  );
}

export default function BookingWidget({
  car,
  onSubmit,
}) {
  const [checkIn, setCheckIn] = useState(getDateValue());
  const [checkOut, setCheckOut] = useState(getDateValue(1));

  const pricePerDay = Number(car?.price_per_day || 0);

  const priceSummary = useMemo(() => {
    const days = calculateRentalDays(checkIn, checkOut);
    const subtotal = days * pricePerDay;
    const total = subtotal + insuranceFee;

    return {
      days,
      subtotal,
      total,
    };
  }, [checkIn, checkOut, pricePerDay]);

  if (!car) return null;

  const handleSubmit = (event) => {
    event.preventDefault();

    onSubmit?.({
      carId: car.id,
      checkIn,
      checkOut,
      days: priceSummary.days,
      subtotal: priceSummary.subtotal,
      insuranceFee,
      total: priceSummary.total,
    });
  };

  return (
    <aside className="lg:sticky lg:top-24">
      <form
        onSubmit={handleSubmit}
        className="space-y-6 rounded-2xl border border-(--color-border) bg-(--color-surface-lowest) p-6 shadow-xl md:p-8"
      >
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-3xl font-bold text-(--color-secondary)">
              {formatCurrency(pricePerDay)}
            </p>
            <p className="text-sm font-semibold text-(--color-text-secondary)">
              per day
            </p>
          </div>

          <div className="text-right text-sm font-bold text-emerald-600">
            Available
          </div>
        </div>

        <div className="space-y-4">
          <DateField
            label="Check-in Date & Time"
            value={checkIn}
            onChange={setCheckIn}
          />

          <DateField
            label="Check-out Date & Time"
            value={checkOut}
            onChange={setCheckOut}
          />
        </div>

        <div className="space-y-3 border-t border-(--color-border) pt-6">
          <PriceRow
            label={`${formatCurrency(pricePerDay)} x ${priceSummary.days} day`}
            value={formatCurrency(priceSummary.subtotal)}
          />

          <PriceRow
            label="Insurance & Fees"
            value={formatCurrency(insuranceFee)}
          />

          <div className="flex items-center justify-between pt-2 text-(--color-text-primary)">
            <span className="text-2xl font-bold">Total</span>
            <span className="text-2xl font-bold">
              {formatCurrency(priceSummary.total)}
            </span>
          </div>
        </div>

        <Button
          type="submit"
          variant="secondary"
          fullWidth
          className="min-h-14 rounded-xl text-base"
        >
          Rent This Car
        </Button>

        <p className="text-center text-sm font-semibold text-(--color-text-secondary)">
          You will not be charged yet.
        </p>
      </form>
    </aside>
  );
}

function DateField({
  label,
  value,
  onChange,
}) {
  return (
    <label className="block space-y-2">
      <span className="text-sm font-semibold text-(--color-text-secondary)">
        {label}
      </span>

      <div className="relative">
        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-(--color-text-muted)">
          calendar_today
        </span>

        <Input
          type="datetime-local"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="pl-11"
        />
      </div>
    </label>
  );
}

function PriceRow({ label, value }) {
  return (
    <div className="flex items-center justify-between text-(--color-text-secondary)">
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}
