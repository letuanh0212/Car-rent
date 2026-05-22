import { useDispatch, useSelector } from "react-redux";
import  {createBookingThunk }  from "~/store/thunks/bookingThunk.js";

export const useBooking = () => {

   const dispatch = useDispatch();

   const bookingState = useSelector(
      (state) => state.booking
   );

   const submitBooking = async (data) => {
      const result = await dispatch(createBookingThunk(data));

      if (createBookingThunk.fulfilled.match(result)) {
         return {
            success: true,
            data: result.payload,
         };
      }

      return {
         success: false,
         error: result.payload || result.error?.message,
      };
   };

   return {
      ...bookingState,
      submitBooking,
   };
};

export default useBooking;
