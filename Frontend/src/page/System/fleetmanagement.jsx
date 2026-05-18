import { useCallback, useEffect, useMemo, useState } from "react";

import {
    Box,
    Paper,
    Typography,
    Button,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    TableContainer,
    Chip,
    Stack,
    Dialog,
    DialogContent,
    Grid,
    Card,
    CardContent,
    CircularProgress
} from "@mui/material";

import carService from "../../services/car.js";
import carTypeService from "../../services/car_type.js";
import carImagesService from "../../services/car_images.js";

import CreatedCar from "../../components/board/createdCar.jsx";

const STATUS_OPTIONS = [
    { value: "all", label: "All Vehicles" },
    { value: "available", label: "Available" },
    { value: "rented", label: "Rented" },
    { value: "maintenance", label: "Maintenance" }
];

const SERVICE_OPTIONS = [
    { value: "all", label: "All Service" },
    { value: "upcoming", label: "Upcoming" },
    { value: "overdue", label: "Overdue" }
];

const placeholderImage =
    "https://via.placeholder.com/120x80.png?text=No+Image";

function normalizeStatus(car) {

    if (!car?.id) return "available";

    const index = Number(car.id) % 3;

    return ["available", "rented", "maintenance"][index];
}

function normalizeService(car) {

    if (!car?.id) return "upcoming";

    return Number(car.id) % 5 === 0
        ? "overdue"
        : "upcoming";
}

export default function FleetManagement() {

    const [cars, setCars] = useState([]);

    const [carTypes, setCarTypes] = useState([]);

    const [imagesByListing, setImagesByListing] = useState({});

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    const [showModal, setShowModal] = useState(false);

    const [filters, setFilters] = useState({
        status: "all",
        type: "all",
        service: "all",
        keyword: ""
    });

    const loadDashboardData = useCallback(async () => {

        setLoading(true);

        setError("");

        try {

            const [
                carsResponse,
                typesResponse,
                imagesResponse
            ] = await Promise.all([
                carService.getAllCars(),
                carTypeService.getAllCarTypes(),
                carImagesService.getAllCarImages()
            ]);

            const carList = carsResponse?.data ?? [];

            setCars(
                Array.isArray(carList)
                    ? carList
                    : []
            );

            setCarTypes(
                Array.isArray(typesResponse)
                    ? typesResponse
                    : []
            );

            const images = Array.isArray(imagesResponse)
                ? imagesResponse
                : [];

            const lookup = images.reduce((acc, image) => {

                if (image.listing_id) {

                    acc[image.listing_id] =
                        acc[image.listing_id] ||
                        image.image_url;
                }

                return acc;

            }, {});

            setImagesByListing(lookup);

        } catch (err) {

            console.error(err);

            setError(
                err.response?.data?.message ||
                "Unable to load vehicles."
            );

        } finally {

            setLoading(false);
        }

    }, []);

    useEffect(() => {

        loadDashboardData();

    }, [loadDashboardData]);

    const enrichedCars = useMemo(() => {

        return cars.map((car) => ({

            ...car,

            status: normalizeStatus(car),

            serviceStatus: normalizeService(car),

            typeName:
                carTypes.find(
                    (type) =>
                        Number(type.id) ===
                        Number(car.type_id)
                )?.name || "Unknown",

            imageUrl:
                imagesByListing[car.id] ||
                placeholderImage,

            title:
                car.title ||
                `${car.brand ?? ""} ${car.model ?? ""}`
        }));

    }, [cars, carTypes, imagesByListing]);

    const filteredCars = useMemo(() => {

        return enrichedCars.filter((car) => {

            const statusMatch =
                filters.status === "all" ||
                car.status === filters.status;

            const typeMatch =
                filters.type === "all" ||
                car.typeName === filters.type;

            const serviceMatch =
                filters.service === "all" ||
                car.serviceStatus === filters.service;

            const keyword =
                filters.keyword.toLowerCase();

            const searchMatch =
                !keyword ||
                car.title.toLowerCase().includes(keyword) ||
                (car.brand ?? "")
                    .toLowerCase()
                    .includes(keyword) ||
                (car.model ?? "")
                    .toLowerCase()
                    .includes(keyword);

            return (
                statusMatch &&
                typeMatch &&
                serviceMatch &&
                searchMatch
            );
        });

    }, [enrichedCars, filters]);

    const counts = useMemo(() => ({

        total: enrichedCars.length,

        available:
            enrichedCars.filter(
                (car) => car.status === "available"
            ).length,

        rented:
            enrichedCars.filter(
                (car) => car.status === "rented"
            ).length,

        maintenance:
            enrichedCars.filter(
                (car) => car.status === "maintenance"
            ).length

    }), [enrichedCars]);

    const handleDelete = async (id) => {

        if (!window.confirm("Delete this vehicle?"))
            return;

        try {

            await carService.deleteCar(id);

            loadDashboardData();

        } catch (error) {

            console.error(error);
        }
    };

    return (

        <Box>

            {/* HEADER */}

            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 4
                }}
            >

                <Box>

                    <Typography
                        variant="h4"
                        fontWeight={800}
                    >
                        Fleet Management
                    </Typography>

                    <Typography
                        color="text.secondary"
                        mt={1}
                    >
                        Manage and monitor your vehicles.
                    </Typography>

                </Box>

                <Button
                    variant="contained"
                    onClick={() => setShowModal(true)}
                    sx={{
                        borderRadius: "14px",
                        textTransform: "none",
                        px: 3,
                        py: 1.5
                    }}
                >
                    Add Vehicle
                </Button>

            </Box>

            {/* STATS */}

            <Grid
                container
                spacing={3}
                mb={4}
            >

                <Grid item xs={12} md={3}>

                    <Card
                        sx={{
                            borderRadius: "24px"
                        }}
                    >

                        <CardContent>

                            <Typography color="text.secondary">
                                Total Vehicles
                            </Typography>

                            <Typography
                                variant="h3"
                                fontWeight={800}
                                mt={2}
                            >
                                {counts.total}
                            </Typography>

                        </CardContent>

                    </Card>

                </Grid>

                <Grid item xs={12} md={3}>

                    <Card
                        sx={{
                            borderRadius: "24px"
                        }}
                    >

                        <CardContent>

                            <Typography color="text.secondary">
                                Available
                            </Typography>

                            <Typography
                                variant="h3"
                                fontWeight={800}
                                mt={2}
                                color="success.main"
                            >
                                {counts.available}
                            </Typography>

                        </CardContent>

                    </Card>

                </Grid>

                <Grid item xs={12} md={3}>

                    <Card
                        sx={{
                            borderRadius: "24px"
                        }}
                    >

                        <CardContent>

                            <Typography color="text.secondary">
                                Rented
                            </Typography>

                            <Typography
                                variant="h3"
                                fontWeight={800}
                                mt={2}
                                color="info.main"
                            >
                                {counts.rented}
                            </Typography>

                        </CardContent>

                    </Card>

                </Grid>

                <Grid item xs={12} md={3}>

                    <Card
                        sx={{
                            borderRadius: "24px"
                        }}
                    >

                        <CardContent>

                            <Typography color="text.secondary">
                                Maintenance
                            </Typography>

                            <Typography
                                variant="h3"
                                fontWeight={800}
                                mt={2}
                                color="warning.main"
                            >
                                {counts.maintenance}
                            </Typography>

                        </CardContent>

                    </Card>

                </Grid>

            </Grid>

            {/* FILTER */}

            <Paper
                sx={{
                    p: 3,
                    borderRadius: "24px",
                    mb: 4
                }}
            >

                <Grid
                    container
                    spacing={2}
                >

                    <Grid item xs={12} md={4}>

                        <TextField
                            fullWidth
                            label="Search"
                            placeholder="Search vehicles..."
                            value={filters.keyword}
                            onChange={(e) =>
                                setFilters({
                                    ...filters,
                                    keyword: e.target.value
                                })
                            }
                        />

                    </Grid>

                    <Grid item xs={12} md={2}>

                        <FormControl fullWidth>

                            <InputLabel>
                                Status
                            </InputLabel>

                            <Select
                                value={filters.status}
                                label="Status"
                                onChange={(e) =>
                                    setFilters({
                                        ...filters,
                                        status: e.target.value
                                    })
                                }
                            >

                                {
                                    STATUS_OPTIONS.map((item) => (

                                        <MenuItem
                                            key={item.value}
                                            value={item.value}
                                        >
                                            {item.label}
                                        </MenuItem>

                                    ))
                                }

                            </Select>

                        </FormControl>

                    </Grid>

                    <Grid item xs={12} md={3}>

                        <FormControl fullWidth>

                            <InputLabel>
                                Type
                            </InputLabel>

                            <Select
                                value={filters.type}
                                label="Type"
                                onChange={(e) =>
                                    setFilters({
                                        ...filters,
                                        type: e.target.value
                                    })
                                }
                            >

                                <MenuItem value="all">
                                    All Types
                                </MenuItem>

                                {
                                    carTypes.map((type) => (

                                        <MenuItem
                                            key={type.id}
                                            value={type.name}
                                        >
                                            {type.name}
                                        </MenuItem>

                                    ))
                                }

                            </Select>

                        </FormControl>

                    </Grid>

                    <Grid item xs={12} md={3}>

                        <FormControl fullWidth>

                            <InputLabel>
                                Service
                            </InputLabel>

                            <Select
                                value={filters.service}
                                label="Service"
                                onChange={(e) =>
                                    setFilters({
                                        ...filters,
                                        service: e.target.value
                                    })
                                }
                            >

                                {
                                    SERVICE_OPTIONS.map((item) => (

                                        <MenuItem
                                            key={item.value}
                                            value={item.value}
                                        >
                                            {item.label}
                                        </MenuItem>

                                    ))
                                }

                            </Select>

                        </FormControl>

                    </Grid>

                </Grid>

            </Paper>

            {/* TABLE */}

            <Paper
                sx={{
                    borderRadius: "24px",
                    overflow: "hidden"
                }}
            >

                <TableContainer>

                    <Table>

                        <TableHead>

                            <TableRow>

                                <TableCell>
                                    Vehicle
                                </TableCell>

                                <TableCell>
                                    Plate
                                </TableCell>

                                <TableCell>
                                    Status
                                </TableCell>

                                <TableCell>
                                    Service
                                </TableCell>

                                <TableCell>
                                    Actions
                                </TableCell>

                            </TableRow>

                        </TableHead>

                        <TableBody>

                            {
                                loading ? (

                                    <TableRow>

                                        <TableCell
                                            colSpan={5}
                                            align="center"
                                        >

                                            <CircularProgress />

                                        </TableCell>

                                    </TableRow>

                                ) : filteredCars.map((car) => (

                                    <TableRow key={car.id}>

                                        <TableCell>

                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    gap: 2
                                                }}
                                            >

                                                <img
                                                    src={car.imageUrl}
                                                    alt=""
                                                    style={{
                                                        width: 120,
                                                        height: 80,
                                                        borderRadius: 16,
                                                        objectFit: "cover"
                                                    }}
                                                />

                                                <Box>

                                                    <Typography
                                                        fontWeight={700}
                                                    >
                                                        {car.title}
                                                    </Typography>

                                                    <Typography
                                                        variant="body2"
                                                        color="text.secondary"
                                                    >
                                                        {car.typeName}
                                                    </Typography>

                                                </Box>

                                            </Box>

                                        </TableCell>

                                        <TableCell>
                                            {car.license_plate}
                                        </TableCell>

                                        <TableCell>

                                            <Chip
                                                label={car.status}
                                                color={
                                                    car.status === "available"
                                                        ? "success"
                                                        : car.status === "rented"
                                                            ? "info"
                                                            : "warning"
                                                }
                                            />

                                        </TableCell>

                                        <TableCell>

                                            <Chip
                                                label={car.serviceStatus}
                                                color={
                                                    car.serviceStatus === "overdue"
                                                        ? "error"
                                                        : "default"
                                                }
                                            />

                                        </TableCell>

                                        <TableCell>

                                            <Stack
                                                direction="row"
                                                spacing={1}
                                            >

                                                <Button
                                                    variant="outlined"
                                                >
                                                    View
                                                </Button>

                                                <Button
                                                    variant="contained"
                                                    color="error"
                                                    onClick={() =>
                                                        handleDelete(car.id)
                                                    }
                                                >
                                                    Delete
                                                </Button>

                                            </Stack>

                                        </TableCell>

                                    </TableRow>

                                ))
                            }

                        </TableBody>

                    </Table>

                </TableContainer>

            </Paper>

            {/* MODAL */}

            <Dialog
                open={showModal}
                onClose={() => setShowModal(false)}
                maxWidth="lg"
                fullWidth
            >

                <DialogContent
                    sx={{
                        p: 0
                    }}
                >

                    <CreatedCar
                        onSuccess={() => {

                            setShowModal(false);

                            loadDashboardData();
                        }}
                    />

                </DialogContent>

            </Dialog>

        </Box>
    );
}