import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Banner from "~/components/Banner";
import Button from "~/components/Button";
import CardCar from "~/components/Car/CarCard";
import CarTable from "~/components/Car/CarTable";

import useCars from "~/hooks/Car/useCars";

export default function CarListPage() {
  const navigate = useNavigate();
  const { cars, loading, error } = useCars();

  const { account, isAuthenticated } = useSelector(
    (state) => state.account || {}
  );

  const accountRole = account?.role?.toLowerCase();
  const isAdmin =
    isAuthenticated && accountRole === "admin";

  const [viewMode, setViewMode] = useState("card");

  useEffect(() => {
    if (isAdmin) {
      setViewMode("table");
    }
  }, [isAdmin]);

  const handleView = (car) => {
    navigate(`/cars/${car.id}`);
  };

  const handleEdit = (car) => {
    navigate(`/dashboard/cars/${car.id}/edit`);
  };

  const handleAddImage = (car) => {
    navigate(`/dashboard/cars/${car.id}/images`);
  };

  const handleDelete = (car) => {
    console.log("delete car", car.id);
  };

  const renderAdminCard = (car) => (
    <CardCar
      key={car.id}
      car={car}
      variant="admin"
      onView={handleView}
      onEdit={handleEdit}
      onDelete={handleDelete}
      onAddImage={handleAddImage}
    />
  );

  const renderPublicCard = (car) => (
    <Link to={`/cars/${car.id}`} key={car.id}>
      <CardCar car={car} variant="public" />
    </Link>
  );

  if (isAdmin) {
    return (
      <section className="bg-(--color-surface) p-6">
        <div className="mb-6 flex items-center justify-between gap-4">
          <h1 className="text-3xl font-bold text-(--color-text-primary)">
            Car Fleet
          </h1>

          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant={viewMode === "card" ? "admin" : "ghost"}
              className="min-h-10 border border-(--color-border) px-4 text-xs normal-case"
              onClick={() => setViewMode("card")}
            >
              Card
            </Button>

            <Button
              type="button"
              variant={viewMode === "table" ? "admin" : "ghost"}
              className="min-h-10 border border-(--color-border) px-4 text-xs normal-case"
              onClick={() => setViewMode("table")}
            >
              Table
            </Button>
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

        {!loading && !error && viewMode === "table" && (
          <CarTable
            cars={cars}
            isAdmin={isAdmin}
            onView={handleView}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onAddImage={handleAddImage}
          />
        )}

        {!loading && !error && viewMode === "card" && (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {cars.map(renderAdminCard)}
          </div>
        )}
      </section>
    );
  }

  return (
    <section className="bg-(--color-surface-lowest) py-24">
      <Banner />

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
            {cars.map(renderPublicCard)}
          </div>
        )}
      </div>
    </section>
  );
}
