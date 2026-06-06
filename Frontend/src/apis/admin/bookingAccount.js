import accountInstance from "../Client/axiosAccountClient";

const bookingAccount = {
  async getAllBookings() {
    const response = await accountInstance.get("/bookings");
    return response;
  }, 
  async getAllTypes() {
    const response = await accountInstance.get("/car_types/");
    return response;
  },
  
};

export default bookingAccount;
