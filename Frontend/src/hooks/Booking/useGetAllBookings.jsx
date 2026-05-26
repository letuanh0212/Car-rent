import { useEffect, useState } from "react";

import bookingAccount from "~/apis/admin/bookingAccount";

export default function useGetAllBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);

        const response =
          await bookingAccount.getAllBookings();

        // console.log(response);

        setBookings(response.data || []);
      } catch (err) {
        setError(
          err?.response?.data?.message ||
          "Failed to fetch bookings"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  return {
    bookings,
    loading,
    error,
  };
}