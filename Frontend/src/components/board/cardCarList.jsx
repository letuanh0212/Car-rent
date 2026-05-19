// import { useNavigate } from "react-router-dom";

// export default function CarCard({ car }) {
//   const navigate = useNavigate();

//   // Giả lập dữ liệu dựa trên hình ảnh nếu prop car thiếu thông tin
//   const displayPrice = Number(car.price).toLocaleString() + "đ";
//   const carTitle = `${car.brand} ${car.model} ${car.version || ''} ${car.year || ''}`.toUpperCase();

//   return (
//     <div
//       onClick={() => navigate(`/cars/${car.id}`)}
//       style={{
//         cursor: "pointer",
//         border: "1px solid #e0e0e0",
//         borderRadius: "16px",
//         overflow: "hidden",
//         background: "#fff",
//         transition: "all 0.3s ease",
//         maxWidth: "350px",
//         fontFamily: "sans-serif"
//       }}
//       onMouseOver={(e) => (e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.12)")}
//       onMouseOut={(e) => (e.currentTarget.style.boxShadow = "none")}
//     >
//       {/* 1. IMAGE AREA */}
//       <div style={{ position: "relative" }}>
//         <img
//           src={car.image || "image_af30f4.jpg"} // Ưu tiên ảnh từ dữ liệu hoặc fallback về mẫu
//           alt={car.model}
//           style={{
//             width: "100%",
//             height: "220px",
//             objectFit: "cover",
//           }}
//         />
//       </div>

//       {/* 2. MAIN CONTENT AREA */}
//       <div style={{ padding: "16px" }}>
//         <h2 style={{ 
//           fontSize: "24px", 
//           color: "#1a365d", 
//           margin: "0 0 12px 0",
//           fontWeight: "bold" 
//         }}>
//           {displayPrice}
//         </h2>
        
//         <h3 style={{ 
//           fontSize: "16px", 
//           color: "#4a4a4a", 
//           margin: "0 0 20px 0",
//           lineHeight: "1.4",
//           fontWeight: "600",
//           minHeight: "45px"
//         }}>
//           {carTitle}
//         </h3>

//         {/* 3. SPECIFICATIONS GRID (Phần màu xám trong image_af30f4.jpg) */}
//         <div style={{ 
//           display: "grid", 
//           gridTemplateColumns: "1fr 1fr", 
//           gap: "12px", 
//           backgroundColor: "#f4f6f9", 
//           padding: "12px", 
//           borderRadius: "12px" 
//         }}>
//           <SpecItem icon="📅" label={car.year } />
//           <SpecItem icon="🚗" label={car.seat_count } />
//           <SpecItem icon="⏲️" label={`${car.mileage  } Km`} />
//           <SpecItem icon="⛽" label={car.fuel_type } />
//           <SpecItem icon="⚙️" label={car.transmission  } />
//           <SpecItem icon="📍" label={car.location } />
//         </div>
//       </div>
//     </div>
//   );
// }


// function SpecItem({ icon, label }) {
//   return (
//     <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: "#2d3748", fontWeight: "500" }}>
//       <span>{icon}</span>
//       <span style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{label}</span>
//     </div>
//   );
// }
import { useNavigate } from "react-router-dom";

export default function CarCard({ car }) {

  const navigate = useNavigate();

  const displayPrice =
    Number(car.price).toLocaleString() + "đ";

  const carTitle =
    `${car.brand} ${car.model} ${car.version || ''} ${car.year || ''}`.toUpperCase();

  return (

    <div
      onClick={() => navigate(`/cars/${car.id}`)}
      style={{
        cursor: "pointer",
        border: "1px solid #e0e0e0",
        borderRadius: "16px",
        overflow: "hidden",
        background: "#fff",
        transition: "all 0.3s ease",
        maxWidth: "350px",
        fontFamily: "sans-serif"
      }}

      onMouseOver={(e) =>
        (e.currentTarget.style.boxShadow =
          "0 8px 20px rgba(0,0,0,0.12)")
      }

      onMouseOut={(e) =>
        (e.currentTarget.style.boxShadow =
          "none")
      }
    >

      {/* IMAGE */}
      <div style={{ position: "relative" }}>

        <img
          src={car.image || "image_af30f4.jpg"}
          alt={car.model}
          style={{
            width: "100%",
            height: "220px",
            objectFit: "cover",
          }}
        />

      </div>

      {/* CONTENT */}
      <div style={{ padding: "16px" }}>

        <h2
          style={{
            fontSize: "24px",
            color: "#1a365d",
            margin: "0 0 12px 0",
            fontWeight: "bold"
          }}
        >
          {displayPrice}
        </h2>

        <h3
          style={{
            fontSize: "16px",
            color: "#4a4a4a",
            margin: "0 0 20px 0",
            lineHeight: "1.4",
            fontWeight: "600",
            minHeight: "45px"
          }}
        >
          {carTitle}
        </h3>

        {/* SPEC */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "12px",
            backgroundColor: "#f4f6f9",
            padding: "12px",
            borderRadius: "12px"
          }}
        >

          <SpecItem icon="📅" label={car.year} />

          <SpecItem icon="🚗" label={car.seat_count} />

          <SpecItem
            icon="⏲️"
            label={`${car.mileage} Km`}
          />

          <SpecItem
            icon="⛽"
            label={car.fuel_type}
          />

          <SpecItem
            icon="⚙️"
            label={car.transmission}
          />

          <SpecItem
            icon="📍"
            label={car.location}
          />

        </div>

        {/* BUTTON */}
        <button
          onClick={(e) => {

            e.stopPropagation();

            navigate(
              `/cars/${car.id}`
            );

          }}

          style={{
            marginTop: "18px",
            width: "100%",
            padding: "12px",
            border: "none",
            borderRadius: "12px",
            background:
              "linear-gradient(135deg,#2563eb,#1d4ed8)",
            color: "white",
            fontWeight: "bold",
            fontSize: "15px",
            cursor: "pointer",
            transition: "0.3s"
          }}
        >
          Thuê xe ngay
        </button>

      </div>

    </div>
  );
}

function SpecItem({ icon, label }) {

  return (

    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        fontSize: "13px",
        color: "#2d3748",
        fontWeight: "500"
      }}
    >

      <span>{icon}</span>

      <span
        style={{
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis"
        }}
      >
        {label}
      </span>

    </div>
  );
}