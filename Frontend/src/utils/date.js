import {
  DEFAULT_PICKUP_HOUR,
  DEFAULT_PICKUP_MINUTE,
} from "~/config/booking.constants";

export function getDateValue(offsetDays = 0) {
  const date = new Date();

  date.setDate(date.getDate() + offsetDays);
  date.setHours(DEFAULT_PICKUP_HOUR, DEFAULT_PICKUP_MINUTE, 0, 0);

  return date.toISOString().slice(0, 16);
}

export function calculateRentalDays(startDate, endDate) {
  const start = new Date(startDate);
  const end = new Date(endDate);

  if (!startDate || !endDate || end <= start) {
    return 1;
  }

  const diff = end.getTime() - start.getTime();

  return Math.max(
    1,
    Math.ceil(diff / (1000 * 60 * 60 * 24))
  );
}

export function formatBookingDate(dateValue) {
  if (!dateValue) return null;

  return dateValue.replace("T", " ") + ":00";
}
