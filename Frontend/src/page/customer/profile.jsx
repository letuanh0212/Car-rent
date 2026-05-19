import { useEffect, useState } from "react";

import {
    Box,
    Typography,
    Paper,
    Divider,
    Avatar,
    CircularProgress,
    Chip
} from "@mui/material";

import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import VerifiedIcon from "@mui/icons-material/Verified";

import customerService from "../../services/customerService.js";
import { useAuth } from "../../AuthContext.jsx";
export default function ProfilePage() {
    const { user } = useAuth();

    const [profile, setProfile] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
         if (!user?.id) return;

        fetchProfile();

    }, [user?.id]);

    const fetchProfile = async () => {

        try {

            setLoading(true);

            const res = await customerService.getCustomerById(user.id);

            setProfile(res.data.data || res.data);

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

        }
    };

    if (loading) {

        return (

            <Box
                sx={{
                    minHeight: "100vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}
            >

                <CircularProgress />

            </Box>
        );
    }

    return (

        <Box
            sx={{
                minHeight: "100vh",
                background: "#f5f7fb",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                p: 3
            }}
        >

            <Paper
                elevation={0}
                sx={{
                    width: "100%",
                    maxWidth: 550,
                    borderRadius: 5,
                    overflow: "hidden",
                    border: "1px solid #e5e7eb"
                }}
            >

                {/* HEADER */}
                <Box
                    sx={{
                        background:
                            "linear-gradient(135deg,#667eea,#764ba2)",
                        p: 5,
                        color: "white",
                        textAlign: "center"
                    }}
                >

                    <Avatar
                        sx={{
                            width: 90,
                            height: 90,
                            mx: "auto",
                            mb: 2,
                            fontSize: 36,
                            bgcolor: "white",
                            color: "#667eea",
                            fontWeight: "bold"
                        }}
                    >

                        {
                            profile?.full_name?.charAt(0)
                        }

                    </Avatar>

                    <Typography
                        variant="h4"
                        fontWeight="bold"
                    >
                        {profile?.full_name}
                    </Typography>

                    <Typography
                        sx={{
                            opacity: 0.9,
                            mt: 1
                        }}
                    >
                        Customer Account
                    </Typography>

                </Box>

                {/* BODY */}
                <Box
                    sx={{
                        p: 4
                    }}
                >

                    {/* EMAIL */}
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 2,
                            mb: 3
                        }}
                    >

                        <EmailIcon color="primary" />

                        <Box>

                            <Typography
                                fontWeight={700}
                            >
                                Email
                            </Typography>

                            <Typography
                                color="text.secondary"
                            >
                                {profile?.email}
                            </Typography>

                        </Box>

                    </Box>

                    <Divider sx={{ mb: 3 }} />

                    {/* PHONE */}
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 2,
                            mb: 3
                        }}
                    >

                        <PhoneIcon color="primary" />

                        <Box>

                            <Typography
                                fontWeight={700}
                            >
                                Phone
                            </Typography>

                            <Typography
                                color="text.secondary"
                            >
                                {
                                    profile?.phone ||
                                    "No phone number"
                                }
                            </Typography>

                        </Box>

                    </Box>

                    <Divider sx={{ mb: 3 }} />

                    {/* VERIFIED */}
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between"
                        }}
                    >

                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 2
                            }}
                        >

                            <VerifiedIcon color="success" />

                            <Typography
                                fontWeight={700}
                            >
                                Account Status
                            </Typography>

                        </Box>

                        <Chip
                            label={
                                profile?.is_verified
                                    ? "Verified"
                                    : "Not Verified"
                            }

                            color={
                                profile?.is_verified
                                    ? "success"
                                    : "warning"
                            }
                        />

                    </Box>

                </Box>

            </Paper>

        </Box>
    );
}