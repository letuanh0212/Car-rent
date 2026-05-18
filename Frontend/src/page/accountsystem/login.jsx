import { useState ,} from "react";
import { useNavigate } from "react-router-dom";
import {
    TextField,
    Button,
    Paper,
    Typography,

} from "@mui/material";

import {

    AdminPanelSettings
} from "@mui/icons-material";

import accountSystemService from "../../services/accountsystem.js";

export default function AdminLogin() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [loading, setLoading] = useState(false);



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

            const response =
                await accountSystemService.login(
                    formData
                );

            console.log(response);

            // localStorage.setItem(
            //     "adminAccessToken",
            //     response.accessToken
            // );

            navigate(
                "/dashboard"
            );

        } catch (error) {

            console.error(error);

            alert(
                error.response?.data?.message ||
                "Login failed"
            );

        } finally {

            setLoading(false);
        }
    };
    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-4">

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
                            w-16
                            h-16
                            rounded-full
                            bg-white
                            flex
                            items-center
                            justify-center
                            mb-4
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
                        Admin Portal
                    </Typography>

                    <Typography
                        variant="body2"
                        className="text-gray-400 mt-2"
                    >
                        Internal Management System
                    </Typography>

                </div>

                <form
                    onSubmit={handleLogin}
                    className="flex flex-col gap-5"
                >

                    <TextField
                        label="Admin Email"
                        name="email"
                        type="email"
                        fullWidth
                        value={formData.email}
                        onChange={handleChange}

                        InputLabelProps={{
                            style: {
                                color: "#aaa"
                            }
                        }}

                        sx={{
                            "& .MuiOutlinedInput-root": {

                                color: "black",

                                "& fieldset": {
                                    borderColor: "#444"
                                },

                                "&:hover fieldset": {
                                    borderColor: "#777"
                                },

                                "&.Mui-focused fieldset": {
                                    borderColor: "white"
                                }
                            }
                        }}
                    />
                    <TextField
                        label="Password"
                        name="password"

                            type="password"

                        fullWidth
                        value={formData.password}
                        onChange={handleChange}

                        InputLabelProps={{
                            style: {
                                color: "#aaa"
                            }
                        }}

                        sx={{
                            "& .MuiOutlinedInput-root": {

                                color: "black",

                                "& fieldset": {
                                    borderColor: "#444"
                                },

                                "&:hover fieldset": {
                                    borderColor: "#777"
                                },

                                "&.Mui-focused fieldset": {
                                    borderColor: "white"
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
                            borderRadius: "12px",

                            "&:hover": {
                                backgroundColor: "#ddd"
                            }
                        }}
                    >

                        {
                            loading
                                ? "Loading..."
                                : "Admin Login"
                        }

                    </Button>

                </form>

                <div className="mt-6 text-center text-sm text-gray-500">
                    Restricted access for authorized staff only
                </div>

            </Paper>
        </div>
    );
}