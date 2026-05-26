import TransactionService from "../services/transaction.js";

const createCar = async (req, res) => {
  try {
    const {
      images = [],
      videos = [],
      ...carData
    } = req.body;

    if (
      !carData.type_id ||
      !carData.brand ||
      !carData.model ||
      !carData.price_per_day ||
      !carData.location ||
      !carData.owner_name ||
      !carData.owner_phone
    ) {
      return res.status(400).json({
        message: "Missing required fields",
      });
    }

    const car = await TransactionService.createTransaction({
      carData,
      images,
      videos,
    });

    return res.status(201).json({
      message: "Create car successfully",
      data: car,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Create car failed",
      error: error.message,
    });
  }
};

export default {
  createCar,
};
