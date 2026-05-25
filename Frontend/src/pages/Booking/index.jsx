import { useSelector } from "react-redux";

import BookingStatus from "~/components/BookingStatus";
import Button from "~/components/Button";
import InfoBox from "~/components/InfoBox";
import Table from "~/components/Table";

import useGetAllBookingCus from "~/hooks/Booking/useGetAllBookingCus";
import { formatDate, formatMoney } from "~/utils/format";

export default function MyBookings() {
  const { user } = useSelector((state) => state.auth);

  const customerId = user?.id ;  

  const { bookings, loading, error } = useGetAllBookingCus(customerId);

  const columns = [
    {
      key: "bk_id",
      title: "Booking ID",
      render: (row) => (
        <span className="font-mono text-xs">
          {row.bk_id?.slice(0, 8)}...
        </span>
      ),
    },
    {
      key: "pickup_location",
      title: "Pickup",
    },
    {
      key: "return_location",
      title: "Return",
    },
    {
      key: "start_date",
      title: "Start Date",
      render: (row) => formatDate(row.start_date),
    },
    {
      key: "end_date",
      title: "End Date",
      render: (row) => formatDate(row.end_date),
    },
    {
      key: "total_price",
      title: "Total",
      render: (row) => (
        <span className="font-bold text-(--color-secondary)">
          {formatMoney(row.total_price)}
        </span>
      ),
    },
    {
      key: "status",
      title: "Status",
      render: (row) => (
        <BookingStatus status={row.status} />
      ),
    },
  ];

  return (
    <section className="rounded-4xl bg-(--color-surface) p-6 shadow-(--shadow-lg) md:p-8">
      <InfoBox
        title="My Bookings"
        icon="calendar_month"
        className="border border-(--color-border) bg-(--color-surface-lowest)"
      >
        {!customerId && (
          <p className="text-sm font-semibold text-(--color-error)">
            You need to login first.
          </p>
        )}

        {customerId && loading && (
          <p className="text-sm text-(--color-text-muted)">
            Loading bookings...
          </p>
        )}

        {customerId && error && (
          <p className="text-sm font-semibold text-(--color-error)">
            {error}
          </p>
        )}

        {customerId && !loading && !error && (
          <Table
            columns={columns}
            data={bookings}
            emptyText="You have no bookings yet."
            renderActions={(row) => (
              <Button
                type="button"
                variant="ghost"
                className="border border(--color-border) px-4"
                onClick={() => console.log(row)}
              >
                View
              </Button>
            )}
          />
        )}
      </InfoBox>
    </section>
  );
}
