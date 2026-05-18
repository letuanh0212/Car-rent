import {
    Box,
    TextField,
    Avatar,
    Typography
} from "@mui/material";

function AdminTopbar() {

    const user = JSON.parse(
        localStorage.getItem("adminUser")
    );

    return (

        <Box
            sx={{
                height: 90,
                background: "#ffffff",
                borderBottom: "1px solid #e4e4e7",

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
                        background: "#f4f4f5"
                    }
                }}
            />

            {/* PROFILE */}

            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2
                }}
            >

                <Box textAlign="right">

                    <Typography fontWeight={700}>

                        {
                            user?.full_name ||
                            "Administrator"
                        }

                    </Typography>

                    <Typography
                        variant="body2"
                        color="text.secondary"
                    >

                        {
                            user?.role ||
                            "Admin"
                        }

                    </Typography>

                </Box>

                <Avatar
                    src={
                        user?.avatar 
                    }
                    sx={{
                        width: 50,
                        height: 50
                    }}
                />

            </Box>
        </Box>
    );
}
export default AdminTopbar;