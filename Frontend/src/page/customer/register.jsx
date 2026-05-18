import { useState } from "react";

import {
    TextField,
    Button,
    Paper,
    Typography,
    InputAdornment,
    IconButton,
    Box
} from "@mui/material";

import {
    Visibility,
    VisibilityOff
} from "@mui/icons-material";

import customerService from "../../services/customer.js";

export default function Register() {

    const [formData, setFormData] = useState({
        full_name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: ""
    });

    const [loading, setLoading] = useState(false);

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            alert("Password does not match");
            return;
        }

        try {
            setLoading(true);

            const payload = {
                full_name: formData.full_name,
                email: formData.email,
                phone: formData.phone,
                password: formData.password
            };

            await customerService.register(payload);

            alert("Register success");
            window.location.href = "/login";

        } catch (error) {
            alert(error.response?.data?.message || "Register failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{
            display: "flex",
            minHeight: "100vh"
        }}>

            {/* LEFT SIDE */}
            <Box sx={{
                flex: 1,
                backgroundImage: "url(https://images.unsplash.com/photo-1503376780353-7e6692767b70)",
                backgroundSize: "cover",
                backgroundPosition: "center",
                position: "relative"
            }}>

                <Box sx={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(180deg, rgba(0,0,0,0.4), rgba(0,0,0,0.8))"
                }} />

                <Box sx={{
                    position: "relative",
                    zIndex: 2,
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    px: 8,
                    color: "white"
                }}>
                    <Typography variant="h3" fontWeight="bold">
                        FleetDrive
                    </Typography>

                    <Typography sx={{ mt: 2, maxWidth: 400, opacity: 0.8 }}>
                        Tạo tài khoản để quản lý đội xe thông minh, tối ưu vận hành doanh nghiệp
                    </Typography>
                </Box>

            </Box>

            {/* RIGHT SIDE */}
            <Box sx={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#f8fafc"
            }}>

                <Paper sx={{
                    width: "100%",
                    maxWidth: 460,
                    p: 5,
                    borderRadius: 3,
                    boxShadow: "0 20px 60px rgba(0,0,0,0.1)"
                }}>

                    <Typography variant="h4" fontWeight="bold" textAlign="center">
                        Create account
                    </Typography>

                    <Typography textAlign="center" sx={{ mb: 4, color: "gray" }}>
                        Join FleetDrive today
                    </Typography>

                    <form style={{ display: "flex", flexDirection: "column", gap: 16 }} onSubmit={handleRegister}>

                        <TextField
                            label="Full name"
                            name="full_name"
                            fullWidth
                            value={formData.full_name}
                            onChange={handleChange}
                        />

                        <TextField
                            label="Email"
                            name="email"
                            type="email"
                            fullWidth
                            value={formData.email}
                            onChange={handleChange}
                        />

                        <TextField
                            label="Phone"
                            name="phone"
                            fullWidth
                            value={formData.phone}
                            onChange={handleChange}
                        />

                        {/* PASSWORD */}
                        <TextField
                            label="Password"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            fullWidth
                            value={formData.password}
                            onChange={handleChange}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={() => setShowPassword(!showPassword)}>
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />

                        {/* CONFIRM PASSWORD */}
                        <TextField
                            label="Confirm password"
                            name="confirmPassword"
                            type={showConfirm ? "text" : "password"}
                            fullWidth
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            error={
                                formData.confirmPassword &&
                                formData.password !== formData.confirmPassword
                            }
                            helperText={
                                formData.confirmPassword &&
                                formData.password !== formData.confirmPassword
                                    ? "Passwords do not match"
                                    : ""
                            }
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={() => setShowConfirm(!showConfirm)}>
                                            {showConfirm ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />

                        <Button
                            type="submit"
                            variant="contained"
                            disabled={loading}
                            sx={{
                                py: 1.5,
                                fontWeight: "bold",
                                borderRadius: 2,
                                background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
                                ":hover": {
                                    background: "linear-gradient(135deg, #1d4ed8, #1e40af)"
                                }
                            }}
                        >
                            {loading ? "Creating..." : "Register"}
                        </Button>

                        <Button
                            type="button"
                            onClick={() => window.location.href = "/login"}
                            variant="outlined"
                            sx={{
                                py: 1.3,
                                borderRadius: 2,
                                fontWeight: "bold"
                            }}
                        >
                            Back to login
                        </Button>

                    </form>

                </Paper>

            </Box>

        </Box>
    );
}