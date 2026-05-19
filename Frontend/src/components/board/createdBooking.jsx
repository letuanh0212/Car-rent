import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import bookingService from "../../services/bookingsService.js";

import { useAuth } from "../../AuthContext.jsx";

export default function CreatedBooking({ car }) {
    const navigate = useNavigate();
    const { user } = useAuth();

    const [booking, setBooking] = useState({

        start_date: "",
        end_date: "",
        pickup_location: "",
        return_location: ""

    });

    const [totalDays, setTotalDays] = useState(0);

    const [totalPrice, setTotalPrice] = useState(0);
    const [isAvailable, setIsAvailable] = useState(null);
    const [availabilityMessage, setAvailabilityMessage] = useState("");

    const calculateDays = (start, end) => {

        if (!start || !end) return 0;

        const startDate = new Date(start);

        const endDate = new Date(end);

        const diffTime = endDate - startDate;

        const diffDays = Math.ceil(
            diffTime / (1000 * 60 * 60 * 24)
        );

        return diffDays > 0 ? diffDays : 0;
    };

    useEffect(() => {

        const days = calculateDays(
            booking.start_date,
            booking.end_date
        );

        setTotalDays(days);

        setTotalPrice(
            days * Number(car?.price_per_day || 0)
        );

    }, [booking.start_date, booking.end_date, car]);

    useEffect(() => {
        if (!booking.start_date || !booking.end_date) {
            setIsAvailable(null);
            setAvailabilityMessage("");
            return;
        }

        const startDate = new Date(booking.start_date);
        const endDate = new Date(booking.end_date);

        if (startDate >= endDate) {
            setIsAvailable(false);
            setAvailabilityMessage("Ngày trả phải sau ngày nhận.");
            return;
        }

        const checkAvailability = async () => {
            try {
                const availabilityCheck = await bookingService.checkCarAvailability(
                    car?.id,
                    booking.start_date,
                    booking.end_date
                );

                if (availabilityCheck?.data?.data?.isAvailable) {
                    setIsAvailable(true);
                    setAvailabilityMessage("Khoảng thời gian này hiện đang có thể đặt.");
                } else {
                    setIsAvailable(false);
                    setAvailabilityMessage(
                        "Khoảng thời gian này đã bị đặt. Vui lòng chọn thời gian khác."
                    );
                }
            } catch (error) {
                console.error("Availability error:", error);
                setIsAvailable(false);
                setAvailabilityMessage("Không thể kiểm tra lịch, vui lòng thử lại.");
            }
        };

        checkAvailability();
    }, [booking.start_date, booking.end_date, car?.id]);

    const handleChange = (e) => {

        const { name, value } = e.target;

        setBooking((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (isAvailable === false) {
            alert(availabilityMessage || "Khoảng thời gian này không khả dụng. Vui lòng chọn lại.");
            return;
        }

        if (!booking.start_date || !booking.end_date) {
            alert("Vui lòng chọn ngày nhận và ngày trả xe.");
            return;
        }

        if (new Date(booking.start_date) >= new Date(booking.end_date)) {
            alert("Ngày trả phải sau ngày nhận.");
            return;
        }

        try {
            const availabilityCheck = await bookingService.checkCarAvailability(
                car.id,
                booking.start_date,
                booking.end_date
            );

            if (!availabilityCheck.data?.data?.isAvailable) {
                alert("Xe đã được đặt trong khoảng thời gian này. Vui lòng chọn ngày khác.");
                return;
            }

            const payload = {

                listing_id: car.id,

                start_date: booking.start_date,

                end_date: booking.end_date,

                pickup_location: booking.pickup_location,

                return_location: booking.return_location,

                total_price: totalPrice
            };

            await bookingService.createBooking(payload);

            alert(
                `Đặt xe thành công! Tổng tiền: ${totalPrice.toLocaleString()}đ`
            );
            navigate("/my-bookings");

        } catch (error) {

            console.log(error);

            alert("Đặt xe thất bại");
        }
    };

    return (

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
                    min={new Date().toISOString().slice(0, 16)}
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
                    min={booking.start_date}
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

            </div>

            {/* TOTAL */}
            <div
                className="
                    bg-zinc-100
                    rounded-xl
                    p-4
                    space-y-2
                "
            >

                <p>
                    Số ngày thuê:
                    <span className="font-bold ml-2">
                        {totalDays} ngày
                    </span>
                </p>

                <p>
                    Tổng tiền:
                    <span className="font-bold ml-2 text-green-600">
                        {totalPrice.toLocaleString()}đ
                    </span>
                </p>

                {availabilityMessage && (
                    <p
                        className={`mt-2 text-sm ${isAvailable ? "text-green-600" : "text-red-600"}`}
                    >
                        {availabilityMessage}
                    </p>
                )}

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
                        {user?.full_name || user?.sub || "N/A"}
                    </span>
                </p>

                <p>
                    Phone:
                    <span className="font-semibold ml-2">
                        {user?.phone || "N/A"}
                    </span>
                </p>

                <p>
                    Email:
                    <span className="font-semibold ml-2">
                        {user?.email || "N/A"}
                    </span>
                </p>

            </div>

            {/* BUTTON */}
            <button
                type="submit"
                disabled={isAvailable === false}
                className="
                    w-full
                    bg-black
                    text-white
                    py-3
                    rounded-xl
                    font-semibold
                    hover:bg-zinc-800
                    transition
                    disabled:cursor-not-allowed
                    disabled:opacity-60
                "
            >
                Xác Nhận Đặt Xe
            </button>

        </form>
    );
}