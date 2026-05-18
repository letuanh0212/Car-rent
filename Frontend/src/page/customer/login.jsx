import { useState, useEffect } from "react";

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

import { useNavigate } from "react-router-dom";
import { useAuth } from "../../AuthContext";

export default function Login() {

    const navigate = useNavigate();
    const { login, isAuthenticated } = useAuth();

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/");
        }
    }, [isAuthenticated, navigate]);

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [loading, setLoading] = useState(false);

    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };

    const handleLogin = async (e) => {

        e.preventDefault();

        try {

            setLoading(true);

            await login(formData.email, formData.password);

            alert("Login success");

            navigate("/");

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Login failed"
            );

        } finally {

            setLoading(false);

        }
    };

    return (

        <Box
            sx={{
                display: "flex",
                minHeight: "100vh"
            }}
        >

            {/* LEFT */}
            <Box
                sx={{
                    flex: 1,
                    backgroundImage:
                        "url(https://images.unsplash.com/photo-1503376780353-7e6692767b70)",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    position: "relative"
                }}
            >

                {/* overlay */}
                <Box
                    sx={{
                        position: "absolute",
                        inset: 0,
                        background:
                            "linear-gradient(180deg, rgba(0,0,0,0.4), rgba(0,0,0,0.8))"
                    }}
                />

                {/* text */}
                <Box
                    sx={{
                        position: "relative",
                        zIndex: 2,
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        px: 8,
                        color: "white"
                    }}
                >

                    <Typography
                        variant="h3"
                        fontWeight="bold"
                    >
                        FleetDrive
                    </Typography>

                    <Typography
                        sx={{
                            mt: 2,
                            maxWidth: 400,
                            opacity: 0.8
                        }}
                    >
                        Chuyên cho thuê xe tự lái,
                        xe du lịch, xe hơi giá rẻ,
                        uy tín, nhanh chóng
                    </Typography>

                </Box>

            </Box>

            {/* RIGHT */}
            <Box
                sx={{
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#f8fafc"
                }}
            >

                <Paper
                    sx={{
                        width: "100%",
                        maxWidth: 420,
                        p: 5,
                        borderRadius: 3,
                        boxShadow:
                            "0 20px 60px rgba(0,0,0,0.1)"
                    }}
                >

                    {/* TITLE */}
                    <Typography
                        variant="h4"
                        fontWeight="bold"
                        sx={{
                            textAlign: "center",
                            mb: 1
                        }}
                    >
                        Sign in
                    </Typography>

                    <Typography
                        textAlign="center"
                        sx={{
                            mb: 4,
                            color: "gray"
                        }}
                    >
                        Welcome back! Please login to continue
                    </Typography>

                    {/* FORM */}
                    <form
                        onSubmit={handleLogin}
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 18
                        }}
                    >

                        {/* EMAIL */}
                        <TextField
                            label="Email"
                            name="email"
                            type="email"
                            fullWidth
                            value={formData.email}
                            onChange={handleChange}
                        />

                        {/* PASSWORD */}
                        <TextField
                            label="Password"
                            name="password"
                            type={
                                showPassword
                                    ? "text"
                                    : "password"
                            }
                            fullWidth
                            value={formData.password}
                            onChange={handleChange}
                            slotProps={{
                                input: {
                                    endAdornment: (
                                        <InputAdornment position="end">

                                            <IconButton
                                                onClick={() =>
                                                    setShowPassword(
                                                        !showPassword
                                                    )
                                                }
                                                edge="end"
                                            >
                                                {
                                                    showPassword
                                                        ? <VisibilityOff />
                                                        : <Visibility />
                                                }
                                            </IconButton>

                                        </InputAdornment>
                                    )
                                }
                            }}
                        />

                        {/* LOGIN */}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            disabled={loading}
                            sx={{
                                py: 1.5,
                                fontWeight: "bold",
                                borderRadius: 2,
                                background:
                                    "linear-gradient(135deg, #2563eb, #1d4ed8)",

                                ":hover": {
                                    background:
                                        "linear-gradient(135deg, #1d4ed8, #1e40af)"
                                }
                            }}
                        >

                            {
                                loading
                                    ? "Signing in..."
                                    : "Login"
                            }

                        </Button>

                        {/* REGISTER */}
                        <Button
                            fullWidth
                            variant="outlined"
                            onClick={() =>
                                navigate("/register")
                            }
                            sx={{
                                py: 1.3,
                                borderRadius: 2,
                                textTransform: "none",
                                fontWeight: "bold"
                            }}
                        >
                            Create account
                        </Button>

                    </form>

                    {/* FOOTER */}
                    <Typography
                        textAlign="center"
                        sx={{
                            mt: 3,
                            fontSize: 12,
                            color: "gray"
                        }}
                    >
                        © 2026 FleetDrive System
                    </Typography>

                </Paper>

            </Box>

        </Box>
    );
}