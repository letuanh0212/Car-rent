import {
  DEFAULT_BOOKING_STATUS,
  bookingStatusClassName,
} from "~/config/bookingStatus";

export default function BookingStatus({ status }) {
  const value = status || DEFAULT_BOOKING_STATUS;

  const className =
    bookingStatusClassName[value] ||
    bookingStatusClassName[DEFAULT_BOOKING_STATUS];

  return (
    <span
      className={[
        "rounded-full px-3 py-1 text-xs font-bold capitalize",
        className,
      ].join(" ")}
    >
      {value}
    </span>
  );
}
