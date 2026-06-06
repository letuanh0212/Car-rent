import {calculateRentalDays} from './date';

export function calculateBookingPrice({
  checkIn,
  checkOut,
  pricePerDay,
}) {
  const days = calculateRentalDays(checkIn, checkOut);
  const subtotal = days * pricePerDay;
  const total = subtotal;

  return {
    days,
    subtotal,
    total,
  };
}