import { useParams } from "react-router-dom";

import BookingStatus from "~/components/BookingStatus";
import InfoBox from "~/components/InfoBox";

import useBookingDetail from "~/hooks/Booking/useBookingDetail";

import { formatDate, formatMoney } from "~/utils/format";

export default function BookingDetail() {
  const { id } = useParams();

  const {
    booking,
    loading,
    error,
  } = useBookingDetail(id);

  if (loading) {
    return (
      <p className="p-6">
        Loading booking...
      </p>
    );
  }

  if (error) {
    return (
      <p className="p-6 text-red-500">
        {error}
      </p>
    );
  }

  if (!booking) {
    return (
      <p className="p-6">
        Booking not found.
      </p>
    );
  }

  return (
    <section className="rounded-4xl bg-(--color-surface) p-6 shadow-(--shadow-lg)">
      <InfoBox
        title="Booking Detail"
        icon="receipt_long"
        className="border border-(--color-border)"
      >
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <div>
              <p className="text-sm text-(--color-text-muted)">
                Booking ID
              </p>

              <p className="font-semibold">
                {booking.bk_id}
              </p>
            </div>

            <div>
              <p className="text-sm text-(--color-text-muted)">
                Pickup Location
              </p>

              <p className="font-semibold">
                {booking.pickup_location}
              </p>
            </div>

            <div>
              <p className="text-sm text-(--color-text-muted)">
                Return Location
              </p>

              <p className="font-semibold">
                {booking.return_location}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-sm text-(--color-text-muted)">
                Start Date
              </p>

              <p className="font-semibold">
                {formatDate(booking.start_date)}
              </p>
            </div>

            <div>
              <p className="text-sm text-(--color-text-muted)">
                End Date
              </p>

              <p className="font-semibold">
                {formatDate(booking.end_date)}
              </p>
            </div>

            <div>
              <p className="text-sm text-(--color-text-muted)">
                Total Price
              </p>

              <p className="text-xl font-bold text-(--color-secondary)">
                {formatMoney(booking.total_price)}
              </p>
            </div>

            <div>
              <p className="mb-2 text-sm text-(--color-text-muted)">
                Status
              </p>

              <BookingStatus status={booking.status} />
            </div>
          </div>
        </div>
      </InfoBox>
    </section>
  );
}