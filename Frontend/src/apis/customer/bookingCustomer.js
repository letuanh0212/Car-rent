import CusInstance from "~/apis/Client/axiosCusClient";

const BookingCustomer =    {
    async createBooking(data)  {
        try {
            const response = await CusInstance.post("/bookings", data);
            return response;
        }
        catch (error) {
            throw error;
        }


    },
    async getBookingDetails(bookingId) {
        try {
            const response = await CusInstance.get(`/bookings/${bookingId}`);
            return response;
        }
        catch (error) {
            throw error;
        }
    },
    async getBooikngsById(bookingId) {

            const response = await CusInstance.get(`/bookings/${bookingId}`);
            return response;

    },
    async checkCarAvailability(carId, startDate, endDate) {

            const response = await CusInstance.post("/bookings/check-availability", {
                carId,
                startDate,
                endDate,
            });
            return response;

    },
    async getBookingsByCustomerId(customerId) {

            const response = await CusInstance.get(`/bookings/customer/${customerId}`
            );

            return response;

    }
};

export default BookingCustomer;
