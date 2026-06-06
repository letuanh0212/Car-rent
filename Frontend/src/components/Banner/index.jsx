export default function CarBanner() {
  return (
    <section className="relative h-105 overflow-hidden">

      {/* Background Image */}
      <img
        src="src/public/Images/banner-1.png"
        alt="Luxury Car"
        className="
          absolute inset-0
          h-full w-full
          object-cover
        "
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/45" />

      {/* Content */}
      <div className="relative z-10 flex h-full items-center">
        <div className="mx-auto w-full max-w-7xl px-8">
          <div className="max-w-2xl text-white">

            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-white/70">
              Premium Car Rental
            </p>

            <h1 className="text-5xl font-bold leading-tight md:text-6xl">
              Find your perfect car for every journey
            </h1>

            <p className="mt-6 text-lg leading-8 text-white/80">
              Browse luxury, sport, and family vehicles with flexible booking options.
            </p>

          </div>
        </div>
      </div>

    </section>
  );
}