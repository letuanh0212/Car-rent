import BookingWidget from "~/components/Car/BookingWidget";
import DetailGallery from "~/components/Car/DetailGallery";
import DetailInfo from "~/components/Car/DetailInfo";

export default function CarDetailPage() {
    return (
        <section className="bg-(--color-surface-lowest) py-24">
            <div className="mx-auto max-w-7xl px-8">
                <div className="grid gap-12 lg:grid-cols-2">
                    <div className="space-y-10">
                        <DetailGallery />
                        <DetailInfo />
                    </div>
                    <BookingWidget />
                </div>
            </div>
        </section>
    );
}