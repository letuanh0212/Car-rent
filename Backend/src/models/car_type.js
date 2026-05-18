import DB from '../config/db.js';

const CarTypeRepository = {
    async create(carType) {
        const { name } = carType;
        const query = 'INSERT INTO car_types (name) VALUES ($1) RETURNING *';
        const values = [name];
        try {
            const res = await
                DB.query(query, values);
            return res.rows[0];
        }catch (err) {
            throw err;
        }
    },  
    async getallcartype() {
        const query = 'SELECT * FROM car_types';
        try {
            const res = await DB.query(query);
            return res.rows;
        } catch (err) {
            throw err;
        }
    }
};

export default CarTypeRepository;
