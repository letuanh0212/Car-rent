
import instance from "../api/api.js";

const bookingsService = {

    createBooking(data) {

        return instance.post(
            "/bookings",
            data
        );
    },

    getAllBookings() {

        return instance.get(
            "/bookings"
        );
    },

    getBookingsByUserId(userId) {
        return instance.get(
            `/bookings/customer/${userId}`
        );
    },

    getBookingsByListingId(listingId) {
        return instance.get(
            `/bookings/listing/${listingId}`
        );
    },

    getBookingById(id) {

        return instance.get(
            `/bookings/${id}`
        );
    },

    updateBooking(id, data) {

        return instance.put(
            `/bookings/${id}`,
            data
        );
    },

    deleteBooking(id) {

        return instance.delete(
            `/bookings/${id}`
        );
    },
    checkCarAvailability(car_id, start_date, end_date) {
        return instance.post(
            "/bookings/check-availability",
            { car_id, start_date, end_date }
        );
    }
};

export default bookingsService;