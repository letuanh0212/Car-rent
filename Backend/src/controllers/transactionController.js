import TransactionService from "../services/transaction.js";

const parseJsonField = (value, fallback) => {
  if (!value) return fallback;
  if (Array.isArray(value)) return value;

  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
};

const createCar = async (req, res) => {
  try {
    const {
      images = [],
      videos = [],
      ...carData
    } = req.body;

    const uploadedImages = (req.files || []).map((file, index) => ({
      file,
      is_thumbnail: index === 0,
    }));

    const bodyImages = parseJsonField(images, []);
    const bodyVideos = parseJsonField(videos, []);

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
      images: [
        ...bodyImages,
        ...uploadedImages,
      ],
      videos: bodyVideos,
      uploadBaseUrl: `${req.protocol}://${req.get("host")}/uploads/cars`,
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
