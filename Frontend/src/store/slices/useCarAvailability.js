import { useEffect, useMemo, useState } from "react";

import bookingApi from "~/apis/customer/bookingCustomer";
import  {isBookingOverlap}  from "~/utils/bookingAvailability.js"; 

export default function useCarAvailability({
  carId,
  checkIn,
  checkOut,
}) {
  const [bookedSlots, setBookedSlots] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!carId) return;

    const fetchBookedSlots = async () => {
      try {
        setLoading(true);

        const response =
          await bookingApi.checkCarAvailability(carId);

        setBookedSlots(response?.data?.data || []);
      } catch (error) {
        console.error("Fetch booked slots error:", error);
        setBookedSlots([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBookedSlots();
  }, [carId]);

  const isAvailable = useMemo(() => {
    if (!checkIn || !checkOut) return null;

    const startDate = new Date(checkIn);
    const endDate = new Date(checkOut);

    if (endDate <= startDate) return false;

    const overlap = isBookingOverlap({
      checkIn,
      checkOut,
      bookedSlots,
    });

    return !overlap;
  }, [checkIn, checkOut, bookedSlots]);

  const message = useMemo(() => {
    if (isAvailable === null) return "";

    if (isAvailable) {
      return "This time range is available.";
    }

    return "This car is already booked or in maintenance time.";
  }, [isAvailable]);

  return {
    bookedSlots,
    loading,
    isAvailable,
    message,
  };
}