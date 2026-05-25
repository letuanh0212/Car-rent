import CusInstance from "~/apis/Client/axiosCusClient";

const BookingCustomer =    {
    async createBooking(data)  {
        try {
            const response = await CusInstance.post("/bookings", data);
            return response;
        }
        catch (error) {
            throw error.response?.data || new Error("Failed to create booking");
        }


    },
    async getBookingDetails(bookingId) {
        try {
            const response = await CusInstance.get(`/bookings/${bookingId}`);
            return response;
        }
        catch (error) {
            throw error.response?.data || new Error("Failed to fetch booking details");
        }
    },
    async checkCarAvailability(carId, startDate, endDate) {
        try {
            const response = await CusInstance.get("/bookings/check-availability", {
                params: { carId, startDate, endDate },
            });
            return response;
        }
        catch (error) {
            throw error.response?.data || new Error("Failed to check car availability");
        }
    },
    async getBookingsByCustomerId(customerId) {
        try {
            const response = await CusInstance.get(`/bookings/customer/${customerId}`
            );

            return response.data;
        } catch (error) {
            throw (
            error.response?.data ||
            new Error("Failed to fetch customer bookings")
            );
        }
    }
};

export default BookingCustomer;
