import { useEffect, useState } from "react";

import BookingCustomer from "~/apis/customer/bookingCustomer";

function getBookingsFromResponse(response) {
  if (Array.isArray(response)) return response;

  if (Array.isArray(response?.data)) return response.data;

  if (Array.isArray(response?.data?.data)) {
    return response.data.data;
  }

  return [];
}

export default function useGetAllBookingCus(customerId) {
  const [bookings, setBookings] = useState([]);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  useEffect(() => {
    if (!customerId) {
      setBookings([]);
      return;
    }

    const fetchBookings = async () => {
      try {
        setLoading(true);

        setError("");

        const response =
          await BookingCustomer.getBookingsByCustomerId(customerId);

        setBookings(getBookingsFromResponse(response));
      } catch (err) {
        setError(
          err?.message ||
            "Failed to fetch bookings"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [customerId]);

  return {
    bookings,
    loading,
    error,
  };
}
