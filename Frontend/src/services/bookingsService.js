
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

    getMyBookings() {

        return instance.get(
            "/bookings/my-bookings"
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
    }

};

export default bookingsService;