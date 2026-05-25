import express from "express";
import bookingController from "../controllers/bookingController.js";
import authMiddleware from "../middleware/customerMiddleware.js";

const router = express.Router();


router.get("/topbooked",bookingController.getTopBookedCars);


router.post("/", authMiddleware, bookingController.createBooking);

router.get("/customer/:id", authMiddleware, bookingController.getBookingsByUserId);

// router.get("/listing/:listingId", bookingController.getBookingsByListingId);
// router.get("/:id", authMiddleware, bookingController.getBookingById);
// router.put("/:id", authMiddleware, bookingController.updateBooking);
// router.delete("/:id", authMiddleware, bookingController.deleteBooking);

router.get("/", authMiddleware, bookingController.getAllBookings);

router.post("/check-availability",  bookingController.checkCarAvailability);


router.get("/top-customers",bookingController.getTopCustomers);

router.get("/recent-bookings",bookingController.getRecentBookings);
export default router;
