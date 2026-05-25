import { useEffect, useState } from "react";

import BookingCustomer from "~/apis/customer/bookingCustomer";

export default function useCustomerBookings(customerId) {
  const [bookings, setBookings] = useState([]);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  useEffect(() => {
    if (!customerId) return;

    const fetchBookings = async () => {
      try {
        setLoading(true);

        setError("");

        const response =await BookingCustomer.getBookingsByCustomerId(customerId);

        setBookings(response);
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