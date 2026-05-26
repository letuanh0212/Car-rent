import accountInstance from "~/apis/Client/axiosAccountClient";

const carAccount = {
  async createCar(data) {
    const response = await accountInstance.post("/cars/transactions", data);
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

  async uploadImages(carId, files = []) {
    const formData = new FormData();

    files.forEach((file) => {
      formData.append("images", file);
    });

    const response = await accountInstance.post(
      `/cars/${carId}/images/upload`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response;
  },
};

export default carAccount;
