import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import carService from "../../services/carService.js";
import bookingService from "../../services/bookingsService.js";
import { useAuth } from "../../AuthContext.jsx";

export default function BookingPage() {

    const { id } = useParams();
    const { user } = useAuth();

    const [totalDays, setTotalDays] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);

  
    const calculateDays = (start, end) => {
        if (!start || !end) return 0;
        const startDate = new Date(start);
        const endDate = new Date(end);
        const diffTime = endDate - startDate;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays > 0 ? diffDays : 0;
    };

    const [car, setCar] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const days = calculateDays(booking.start_date, booking.end_date);

            const payload = {
                listing_id: car.id,
                start_date: booking.start_date,
                end_date: booking.end_date,
                pickup_location: booking.pickup_location,
                return_location: booking.return_location,

                total_price: days * car.price_per_day
            };

            console.log("DAYS:", days);
            console.log("TOTAL:", payload.total_price);

            await bookingService.createBooking(payload);

            alert(`Đặt xe thành công! Tổng tiền: ${payload.total_price.toLocaleString()}đ`);

        } catch (error) {
            console.log(error);
        }
    };
        
    const [booking, setBooking] = useState({

        start_date: "",
        end_date: "",
        pickup_location: "",
        return_location: ""

    });

    useEffect(() => {
        const fetchCar = async () => {
            try {
                const response = await carService.getCarById(id);
                setCar(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchCar();
    }, [id]);

    
    useEffect(() => {
        const days = calculateDays(booking.start_date, booking.end_date);
        setTotalDays(days);
        setTotalPrice(days * Number(car?.price_per_day || 0));
    }, [booking.start_date, booking.end_date, car]);

    const handleChange = (e) => {

        const { name, value } = e.target;

        setBooking({
            ...booking,
            [name]: value
        });
    };
    if (!car) {

        return (
            <div className="p-10">
                Loading...
            </div>
        );
    }

    return (

        <div className="min-h-screen bg-zinc-100 p-8">

            <div
                className="
                    max-w-6xl
                    mx-auto
                    grid
                    grid-cols-1
                    md:grid-cols-2
                    gap-8
                "
            >

                                
                {/* THÔNG TIN XE */}
                <div
                    className="
                        bg-white
                        rounded-2xl
                        shadow-lg
                        p-6
                    "
                >

                    {/* IMAGE */}
                    <div
                        className="
                            w-full
                            h-72
                            bg-zinc-200
                            rounded-xl
                            overflow-hidden
                            mb-5
                        "
                    >

                        {
                            car?.images?.length > 0 ? (

                                <img
                                    src={car.images[0]}
                                    alt={car.title}
                                    className="
                                        w-full
                                        h-full
                                        object-cover
                                    "
                                />

                            ) : (

                                <div
                                    className="
                                        w-full
                                        h-full
                                        flex
                                        justify-center
                                        items-center
                                        text-zinc-500
                                        text-xl
                                    "
                                >
                                    No Image
                                </div>
                            )
                        }

                    </div>

                    {/* TITLE */}
                    <h1 className="text-3xl font-bold mb-2">
                        {car.title}
                    </h1>

                    <p className="text-zinc-500 mb-6">
                        {car.location}
                    </p>

                    {/* PRICE */}
                    <div
                        className="
                            bg-black
                            text-white
                            rounded-2xl
                            p-5
                            mb-6
                        "
                    >

                        <p className="text-sm">
                            Giá thuê : {Number(car.price_per_day).toLocaleString()}đ / ngày
                        </p>

                    </div>

                    {/* CAR INFO */}
                    <div className="space-y-4">

                        <div
                            className="
                                flex
                                justify-between
                                border-b
                                pb-3
                            "
                        >
                            <span className="text-zinc-500">
                                Hãng xe
                            </span>

                            <span className="font-semibold">
                                {car.brand}
                            </span>
                        </div>

                        <div
                            className="
                                flex
                                justify-between
                                border-b
                                pb-3
                            "
                        >
                            <span className="text-zinc-500">
                                Model
                            </span>

                            <span className="font-semibold">
                                {car.model}
                            </span>
                        </div>

                        <div
                            className="
                                flex
                                justify-between
                                border-b
                                pb-3
                            "
                        >
                            <span className="text-zinc-500">
                                Năm sản xuất
                            </span>

                            <span className="font-semibold">
                                {car.year}
                            </span>
                        </div>

                        <div
                            className="
                                flex
                                justify-between
                                border-b
                                pb-3
                            "
                        >
                            <span className="text-zinc-500">
                                Số ghế
                            </span>

                            <span className="font-semibold">
                                {car.seat_count} chỗ
                            </span>
                        </div>

                        <div
                            className="
                                flex
                                justify-between
                                border-b
                                pb-3
                            "
                        >
                            <span className="text-zinc-500">
                                Hộp số
                            </span>

                            <span className="font-semibold">
                                {car.transmission}
                            </span>
                        </div>

                        <div
                            className="
                                flex
                                justify-between
                                border-b
                                pb-3
                            "
                        >
                            <span className="text-zinc-500">
                                Nhiên liệu
                            </span>

                            <span className="font-semibold">
                                {car.fuel_type}
                            </span>
                        </div>

                        <div
                            className="
                                flex
                                justify-between
                                border-b
                                pb-3
                            "
                        >
                            <span className="text-zinc-500">
                                Odometer
                            </span>

                            <span className="font-semibold">
                                {car.odometer?.toLocaleString()} km
                            </span>
                        </div>

                        <div
                            className="
                                flex
                                justify-between
                                border-b
                                pb-3
                            "
                        >
                            <span className="text-zinc-500">
                                Biển số
                            </span>

                            <span className="font-semibold">
                                {car.license_plate}
                            </span>
                        </div>

                        <div
                            className="
                                flex
                                justify-between
                                border-b
                                pb-3
                            "
                        >
                            <span className="text-zinc-500">
                                Trạng thái
                            </span>

                            <span
                                className="
                                    font-semibold
                                    text-green-600
                                "
                            >
                                {car.status}
                            </span>
                        </div>

                    </div>

                    {/* DESCRIPTION */}
                    <div className="mt-8">

                        <h2
                            className="
                                text-xl
                                font-bold
                                mb-3
                            "
                        >
                            Mô tả
                        </h2>

                        <p
                            className="
                                text-zinc-700
                                leading-7
                            "
                        >
                            {car.description}
                        </p>

                    </div>

                    {/* OWNER */}
                    <div
                        className="
                            mt-8
                            bg-zinc-100
                            rounded-2xl
                            p-5
                        "
                    >

                        <h2
                            className="
                                text-xl
                                font-bold
                                mb-4
                            "
                        >
                            Thông Tin Chủ Xe
                        </h2>

                        <div className="space-y-3">

                            <p>
                                Chủ xe:
                                <span className="font-semibold ml-2">
                                    {car.owner_name}
                                </span>
                            </p>

                            <p>
                                Số điện thoại:
                                <span className="font-semibold ml-2">
                                    {car.owner_phone}
                                </span>
                            </p>

                        </div>

                    </div>

                </div>

                {/* FORM ĐẶT XE */}
                <form
                    onSubmit={handleSubmit}
                    className="
                        bg-white
                        rounded-2xl
                        shadow-lg
                        p-6
                        space-y-5
                    "
                >

                    <h2 className="text-2xl font-bold mb-4">
                        Thông Tin Đặt Xe
                    </h2>

                    {/* START DATE */}
                    <div>

                        <label className="font-semibold">
                            Ngày nhận xe
                        </label>

                        <input
                            type="datetime-local"
                            name="start_date"
                            value={booking.start_date}
                            onChange={handleChange}
                            className="
                                w-full
                                border
                                rounded-xl
                                p-3
                                mt-2
                            "
                            required
                        />

                    </div>

                    {/* END DATE */}
                    <div>

                        <label className="font-semibold">
                            Ngày trả xe
                        </label>

                        <input
                            type="datetime-local"
                            name="end_date"
                            value={booking.end_date}
                            onChange={handleChange}
                            className="
                                w-full
                                border
                                rounded-xl
                                p-3
                                mt-2
                            "
                            required
                        />

                    </div>

                    {/* PICKUP */}
                    <div>

                        <label className="font-semibold">
                            Điểm nhận xe
                        </label>

                        <input
                            type="text"
                            name="pickup_location"
                            value={booking.pickup_location}
                            onChange={handleChange}
                            placeholder="Nhập điểm nhận xe"
                            className="
                                w-full
                                border
                                rounded-xl
                                p-3
                                mt-2
                            "
                            required
                        />

                    </div>

                    {/* RETURN */}
                    <div>

                        <label className="font-semibold">
                            Điểm trả xe
                        </label>

                        <input
                            type="text"
                            name="return_location"
                            value={booking.return_location}
                            onChange={handleChange}
                            placeholder="Nhập điểm trả xe"
                            className="
                                w-full
                                border
                                rounded-xl
                                p-3
                                mt-2
                            "
                            required
                        />
                        <p>
                            Tổng tiền dự kiến: {totalPrice.toLocaleString()}đ
                        </p>

                    </div>

                    {/* USER INFO */}
                    <div
                        className="
                            bg-zinc-100
                            p-4
                            rounded-xl
                        "
                    >

                        <h3 className="font-bold mb-3">
                            Thông Tin Người Thuê
                        </h3>

                        <p>
                            Tên:
                            <span className="font-semibold ml-2">
                                {user?.full_name || user?.sub || 'N/A'}
                            </span>
                        </p>
                        <p>
                            Phone:
                            <span className="font-semibold ml-2">
                                {user?.phone || 'N/A'}
                            </span>
                        </p>
                        <p>
                            Email:
                            <span className="font-semibold ml-2">
                                {user?.email || 'N/A'}
                            </span>
                        </p>

                    </div>

                    {/* BUTTON */}
                    <button
                        type="submit"
                        className="
                            w-full
                            bg-black
                            text-white
                            py-3
                            rounded-xl
                            font-semibold
                            hover:bg-zinc-800
                            transition
                        "
                    >
                        Xác Nhận Đặt Xe
                    </button>

                </form>

            </div>

        </div>
    );
}