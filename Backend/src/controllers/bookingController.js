import bookingRepository from "../models/booking.js";

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

            const booking = await bookingRepository.create({
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

            return res.status(500).json({
                success: false,
                message: "Internal server error"
            });

        }
    },

    async getAllBookings(req, res) {

        try {

            const bookings =
                await bookingRepository.getAllBookings();

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

    async getBookingById(req, res) {

        try {

            const { id } = req.params;

            const booking =
                await bookingRepository.findById(id);

            if (!booking) {

                return res.status(404).json({
                    success: false,
                    message: "Booking not found"
                });

            }

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

    async updateBooking(req, res) {

        try {

            const { id } = req.params;

            const booking =
                await bookingRepository.findById(id);

            if (!booking) {

                return res.status(404).json({
                    success: false,
                    message: "Booking not found"
                });

            }

            const updatedBooking =
                await bookingRepository.update(
                    id,
                    req.body
                );

            return res.status(200).json({
                success: true,
                message: "Booking updated successfully",
                data: updatedBooking
            });

        } catch (error) {

            console.log(error);

            return res.status(500).json({
                success: false,
                message: "Internal server error"
            });

        }
    },

    async deleteBooking(req, res) {

        try {

            const { id } = req.params;

            const booking =
                await bookingRepository.findById(id);

            if (!booking) {

                return res.status(404).json({
                    success: false,
                    message: "Booking not found"
                });

            }

            await bookingRepository.delete(id);

            return res.status(200).json({
                success: true,
                message: "Booking deleted successfully"
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
            const bookings = await bookingRepository.getBookingsByUserId(user_id);
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
    }


};

export default bookingController;