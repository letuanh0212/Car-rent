import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cars: [],
  selectedCar: null,
  loading: false,
  error: "",
  filters: {
    keyword: "",
    brand: "",
    priceRange: null,
  },
};

const carSlice = createSlice({
  name: "cars",
  initialState,
  reducers: {
    setCars: (state, action) => {
      state.cars = action.payload;
    },
    setSelectedCar: (state, action) => {
      state.selectedCar = action.payload;
    },
    setCarLoading: (state, action) => {
      state.loading = action.payload;
    },
    setCarError: (state, action) => {
      state.error = action.payload;
    },
    setCarFilters: (state, action) => {
      state.filters = {
        ...state.filters,
        ...action.payload,
      };
    },
    clearCarFilters: (state) => {
      state.filters = {
        keyword: "",
        brand: "",
        priceRange: null,
      };
    },
  },
});

export const {
  setCars,
  setSelectedCar,
  setCarLoading,
  setCarError,
  setCarFilters,
  clearCarFilters,
} = carSlice.actions;

export default carSlice.reducer;