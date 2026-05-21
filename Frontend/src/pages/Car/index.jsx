import CardCar from "~/components/CardCar";

const mockCars = [
    {
        id: "1",
        brand: "Toyota",
        model: "Camry",
        year: 2023,
        title: "Toyota Camry 2023 Full Option",
        description: "Xe sedan rộng rãi, phù hợp đi gia đình và công tác.",
        pricePerDay: 1500000,
        location: "Ho Chi Minh City",
        transmission: "Automatic",
        fuelType: "Gasoline",
        seatCount: 5,
        odometer: 12000,
        status: "available",
        thumbnail: "https://images.unsplash.com/photo-1550355291-bbee04a92027?q=80&w=1200&auto=format&fit=crop",
    },
    {
        id: "2",
        brand: "Ford",
        model: "Everest",
        year: 2022,
        title: "Ford Everest SUV mạnh mẽ",
        description: "SUV 7 chỗ rộng rãi, phù hợp đi du lịch đường dài.",
        pricePerDay: 2000000,
        location: "Binh Duong",
        transmission: "Automatic",
        fuelType: "Diesel",
        seatCount: 7,
        odometer: 25000,
        status: "available",
        thumbnail: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?q=80&w=1200&auto=format&fit=crop",
    },
    {
        id: "3",
        brand: "Kia",
        model: "Morning",
        year: 2021,
        title: "Kia Morning tiết kiệm xăng",
        description: "Xe nhỏ gọn, dễ di chuyển trong thành phố.",
        pricePerDay: 700000,
        location: "Da Nang",
        transmission: "Automatic",
        fuelType: "Gasoline",
        seatCount: 4,
        odometer: 18000,
        status: "available",
        thumbnail: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200&auto=format&fit=crop",
    },
    {
        id: "4",
        brand: "Ford",
        model: "Ranger",
        year: 2024,
        title: "Ford Ranger Wildtrak",
        description: "Xe bán tải mạnh mẽ, phù hợp chở hàng và off-road.",
        pricePerDay: 2200000,
        location: "Can Tho",
        transmission: "Automatic",
        fuelType: "Diesel",
        seatCount: 5,
        odometer: 5000,
        status: "available",
        thumbnail: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=1200&auto=format&fit=crop",
    },
    {
        id: "5",
        brand: "Tesla",
        model: "Model S",
        year: 2024,
        title: "Tesla Model S Plaid",
        description: "Xe điện cao cấp với hiệu suất cực mạnh và công nghệ hiện đại.",
        pricePerDay: 3500000,
        location: "Ho Chi Minh City",
        transmission: "Automatic",
        fuelType: "Electric",
        seatCount: 5,
        odometer: 3000,
        status: "available",
        thumbnail: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?q=80&w=1200&auto=format&fit=crop",
    },
];

export default function CarListPage() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-8">

        <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-[#191c1e]">
              Browse Cars
            </h1>

            <p className="mt-2 max-w-2xl text-base leading-6 text-[#45464d]">
              Choose a vehicle that fits your trip,
              budget, and driving style.
            </p>
          </div>
        </div>

        {/* GRID */}

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {mockCars.map((car) => (
            <CardCar
              key={car.id}
              car={car}
            />
          ))}
        </div>

      </div>
    </section>
  );
}