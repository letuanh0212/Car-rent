import { useEffect, useState } from "react";
import {
    Box,
    TextField,
    Button,
    Typography,
    Paper,
    Divider
} from "@mui/material";

import customerService from "../../services/customerService.js";

export default function ProfilePage() {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        full_name: "",
        email: "",
        phone: ""
    });

    // GET PROFILE
    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const res = await customerService.getProfile(); 
            setUser(res.data);

            setForm({
                full_name: res.data.full_name || "",
                email: res.data.email || "",
                phone: res.data.phone || ""
            });

        } catch (err) {
            console.log(err);
        }
    };

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    // UPDATE PROFILE
    const handleUpdate = async () => {
        try {
            setLoading(true);

            await customerService.updateProfile(form);

            alert("Cập nhật thành công!");

            fetchProfile();

        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    if (!user) {
        return <div className="p-10">Loading...</div>;
    }

    return (
        <Box className="min-h-screen bg-zinc-100 p-10 flex justify-center">
            <Paper
                elevation={5}
                sx={{
                    width: 500,
                    p: 4,
                    borderRadius: 4
                }}
            >

                <Typography variant="h5" fontWeight={700} mb={2}>
                    My Profile
                </Typography>

                <Divider sx={{ mb: 3 }} />

                {/* FULL NAME */}
                <TextField
                    fullWidth
                    label="Full Name"
                    name="full_name"
                    value={form.full_name}
                    onChange={handleChange}
                    sx={{ mb: 2 }}
                />

                {/* EMAIL */}
                <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    value={form.email}
                    disabled
                    sx={{ mb: 2 }}
                />

                {/* PHONE */}
                <TextField
                    fullWidth
                    label="Phone"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    sx={{ mb: 3 }}
                />

                {/* INFO */}
                <Box
                    sx={{
                        mb: 3,
                        p: 2,
                        bgcolor: "#f5f5f5",
                        borderRadius: 2
                    }}
                >
                    <Typography fontSize={14}>
                        Account created: {new Date(user.created_at).toLocaleDateString()}
                    </Typography>
                    <Typography fontSize={14}>
                        Verified: {user.is_verified ? "Yes" : "No"}
                    </Typography>
                </Box>

                {/* BUTTON */}
                <Button
                    fullWidth
                    variant="contained"
                    onClick={handleUpdate}
                    disabled={loading}
                    sx={{
                        py: 1.2,
                        borderRadius: 2,
                        background: "linear-gradient(135deg, #667eea, #764ba2)"
                    }}
                >
                    {loading ? "Updating..." : "Update Profile"}
                </Button>

            </Paper>
        </Box>
    );
}