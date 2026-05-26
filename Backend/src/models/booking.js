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
            AND (status IN ('pending', 'confirmed') OR status IS NULL)
            AND (
                $2::timestamp < (end_date::timestamp + INTERVAL '2 days')
                AND $3::timestamp > start_date::timestamp
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
            status || "pending"
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
    // async getBookingsByListingId(listing_id) {
    //     const query = `
    //         SELECT *
    //         FROM bookings
    //         WHERE listing_id = $1
    //         AND (status IN ('pending', 'confirmed') OR status IS NULL)
    //         ORDER BY start_date ASC
    //     `;

    //     try {
    //         const res = await db.query(query, [listing_id]);
    //         return res.rows;
    //     } catch (err) {
    //         throw err;
    //     }
    // },
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
    async getBookingById(id) {
        const query = `
            SELECT *
            FROM bookings
            WHERE bk_id = $1
        `;
        try {
            const res = await db.query(query, [id]);
            return res.rows[0];
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
            AND (
                $2::timestamp < (end_date::timestamp + INTERVAL '2 days')
                AND $3::timestamp > start_date::timestamp
            )
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
    },
    async getTopBooked(limit = 5) {
        const query = `
            SELECT
                c.id,
                c.title,
                c.brand,
                c.model,
                COUNT(b.bk_id)::INT AS total_bookings
            FROM car_listings c
            JOIN bookings b
                ON b.listing_id = c.id
            GROUP BY
                c.id,
                c.title,
                c.brand,
                c.model
            ORDER BY total_bookings DESC
            LIMIT $1
        `;

        const values = [Number(limit)];

        const { rows } =
            await db.query(query, values);

        return rows;
    }, 
    async getTopCustomers(limit = 5) {
        const query = `
            SELECT
                c.id,
                c.full_name,
                c.email,
                COUNT(b.bk_id)::INT AS total_bookings,
                COALESCE(SUM(b.total_price), 0)::NUMERIC AS total_spent
            FROM customer c
            JOIN bookings b
                ON b.user_id = c.id
            GROUP BY
                c.id,
                c.full_name,
                c.email
            ORDER BY total_bookings DESC
            LIMIT $1
        `;

        const { rows } =
            await db.query(query, [limit]);

        return rows;
    },
    async getRecentBookings(limit = 10) {
        const query = `
            SELECT
                b.bk_id,
                cus.full_name,
                c.title AS car_title,
                b.start_date,
                b.end_date,
                b.total_price,
                b.status,
                b.created_at
            FROM bookings b
            JOIN customer cus
                ON cus.id = b.user_id
            JOIN car_listings c
                ON c.id = b.listing_id
            ORDER BY b.created_at DESC
            LIMIT $1
        `;

        const { rows } =
            await db.query(query, [limit]);

        return rows;
    },
};

export default bookingRepository;
