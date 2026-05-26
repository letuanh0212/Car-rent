import accountInstance from "~/apis/Client/axiosAccountClient";

const carAccount = {
  async createCar(data, files = []) {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (value === undefined || value === null) return;

      if (Array.isArray(value) || typeof value === "object") {
        formData.append(key, JSON.stringify(value));
        return;
      }

      formData.append(key, value);
    });

    files.forEach((file) => {
      formData.append("images", file);
    });

    const response = await accountInstance.post(
      "/cars/transactions",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

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
