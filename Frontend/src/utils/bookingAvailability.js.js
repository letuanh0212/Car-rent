import { MAINTENANCE_DAYS } from "~/config/booking.constants";

export function addMaintenanceDays(dateValue) {
  const date = new Date(dateValue);
  date.setDate(date.getDate() + MAINTENANCE_DAYS);
  return date;
}

export function isBookingOverlap({
  checkIn,
  checkOut,
  bookedSlots = [],
}) {
  const startDate = new Date(checkIn);
  const endDate = new Date(checkOut);

  return bookedSlots.some((slot) => {
    const slotStart = new Date(slot.start_date);
    const slotBlockedEnd = addMaintenanceDays(slot.end_date);

    return startDate < slotBlockedEnd && endDate > slotStart;
  });
}