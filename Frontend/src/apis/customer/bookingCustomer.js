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
        try {
            const response = await CusInstance.get(`/bookings/${bookingId}`);
            return response;
        }
        catch (error) {
            throw error;
        }
    },
    async checkCarAvailability(carId, startDate, endDate) {
        try {
            const response = await CusInstance.post("/bookings/check-availability", {
                carId,
                startDate,
                endDate,
            });
            return response;
        }
        catch (error) {
            throw error;
        }
    },
    async getBookingsByCustomerId(customerId) {
        try {
            const response = await CusInstance.get(`/bookings/customer/${customerId}`
            );

            return response;
        } catch (error) {
            throw error;
        }
    }
};

export default BookingCustomer;
