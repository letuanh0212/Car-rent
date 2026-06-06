import express from "express";
import bookingController from "../controllers/bookingController.js";
import authMiddleware from "../middleware/customerMiddleware.js";
import accountMiddleware from "../middleware/accountMiddleware.js";
import requireAdmin from "../middleware/requireAdmin.js";
const router = express.Router();


router.get("/topbooked",bookingController.getTopBookedCars);

router.post("/", authMiddleware, bookingController.createBooking);
router.get("/customer/:id", authMiddleware, bookingController.getBookingsByUserId);
router.get("/check-availability",  bookingController.checkCarAvailability);
router.post("/check-availability",  bookingController.checkCarAvailability);
router.get("/top-customers",bookingController.getTopCustomers);
router.get("/recent-bookings",bookingController.getRecentBookings);
router.get("/:id", authMiddleware, bookingController.getBookingsById);
// router.get("/listing/:listingId", bookingController.getBookingsByListingId);

// router.put("/:id", authMiddleware, bookingController.updateBooking);
// router.delete("/:id", authMiddleware, bookingController.deleteBooking);


//admin routers
router.get("/",accountMiddleware,requireAdmin,  bookingController.getAllBookings);
export default router;
