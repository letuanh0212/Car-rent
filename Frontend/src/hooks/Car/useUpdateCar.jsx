import CarApi from "~/apis/admin/CarAccount";
export const useUpdateCar = () => {
  const updateCar = async (id, data) => {
    const res = await CarApi.updateCar(id, data);
    return res?.data;
  };

  return { updateCar };
};
