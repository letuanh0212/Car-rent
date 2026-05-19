import { useState } from "react";

import {
    TextField,
    Button,
    Paper,
    Typography,
    InputAdornment,
    IconButton,
    MenuItem
} from "@mui/material";

import {
    Visibility,
    VisibilityOff,
    AdminPanelSettings
} from "@mui/icons-material";

import accountSystemService from "../../services/accountSystemService.js";

export default function AdminRegister() {

    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmPassword: "",
        role: "manager"
    });

    const [loading, setLoading] = useState(false);

    const [showPassword, setShowPassword] =
        useState(false);

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleRegister = async (e) => {

        e.preventDefault();

        try {

            if (
                formData.password !==
                formData.confirmPassword
            ) {

                alert("Password does not match");

                return;
            }

            setLoading(true);

            const payload = {
                email: formData.email,
                password: formData.password,
                role: formData.role
            };

            await accountSystemService.register(
                payload
            );

            alert("Admin account created");

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Register failed"
            );

        } finally {

            setLoading(false);
        }
    };

    return (
        <div
            className="
                min-h-screen
                bg-black
                flex
                items-center
                justify-center
                p-4
            "
        >

            <Paper
                elevation={10}
                className="
                    w-full
                    max-w-md
                    rounded-3xl
                    p-8
                    bg-zinc-900
                    text-white
                    border
                    border-zinc-800
                "
            >

                <div className="flex flex-col items-center mb-8">

                    <div
                        className="
                            w-20
                            h-20
                            rounded-full
                            bg-white
                            flex
                            items-center
                            justify-center
                            mb-5
                        "
                    >
                        <AdminPanelSettings
                            className="text-black"
                            fontSize="large"
                        />
                    </div>

                    <Typography
                        variant="h4"
                        className="font-bold"
                    >
                        Admin Register
                    </Typography>

                    <Typography
                        variant="body2"
                        className="text-gray-400 mt-2"
                    >
                        Internal Management System
                    </Typography>

                </div>

                <form
                    onSubmit={handleRegister}
                    className="flex flex-col gap-5"
                >

                    <TextField
                        label="Admin Email"
                        name="email"
                        type="email"
                        fullWidth
                        value={formData.email}
                        onChange={handleChange}

                        sx={{
                            input: {
                                color: "white"
                            },
                            label: {
                                color: "#aaa"
                            },
                            "& .MuiOutlinedInput-root": {
                                "& fieldset": {
                                    borderColor: "#444"
                                }
                            }
                        }}
                    />

                    <TextField
                        label="Role"
                        name="role"
                        select
                        fullWidth
                        value={formData.role}
                        onChange={handleChange}

                        sx={{
                            input: {
                                color: "white"
                            },
                            label: {
                                color: "#aaa"
                            },
                            "& .MuiOutlinedInput-root": {
                                "& fieldset": {
                                    borderColor: "#444"
                                }
                            }
                        }}
                    >

                        <MenuItem value="manager">
                            Manager
                        </MenuItem>

                        <MenuItem value="admin">
                            Admin
                        </MenuItem>

                    </TextField>

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

                        sx={{
                            input: {
                                color: "white"
                            },
                            label: {
                                color: "#aaa"
                            },
                            "& .MuiOutlinedInput-root": {
                                "& fieldset": {
                                    borderColor: "#444"
                                }
                            }
                        }}

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
                                        >

                                            {
                                                showPassword
                                                    ? (
                                                        <VisibilityOff
                                                            className="text-white"
                                                        />
                                                    )
                                                    : (
                                                        <Visibility
                                                            className="text-white"
                                                        />
                                                    )
                                            }

                                        </IconButton>

                                    </InputAdornment>
                                )
                            }
                        }}
                    />

                    <TextField
                        label="Confirm Password"
                        name="confirmPassword"

                        type={
                            showPassword
                                ? "text"
                                : "password"
                        }

                        fullWidth
                        value={
                            formData.confirmPassword
                        }

                        onChange={handleChange}

                        sx={{
                            input: {
                                color: "white"
                            },
                            label: {
                                color: "#aaa"
                            },
                            "& .MuiOutlinedInput-root": {
                                "& fieldset": {
                                    borderColor: "#444"
                                }
                            }
                        }}
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        disabled={loading}

                        sx={{
                            backgroundColor: "white",
                            color: "black",
                            fontWeight: "bold",
                            paddingY: 1.5,
                            borderRadius: "14px",

                            "&:hover": {
                                backgroundColor: "#ddd"
                            }
                        }}
                    >

                        {
                            loading
                                ? "Loading..."
                                : "Create Admin Account"
                        }

                    </Button>

                </form>

                <div
                    className="
                        mt-6
                        text-center
                        text-sm
                        text-gray-500
                    "
                >
                    Restricted internal access only
                </div>

            </Paper>
        </div>
    );
}