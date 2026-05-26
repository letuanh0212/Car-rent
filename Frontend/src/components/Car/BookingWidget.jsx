import { useMemo, useState } from "react";

import Button from "~/components/Button";
import Input from "~/components/Inputs";
import InputField from "~/components/Inputs/InputField";
import { formatCurrency } from "~/utils/currency";
import DateTimeField from "~/components/Inputs/DateTimeField";
import {getDateValue,formatBookingDate} from "~/utils/date";
import useCarAvailability from "~/store/slices/useCarAvailability";
import { calculateBookingPrice } from "~/utils/price";
import InfoBox from "../InfoBox";
import { useSelector } from "react-redux";

export default function BookingWidget({ car, onSubmit }) {
  const [checkIn, setCheckIn] = useState(getDateValue());
  const [checkOut, setCheckOut] = useState(getDateValue(1));
  const [returnLocation, setReturnLocation] = useState("");

  // Customer auth is registered in the Redux store under `customer`.
  const { user } = useSelector(
    (state) => state.customer || {}
  );

  const pricePerDay = Number(car?.price_per_day);
  const {
    isAvailable,
      message: availabilityMessage,
    } = useCarAvailability({
      carId: car?.id,
      checkIn,
      checkOut,
    });
    const priceSummary = useMemo(() => {
      return calculateBookingPrice({
        checkIn,
        checkOut,
        pricePerDay,
      });
    }, [checkIn, checkOut, pricePerDay]);

  if (!car) return null;

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isAvailable === false) {
      alert(availabilityMessage);
      return;
    }

    onSubmit?.({
      listing_id: car.id,
      start_date: formatBookingDate(checkIn),
      end_date: formatBookingDate(checkOut),
      pickup_location: car.location,
      return_location: returnLocation,
      total_price: priceSummary.total,
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

          <div className="text-right text-sm font-bold text-(--color-success)">
            Available
          </div>
        </div>

        <div className="space-y-4">
          <DateTimeField
            label="Check-in Date & Time"
            value={checkIn}
            onChange={setCheckIn}
            min={getDateValue()}
          />

          <DateTimeField
            label="Check-out Date & Time"
            value={checkOut}
            onChange={setCheckOut}
            min={checkIn}
          />

          <InputField label="Pickup Location">
            <Input
              type="text"
              value={car.location || ""}
              disabled
              className="bg-(--color-surface-lowest) text-(--color-text-secondary)"
            />
          </InputField>

          <InputField label="Return Location">
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-(--color-text-muted)">
                location_on
              </span>

              <Input
                type="text"
                value={returnLocation}
                onChange={(event) => setReturnLocation(event.target.value)}
                placeholder="Enter return location"
                className="pl-11"
                required
              />
            </div>
          </InputField>
          <div className="grid grid-cols-1 gap-4">
            <InfoBox
              title="Information"
              icon="person"
              className="col-span-1"
            >
              <div className="flex items-center gap-3 text-(--color-text-secondary)">
                <span className="material-symbols-outlined">badge</span>
                <span className="font-medium">{user?.full_name || "N/A"}</span>
              </div>

              <div className="flex items-center gap-3 text-(--color-text-secondary)">
                <span className="material-symbols-outlined">call</span>
                <span className="font-medium">{user?.phone || "N/A"}</span>
              </div>
            </InfoBox>
        </div>
        </div>
        <div className="space-y-3 border-t border-(--color-border) pt-6">
          <PriceRow
            label={`${formatCurrency(pricePerDay)} x ${priceSummary.days} day`}
            value={formatCurrency(priceSummary.subtotal)}
          />
          <div className="flex items-center justify-between pt-2 text-(--color-text-primary)">
            <span className="text-2xl font-bold">Total</span>
            <span className="text-2xl font-bold">
              {formatCurrency(priceSummary.total)}
            </span>
          </div>
        </div>
        { availabilityMessage && (
          <p className="text-sm font-semibold text-(--color-error)">
            {availabilityMessage}
          </p>
        )
        }
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

function PriceRow({ label, value }) {
  return (
    <div className="flex items-center justify-between text-(--color-text-secondary)">
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}
