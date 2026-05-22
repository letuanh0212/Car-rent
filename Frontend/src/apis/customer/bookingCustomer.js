import CusInstance from "~/apis/instance";

const BookingCustomer =    {
    async createBooking(data)  {
        try {
            const response = await CusInstance.post("/bookings", data);
            return response.data;
        }
        catch (error) {
            throw error.response?.data || new Error("Failed to create booking");
        }


    },
    async getBookingDetails(bookingId) {
        try {
            const response = await CusInstance.get(`/bookings/${bookingId}`);
            return response.data;
        }
        catch (error) {
            throw error.response?.data || new Error("Failed to fetch booking details");
        }
    }
};

export default BookingCustomer;