import Button from "~/components/Button";
import InfoBox from "~/components/InfoBox";

import useCustomerBookings from "~/hooks/Booking/useGetALlBookingCus"
;
import { useSelector } from "react-redux";

export default function MyBookings() {
    const { user } = useSelector((state) => state.auth);
    const customerId = user?.id;
    const { bookings, loading, error, refetch } = useCustomerBookings(customerId);

  return (
    <section className="rounded-[32px] bg-[var(--color-surface)] p-6 shadow-[var(--shadow-lg)] md:p-8">
      <div className="mb-8 flex flex-col gap-4 rounded-2xl bg-[var(--color-surface-lowest)] p-6 shadow-[var(--shadow-sm)] md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-4xl font-bold text-[var(--color-text-primary)]">
            My Bookings
          </h1>

          <p className="mt-2 text-[var(--color-text-muted)]">
            View your car rental booking history.
          </p>
        </div>

        <Button
          type="button"
          variant="ghost"
          className="w-fit border border-[var(--color-border)] px-5"
          onClick={refetch}
        >
          <span className="material-symbols-outlined text-[20px]">
            refresh
          </span>
          Refresh
        </Button>
      </div>

      <InfoBox
        title="Booking List"
        icon="calendar_month"
        className="border border-[var(--color-border)] bg-[var(--color-surface-lowest)] shadow-[var(--shadow-sm)]"
      >
        {loading && (
          <p className="text-sm text-[var(--color-text-muted)]">
            Loading bookings...
          </p>
        )}

        {error && (
          <p className="text-sm font-semibold text-[var(--color-error)]">
            {error}
          </p>
        )}

        {!loading && !error && bookings.length === 0 && (
          <p className="text-sm text-[var(--color-text-muted)]">
            You have no bookings yet.
          </p>
        )}

        {!loading && !error && bookings.length > 0 && (
          <BookingTable bookings={bookings} />
        )}
      </InfoBox>
    </section>
  );
}

function BookingTable({ bookings }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[800px] text-left">
        <thead>
          <tr className="border-b border-[var(--color-border)] text-sm text-[var(--color-text-muted)]">
            <th className="px-4 py-3">Car</th>
            <th className="px-4 py-3">Start Date</th>
            <th className="px-4 py-3">End Date</th>
            <th className="px-4 py-3">Total</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3 text-right">Action</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-[var(--color-border)]">
          {bookings.map((booking) => (
            <tr
              key={booking.id}
              className="transition hover:bg-[var(--color-surface-low)]"
            >
              <td className="px-4 py-4 font-bold text-[var(--color-text-primary)]">
                {booking.car?.name ||
                  booking.carName ||
                  "Unknown Car"}
              </td>

              <td className="px-4 py-4 text-[var(--color-text-muted)]">
                {booking.startDate}
              </td>

              <td className="px-4 py-4 text-[var(--color-text-muted)]">
                {booking.endDate}
              </td>

              <td className="px-4 py-4 font-bold text-[var(--color-secondary)]">
                {booking.totalPrice}
              </td>

              <td className="px-4 py-4">
                <BookingStatus status={booking.status} />
              </td>

              <td className="px-4 py-4 text-right">
                <Button
                  type="button"
                  variant="ghost"
                  className="border border-[var(--color-border)] px-4"
                >
                  View
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function BookingStatus({ status }) {
  const value = status || "Pending";

  const className =
    value === "Confirmed"
      ? "bg-[var(--color-success-bg)] text-[var(--color-success)]"
      : value === "Cancelled"
      ? "bg-[var(--color-error-bg)] text-[var(--color-error)]"
      : "bg-[var(--color-warning-bg)] text-[var(--color-warning)]";

  return (
    <span
      className={[
        "rounded-full px-3 py-1 text-xs font-bold",
        className,
      ].join(" ")}
    >
      {value}
    </span>
  );
}