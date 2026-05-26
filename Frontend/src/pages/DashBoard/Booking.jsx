import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import BookingStatus from "~/components/BookingStatus";
import Button from "~/components/Button";
import InfoBox from "~/components/InfoBox";
import Table from "~/components/Table";

import useGetAllBookings from "~/hooks/Booking/useGetAllBookings";

import { formatDate, formatMoney } from "~/utils/format";

export default function BookingManagement() {
  const navigate = useNavigate();

  const { bookings = [], loading, error } = useGetAllBookings();

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const totalPages = Math.ceil(bookings.length / pageSize);

  const paginatedBookings = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return bookings.slice(start, start + pageSize);
  }, [bookings, currentPage]);

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
      key: "full_name",
      title: "Customer",
      render: (row) => row.full_name || row.customer_name || "-",
    },
    {
      key: "car_title",
      title: "Car",
      render: (row) => row.car_title || row.title || "-",
    },
    {
      key: "pickup_location",
      title: "Pickup",
      render: (row) => row.pickup_location || "-",
    },
    {
      key: "return_location",
      title: "Return",
      render: (row) => row.return_location || "-",
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
      render: (row) => <BookingStatus status={row.status} />,
    },
  ];

  return (
    <section className="rounded-4xl bg-(--color-surface) p-6 shadow-(--shadow-lg) md:p-8">
      <InfoBox
        title="Bookings Management"
        icon="calendar_month"
        className="border border-(--color-border) bg-(--color-surface-lowest)"
      >
        {loading && (
          <p className="text-sm text-(--color-text-muted)">
            Loading bookings...
          </p>
        )}

        {error && (
          <p className="text-sm font-semibold text-(--color-error)">
            {error}
          </p>
        )}

      {!loading && !error && paginatedBookings.length > 0 && (
        <Table
          columns={columns}
          data={paginatedBookings}
          emptyText="No bookings found."
          renderActions={(row) => (
            <Button
              type="button"
              variant="ghost"
              className="border border-(--color-border) px-4"
              onClick={() => navigate(`/dashboard/bookings/${row.bk_id}`)}
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