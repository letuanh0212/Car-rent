import db from "../config/db.js";

const bookingRepository = {
    async create(data) {

        const {
            user_id,
            listing_id,
            start_date,
            end_date,
            pickup_location,
            return_location,
            total_price,
            status
        } = data;

        const query = `
            INSERT INTO bookings (
                user_id,
                listing_id,
                start_date,
                end_date,
                pickup_location,
                return_location,
                total_price,
                status
            )
            VALUES (
                $1,$2,$3,$4,$5,$6,$7,$8
            )
            RETURNING *
        `;

        const values = [
            user_id,
            listing_id,
            start_date,
            end_date,
            pickup_location,
            return_location,
            total_price,
            status
        ];

        try {

            const res = await db.query(
                query,
                values
            );

            return res.rows[0];

        } catch (err) {

            throw err;

        }
    },

    async getAllBookings() {

        const query = `
            SELECT *
            FROM bookings
            ORDER BY created_at DESC
        `;

        try {

            const res = await db.query(query);

            return res.rows;

        } catch (err) {

            throw err;

        }
    },

    async findById(id) {

        const query = `
            SELECT *
            FROM bookings
            WHERE bk_id = $1
        `;

        try {

            const res = await db.query(
                query,
                [id]
            );

            return res.rows[0];

        } catch (err) {

            throw err;

        }
    },

    async update(id, data) {

        const {
            start_date,
            end_date,
            pickup_location,
            return_location,
            total_price,
            status
        } = data;

        const query = `
            UPDATE bookings
            SET
                start_date = $1,
                end_date = $2,
                pickup_location = $3,
                return_location = $4,
                total_price = $5,
                status = $6,
                updated_at = CURRENT_TIMESTAMP
            WHERE bk_id = $7
            RETURNING *
        `;

        const values = [
            start_date,
            end_date,
            pickup_location,
            return_location,
            total_price,
            status,
            id
        ];

        try {

            const res = await db.query(
                query,
                values
            );

            return res.rows[0];

        } catch (err) {

            throw err;

        }
    },

    async delete(id) {

        const query = `
            DELETE FROM bookings
            WHERE bk_id = $1
        `;

        try {

            await db.query(query, [id]);

            return true;

        } catch (err) {

            throw err;

        }
    }

};

export default bookingRepository;