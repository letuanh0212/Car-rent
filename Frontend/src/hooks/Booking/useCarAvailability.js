import { useEffect, useMemo, useState } from "react";

import bookingApi from "~/apis/customer/bookingCustomer";

export default function useCarAvailability({
  carId,
  checkIn,
  checkOut,
}) {
  const [isAvailable, setIsAvailable] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!carId || !checkIn || !checkOut) {
      setIsAvailable(null);
      return;
    }

    const startDate = new Date(checkIn);
    const endDate = new Date(checkOut);

    if (endDate <= startDate) {
      setIsAvailable(false);
      return;
    }

    const checkAvailability = async () => {
      try {
        setLoading(true);

        const response =
          await bookingApi.checkCarAvailability(
            carId,
            checkIn,
            checkOut
          );

        setIsAvailable(Boolean(response?.data?.isAvailable));
      } catch (error) {
        console.error("Check availability error:", error);
        setIsAvailable(null);
      } finally {
        setLoading(false);
      }
    };

    checkAvailability();
  }, [carId, checkIn, checkOut]);

  const message = useMemo(() => {
    if (isAvailable === null) return "";

    if (isAvailable) {
      return "This time range is available.";
    }

    return "This car is already booked or in maintenance time.";
  }, [isAvailable]);

  return {
    loading,
    isAvailable,
    message,
  };
}
