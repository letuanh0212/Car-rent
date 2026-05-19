import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
    TextField,
    Button,
    Paper,
    Typography,
    Box,
    InputAdornment,
    IconButton
} from "@mui/material";

import {
    AdminPanelSettings,
    Visibility,
    VisibilityOff
} from "@mui/icons-material";

import { useAuth } from "../../AuthContext";

export default function AdminLogin() {

    const navigate = useNavigate();

    const {
        loginAdmin,
        isAuthenticated,
        authType

    } = useAuth();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    useEffect(() => {

        if (
            isAuthenticated &&
            authType === "admin"
        ) {
            navigate("/dashboard");
        }

    }, [isAuthenticated, authType, navigate]);
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

            await loginAdmin(
                formData.email,
                formData.password
            );

            alert("Login success");

            navigate("/dashboard");

        } catch (error) {

            console.error(error);

            alert(
                error?.response?.data?.message ||
                error?.message ||
                "Login failed"
            );

        } finally {

            setLoading(false);
        }
    };

    return (

        <Box
            sx={{
                minHeight: "100vh",
                background:
                    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                p: 2
            }}
        >

            <Paper
                elevation={12}
                sx={{
                    width: "100%",
                    maxWidth: 450,
                    borderRadius: 5,
                    p: 5,
                    background: "rgba(255,255,255,0.15)",
                    backdropFilter: "blur(16px)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    boxShadow: "0 20px 50px rgba(0,0,0,0.15)"
                }}
            >

                {/* HEADER */}
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        mb: 5
                    }}
                >

                    <Box
                        sx={{
                            width: 75,
                            height: 75,
                            borderRadius: "50%",
                            background:
                                "linear-gradient(135deg, #4f46e5, #7c3aed)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            mb: 3,
                            boxShadow:
                                "0 10px 30px rgba(79,70,229,0.4)"
                        }}
                    >

                        <AdminPanelSettings
                            sx={{
                                color: "white",
                                fontSize: 38
                            }}
                        />

                    </Box>

                    <Typography
                        variant="h4"
                        fontWeight="bold"
                        sx={{
                            color: "white"
                        }}
                    >
                        Admin Portal
                    </Typography>

                    <Typography
                        variant="body2"
                        sx={{
                            color: "rgba(255,255,255,0.8)",
                            mt: 1
                        }}
                    >
                        Internal Management System
                    </Typography>

                </Box>

                {/* FORM */}
                <form onSubmit={handleLogin}>

                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 3
                        }}
                    >

                        {/* EMAIL */}
                        <TextField
                            label="Admin Email"
                            name="email"
                            type="email"
                            fullWidth
                            autoComplete="email"
                            value={formData.email}
                            onChange={handleChange}
                            InputLabelProps={{
                                style: {
                                    color: "rgba(255,255,255,0.8)"
                                }
                            }}
                            sx={{
                                "& .MuiOutlinedInput-root": {

                                    color: "white",
                                    borderRadius: 3,

                                    "& fieldset": {
                                        borderColor:
                                            "rgba(255,255,255,0.3)"
                                    },

                                    "&:hover fieldset": {
                                        borderColor:
                                            "rgba(255,255,255,0.5)"
                                    },

                                    "&.Mui-focused fieldset": {
                                        borderColor: "white"
                                    }
                                }
                            }}
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
                            autoComplete="current-password"
                            value={formData.password}
                            onChange={handleChange}
                            InputLabelProps={{
                                style: {
                                    color: "rgba(255,255,255,0.8)"
                                }
                            }}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">

                                        <IconButton
                                            onClick={() =>
                                                setShowPassword(
                                                    !showPassword
                                                )
                                            }
                                            edge="end"
                                            sx={{
                                                color:
                                                    "rgba(255,255,255,0.7)"
                                            }}
                                        >

                                            {
                                                showPassword
                                                    ? <VisibilityOff />
                                                    : <Visibility />
                                            }

                                        </IconButton>

                                    </InputAdornment>
                                )
                            }}
                            sx={{
                                "& .MuiOutlinedInput-root": {

                                    color: "white",
                                    borderRadius: 3,

                                    "& fieldset": {
                                        borderColor:
                                            "rgba(255,255,255,0.3)"
                                    },

                                    "&:hover fieldset": {
                                        borderColor:
                                            "rgba(255,255,255,0.5)"
                                    },

                                    "&.Mui-focused fieldset": {
                                        borderColor: "white"
                                    }
                                }
                            }}
                        />

                        {/* BUTTON */}
                        <Button
                            type="submit"
                            variant="contained"
                            size="large"
                            disabled={loading}
                            sx={{
                                background:
                                    "linear-gradient(135deg, #4f46e5, #7c3aed)",

                                color: "white",

                                fontWeight: "bold",

                                py: 1.6,

                                borderRadius: 3,

                                textTransform: "none",

                                fontSize: 16,

                                boxShadow:
                                    "0 10px 30px rgba(79,70,229,0.4)",

                                "&:hover": {
                                    background:
                                        "linear-gradient(135deg, #4338ca, #6d28d9)"
                                }
                            }}
                        >

                            {
                                loading
                                    ? "Loading..."
                                    : "Admin Login"
                            }

                        </Button>

                    </Box>

                </form>

                {/* FOOTER */}
                <Typography
                    align="center"
                    sx={{
                        mt: 4,
                        fontSize: 13,
                        color: "rgba(255,255,255,0.7)"
                    }}
                >
                    Restricted access for authorized staff only
                </Typography>

            </Paper>

        </Box>
    );
}