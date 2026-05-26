import accountInstance from "../Client/axiosAccountClient";

const bookingAccount = {
    async getAllBookings() {
        return await accountInstance.get("/bookings");
    }

}

export default bookingAccount