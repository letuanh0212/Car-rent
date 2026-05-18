import {
    Box,
    Typography,
    Paper,
    Grid,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    LinearProgress
} from "@mui/material";
function Dashboard() {

    return (

        <Box
            sx={{
                minHeight: "100vh",
                background: "#f5f7fb",
                p: 4
            }}
        >
            {/* TITLE */}

            <Box mt={5}>

                <Typography
                    variant="h3"
                    fontWeight={800}
                >
                    Operational Overview
                </Typography>

                <Typography
                    mt={1}
                    color="text.secondary"
                    fontSize={18}
                >
                    Real-time performance metrics and fleet status summary.
                </Typography>

            </Box>

            {/* STATS */}

            <Grid
                container
                spacing={3}
                mt={2}
            >

                {/* CARD */}

                <Grid item xs={12} md={3}>

                    <Paper
                        elevation={0}
                        sx={{
                            p: 3,
                            borderRadius: "24px",
                            border: "1px solid #e4e4e7"
                        }}
                    >

                        <Typography color="text.secondary">
                            Total Revenue
                        </Typography>

                        <Typography
                            mt={2}
                            fontWeight={800}
                            fontSize={42}
                        >
                            $428,590
                        </Typography>

                        <Box mt={4}>

                            <LinearProgress
                                variant="determinate"
                                value={82}
                                sx={{
                                    height: 10,
                                    borderRadius: 999
                                }}
                            />

                        </Box>

                    </Paper>

                </Grid>

                {/* CARD */}

                <Grid item xs={12} md={3}>

                    <Paper
                        elevation={0}
                        sx={{
                            p: 3,
                            borderRadius: "24px",
                            border: "1px solid #e4e4e7"
                        }}
                    >

                        <Typography color="text.secondary">
                            Active Rentals
                        </Typography>

                        <Typography
                            mt={2}
                            fontWeight={800}
                            fontSize={42}
                        >
                            142
                        </Typography>

                        <Box mt={4}>

                            <LinearProgress
                                variant="determinate"
                                value={82}
                                sx={{
                                    height: 10,
                                    borderRadius: 999
                                }}
                            />

                        </Box>

                    </Paper>

                </Grid>

                {/* CARD */}

                <Grid item xs={12} md={3}>

                    <Paper
                        elevation={0}
                        sx={{
                            p: 3,
                            borderRadius: "24px",
                            border: "1px solid #e4e4e7"
                        }}
                    >

                        <Typography color="text.secondary">
                            In Maintenance
                        </Typography>

                        <Typography
                            mt={2}
                            fontWeight={800}
                            fontSize={42}
                        >
                            12
                        </Typography>

                        <Typography
                            mt={4}
                            color="error"
                            fontWeight={600}
                        >
                            3 urgent repairs pending
                        </Typography>

                    </Paper>

                </Grid>

                {/* CARD */}

                <Grid item xs={12} md={3}>

                    <Paper
                        elevation={0}
                        sx={{
                            p: 3,
                            borderRadius: "24px",
                            border: "1px solid #e4e4e7"
                        }}
                    >

                        <Typography color="text.secondary">
                            Available Fleet
                        </Typography>

                        <Typography
                            mt={2}
                            fontWeight={800}
                            fontSize={42}
                        >
                            24
                        </Typography>

                        <Typography
                            mt={4}
                            color="success.main"
                            fontWeight={600}
                        >
                            Ready for immediate pickup
                        </Typography>

                    </Paper>

                </Grid>

            </Grid>

            {/* CONTENT */}

            <Grid
                container
                spacing={3}
                mt={1}
            >

                {/* LEFT */}

                <Grid item xs={12} md={4}>

                    <Paper
                        elevation={0}
                        sx={{
                            p: 4,
                            borderRadius: "24px",
                            border: "1px solid #e4e4e7",
                            height: 500
                        }}
                    >

                        <Typography
                            variant="h5"
                            fontWeight={700}
                        >
                            Fleet Status
                        </Typography>

                        <Box
                            sx={{
                                mt: 8,
                                display: "flex",
                                justifyContent: "center"
                            }}
                        >

                            <Box
                                sx={{
                                    width: 220,
                                    height: 220,
                                    borderRadius: "50%",
                                    border: "22px solid #2563eb",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    flexDirection: "column"
                                }}
                            >

                                <Typography
                                    fontSize={52}
                                    fontWeight={800}
                                >
                                    178
                                </Typography>

                                <Typography color="text.secondary">
                                    TOTAL
                                </Typography>

                            </Box>

                        </Box>

                    </Paper>

                </Grid>

                {/* RIGHT */}

                <Grid item xs={12} md={8}>

                    <Paper
                        elevation={0}
                        sx={{
                            borderRadius: "24px",
                            border: "1px solid #e4e4e7",
                            overflow: "hidden"
                        }}
                    >

                        {/* HEADER */}

                        <Box
                            sx={{
                                p: 3,
                                borderBottom: "1px solid #e4e4e7",
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center"
                            }}
                        >

                            <Typography
                                variant="h5"
                                fontWeight={700}
                            >
                                Recent Bookings
                            </Typography>

                            <Button>
                                View All Bookings
                            </Button>

                        </Box>

                        {/* TABLE */}

                        <TableContainer>

                            <Table>

                                <TableHead>

                                    <TableRow>

                                        <TableCell>
                                            VEHICLE
                                        </TableCell>

                                        <TableCell>
                                            CUSTOMER
                                        </TableCell>

                                        <TableCell>
                                            PERIOD
                                        </TableCell>

                                        <TableCell>
                                            STATUS
                                        </TableCell>

                                        <TableCell>
                                            AMOUNT
                                        </TableCell>

                                    </TableRow>

                                </TableHead>

                                <TableBody>

                                    <TableRow>

                                        <TableCell>
                                            Tesla Model 3
                                        </TableCell>

                                        <TableCell>
                                            Michael Chen
                                        </TableCell>

                                        <TableCell>
                                            Oct 12 - Oct 15
                                        </TableCell>

                                        <TableCell>
                                            Rented
                                        </TableCell>

                                        <TableCell>
                                            $450
                                        </TableCell>

                                    </TableRow>

                                    <TableRow>

                                        <TableCell>
                                            BMW 5 Series
                                        </TableCell>

                                        <TableCell>
                                            Sarah Johnson
                                        </TableCell>

                                        <TableCell>
                                            Oct 14 - Oct 16
                                        </TableCell>

                                        <TableCell>
                                            Available
                                        </TableCell>

                                        <TableCell>
                                            $320
                                        </TableCell>

                                    </TableRow>

                                </TableBody>

                            </Table>

                        </TableContainer>

                    </Paper>

                </Grid>

            </Grid>

        </Box>

    );
}
export default Dashboard;