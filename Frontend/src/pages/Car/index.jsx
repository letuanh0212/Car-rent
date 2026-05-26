  import CardCar from "~/components/CarCard";
  import carApi from "~/hooks/Car/useCars";
  import { Link } from "react-router-dom";
  import Banner from "~/components/Banner";
  import CarTable from "~/components/CarTable";

  export default function CarListPage() {
    const { cars, loading, error } = carApi();

    return (
      <section className="bg-(--color-surface-lowest) py-24">
        <Banner/>
        <div className="mx-auto max-w-7xl px-8">
          <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="text-4xl font-bold tracking-tight text-(--color-text-primary)">
                Browse Cars
              </h1>
              <p className="mt-2 max-w-2xl text-base leading-6 text-(--color-text-secondary)">
                Choose a vehicle that fits your trip,
                budget, and driving style.
              </p>
            </div>
          </div>
          {loading && (
            <p className="text-(--color-text-secondary)">
              Loading cars...
            </p>
          )}
          {error && (
            <p className="text-(--color-error)">
              {error}
            </p>
          )}
          {!loading && !error && (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
              {cars.map((car) => (
                <Link to={`/cars/${car.id}`} key={car.id}>
                  <CardCar car={car} />
                  {/* <CarTable car={car} /> */}
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    );
  }