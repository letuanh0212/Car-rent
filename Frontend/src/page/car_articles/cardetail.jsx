import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import carService from "../../services/carService.js";
import { useNavigate } from "react-router-dom";
export default function CarDetail() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [car, setCar] = useState(null);
    const [mainImage, setMainImage] = useState("");

    useEffect(() => {
        fetchCar();
    }, [id]);

    const fetchCar = async () => {
        const res = await carService.getCarById(id);
        setCar(res.data);

        if (res.data?.images?.length > 0) {
            setMainImage(res.data.images[0].image_url);
        }
    };

    if (!car) return <h2 style={{ padding: 20 }}>Loading...</h2>;

    return (
        <div style={{ background: "#f5f5f5", minHeight: "100vh" }}>

            {/* HERO SECTION */}
            <div style={{
                display: "flex",
                gap: "20px",
                padding: "20px",
                background: "white"
            }}>

                {/* LEFT IMAGE */}
                <div style={{ flex: 2 }}>

                    <img
                        src={mainImage}
                        style={{
                            width: "100%",
                            height: "450px",
                            objectFit: "cover",
                            borderRadius: "10px"
                        }}
                    />

                    {/* THUMBNAILS */}
                    <div style={{
                        display: "flex",
                        gap: "10px",
                        marginTop: "10px"
                    }}>
                        {car.images?.map((img) => (
                            <img
                                key={img.id}
                                src={img.image_url}
                                onClick={() => setMainImage(img.image_url)}
                                style={{
                                    width: "90px",
                                    height: "70px",
                                    objectFit: "cover",
                                    borderRadius: "6px",
                                    cursor: "pointer",
                                    border: mainImage === img.image_url ? "2px solid blue" : "1px solid #ddd"
                                }}
                            />
                        ))}
                    </div>
                </div>

                {/* RIGHT INFO */}
                <div style={{ flex: 1, padding: "10px" }}>

                    <h2>{car.brand} {car.model}</h2>

                    <h3 style={{ color: "green" }}>
                        {Number(car.price_per_day).toLocaleString()} / ngày
                    </h3>

                    <p>📌 {car.license_plate}</p>
                    <p>👤 {car.owner_name}</p>
                    <p>⛽ {car.fuel_type}</p>
                    <p>⚙️ {car.transmission}</p>
                    <p>📍 {car.location}</p>

                    <button style={{
                        width: "100%",
                        padding: "12px",
                        background: "green",
                        color: "white",
                        border: "none",
                        borderRadius: "8px",
                        marginTop: "10px"
                    }} onClick={() => navigate(`/booking/${car.id}`)}>
                        Thuê xe ngay
                    </button>

                    <button style={{
                        width: "100%",
                        padding: "12px",
                        background: "#007bff",
                        color: "white",
                        border: "none",
                        borderRadius: "8px",
                        marginTop: "10px"
                    }} onClick={() => navigate(`/favorite/${car.id}`)}>
                        ❤️ Yêu thích
                    </button>

                </div>
            </div>

            {/* DESCRIPTION SECTION */}
            <div style={{
                background: "white",
                marginTop: "10px",
                padding: "20px"
            }}>
                <h3>📝 Mô tả</h3>
                <p>{car.description}</p>
            </div>

            {/* SPEC SECTION */}
            <div style={{
                background: "white",
                marginTop: "10px",
                padding: "20px"
            }}>
                <h3>⚙️ Thông số xe</h3>

                <ul>
                    <li>Năm: {car.year}</li>
                    <li>Số ghế: {car.seat_count}</li>
                    <li>Odometer: {car.odometer}</li>
                </ul>
            </div>

            {/* VIDEO SECTION */}
            <div style={{
                background: "white",
                marginTop: "10px",
                padding: "20px"
            }}>
                <h3>🎥 Video</h3>

                {car.videos?.map(v => (
                    <iframe
                        key={v.id}
                        width="100%"
                        height="400"
                        src={v.youtube_url?.replace("watch?v=", "embed/")}
                        style={{ borderRadius: "10px" }}
                        allowFullScreen
                    />
                ))}
            </div>

        </div>
    );
}
