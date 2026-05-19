import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import {
    Box,
    Typography,
    Paper,
    TextField,
    Button,
    CircularProgress
} from "@mui/material";

import bookingsService from "../../services/bookingsService.js";

export default function EditMyBooking() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);

    const [booking, setBooking] = useState({
        start_date: "",
        end_date: "",
        pickup_location: "",
        return_location: "",
        total_price: 0
    });

    const [totalDays, setTotalDays] = useState(0);

    const calculateDays = (start, end) => {
        if (!start || !end) return 0;

        const diff =
            new Date(end) - new Date(start);

        return Math.max(
            0,
            Math.floor(diff / (1000 * 60 * 60 * 24))
        );
    };

    useEffect(() => {
        fetchBooking();
    }, [id]);

    const fetchBooking = async () => {
        try {
            setLoading(true);

            const res = await bookingsService.getBookingById(id);

            const data = res.data.data;

            setBooking({
                start_date: data.start_date?.slice(0, 16),
                end_date: data.end_date?.slice(0, 16),
                pickup_location: data.pickup_location,
                return_location: data.return_location,
                total_price: data.total_price
            });

        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const days = calculateDays(
            booking.start_date,
            booking.end_date
        );

        setTotalDays(days);
    }, [booking.start_date, booking.end_date]);

    const handleChange = (e) => {
        setBooking({
            ...booking,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (new Date(booking.end_date) <= new Date(booking.start_date)) {
                alert("Ngày trả phải lớn hơn ngày nhận");
                return;
            }

            await bookingsService.updateBooking(id, booking);

            alert("Cập nhật thành công!");

            navigate("/my-bookings");

        } catch (err) {
            console.log(err);
            alert("Cập nhật thất bại");
        }
    };

    if (loading) {
        return (
            <Box
                sx={{
                    minHeight: "100vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}
            >
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box
            sx={{
                minHeight: "100vh",
                background: "#f8fafc",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                p: 3
            }}
        >
            <Paper
                sx={{
                    width: "100%",
                    maxWidth: 600,
                    p: 4,
                    borderRadius: 4
                }}
            >
                <Typography variant="h5" fontWeight={700} mb={3}>
                    Edit Booking
                </Typography>

                {/* START */}
                <TextField
                    fullWidth
                    type="datetime-local"
                    name="start_date"
                    value={booking.start_date}
                    onChange={handleChange}
                    sx={{ mb: 2 }}
                />

                {/* END */}
                <TextField
                    fullWidth
                    type="datetime-local"
                    name="end_date"
                    value={booking.end_date}
                    onChange={handleChange}
                    sx={{ mb: 2 }}
                />

                {/* PICKUP */}
                <TextField
                    fullWidth
                    name="pickup_location"
                    value={booking.pickup_location}
                    onChange={handleChange}
                    label="Pickup location"
                    sx={{ mb: 2 }}
                />

                {/* RETURN */}
                <TextField
                    fullWidth
                    name="return_location"
                    value={booking.return_location}
                    onChange={handleChange}
                    label="Return location"
                    sx={{ mb: 2 }}
                />

                {/* INFO */}
                <Box
                    sx={{
                        background: "#f1f5f9",
                        p: 2,
                        borderRadius: 2,
                        mb: 2
                    }}
                >
                    <Typography>
                        Total Days: <b>{totalDays}</b>
                    </Typography>
                </Box>

                {/* BUTTON */}
                <Button
                    fullWidth
                    variant="contained"
                    onClick={handleSubmit}
                    sx={{
                        py: 1.5,
                        borderRadius: 2
                    }}
                >
                    Update Booking
                </Button>
            </Paper>
        </Box>
    );
}