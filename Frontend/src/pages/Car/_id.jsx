import BookingWidget from "~/components/Car/CarCard/BookingWidget";
import DetailGallery from "~/components/Car/CarCard/DetailGallery";
import DetailInfo from "~/components/Car/CarCard/DetailInfo";
import carDetailApi from "~/hooks/Car/useCarDetail";
import { useParams } from "react-router-dom";

import useCreateBooking from "~/hooks/Booking/useBookingCreate";

export default function CarDetailPage() {
    const {id} = useParams();
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
    return (
        <section className="bg-(--color-surface-lowest) py-24">
            <div className="mx-auto max-w-7xl px-8">
                <div className="grid gap-12 lg:grid-cols-2">
                    <div className="space-y-10">
                        <DetailGallery car={car} />
                        <DetailInfo car={car} />
                    </div>
                    <BookingWidget
                        car={car}
                        onSubmit={handleBookingSubmit}
                        loading={bookingLoading}
                        />
                </div>
            </div>
        </section>
    );
}