import accountInstance from "../Client/axiosAccountClient";

const bookingAccount = {
  async getAllBookings() {
    const response = await accountInstance.get("/bookings");
    return response.data;
  },
};

export default bookingAccount;
