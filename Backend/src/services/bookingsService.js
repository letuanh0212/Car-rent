import bookRepository from "../models/booking.js";

const BookService = {
    async createBook(data) {
        return await bookRepository.create(data);
    },
    async getAllBooks() {
        return await bookRepository.getAllBookings();
    },
    async updateBook(id, data) {
        return await bookRepository.update(id, data);
    },
    async deleteBook(id) {
        await bookRepository.delete(id);
        return;
    },
    async getBookingsByUserId(user_id) {
        return await bookRepository.getBookingsByUserId(user_id);
    },
    async getBookingsById(id) {
        return await bookRepository.getBookingById(id);
    },
    async checkAvailability(car_id, start_date, end_date) {
        return await bookRepository.checkCarAvailability(
            car_id,
            start_date,
            end_date
        );
    },
    async getTopBookedCars(limit) {
        return await bookRepository.getTopBooked(limit);
    },
    async getTopCustomers(limit) {
        return await bookRepository.getTopCustomers(limit);
    },
    async getRecentBookings(limit) {
        return await bookRepository.getRecentBookings(limit);
    },
};

export default BookService;