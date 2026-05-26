import { useSelector } from "react-redux";

import BookingStatus from "~/components/BookingStatus";
import Button from "~/components/Button";
import InfoBox from "~/components/InfoBox";
import Table from "~/components/Table";
import { useNavigate } from "react-router-dom";

import useGetAllBookingCus from "~/hooks/Booking/useGetAllBookingByCus";
import { formatDate, formatMoney } from "~/utils/format";
import { useMemo, useState } from "react";

export default function MyBookings() {

  // Customer auth is registered in the Redux store under `customer`.
  const { user } = useSelector((state) => state.customer || {});
  const customerId = user?.id ;  
  const navigate = useNavigate();
  const { bookings, loading, error } = useGetAllBookingCus(customerId);

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
            data={paginatedBookings}
            emptyText="You have no bookings yet."
            renderActions={(row) => (
              <Button
                type="button"
                variant="ghost"
                className="border border-(--color-border) px-4"
                onClick={() => navigate(`/booking/${row.bk_id}`)}
              >
                View
              </Button>
            )}
          />
        )}
        {totalPages > 1 && (
          <div className="mt-6 flex items-center justify-between">
            <Button
              type="button"
              variant="ghost"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((page) => page - 1)}
            >
              Previous
            </Button>

            <span className="text-sm text-(--color-text-muted)">
              Page {currentPage} of {totalPages}
            </span>

            <Button
              type="button"
              variant="ghost"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((page) => page + 1)}
            >
              Next
            </Button>
          </div>
        )}
      </InfoBox>
    </section>
  );
}
