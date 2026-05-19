import { useEffect, useState } from "react";
import carService from "../../services/carService.js";
import CarCard from "../../components/board/cardCarList.jsx";

export default function CarList() {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      const response = await carService.getAllCars();
      setCars(response.data);
    } catch (error) {
      console.error("Lỗi lấy danh sách xe:", error);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1 style={{ marginBottom: "20px" }}>🚗 Danh sách xe</h1>

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