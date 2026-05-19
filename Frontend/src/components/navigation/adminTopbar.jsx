import {
    Box,
    TextField,
    Avatar,
    Typography,
    Menu,
    MenuItem,
    Divider,
    IconButton
} from "@mui/material";

import {
    Logout,
    Settings,
    Person
} from "@mui/icons-material";

import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { useAuth } from "../../AuthContext";

function AdminTopbar() {

    const navigate = useNavigate();

    const {
        user,
        logoutadmin
    } = useAuth();

    const [anchorEl, setAnchorEl] = useState(null);

    const open = Boolean(anchorEl);

    const handleMenuOpen = (event) => {

        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {

        setAnchorEl(null);
    };

    const handleLogout = () => {

        logoutadmin();

        navigate("/loginsystem");
    };

    return (

        <Box
            sx={{
                height: 90,

                background:
                    "rgba(255,255,255,0.9)",

                backdropFilter: "blur(10px)",

                borderBottom:
                    "1px solid #e4e4e7",

                display: "flex",

                alignItems: "center",

                justifyContent: "space-between",

                px: 4,

                position: "sticky",

                top: 0,

                zIndex: 1000
            }}
        >

            {/* SEARCH */}

            <TextField
                placeholder="Search fleet, bookings, or customers..."
                size="small"
                sx={{
                    width: 420,

                    "& .MuiOutlinedInput-root": {

                        borderRadius: "14px",

                        background: "#f4f4f5",

                        "& fieldset": {
                            border: "none"
                        }
                    }
                }}
            />

            {/* RIGHT SIDE */}

            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2
                }}
            >

                {/* USER INFO */}

                <Box textAlign="right">

                    <Typography
                        fontWeight={700}
                    >

                        {
                            user?.full_name ||
                            user?.email ||
                            "Administrator"
                        }

                    </Typography>

                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                            textTransform: "capitalize"
                        }}
                    >

                        {
                            user?.role ||
                            "Admin"
                        }

                    </Typography>

                </Box>

                {/* AVATAR */}

                <IconButton
                    onClick={handleMenuOpen}
                >

                    <Avatar
                        src={user?.avatar}
                        sx={{
                            width: 50,
                            height: 50,

                            background:
                                "linear-gradient(135deg,#667eea,#764ba2)",

                            fontWeight: "bold"
                        }}
                    >

                        {
                            user?.email?.charAt(0)
                                ?.toUpperCase()
                        }

                    </Avatar>

                </IconButton>

                {/* DROPDOWN MENU */}

                <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleMenuClose}

                    PaperProps={{
                        sx: {
                            mt: 1.5,
                            minWidth: 220,
                            borderRadius: 3,
                            boxShadow:
                                "0 10px 40px rgba(0,0,0,0.12)"
                        }
                    }}
                >

                    {/* USER HEADER */}

                    <Box
                        sx={{
                            px: 2,
                            py: 1.5
                        }}
                    >

                        <Typography
                            fontWeight={700}
                        >

                            {
                                user?.full_name ||
                                user?.email
                            }

                        </Typography>

                        <Typography
                            variant="body2"
                            color="text.secondary"
                        >

                            {
                                user?.role
                            }

                        </Typography>

                    </Box>

                    <Divider />

                    {/* PROFILE */}

                    <MenuItem
                        onClick={() => {

                            handleMenuClose();

                            navigate("/dashboard/profile");
                        }}
                        sx={{
                            gap: 1.5,
                            py: 1.3
                        }}
                    >

                        <Person fontSize="small" />

                        My Profile

                    </MenuItem>

                    {/* SETTINGS */}

                    <MenuItem
                        onClick={() => {

                            handleMenuClose();

                            navigate("/dashboard/settings");
                        }}
                        sx={{
                            gap: 1.5,
                            py: 1.3
                        }}
                    >

                        <Settings fontSize="small" />

                        Settings

                    </MenuItem>

                    <Divider />

                    {/* LOGOUT */}

                    <MenuItem
                        onClick={handleLogout}
                        sx={{
                            gap: 1.5,
                            py: 1.3,
                            color: "#dc2626"
                        }}
                    >

                        <Logout fontSize="small" />

                        Logout

                    </MenuItem>

                </Menu>

            </Box>

        </Box>
    );
}

export default AdminTopbar;