import { useEffect, useState } from "react";

import bookingApi from "~/apis/customer/bookingCustomer";

export default function useBookingDetail(id) {
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;

    const fetchBooking = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await bookingApi.getBookingDetails(id);
        const responseData = response.data;

        setBooking(responseData);
      } catch (err) {
        setError(
          err?.responseData?.data?.message ||
          "Failed to fetch booking"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchBooking();
  }, [id]);

  return {
    booking,
    loading,
    error,
  };
}