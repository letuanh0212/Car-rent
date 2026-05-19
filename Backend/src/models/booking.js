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

        // CHECK XE ĐÃ ĐƯỢC BOOK CHƯA
        const checkQuery = `
            SELECT *
            FROM bookings
            WHERE listing_id = $1
            AND status IN ('pending', 'confirmed')
            AND (
                start_date::timestamp < $3::timestamp
                AND end_date::timestamp > $2::timestamp
            )
        `;

        const checkValues = [
            listing_id,
            start_date,
            end_date
        ];

        const checkResult = await db.query(
            checkQuery,
            checkValues
        );

        // NẾU BỊ TRÙNG THỜI GIAN
        if (checkResult.rows.length > 0) {

            throw new Error(
                "Xe đã được đặt trong khoảng thời gian này"
            );

        }

        // INSERT BOOKING
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

    async getBookingsByListingId(listing_id) {
        const query = `
            SELECT *
            FROM bookings
            WHERE listing_id = $1
            AND status IN ('pending', 'confirmed')
            ORDER BY start_date ASC
        `;

        try {
            const res = await db.query(query, [listing_id]);
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
    },
    async checkCarAvailability(car_id, start_date, end_date) {
        const result = await db.query(
            `
            SELECT 1
            FROM bookings
            WHERE listing_id = $1
            AND (status IN ('pending', 'confirmed') OR status IS NULL)
            AND ($2::timestamp < end_date::timestamp AND $3::timestamp > start_date::timestamp)
            LIMIT 1
            `,
            [car_id, start_date, end_date]
        );

        return result.rows.length === 0;
    },
    async getBookingsByUserId(user_id) {

        const query = `
            SELECT *
            FROM bookings
            WHERE user_id = $1
            ORDER BY created_at DESC
        `;
        const values = [user_id];

        try {
            const res = await db.query(
                query,
                values
            );
            return res.rows;
        } catch (err) {
            throw err;
        }
    }    
    

};

export default bookingRepository;