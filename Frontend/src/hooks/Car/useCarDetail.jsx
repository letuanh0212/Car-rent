import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import carApi from "~/apis/customer/carCustomer";

import {
  setSelectedCar,
  setCarLoading,
  setCarError,
} from "~/store/slices/carSlice";

export default function useCarDetail(carId) {
    const dispatch = useDispatch();

    const { selectedCar, loading, error } = useSelector(
        (state) => state.cars
    );

    useEffect(() => {
    if (!carId) return;

        let isMounted = true;

        const fetchCarDetail = async () => {
            try {
                dispatch(setCarLoading(true));
                dispatch(setCarError(""));

                const response = await carApi.getCarDetails(carId);

            if (isMounted) {
                dispatch(setSelectedCar(response.data || null));
            }
            } catch (err) {
                if (isMounted) {
                        dispatch(
                            setCarError(
                                err?.message || "Failed to fetch car detail"
                            )
                    );
                }   
            } finally {
            if (isMounted) {
                dispatch(setCarLoading(false));
            }
        }
    };

    fetchCarDetail();

    return () => {
            isMounted = false;
        };
    }, [carId, dispatch]);

  return {
    car: selectedCar,
    loading,
    error,
  };
}
