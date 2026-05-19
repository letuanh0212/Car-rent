import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../AuthContext";
import {
    TextField,
    InputAdornment,
    IconButton,
    Box,
    AppBar,
    Toolbar,
    Button,
    useScrollTrigger,
    Slide
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import AddIcon from "@mui/icons-material/Add";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";

function HideOnScroll(props) {
    const { children } = props;
    const trigger = useScrollTrigger();

    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {children}
        </Slide>
    );
}

export default function Navbar() {
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();
    const { isAuthenticated, logoutcustomer } = useAuth();

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };
    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/search?keyword=${encodeURIComponent(searchQuery.trim())}`);
        }
    };

    const handleClearSearch = () => {
        setSearchQuery("");
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch(e);
        }
    };

    return (
        <HideOnScroll>
            <AppBar
                position="sticky"
                sx={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                    backdropFilter: 'blur(10px)'
                }}
            >
                <Toolbar sx={{ justifyContent: 'space-between', py: 1 }}>
                    {/* Logo */}
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <DirectionsCarIcon sx={{ mr: 1, fontSize: 28 }} />
                        <Link
                            to="/"
                            style={{
                                textDecoration: 'none',
                                color: 'white',
                                fontSize: '1.5rem',
                                fontWeight: 700,
                                letterSpacing: '0.5px'
                            }}
                        >
                            OtoRent
                        </Link>
                    </Box>

                    {/* Navigation Links */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                        <Link
                            to="/"
                            style={{
                                textDecoration: 'none',
                                color: 'white',
                                fontWeight: 500,
                                transition: 'all 0.3s ease',
                                padding: '8px 16px',
                                borderRadius: '8px',
                                '&:hover': {
                                    backgroundColor: 'rgba(255,255,255,0.1)',
                                    transform: 'translateY(-1px)'
                                }
                            }}
                        >
                            Trang chủ
                        </Link>
                        <Link
                            to="/search"
                            style={{
                                textDecoration: 'none',
                                color: 'white',
                                fontWeight: 500,
                                transition: 'all 0.3s ease',
                                padding: '8px 16px',
                                borderRadius: '8px',
                                '&:hover': {
                                    backgroundColor: 'rgba(255,255,255,0.1)',
                                    transform: 'translateY(-1px)'
                                }
                            }}
                        >
                            Tìm xe
                        </Link>
                        <Link
                            to="/create-car"
                            style={{
                                textDecoration: 'none',
                                color: 'white',
                                fontWeight: 500,
                                transition: 'all 0.3s ease',
                                padding: '8px 16px',
                                borderRadius: '8px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px',
                                '&:hover': {
                                    backgroundColor: 'rgba(255,255,255,0.1)',
                                    transform: 'translateY(-1px)'
                                }
                            }}
                        >
                            <AddIcon sx={{ fontSize: 18 }} />
                            Đăng xe
                        </Link>
                    </Box>

                    {/* Search Bar */}
                    <Box
                        component="form"
                        onSubmit={handleSearch}
                        sx={{
                            flexGrow: 1,
                            maxWidth: 350,
                            mx: 3
                        }}
                    >
                        <TextField
                            fullWidth
                            size="small"
                            placeholder="Tìm kiếm xe..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyPress={handleKeyPress}
                            sx={{
                                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                                borderRadius: 25,
                                color: 'white',
                                '& .MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'rgba(255, 255, 255, 0.3)',
                                },
                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'rgba(255, 255, 255, 0.5)',
                                },
                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'white',
                                },
                                '& .MuiInputBase-input::placeholder': {
                                    color: 'rgba(255, 255, 255, 0.7)',
                                    opacity: 1,
                                },
                            }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon sx={{ color: 'rgba(255,255,255,0.7)' }} />
                                    </InputAdornment>
                                ),
                                endAdornment: searchQuery && (
                                    <InputAdornment position="end">
                                        <IconButton
                                            size="small"
                                            onClick={handleClearSearch}
                                            sx={{ color: 'rgba(255,255,255,0.7)' }}
                                        >
                                            <ClearIcon />
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Box>

               
                   {/* User Actions */}

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>

                        {
                            isAuthenticated ? (
                                <>
                                    {/* PROFILE BUTTON */}
                                    <Button
                                        onClick={handleMenuOpen}
                                        sx={{
                                            color: "white",
                                            textTransform: "none",
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 1
                                        }}
                                    >
                                        <Avatar
                                            sx={{
                                                width: 32,
                                                height: 32,
                                                bgcolor: "white",
                                                color: "#764ba2",
                                                fontWeight: "bold"
                                            }}
                                        >
                                            U
                                        </Avatar>

                                        Profile
                                    </Button>

                                    {/* DROPDOWN MENU */}
                                    <Menu
                                        anchorEl={anchorEl}
                                        open={open}
                                        onClose={handleMenuClose}
                                        PaperProps={{
                                            sx: {
                                                mt: 1,
                                                minWidth: 180,
                                                borderRadius: 2
                                            }
                                        }}
                                    >
                                        <MenuItem onClick={() => {
                                            handleMenuClose();
                                            navigate("/profile");
                                        }}>
                                            👤 My Profile
                                        </MenuItem>

                                        <MenuItem onClick={() => {
                                            handleMenuClose();
                                            navigate("/my-bookings");
                                        }}>
                                            🚗 My Bookings
                                        </MenuItem>

                                        <Divider />

                                        <MenuItem onClick={() => {
                                            logoutcustomer();
                                            handleMenuClose();
                                            navigate("/login");
                                        }}>
                                             Logout
                                        </MenuItem>
                                    </Menu>
                                </>
                            ) : (
                                <>
                                    <Button
                                        component={Link}
                                        to="/login"
                                        variant="text"
                                        startIcon={<LoginIcon />}
                                        sx={{
                                            color: 'white',
                                            borderRadius: 20,
                                            px: 2,
                                            '&:hover': {
                                                backgroundColor: 'rgba(255,255,255,0.1)',
                                            }
                                        }}
                                    >
                                        Đăng nhập
                                    </Button>

                                    <Button
                                        component={Link}
                                        to="/register"
                                        variant="contained"
                                        startIcon={<PersonAddIcon />}
                                        sx={{
                                            backgroundColor: 'rgba(255,255,255,0.2)',
                                            border: '1px solid rgba(255,255,255,0.3)',
                                            borderRadius: 20,
                                            px: 3,
                                            '&:hover': {
                                                backgroundColor: 'rgba(255,255,255,0.3)',
                                                borderColor: 'rgba(255,255,255,0.5)',
                                            }
                                        }}
                                    >
                                        Đăng ký
                                    </Button>
                                </>
                            )
                        }

                    </Box>
                </Toolbar>
            </AppBar>
        </HideOnScroll>
    );
}
