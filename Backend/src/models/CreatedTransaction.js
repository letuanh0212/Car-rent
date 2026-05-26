import fs from "fs";
import path from "path";

import DB from "../config/db.js";

const uploadRoot = path.resolve("uploads", "cars");

const sanitizeFileName = (fileName) => {
  const ext = path.extname(fileName);
  const baseName = path
    .basename(fileName, ext)
    .replace(/[^a-zA-Z0-9-_]/g, "-")
    .toLowerCase();

  return `${Date.now()}-${baseName}${ext}`;
};

const createListingWithMedia = async ({
  carData,
  images = [],
  videos = [],
  uploadBaseUrl = "",
}) => {
  const client = await DB.connect();
  const writtenFilePaths = [];

  try {
    await client.query("BEGIN");

    const carQuery = `
      INSERT INTO car_listings (
        type_id,
        owner_name,
        owner_phone,
        brand,
        model,
        year,
        license_plate,
        seat_count,
        transmission,
        fuel_type,
        odometer,
        title,
        description,
        price_per_day,
        location
      )
      VALUES (
        $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15
      )
      RETURNING *;
    `;

    const carValues = [
      carData.type_id,
      carData.owner_name,
      carData.owner_phone,
      carData.brand,
      carData.model,
      carData.year,
      carData.license_plate,
      carData.seat_count,
      carData.transmission,
      carData.fuel_type,
      carData.odometer,
      carData.title,
      carData.description,
      carData.price_per_day,
      carData.location,
    ];

    const carResult = await client.query(carQuery, carValues);
    const car = carResult.rows[0];

    const insertedImages = [];

    for (const img of images) {
      let imageUrl = img.image_url;

      if (!imageUrl && img.file) {
        const uploadDir = path.join(uploadRoot, car.id);
        const filename = sanitizeFileName(img.file.originalname);
        const filePath = path.join(uploadDir, filename);

        fs.mkdirSync(uploadDir, { recursive: true });
        fs.writeFileSync(filePath, img.file.buffer);

        writtenFilePaths.push(filePath);
        imageUrl = `${uploadBaseUrl}/${car.id}/${filename}`;
      }

      if (!imageUrl) {
        continue;
      }

      const imageResult = await client.query(
        `
        INSERT INTO car_images (
          listing_id,
          image_url,
          is_thumbnail
        )
        VALUES ($1, $2, $3)
        RETURNING *;
        `,
        [
          car.id,
          imageUrl,
          Boolean(img.is_thumbnail),
        ]
      );

      insertedImages.push(imageResult.rows[0]);
    }

    const insertedVideos = [];

    for (const vid of videos) {
      const videoUrl = vid.video_url || vid.youtube_url;
      const embedding =
        vid.embedding ||
        JSON.stringify({
          video_url: videoUrl,
          metadata: vid.metadata || null,
        });

      const videoResult = await client.query(
        `
        INSERT INTO car_embedding_videos (
          listing_id,
          embedding
        )
        VALUES ($1, $2)
        RETURNING *;
        `,
        [
          car.id,
          embedding,
        ]
      );

      insertedVideos.push(videoResult.rows[0]);
    }

    await client.query("COMMIT");

    return {
      ...car,
      images: insertedImages,
      videos: insertedVideos,
    };
  } catch (err) {
    await client.query("ROLLBACK");

    for (const filePath of writtenFilePaths) {
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    throw err;
  } finally {
    client.release();
  }
};

export default {
  createListingWithMedia,
};
