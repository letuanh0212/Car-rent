import BookingWidget from "~/components/Car/BookingWidget";
import DetailGallery from "~/components/Car/DetailGallery";
import DetailInfo from "~/components/Car/DetailInfo";
import carDetailApi from "~/hooks/Car/useCarDetail";
import { useParams } from "react-router-dom";
export default function CarDetailPage() {
    const {id} = useParams();
    const { car} = carDetailApi(id);

    return (
        <section className="bg-(--color-surface-lowest) py-24">
            <div className="mx-auto max-w-7xl px-8">
                <div className="grid gap-12 lg:grid-cols-2">
                    <div className="space-y-10">
                        <DetailGallery car={car} />
                        <DetailInfo car={car} />
                    </div>
                    <BookingWidget car={car} />
                </div>
            </div>
        </section>
    );
}