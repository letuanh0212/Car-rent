import { useEffect, useState } from "react";

import {
    Paper,
    Typography,
    TextField,
    Button,
    MenuItem,
    FormControl,
    InputLabel,
    Select
} from "@mui/material";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import cars from "../../services/car";
import carTypeService from "../../services/car_type";

export default function CreatedCar({ onSuccess }) {
    const [carTypes, setCarTypes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        type_id: "",
        owner_name: "",
        owner_phone: "",
        brand: "",
        model: "",
        year: "",
        license_plate: "",
        seat_count: "",
        transmission: "",
        fuel_type: "",
        odometer: "",
        title: "",
        description: "",
        price_per_day: "",
        location: ""
    });

    const fetchCarTypes = async () => {
        try {
            const response = await carTypeService.getAllCarTypes();
            setCarTypes(Array.isArray(response) ? response : []);
        } catch (error) {
            console.error("Fetch car types error:", error);
        }
    };

    useEffect(() => {
        const loadTypes = async () => {
            await fetchCarTypes();
        };

        loadTypes();
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!formData.type_id || !formData.brand || !formData.model || !formData.license_plate) {
            alert("Please complete the required fields before submitting.");
            return;
        }

        setLoading(true);
        try {
            await cars.createCar(formData);
            alert("Vehicle added successfully.");
            setFormData({
                type_id: "",
                owner_name: "",
                owner_phone: "",
                brand: "",
                model: "",
                year: "",
                license_plate: "",
                seat_count: "",
                transmission: "",
                fuel_type: "",
                odometer: "",
                title: "",
                description: "",
                price_per_day: "",
                location: ""
            });
            if (onSuccess) onSuccess();
        } catch (error) {
            console.error("Create car failed:", error);
            alert(error.response?.data?.message || "Unable to create vehicle.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mx-auto max-w-4xl">
            <Paper elevation={1} className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
                <Typography variant="h4" className="font-bold mb-4 text-zinc-900">
                    Create Car Listing
                </Typography>
                <Typography variant="body2" className="mb-6 text-sm text-zinc-500">
                    Fill in the details to add a new vehicle.
                </Typography>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-5 md:grid-cols-2">
                    <FormControl fullWidth>
                        <InputLabel id="car-type-label">Car Type</InputLabel>
                        <Select
                            labelId="car-type-label"
                            name="type_id"
                            value={formData.type_id}
                            label="Car Type"
                            onChange={handleChange}
                        >
                            <MenuItem value="">
                                <em>Select type</em>
                            </MenuItem>
                            {carTypes.map((type) => (
                                <MenuItem key={type.id} value={type.id}>
                                    {type.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <TextField
                        label="Owner Name"
                        name="owner_name"
                        value={formData.owner_name}
                        onChange={handleChange}
                        fullWidth
                    />

                    <TextField
                        label="Owner Phone"
                        name="owner_phone"
                        value={formData.owner_phone}
                        onChange={handleChange}
                        fullWidth
                    />

                    <TextField
                        label="Brand"
                        name="brand"
                        value={formData.brand}
                        onChange={handleChange}
                        fullWidth
                    />

                    <TextField
                        label="Model"
                        name="model"
                        value={formData.model}
                        onChange={handleChange}
                        fullWidth
                    />

                    <TextField
                        label="Year"
                        name="year"
                        type="number"
                        value={formData.year}
                        onChange={handleChange}
                        fullWidth
                    />

                    <TextField
                        label="License Plate"
                        name="license_plate"
                        value={formData.license_plate}
                        onChange={handleChange}
                        fullWidth
                    />

                    <TextField
                        label="Seat Count"
                        name="seat_count"
                        type="number"
                        value={formData.seat_count}
                        onChange={handleChange}
                        fullWidth
                    />

                    <FormControl fullWidth>
                        <InputLabel id="transmission-label">Transmission</InputLabel>
                        <Select
                            labelId="transmission-label"
                            name="transmission"
                            value={formData.transmission}
                            label="Transmission"
                            onChange={handleChange}
                        >
                            <MenuItem value="Automatic">Automatic</MenuItem>
                            <MenuItem value="Manual">Manual</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl fullWidth>
                        <InputLabel id="fuel-type-label">Fuel Type</InputLabel>
                        <Select
                            labelId="fuel-type-label"
                            name="fuel_type"
                            value={formData.fuel_type}
                            label="Fuel Type"
                            onChange={handleChange}
                        >
                            <MenuItem value="Gasoline">Gasoline</MenuItem>
                            <MenuItem value="Diesel">Diesel</MenuItem>
                            <MenuItem value="Electric">Electric</MenuItem>
                        </Select>
                    </FormControl>

                    <TextField
                        label="Odometer"
                        name="odometer"
                        type="number"
                        value={formData.odometer}
                        onChange={handleChange}
                        fullWidth
                    />

                    <TextField
                        label="Price Per Day"
                        name="price_per_day"
                        type="number"
                        value={formData.price_per_day}
                        onChange={handleChange}
                        fullWidth
                    />

                    <TextField
                        label="Location"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        fullWidth
                    />

                    <TextField
                        label="Title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        fullWidth
                        className="md:col-span-2"
                    />

                    <div className="md:col-span-2">
                        <Typography variant="subtitle1" className="mb-2 font-semibold">
                            Description
                        </Typography>
                        <ReactQuill
                            theme="snow"
                            value={formData.description}
                            onChange={(value) => setFormData((prev) => ({ ...prev, description: value }))}
                            className="bg-white"
                        />
                    </div>

                    <div className="md:col-span-2 mt-5">
                        <Button type="submit" variant="contained" size="large" disabled={loading} fullWidth>
                            {loading ? "Creating..." : "Create Car"}
                        </Button>
                    </div>
                </form>
            </Paper>
        </div>
    );
}
