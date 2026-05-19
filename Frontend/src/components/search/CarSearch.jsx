import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import {
    Container,
    Typography,
    TextField,
    Button,
    Grid,
    Card,
    CardContent,
    CardMedia,
    Box,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Chip,
    Paper,
    Avatar,
    IconButton,
    Divider,
    Fade,
    Zoom,
    Skeleton,
    CardActions
} from "@mui/material";
import {
    Search as SearchIcon,
    LocationOn as LocationIcon,
    Person as PersonIcon,
    DirectionsCar as CarIcon,
    FilterList as FilterIcon,
    Clear as ClearIcon,
    Star as StarIcon
} from "@mui/icons-material";
import carService from "../../services/carService";

export default function CarSearch() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [formData, setFormData] = useState({
        keyword: "",
        brand: "",
        model: "",
        location: "",
        minPrice: "",
        maxPrice: "",
        transmission: "",
        fuelType: ""
    });

    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(false);

    // Load search params from URL on component mount
    useEffect(() => {
        const urlParams = Object.fromEntries(searchParams.entries());
        setFormData(prev => ({
            ...prev,
            ...urlParams
        }));

        // Auto search if there are URL params
        if (Object.keys(urlParams).length > 0) {
            performSearch(urlParams);
        }
    }, [searchParams]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const performSearch = async (searchData) => {
        try {
            setLoading(true);
            // Lọc bỏ các tham số rỗng
            const filteredParams = Object.fromEntries(
                Object.entries(searchData).filter(([_, value]) => value !== "")
            );

            const response = await carService.searchCars(filteredParams);
            setCars(response.data || []);
        } catch (error) {
            console.error("Search failed:", error);
            alert("Tìm kiếm thất bại: " + (error.response?.data?.message || error.message));
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = async (e) => {
        e?.preventDefault();

        // Update URL with search params
        const newSearchParams = new URLSearchParams();
        Object.entries(formData).forEach(([key, value]) => {
            if (value) {
                newSearchParams.set(key, value);
            }
        });
        setSearchParams(newSearchParams);

        await performSearch(formData);
    };

    const handleClear = () => {
        setFormData({
            keyword: "",
            brand: "",
            model: "",
            location: "",
            minPrice: "",
            maxPrice: "",
            transmission: "",
            fuelType: ""
        });
        setCars([]);
        setSearchParams({});
    };

    // Loading skeleton component
    const LoadingSkeleton = () => (
        <Grid container spacing={3}>
            {[...Array(6)].map((_, index) => (
                <Grid item xs={12} md={6} lg={4} key={index}>
                    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', borderRadius: 3 }}>
                        <Skeleton variant="rectangular" height={220} sx={{ borderRadius: '12px 12px 0 0' }} />
                        <CardContent sx={{ flexGrow: 1, p: 3 }}>
                            <Skeleton variant="text" height={28} width="80%" sx={{ mb: 2 }} />
                            <Box sx={{ mb: 2, display: 'flex', gap: 1 }}>
                                <Skeleton variant="rounded" width={80} height={24} />
                                <Skeleton variant="rounded" width={60} height={24} />
                                <Skeleton variant="rounded" width={70} height={24} />
                            </Box>
                            <Skeleton variant="text" height={20} width="60%" sx={{ mb: 1 }} />
                            <Skeleton variant="text" height={20} width="70%" sx={{ mb: 2 }} />
                            <Skeleton variant="text" height={24} width="40%" />
                        </CardContent>
                        <CardActions sx={{ p: 3, pt: 0 }}>
                            <Skeleton variant="rectangular" height={36} width="100%" sx={{ borderRadius: 2 }} />
                        </CardActions>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );

    return (
        <Box sx={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            py: 4
        }}>
            <Container maxWidth="xl">
                {/* Header Section */}
                <Box sx={{ textAlign: 'center', mb: 4 }}>
                    <Typography
                        variant="h3"
                        component="h1"
                        sx={{
                            color: 'white',
                            fontWeight: 700,
                            mb: 2,
                            textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
                        }}
                    >
                        🚗 Khám Phá Xe Ô Tô
                    </Typography>
                    <Typography
                        variant="h6"
                        sx={{
                            color: 'rgba(255,255,255,0.9)',
                            fontWeight: 300,
                            maxWidth: 600,
                            mx: 'auto'
                        }}
                    >
                        Tìm kiếm và thuê xe chất lượng với giá tốt nhất
                    </Typography>
                </Box>

                {/* Search Form */}
                <Fade in={true} timeout={1000}>
                    <Paper
                        elevation={10}
                        sx={{
                            p: 4,
                            mb: 4,
                            borderRadius: 3,
                            background: 'rgba(255,255,255,0.95)',
                            backdropFilter: 'blur(10px)',
                            border: '1px solid rgba(255,255,255,0.2)'
                        }}
                    >
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                            <FilterIcon sx={{ mr: 2, color: 'primary.main' }} />
                            <Typography variant="h5" sx={{ fontWeight: 600, color: 'text.primary' }}>
                                Bộ Lọc Tìm Kiếm
                            </Typography>
                        </Box>

                        <Grid container spacing={3}>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label="Từ khóa tìm kiếm"
                                    name="keyword"
                                    value={formData.keyword}
                                    onChange={handleInputChange}
                                    placeholder="Toyota Camry, Honda Civic..."
                                    InputProps={{
                                        startAdornment: <SearchIcon sx={{ color: 'action.active', mr: 1 }} />
                                    }}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: 2,
                                            backgroundColor: 'grey.50'
                                        }
                                    }}
                                />
                            </Grid>

                            <Grid item xs={12} md={3}>
                                <TextField
                                    fullWidth
                                    label="Hãng xe"
                                    name="brand"
                                    value={formData.brand}
                                    onChange={handleInputChange}
                                    placeholder="Toyota, Honda..."
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: 2,
                                            backgroundColor: 'grey.50'
                                        }
                                    }}
                                />
                            </Grid>

                            <Grid item xs={12} md={3}>
                                <TextField
                                    fullWidth
                                    label="Model"
                                    name="model"
                                    value={formData.model}
                                    onChange={handleInputChange}
                                    placeholder="Camry, Civic..."
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: 2,
                                            backgroundColor: 'grey.50'
                                        }
                                    }}
                                />
                            </Grid>

                            <Grid item xs={12} md={4}>
                                <TextField
                                    fullWidth
                                    label="Địa điểm"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleInputChange}
                                    placeholder="Hồ Chí Minh, Hà Nội..."
                                    InputProps={{
                                        startAdornment: <LocationIcon sx={{ color: 'action.active', mr: 1 }} />
                                    }}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: 2,
                                            backgroundColor: 'grey.50'
                                        }
                                    }}
                                />
                            </Grid>

                            <Grid item xs={12} md={4}>
                                <TextField
                                    fullWidth
                                    label="Giá tối thiểu (VNĐ)"
                                    name="minPrice"
                                    type="number"
                                    value={formData.minPrice}
                                    onChange={handleInputChange}
                                    placeholder="1000000"
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: 2,
                                            backgroundColor: 'grey.50'
                                        }
                                    }}
                                />
                            </Grid>

                            <Grid item xs={12} md={4}>
                                <TextField
                                    fullWidth
                                    label="Giá tối đa (VNĐ)"
                                    name="maxPrice"
                                    type="number"
                                    value={formData.maxPrice}
                                    onChange={handleInputChange}
                                    placeholder="5000000"
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: 2,
                                            backgroundColor: 'grey.50'
                                        }
                                    }}
                                />
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <FormControl fullWidth sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: 2,
                                        backgroundColor: 'grey.50'
                                    }
                                }}>
                                    <InputLabel>Hộp số</InputLabel>
                                    <Select
                                        name="transmission"
                                        value={formData.transmission}
                                        onChange={handleInputChange}
                                        label="Hộp số"
                                    >
                                        <MenuItem value="">Tất cả</MenuItem>
                                        <MenuItem value="automatic">🚗 Tự động</MenuItem>
                                        <MenuItem value="manual">⚙️ Số sàn</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <FormControl fullWidth sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: 2,
                                        backgroundColor: 'grey.50'
                                    }
                                }}>
                                    <InputLabel>Nhiên liệu</InputLabel>
                                    <Select
                                        name="fuelType"
                                        value={formData.fuelType}
                                        onChange={handleInputChange}
                                        label="Nhiên liệu"
                                    >
                                        <MenuItem value="">Tất cả</MenuItem>
                                        <MenuItem value="gasoline">⛽ Xăng</MenuItem>
                                        <MenuItem value="diesel">🛢️ Diesel</MenuItem>
                                        <MenuItem value="electric">⚡ Điện</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid item xs={12}>
                                <Divider sx={{ my: 2 }} />
                                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
                                    <Button
                                        variant="contained"
                                        onClick={handleSearch}
                                        disabled={loading}
                                        size="large"
                                        startIcon={<SearchIcon />}
                                        sx={{
                                            borderRadius: 3,
                                            px: 4,
                                            py: 1.5,
                                            background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                                            boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
                                            '&:hover': {
                                                background: 'linear-gradient(45deg, #1976D2 30%, #1CB5E0 90%)',
                                            }
                                        }}
                                    >
                                        {loading ? "Đang tìm kiếm..." : "Tìm Xe Ngay"}
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        onClick={handleClear}
                                        size="large"
                                        startIcon={<ClearIcon />}
                                        sx={{
                                            borderRadius: 3,
                                            px: 4,
                                            py: 1.5,
                                            borderColor: 'grey.400',
                                            color: 'grey.700',
                                            '&:hover': {
                                                borderColor: 'grey.600',
                                                backgroundColor: 'grey.50'
                                            }
                                        }}
                                    >
                                        Xóa Bộ Lọc
                                    </Button>
                                </Box>
                            </Grid>
                        </Grid>
                    </Paper>
                </Fade>

                {/* Results Header */}
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                    <Typography
                        variant="h5"
                        sx={{
                            fontWeight: 600,
                            color: 'white',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1
                        }}
                    >
                        <CarIcon />
                        Kết quả tìm kiếm ({cars.length} xe)
                    </Typography>

                    {cars.length > 0 && (
                        <Chip
                            label={`${cars.length} xe được tìm thấy`}
                            sx={{
                                backgroundColor: 'rgba(255,255,255,0.2)',
                                color: 'white',
                                border: '1px solid rgba(255,255,255,0.3)'
                            }}
                        />
                    )}
                </Box>

                {/* Results Grid */}
                {loading ? (
                    <LoadingSkeleton />
                ) : (
                    <Grid container spacing={3}>
                        {cars.map((car, index) => (
                            <Grid item xs={12} md={6} lg={4} key={car.id}>
                                <Zoom in={true} style={{ transitionDelay: `${index * 100}ms` }}>
                                    <Card
                                        component={Link}
                                        to={`/cars/${car.id}`}
                                        sx={{
                                            height: '100%',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            borderRadius: 3,
                                            overflow: 'hidden',
                                            textDecoration: 'none',
                                            transition: 'all 0.3s ease-in-out',
                                            background: 'rgba(255,255,255,0.95)',
                                            backdropFilter: 'blur(10px)',
                                            border: '1px solid rgba(255,255,255,0.2)',
                                            '&:hover': {
                                                transform: 'translateY(-8px)',
                                                boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                                                '& .car-image': {
                                                    transform: 'scale(1.05)'
                                                }
                                            }
                                        }}
                                    >
                                        <Box sx={{ position: 'relative', overflow: 'hidden' }}>
                                            <CardMedia
                                                component="div"
                                                className="car-image"
                                                sx={{
                                                    height: 220,
                                                    background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    transition: 'transform 0.3s ease-in-out'
                                                }}
                                            >
                                                <CarIcon sx={{ fontSize: 60, color: 'grey.400' }} />
                                            </CardMedia>

                                            {/* Price Badge */}
                                            <Box
                                                sx={{
                                                    position: 'absolute',
                                                    top: 16,
                                                    right: 16,
                                                    backgroundColor: 'primary.main',
                                                    color: 'white',
                                                    px: 2,
                                                    py: 1,
                                                    borderRadius: 2,
                                                    fontWeight: 'bold',
                                                    boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
                                                }}
                                            >
                                                {new Intl.NumberFormat('vi-VN', {
                                                    style: 'currency',
                                                    currency: 'VND',
                                                    minimumFractionDigits: 0
                                                }).format(car.price_per_day)}/ngày
                                            </Box>

                                            {/* Status Badge */}
                                            <Box
                                                sx={{
                                                    position: 'absolute',
                                                    top: 16,
                                                    left: 16,
                                                    backgroundColor: car.status === 'available' ? 'success.main' : 'warning.main',
                                                    color: 'white',
                                                    px: 2,
                                                    py: 0.5,
                                                    borderRadius: 1,
                                                    fontSize: '0.75rem',
                                                    fontWeight: 'bold'
                                                }}
                                            >
                                                {car.status === 'available' ? 'Có sẵn' : 'Đã thuê'}
                                            </Box>
                                        </Box>

                                        <CardContent sx={{ flexGrow: 1, p: 3 }}>
                                            <Typography
                                                variant="h6"
                                                component="h2"
                                                sx={{
                                                    fontWeight: 600,
                                                    mb: 2,
                                                    color: 'text.primary',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    display: '-webkit-box',
                                                    WebkitLineClamp: 2,
                                                    WebkitBoxOrient: 'vertical'
                                                }}
                                            >
                                                {car.title}
                                            </Typography>

                                            {/* Car Info Chips */}
                                            <Box sx={{ mb: 2, display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                <Chip
                                                    label={`${car.brand} ${car.model}`}
                                                    size="small"
                                                    sx={{
                                                        backgroundColor: 'primary.light',
                                                        color: 'primary.contrastText',
                                                        fontWeight: 500
                                                    }}
                                                />
                                                <Chip
                                                    label={car.year}
                                                    size="small"
                                                    variant="outlined"
                                                />
                                                <Chip
                                                    label={car.transmission === 'automatic' ? 'Tự động' : 'Số sàn'}
                                                    size="small"
                                                    variant="outlined"
                                                />
                                                <Chip
                                                    label={car.fuel_type === 'gasoline' ? 'Xăng' : car.fuel_type === 'diesel' ? 'Diesel' : 'Điện'}
                                                    size="small"
                                                    variant="outlined"
                                                />
                                            </Box>

                                            {/* Location */}
                                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                                <LocationIcon sx={{ fontSize: 18, color: 'text.secondary', mr: 0.5 }} />
                                                <Typography variant="body2" color="text.secondary">
                                                    {car.location}
                                                </Typography>
                                            </Box>

                                            {/* Owner Info */}
                                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                                <Avatar sx={{ width: 24, height: 24, mr: 1, bgcolor: 'primary.main' }}>
                                                    <PersonIcon sx={{ fontSize: 14 }} />
                                                </Avatar>
                                                <Typography variant="body2" color="text.secondary">
                                                    {car.owner_name}
                                                </Typography>
                                            </Box>

                                            {/* Rating */}
                                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                                {[...Array(5)].map((_, i) => (
                                                    <StarIcon
                                                        key={i}
                                                        sx={{
                                                            fontSize: 16,
                                                            color: i < 4 ? 'warning.main' : 'grey.300'
                                                        }}
                                                    />
                                                ))}
                                                <Typography variant="body2" sx={{ ml: 1, color: 'text.secondary' }}>
                                                    4.2 (120 đánh giá)
                                                </Typography>
                                            </Box>
                                        </CardContent>

                                        <CardActions sx={{ p: 3, pt: 0 }}>
                                            <Button
                                                variant="contained"
                                                fullWidth
                                                sx={{
                                                    borderRadius: 2,
                                                    background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                                                    '&:hover': {
                                                        background: 'linear-gradient(45deg, #1976D2 30%, #1CB5E0 90%)',
                                                    }
                                                }}
                                            >
                                                Xem Chi Tiết
                                            </Button>
                                        </CardActions>
                                    </Card>
                                </Zoom>
                            </Grid>
                        ))}
                    </Grid>
                )}

                {/* Empty State */}
                {cars.length === 0 && !loading && (
                    <Fade in={true} timeout={500}>
                        <Box sx={{
                            textAlign: 'center',
                            py: 8,
                            px: 4,
                            backgroundColor: 'rgba(255,255,255,0.1)',
                            borderRadius: 3,
                            backdropFilter: 'blur(10px)',
                            border: '1px solid rgba(255,255,255,0.2)'
                        }}>
                            <CarIcon sx={{ fontSize: 80, color: 'rgba(255,255,255,0.5)', mb: 2 }} />
                            <Typography variant="h6" sx={{ color: 'white', mb: 1, fontWeight: 500 }}>
                                Không tìm thấy xe nào phù hợp
                            </Typography>
                            <Typography sx={{ color: 'rgba(255,255,255,0.8)', mb: 3 }}>
                                Hãy thử điều chỉnh bộ lọc hoặc từ khóa tìm kiếm
                            </Typography>
                            <Button
                                variant="outlined"
                                onClick={handleClear}
                                sx={{
                                    color: 'white',
                                    borderColor: 'rgba(255,255,255,0.5)',
                                    '&:hover': {
                                        borderColor: 'white',
                                        backgroundColor: 'rgba(255,255,255,0.1)'
                                    }
                                }}
                            >
                                Xóa Bộ Lọc
                            </Button>
                        </Box>
                    </Fade>
                )}
            </Container>
        </Box>
    );
}