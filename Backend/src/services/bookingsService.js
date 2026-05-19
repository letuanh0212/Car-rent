import bookRepository from "../repositories/bookRepository.js";
const BookService = {
    async createBook(data) {
        try {
            const newBook = await bookRepository.create(data);
            return newBook;
        } catch (err) {
            throw err;
        }
    },
    async getAllBooks() {
        try {
            const books = await bookRepository.getAllBooks();
            return books;
        } catch (err) {
            throw err;
        }
    },
    // async getBookById(id) {
    //     try {
    //         const book = await bookRepository.getBookById(id);
    //         return book;
    //     } catch (err) {
    //         throw err;
    //     }
    // },
    async updateBook(id, data) {
        try {
            const updatedBook = await bookRepository.update(id, data);
            return updatedBook;
        } catch (err) {
            throw err;
        }
    },
    async deleteBook(id) {
        try {
            await bookRepository.delete(id);
            return;
        } catch (err) {
            throw err;
        }
    },
    async getBookingsByUserId(user_id) {
        try {
            const bookings = await bookingRepository.getBookingsByUserId(user_id);
            return bookings;
        } catch (err) {
            throw err;
        }
    }
};
export default BookService;
