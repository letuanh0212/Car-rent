import accountInstance from "../Client/axiosAccountClient";

const bookingAccount = {
  async getAllBookings() {
    const response = await accountInstance.get("/bookings");
    return response;
  },
};

export default bookingAccount;
