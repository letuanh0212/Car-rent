import DB from "../config/db.js";

const createListingWithMedia = async ({
  carData,
  images = [],
  videos = [],
}) => {
  const client = await DB.connect();

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
          img.image_url,
          Boolean(img.is_thumbnail),
        ]
      );

      insertedImages.push(imageResult.rows[0]);
    }

    const insertedVideos = [];

    for (const vid of videos) {
      const embedding =
        vid.embedding ||
        JSON.stringify({
          video_url: vid.video_url,
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
    throw err;
  } finally {
    client.release();
  }
};

export default {
  createListingWithMedia,
};
