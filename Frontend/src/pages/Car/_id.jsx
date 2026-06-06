import BookingWidget from "~/components/Car/CarCard/BookingWidget";
import DetailGallery from "~/components/Car/CarCard/DetailGallery";
import DetailInfo from "~/components/Car/CarCard/DetailInfo";
import carDetailApi from "~/hooks/Car/useCarDetail";
import { useParams } from "react-router-dom";
import CarVD from "~/components/Car/CarCard/CarVD";
import {useSelector} from "react-redux";
import useCreateBooking from "~/hooks/Booking/useBookingCreate";

export default function CarDetailPage() {
    const {id} = useParams();
     const { account, isAuthenticated } = useSelector(
        (state) => state.account || {}
    );
    const accountRole = account?.role?.toLowerCase();
    const isAdmin =
        isAuthenticated && accountRole === "admin";
    const { car} = carDetailApi(id);
    const {
            submitBooking,
            loading: bookingLoading,
    } = useCreateBooking();




    const handleBookingSubmit = async (payload) => {
        const result = await submitBooking(payload);

        if (result.success) {
            alert("Booking created successfully");
        } else {
            alert(result.error || "Create booking failed");
        }
    };

    if (!car) {
        return <>loading</>;
        }
    return (
        <section className="bg-(--color-surface-lowest) py-24">
        <div className="mx-auto max-w-7xl px-8">

            {isAdmin && (
            <div className="mb-8 flex items-center justify-between rounded-2xl border border-(--color-border) bg-(--color-surface) px-6 py-4 shadow-sm">

                <div>
                <h2 className="text-lg font-bold text-(--color-text-primary)">
                    Admin Mode
                </h2>

                <p className="text-sm text-(--color-text-secondary)">
                    You are viewing this car as administrator
                </p>
                </div>

                <button
                    type="button"
                    onClick={() => window.location.href = "/dashboard/cars"}
                    className="rounded-xl bg-(--color-primary) px-5 py-3 font-semibold text-(--color-on-primary) transition hover:opacity-90"
                    >
                    ← Dashboard
                </button>

            </div>
            
            )}

            <div className="grid gap-12 lg:grid-cols-2">

            <div className="space-y-10">
                <DetailGallery car={car} />
                <DetailInfo car={car} />
            </div>

            {!isAdmin && (
                <BookingWidget
                car={car}
                onSubmit={handleBookingSubmit}
                loading={bookingLoading}
                />
            )}
            </div>

            <div className="mt-12">
            <CarVD videos={car?.videos} />
            </div>

        </div>
        </section>
    );
}