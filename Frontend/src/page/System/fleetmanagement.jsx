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
    CircularProgress,
    IconButton
} from "@mui/material";

import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";

import carService from "../../services/carService.js";
import carTypeService from "../../services/car_typeService.js";
import carImagesService from "../../services/car_imagesService.js";

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

export default function FleetManagement() {

    const [cars, setCars] = useState([]);

    const [carTypes, setCarTypes] = useState([]);

    const [imagesByListing, setImagesByListing] = useState({});

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    const [showModal, setShowModal] = useState(false);

    const [imageModal, setImageModal] = useState(false);

    const [videoModal, setVideoModal] = useState(false);

    const [selectedCar, setSelectedCar] = useState(null);

    const [selectedImages, setSelectedImages] = useState([]);

    const [selectedVideo, setSelectedVideo] = useState(null);

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

    const handleUploadImages = async () => {

        if (!selectedCar || !selectedImages.length)
            return;

        try {

            const formData = new FormData();

            selectedImages.forEach((file) => {

                formData.append("images", file);
            });

            formData.append(
                "listing_id",
                selectedCar.id
            );

            await carImagesService.uploadImages(
                formData
            );

            setImageModal(false);

            setSelectedImages([]);

            loadDashboardData();

        } catch (error) {

            console.error(error);
        }
    };

    const handleUploadVideo = async () => {

        if (!selectedCar || !selectedVideo)
            return;

        try {

            const formData = new FormData();

            formData.append(
                "video",
                selectedVideo
            );

            formData.append(
                "listing_id",
                selectedCar.id
            );

            await carService.uploadVideo(
                formData
            );

            setVideoModal(false);

            setSelectedVideo(null);

        } catch (error) {

            console.error(error);
        }
    };

    const enrichedCars = useMemo(() => {

        return cars.map((car) => ({

            ...car,

            status:
                car.status || "available",

            serviceStatus:
                Number(car.odometer) > 20000
                    ? "overdue"
                    : "upcoming",

            typeName:
                carTypes.find(
                    (type) =>
                        type.id === car.type_id
                )?.name || "Unknown",

            imageUrl:
                imagesByListing[car.id] ||
                placeholderImage,

            title:
                car.title ||
                `${car.brand} ${car.model}`
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

            {/* ERROR */}

            {
                error && (
                    <Paper
                        sx={{
                            p: 2,
                            mb: 3,
                            backgroundColor: "#fee2e2"
                        }}
                    >
                        <Typography color="error">
                            {error}
                        </Typography>
                    </Paper>
                )
            }

            {/* STATS */}

            <Grid
                container
                spacing={3}
                mb={4}
            >

                {
                    [
                        {
                            title: "Total Vehicles",
                            value: counts.total,
                            color: "#111827"
                        },
                        {
                            title: "Available",
                            value: counts.available,
                            color: "#16a34a"
                        },
                        {
                            title: "Rented",
                            value: counts.rented,
                            color: "#2563eb"
                        },
                        {
                            title: "Maintenance",
                            value: counts.maintenance,
                            color: "#ea580c"
                        }
                    ].map((item) => (

                        <Grid
                            item
                            xs={12}
                            md={3}
                            key={item.title}
                        >

                            <Card
                                sx={{
                                    borderRadius: "24px"
                                }}
                            >

                                <CardContent>

                                    <Typography color="text.secondary">
                                        {item.title}
                                    </Typography>

                                    <Typography
                                        variant="h3"
                                        fontWeight={800}
                                        mt={2}
                                        sx={{
                                            color: item.color
                                        }}
                                    >
                                        {item.value}
                                    </Typography>

                                </CardContent>

                            </Card>

                        </Grid>
                    ))
                }

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

                            <TableRow
                                sx={{
                                    backgroundColor: "#f9fafb"
                                }}
                            >

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

                                ) : filteredCars.length === 0 ? (

                                    <TableRow>

                                        <TableCell
                                            colSpan={5}
                                            align="center"
                                        >

                                            <Typography py={4}>
                                                No vehicles found
                                            </Typography>

                                        </TableCell>

                                    </TableRow>

                                ) : filteredCars.map((car) => (

                                    <TableRow
                                        key={car.id}
                                        hover
                                    >

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
                                                sx={{
                                                    borderRadius: "10px",
                                                    fontWeight: 700,
                                                    backgroundColor:
                                                        car.status === "available"
                                                            ? "#dcfce7"
                                                            : car.status === "rented"
                                                                ? "#dbeafe"
                                                                : "#fed7aa",
                                                    color:
                                                        car.status === "available"
                                                            ? "#166534"
                                                            : car.status === "rented"
                                                                ? "#1d4ed8"
                                                                : "#c2410c"
                                                }}
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
                                                flexWrap="wrap"
                                            >

                                                <Button
                                                    variant="outlined"
                                                    sx={{
                                                        borderRadius: "10px",
                                                        textTransform: "none"
                                                    }}
                                                >
                                                    View
                                                </Button>

                                                <IconButton
                                                    color="primary"
                                                    onClick={() => {

                                                        setSelectedCar(car);

                                                        setImageModal(true);
                                                    }}
                                                >
                                                    <AddPhotoAlternateIcon />
                                                </IconButton>

                                                <IconButton
                                                    color="secondary"
                                                    onClick={() => {

                                                        setSelectedCar(car);

                                                        setVideoModal(true);
                                                    }}
                                                >
                                                    <VideoLibraryIcon />
                                                </IconButton>

                                                <Button
                                                    variant="contained"
                                                    color="error"
                                                    onClick={() =>
                                                        handleDelete(car.id)
                                                    }
                                                    sx={{
                                                        borderRadius: "10px",
                                                        textTransform: "none"
                                                    }}
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

            {/* CREATE MODAL */}

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

            {/* IMAGE MODAL */}

            <Dialog
                open={imageModal}
                onClose={() => setImageModal(false)}
                maxWidth="sm"
                fullWidth
            >

                <DialogContent sx={{ p: 4 }}>

                    <Typography
                        variant="h6"
                        fontWeight={700}
                        mb={3}
                    >
                        Upload Images
                    </Typography>

                    <TextField
                        type="file"
                        fullWidth
                        inputProps={{
                            multiple: true,
                            accept: "image/*"
                        }}
                        onChange={(e) =>
                            setSelectedImages(
                                Array.from(e.target.files)
                            )
                        }
                    />

                    <Stack
                        direction="row"
                        spacing={2}
                        mt={3}
                    >

                        <Button
                            variant="contained"
                            onClick={handleUploadImages}
                        >
                            Upload
                        </Button>

                        <Button
                            onClick={() =>
                                setImageModal(false)
                            }
                        >
                            Cancel
                        </Button>

                    </Stack>

                </DialogContent>

            </Dialog>

            {/* VIDEO MODAL */}

            <Dialog
                open={videoModal}
                onClose={() => setVideoModal(false)}
                maxWidth="sm"
                fullWidth
            >

                <DialogContent sx={{ p: 4 }}>

                    <Typography
                        variant="h6"
                        fontWeight={700}
                        mb={3}
                    >
                        Upload Video
                    </Typography>

                    <TextField
                        type="file"
                        fullWidth
                        inputProps={{
                            accept: "video/*"
                        }}
                        onChange={(e) =>
                            setSelectedVideo(
                                e.target.files[0]
                            )
                        }
                    />

                    <Stack
                        direction="row"
                        spacing={2}
                        mt={3}
                    >

                        <Button
                            variant="contained"
                            onClick={handleUploadVideo}
                        >
                            Upload
                        </Button>

                        <Button
                            onClick={() =>
                                setVideoModal(false)
                            }
                        >
                            Cancel
                        </Button>

                    </Stack>

                </DialogContent>

            </Dialog>

        </Box>
    );
}