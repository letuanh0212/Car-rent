import accountInstance from "~/apis/Client/axiosAccountClient";

const carAccount = {
  async createCar(data) {
    const response = await accountInstance.post("/cars", data);
    return response;
  },

  async addImage(carId, data) {
    const response = await accountInstance.post(`/cars/${carId}/images`, data);
    return response;
  },

  async addVideoEmbedding(carId, data) {
    const response = await accountInstance.post(`/cars/${carId}/videos`, data);
    return response;
  },
};

export default carAccount;
