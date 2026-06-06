import BookService from "../services/bookingsService.js";

const bookingController = {

    async createBooking(req, res) {
        try {

            const user_id = req.customer.id;

            const {
                listing_id,
                start_date,
                end_date,
                pickup_location,
                return_location,
                total_price,
                status
            } = req.body;

            if (
                !listing_id ||
                !start_date ||
                !end_date
            ) {
                return res.status(400).json({
                    success: false,
                    message: "Missing required fields"
                });
            }

            const booking = await BookService.createBook({
                user_id,
                listing_id,
                start_date,
                end_date,
                pickup_location,
                return_location,
                total_price,
                status
            });

            return res.status(201).json({
                success: true,
                message: "Booking created successfully",
                data: booking
            });

        } catch (error) {

            console.log(error);

            if (
                error.message?.includes(
                    "Xe đã được đặt"
                )
            ) {
                return res.status(409).json({
                    success: false,
                    message: error.message
                });
            }

            return res.status(500).json({
                success: false,
                message: "Internal server error"
            });
        }
    },

    async getAllBookings(req, res) {
        try {

            const bookings =
                await BookService.getAllBooks();

            return res.status(200).json({
                success: true,
                data: bookings
            });

        } catch (error) {

            console.log(error);

            return res.status(500).json({
                success: false,
                message: "Internal server error"
            });
        }
    },

    async getBookingsByUserId(req, res) {
        try {

            const user_id = req.customer.id;

            const bookings =
                await BookService.getBookingsByUserId(
                    user_id
                );

            return res.status(200).json({
                success: true,
                data: bookings
            });

        } catch (error) {

            console.log(error);

            return res.status(500).json({
                success: false,
                message: "Internal server error"
            });
        }
    },
    async getBookingsById(req, res) {
        try {
            const { id } = req.params;
            const booking = await BookService.getBookingsById(id);
            return res.status(200).json({
                success: true,
                data: booking
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: "Internal server error"
            });
        }  
    },

    async checkCarAvailability(req, res) {
        try {

            const {
                car_id,
                carId,
                start_date,
                startDate,
                end_date,
                endDate
            } = {
                ...req.query,
                ...req.body
            };

            const listingId = car_id || carId;
            const bookingStartDate = start_date || startDate;
            const bookingEndDate = end_date || endDate;

            if (
                !listingId ||
                !bookingStartDate ||
                !bookingEndDate
            ) {
                return res.status(400).json({
                    success: false,
                    message: "Missing required fields"
                });
            }

            const isAvailable =
                await BookService.checkAvailability(
                    listingId,
                    bookingStartDate,
                    bookingEndDate
                );

            return res.status(200).json({
                success: true,
                data: { isAvailable }
            });

        } catch (error) {

            console.log(error);

            return res.status(500).json({
                success: false,
                message: "Internal server error"
            });
        }
    },

    async getTopBookedCars(req, res) {
        try {

            let limit =
                parseInt(req.query.limit);

            if (
                isNaN(limit) ||
                limit <= 0
            ) {
                limit = 5;
            }

            if (limit > 20) {
                limit = 20;
            }

            const data =
                await BookService.getTopBookedCars(
                    limit
                );

            return res.status(200).json({
                success: true,
                message:
                    "Get top booked cars successfully",
                data,
            });

        } catch (error) {

            console.log(error);

            return res.status(500).json({
                success: false,
                message:
                    error.message ||
                    "Get top booked cars failed",
            });
        }
    },
    async getTopCustomers(req, res) {
        try {

            let limit =
                parseInt(req.query.limit, 10);

            if (
                isNaN(limit) ||
                limit <= 0
            ) {
                limit = 5;
            }

            if (limit > 20) {
                limit = 20;
            }

            const data =
                await BookService.getTopCustomers(limit);

            return res.status(200).json({
                success: true,
                message:
                    "Get top customers successfully",
                data,
            });

        } catch (error) {

            return res.status(500).json({
                success: false,
                message:
                    error.message ||
                    "Get top customers failed",
            });

        }
    },
    async getRecentBookings(req, res) {
        try {

            let limit =
                parseInt(req.query.limit, 10);

            if (
                isNaN(limit) ||
                limit <= 0
            ) {
                limit = 10;
            }

            if (limit > 50) {
                limit = 50;
            }

            const data =
                await BookService.getRecentBookings(
                    limit
                );

            return res.status(200).json({
                success: true,
                message:
                    "Get recent bookings successfully",
                data,
            });

        } catch (error) {

            return res.status(500).json({
                success: false,
                message:
                    error.message ||
                    "Get recent bookings failed",
            });

        }
    },
};

export default bookingController;
