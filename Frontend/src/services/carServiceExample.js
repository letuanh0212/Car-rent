// Ví dụ sử dụng carService trong component

import { useState, useEffect } from "react";
import carService from "../../services/car";

export default function ExampleComponent() {
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(false);

    // 1. Lấy tất cả xe
    const fetchAllCars = async () => {
        try {
            const response = await carService.getAllCars();
            setCars(response.data);
        } catch (error) {
            console.error("Lỗi khi lấy danh sách xe:", error);
        }
    };

    // 2. Tìm kiếm xe
    const searchCars = async () => {
        try {
            setLoading(true);
            const searchParams = {
                keyword: "toyota",
                minPrice: 1000000,
                maxPrice: 3000000,
                location: "hcm"
            };

            const response = await carService.searchCars(searchParams);
            setCars(response.data);
        } catch (error) {
            console.error("Lỗi khi tìm kiếm:", error);
        } finally {
            setLoading(false);
        }
    };

    // 3. Lấy chi tiết xe theo ID
    const getCarDetail = async (carId) => {
        try {
            const response = await carService.getCarById(carId);
            console.log("Chi tiết xe:", response.data);
        } catch (error) {
            console.error("Lỗi khi lấy chi tiết xe:", error);
        }
    };

    // 4. Tạo xe mới
    const createNewCar = async () => {
        try {
            const carData = {
                type_id: "uuid-cua-car-type",
                owner_name: "Nguyễn Văn A",
                owner_phone: "0909123456",
                brand: "Toyota",
                model: "Camry",
                year: 2023,
                price_per_day: 1500000,
                location: "Hồ Chí Minh"
                // ... các trường khác
            };

            const response = await carService.createCar(carData);
            console.log("Tạo xe thành công:", response);
        } catch (error) {
            console.error("Lỗi khi tạo xe:", error);
        }
    };

    // 5. Cập nhật xe
    const updateCar = async (carId) => {
        try {
            const updateData = {
                price_per_day: 1600000,
                location: "Hà Nội"
            };

            const response = await carService.updateCar(carId, updateData);
            console.log("Cập nhật thành công:", response);
        } catch (error) {
            console.error("Lỗi khi cập nhật:", error);
        }
    };

    // 6. Xóa xe
    const deleteCar = async (carId) => {
        try {
            const response = await carService.deleteCar(carId);
            console.log("Xóa xe thành công:", response);
        } catch (error) {
            console.error("Lỗi khi xóa xe:", error);
        }
    };

    useEffect(() => {
        fetchAllCars(); // Lấy danh sách xe khi component mount
    }, []);

    return (
        <div>
            <button onClick={searchCars} disabled={loading}>
                {loading ? "Đang tìm..." : "Tìm kiếm Toyota"}
            </button>

            <div>
                {cars.map(car => (
                    <div key={car.id}>
                        <h3>{car.brand} {car.model}</h3>
                        <p>Giá: {car.price_per_day}/ngày</p>
                        <p>Địa điểm: {car.location}</p>
                        <button onClick={() => getCarDetail(car.id)}>
                            Xem chi tiết
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}