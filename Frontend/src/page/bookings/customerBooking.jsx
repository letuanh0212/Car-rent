import { useEffect, useState } from "react";

import {
    Box,
    Typography,
    Paper,
    Chip,
    Grid,
    Button,
    Divider,
    CircularProgress,
    Avatar
} from "@mui/material";

import {
    DirectionsCar,
    CalendarMonth,
    LocationOn,
    Payments,
    ArrowForward,
    AccessTime
} from "@mui/icons-material";

import { useAuth } from "../../AuthContext.jsx";
import bookingsService from "../../services/bookingsService.js";
import { useNavigate } from "react-router-dom";

export default function CustomerBooking() {
    const navigate = useNavigate();

    const { user } = useAuth();

    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        if (!user?.id) return;

        fetchBookings();

    }, [user?.id]);

    const fetchBookings = async () => {

        try {

            setLoading(true);

            const response =
                await bookingsService.getBookingsByUserId(user.id);

            setBookings(
                response.data.data || response.data
            );

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);
        }
    };

    const getStatusStyle = (status) => {

        switch (status) {

            case "approved":
                return {
                    bg: "#dcfce7",
                    color: "#166534",
                    label: "Approved"
                };

            case "pending":
                return {
                    bg: "#fef3c7",
                    color: "#92400e",
                    label: "Pending"
                };

            case "cancelled":
                return {
                    bg: "#fee2e2",
                    color: "#991b1b",
                    label: "Cancelled"
                };

            default:
                return {
                    bg: "#e2e8f0",
                    color: "#334155",
                    label: "Processing"
                };
        }
    };

    const formatDate = (date) => {

        return new Date(date)
            .toLocaleDateString("vi-VN");
    };

    const formatPrice = (price) => {

        return Number(price)
            .toLocaleString("vi-VN");
    };

    if (loading) {

        return (

            <Box
                sx={{
                    minHeight: "100vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    background: "#f8fafc"
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
                py: 5,
                px: {
                    xs: 2,
                    md: 6
                }
            }}
        >

            {/* HEADER */}

            <Box
                sx={{
                    mb: 5
                }}
            >

                <Typography
                    variant="h4"
                    fontWeight={800}
                >
                    My Bookings
                </Typography>

                <Typography
                    sx={{
                        mt: 1,
                        color: "#64748b"
                    }}
                >
                    View and manage your vehicle reservations
                </Typography>

            </Box>

            {/* EMPTY */}

            {
                bookings.length === 0 && (

                    <Paper
                        sx={{
                            p: 8,
                            borderRadius: 5,
                            textAlign: "center",
                            background: "#fff"
                        }}
                    >

                        <DirectionsCar
                            sx={{
                                fontSize: 80,
                                color: "#cbd5e1",
                                mb: 2
                            }}
                        />

                        <Typography
                            variant="h5"
                            fontWeight="bold"
                        >
                            No Bookings Found
                        </Typography>

                        <Typography
                            sx={{
                                mt: 1,
                                color: "#64748b"
                            }}
                        >
                            Start renting your first car today
                        </Typography>

                    </Paper>
                )
            }

            {/* LIST */}

            <Grid
                container
                spacing={3}
            >

                {
                    bookings.map((booking) => {

                        const status =
                            getStatusStyle(booking.status);

                        return (

                            <Grid
                                item
                                xs={12}
                                key={booking.bk_id}
                            >

                                <Paper
                                    elevation={0}
                                    sx={{
                                        borderRadius: 6,
                                        overflow: "hidden",
                                        border:
                                            "1px solid #e2e8f0",

                                        transition:
                                            "0.3s",

                                        "&:hover": {
                                            transform:
                                                "translateY(-4px)",

                                            boxShadow:
                                                "0 10px 30px rgba(0,0,0,0.08)"
                                        }
                                    }}
                                >

                                    {/* TOP */}

                                    <Box
                                        sx={{
                                            p: 3,
                                            background:
                                                "#ffffff",

                                            display: "flex",
                                            justifyContent:
                                                "space-between",

                                            alignItems: "center",

                                            borderBottom:
                                                "1px solid #f1f5f9"
                                        }}
                                    >

                                        <Box
                                            sx={{
                                                display:
                                                    "flex",
                                                alignItems:
                                                    "center",
                                                gap: 2
                                            }}
                                        >

                                            <Avatar
                                                sx={{
                                                    bgcolor:
                                                        "#2563eb",

                                                    width: 55,
                                                    height: 55
                                                }}
                                            >

                                                <DirectionsCar />

                                            </Avatar>

                                            <Box>

                                                <Typography
                                                    fontWeight={
                                                        700
                                                    }
                                                    fontSize={
                                                        18
                                                    }
                                                >
                                                    Vehicle Booking
                                                </Typography>

                                                <Typography
                                                    variant="body2"
                                                    color="text.secondary"
                                                >
                                                    #{booking.bk_id}
                                                </Typography>

                                            </Box>

                                        </Box>

                                        <Chip
                                            label={
                                                status.label
                                            }

                                            sx={{
                                                bgcolor:
                                                    status.bg,

                                                color:
                                                    status.color,

                                                fontWeight:
                                                    700
                                            }}
                                        />

                                    </Box>

                                    {/* BODY */}

                                    <Box
                                        sx={{
                                            p: 4
                                        }}
                                    >

                                        <Grid
                                            container
                                            spacing={4}
                                        >

                                            {/* DATE */}

                                            <Grid
                                                item
                                                xs={12}
                                                md={4}
                                            >

                                                <Box
                                                    sx={{
                                                        display:
                                                            "flex",

                                                        gap: 2
                                                    }}
                                                >

                                                    <CalendarMonth
                                                        sx={{
                                                            color:
                                                                "#2563eb"
                                                        }}
                                                    />

                                                    <Box>

                                                        <Typography
                                                            fontWeight={
                                                                700
                                                            }
                                                        >
                                                            Rental Date
                                                        </Typography>

                                                        <Typography
                                                            color="text.secondary"
                                                        >
                                                            {
                                                                formatDate(
                                                                    booking.start_date
                                                                )
                                                            }

                                                            {" - "}

                                                            {
                                                                formatDate(
                                                                    booking.end_date
                                                                )
                                                            }
                                                        </Typography>

                                                    </Box>

                                                </Box>

                                            </Grid>

                                            {/* LOCATION */}

                                            <Grid
                                                item
                                                xs={12}
                                                md={4}
                                            >

                                                <Box
                                                    sx={{
                                                        display:
                                                            "flex",

                                                        gap: 2
                                                    }}
                                                >

                                                    <LocationOn
                                                        sx={{
                                                            color:
                                                                "#2563eb"
                                                        }}
                                                    />

                                                    <Box>

                                                        <Typography
                                                            fontWeight={
                                                                700
                                                            }
                                                        >
                                                            Pickup
                                                        </Typography>

                                                        <Typography
                                                            color="text.secondary"
                                                        >
                                                            {
                                                                booking.pickup_location
                                                            }
                                                        </Typography>

                                                    </Box>

                                                </Box>

                                            </Grid>

                                            {/* PRICE */}

                                            <Grid
                                                item
                                                xs={12}
                                                md={4}
                                            >

                                                <Box
                                                    sx={{
                                                        display:
                                                            "flex",

                                                        gap: 2
                                                    }}
                                                >

                                                    <Payments
                                                        sx={{
                                                            color:
                                                                "#2563eb"
                                                        }}
                                                    />

                                                    <Box>

                                                        <Typography
                                                            fontWeight={
                                                                700
                                                            }
                                                        >
                                                            Total Price
                                                        </Typography>

                                                        <Typography
                                                            fontWeight={
                                                                "bold"
                                                            }

                                                            sx={{
                                                                color:
                                                                    "#2563eb",

                                                                fontSize:
                                                                    20
                                                            }}
                                                        >
                                                            {
                                                                formatPrice(
                                                                    booking.total_price
                                                                )
                                                            } đ
                                                        </Typography>

                                                    </Box>

                                                </Box>

                                            </Grid>

                                        </Grid>

                                        <Divider
                                            sx={{
                                                my: 4
                                            }}
                                        />

                                        {/* FOOTER */}

                                        <Box
                                            sx={{
                                                display:
                                                    "flex",

                                                justifyContent:
                                                    "space-between",

                                                alignItems:
                                                    "center",

                                                flexWrap:
                                                    "wrap",

                                                gap: 2
                                            }}
                                        >

                                            <Box
                                                sx={{
                                                    display:
                                                        "flex",

                                                    alignItems:
                                                        "center",

                                                    gap: 1
                                                }}
                                            >

                                                <AccessTime
                                                    sx={{
                                                        fontSize:
                                                            18,

                                                        color:
                                                            "#64748b"
                                                    }}
                                                />

                                                <Typography
                                                    variant="body2"
                                                    color="text.secondary"
                                                >
                                                    Created:
                                                    {" "}
                                                    {
                                                        formatDate(
                                                            booking.created_at
                                                        )
                                                    }
                                                </Typography>

                                            </Box>

                                            <Box
                                                sx={{
                                                    display:
                                                        "flex",

                                                    gap: 2
                                                }}
                                            >

                                                <Button
                                                    variant="outlined"

                                                    endIcon={
                                                        <ArrowForward />
                                                    }

                                                    sx={{
                                                        borderRadius:
                                                            3,

                                                        textTransform:
                                                            "none",

                                                        px: 3
                                                    }}
                                                    onClick={() =>
                                                        navigate(
                                                            `/my-bookings/${booking.bk_id}`
                                                        )
                                                    }
                                                >
                                                    Details
                                                </Button>

                                                {
                                                    booking.status !==
                                                    "cancelled" && (

                                                        <Button
                                                            variant="contained"

                                                            color="error"

                                                            sx={{
                                                                borderRadius:
                                                                    3,

                                                                textTransform:
                                                                    "none",

                                                                px: 3
                                                            }}
                                                        >
                                                            Cancel
                                                        </Button>
                                                    )
                                                }

                                            </Box>

                                        </Box>

                                    </Box>

                                </Paper>

                            </Grid>
                        );
                    })
                }

            </Grid>

        </Box>
    );
}
