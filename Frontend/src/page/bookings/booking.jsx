import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import carService from "../../services/carService.js";

import CreatedBooking from "../../components/board/createdBooking.jsx";

export default function BookingPage() {

    const { id } = useParams();

    const [car, setCar] = useState(null);

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

                    <h1 className="text-3xl font-bold mb-2">
                        {car.title}
                    </h1>

                    <p className="text-zinc-500 mb-6">
                        {car.location}
                    </p>

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
                            Giá thuê :
                            {" "}
                            {Number(car.price_per_day).toLocaleString()}đ / ngày
                        </p>

                    </div>
                    <div
                            className="
                                bg-zinc-100
                                p-4
                                rounded-xl
                            "
                    >
                    <h3 className="font-bold mb-3">
                        thông tin chủ xe
                    </h3>

                    <p>
                        Tên:
                        <span className="font-semibold ml-2">
                            {car.owner_name}
                        </span>
                    </p>

                    <p>
                        Phone:
                        <span className="font-semibold ml-2">
                            {car.owner_phone || "N/A"}
                        </span>
                    </p>


                    </div>
                </div>

                {/* FORM */}
                <CreatedBooking car={car} />

            </div>

        </div>
    );
}