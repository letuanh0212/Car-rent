
import { useEffect, useState } from "react";
import carService from "../../services/carService.js";
import CarCard from "../../components/board/cardCarList.jsx";

export default function CarList() {
  const [cars, setCars] = useState([]);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    getUserLocation();
  }, []);

  useEffect(() => {
    if (location) {
      fetchCars(location);
    }
  }, [location]);

  // Lấy vị trí người dùng
  const getUserLocation = () => {
    if (!navigator.geolocation) {
      console.log("Trình duyệt không hỗ trợ GPS");
      fetchCars(); 
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        setLocation({ lat: latitude, lng: longitude });
      },
      (error) => {
        console.log("Không lấy được vị trí:", error);
        fetchCars(); // fallback
      }
    );
  };

  // Gọi API lấy xe (có hoặc không có location)
  const fetchCars = async (location = null) => {
    try {
      let response;

      if (location) {
        response = await carService.getAllCars({
          lat: location.lat,
          lng: location.lng,
        });
      } else {
        response = await carService.getAllCars();
      }

      setCars(response.data);
    } catch (error) {
      console.error("Lỗi lấy danh sách xe:", error);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1 style={{ marginBottom: "20px" }}>🚗 Danh sách xe gần bạn</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "20px",
        }}
      >
        {cars.map((car) => (
          <CarCard key={car.id} car={car} />
        ))}
      </div>
    </div>
  );
}