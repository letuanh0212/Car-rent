import db from '../config/db.js';

const CarRepository = {
    async create(data) {
        try {
            const {
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
            } = data;

        
            if (!type_id || !brand || !model || !price_per_day || !location || !owner_name || !owner_phone) {
                throw new Error('Missing required fields');
            }

            const query = `
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

            const values = [
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
            ];

            const result = await db.query(query, values);
            return result.rows[0];
        } catch (error) {
            throw error;        
        }
    },
    async getAll() {
        try{
            const query = `SELECT
                            c.*,

                            img.image_url AS thumbnail,

                            vid.youtube_url AS video_url

                            FROM car_listings c

                            LEFT JOIN car_images img
                            ON img.listing_id = c.id
                            AND img.is_thumbnail = true

                            LEFT JOIN car_embedding_videos vid
                            ON vid.listing_id = c.id
                            AND vid.is_thumbnail = true

                            ORDER BY c.created_at DESC;`;
            const result = await db.query(query);
            return result.rows;
        }catch (error) {
            throw error;
        }
    },
   async getById(id) {
        try {
            const query = `
                SELECT 
                    c.*,

                    COALESCE(
                        json_agg(DISTINCT i) 
                        FILTER (WHERE i.id IS NOT NULL), 
                        '[]'
                    ) AS images,

                    COALESCE(
                        json_agg(DISTINCT v) 
                        FILTER (WHERE v.id IS NOT NULL), 
                        '[]'
                    ) AS videos

                FROM car_listings c

                LEFT JOIN car_images i 
                    ON c.id = i.listing_id

                LEFT JOIN car_embedding_videos v 
                    ON c.id = v.listing_id

                WHERE c.id = $1

                GROUP BY c.id;
            `;

            const result = await db.query(query, [id]);
            return result.rows[0];

        } catch (error) {
            throw error;
        }
    },
    async update(id, data) {
    const allowedFields = [
        "owner_name",
        "price_per_day",
        "location",
        "description",
        "title",
        "fuel_type",
        "transmission",
    ];

    const filtered = {};

    for (const key of allowedFields) {
        if (data[key] !== undefined) {
        filtered[key] = data[key];
        }
    }

    const fields = Object.keys(filtered);
    const values = Object.values(filtered);

    if (fields.length === 0) {
        throw new Error("No valid fields to update");
    }
    console.log(fields, values);
    console.log(data);
    console.log(id);

    const setQuery = fields
        .map((f, index) => `${f} = $${index + 1}`)
        .join(", ");

    const sql = `
        UPDATE car_listings
        SET ${setQuery}
        WHERE id = $${fields.length + 1}
    `;

    const result = await db.query(sql, [...values, id]);

    const { rows } = await db.query(
        "SELECT * FROM car_listings WHERE id = $1",
        [id]
    );

    return rows[0];
    },
    async delete(id) {
        try {
            const query = 'DELETE FROM car_listings WHERE id = $1 RETURNING *';
            const result = await db.query(query, [id]);
            return result.rows[0];
        }
        catch (error) {
            throw error;
        }   
    },
    async searchCars({ keyword, brand, model, year, location, minPrice, maxPrice, transmission, fuelType }) {
        try {
            let query = `
                SELECT * FROM car_listings 
                WHERE 1=1
            `;
            const values = [];
            let paramIndex = 1;

            // Search keyword (brand, model, title, description)
            if (keyword) {
                query += ` AND (
                    LOWER(brand) LIKE LOWER($${paramIndex}) OR
                    LOWER(model) LIKE LOWER($${paramIndex + 1}) OR
                    LOWER(title) LIKE LOWER($${paramIndex + 2}) OR
                    LOWER(description) LIKE LOWER($${paramIndex + 3})
                )`;
                const keywordPattern = `%${keyword}%`;
                values.push(keywordPattern, keywordPattern, keywordPattern, keywordPattern);
                paramIndex += 4;
            }

            // Filter by brand
            if (brand) {
                query += ` AND LOWER(brand) LIKE LOWER($${paramIndex})`;
                values.push(`%${brand}%`);
                paramIndex++;
            }

            // Filter by model
            if (model) {
                query += ` AND LOWER(model) LIKE LOWER($${paramIndex})`;
                values.push(`%${model}%`);
                paramIndex++;
            }

            // Filter by year
            if (year) {
                query += ` AND year = $${paramIndex}`;
                values.push(Number(year));
                paramIndex++;
            }

            // Filter by location
            if (location) {
                query += ` AND LOWER(location) LIKE LOWER($${paramIndex})`;
                values.push(`%${location}%`);
                paramIndex++;
            }

            // Filter by price range
            if (minPrice) {
                query += ` AND price_per_day >= $${paramIndex}`;
                values.push(Number(minPrice));
                paramIndex++;
            }

            if (maxPrice) {
                query += ` AND price_per_day <= $${paramIndex}`;
                values.push(Number(maxPrice));
                paramIndex++;
            }

            // Filter by transmission
            if (transmission) {
                query += ` AND LOWER(transmission) = LOWER($${paramIndex})`;
                values.push(transmission);
                paramIndex++;
            }

            // Filter by fuel type
            if (fuelType) {
                query += ` AND LOWER(fuel_type) = LOWER($${paramIndex})`;
                values.push(fuelType);
                paramIndex++;
            }

            query += ` ORDER BY created_at DESC LIMIT 50`;

            const result = await db.query(query, values);
            return result.rows;
        } catch (error) {
            throw error;
        }
    },
    
};
export default CarRepository;