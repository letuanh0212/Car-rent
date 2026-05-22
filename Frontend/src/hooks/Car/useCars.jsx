import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import carApi from "~/apis/customer/carCustomer";

import {
  setCars,
  setCarLoading,
  setCarError,
} from "~/store/slices/carSlice";

export default function useCars() {
  const dispatch = useDispatch();

  const {
    cars,
    loading,
    error,
  } = useSelector((state) => state.cars);

  const fetchCars = async () => {
    try {
      dispatch(setCarLoading(true));

      dispatch(setCarError(""));

      const response = await carApi.getCarList();

      dispatch(setCars(response));
    } catch (err) {
      dispatch(
        setCarError(
          err.message || "Failed to fetch cars"
        )
      );
    } finally {
      dispatch(setCarLoading(false));
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  return {
    cars,
    loading,
    error,
    refetch: fetchCars,
  };
}