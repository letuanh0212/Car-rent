import DB from '../config/db.js'
const CustomerRepository = {
    async create(customer) {
        const {full_name, email, password, phone } = customer;
        const query = 'INSERT INTO customer (full_name, email, password, phone) VALUES ($1, $2, $3, $4) RETURNING *';
        const values = [full_name, email, password, phone];
        try {
            const res = await DB.query(query, values);
            return res.rows[0];
        } catch (err) {
            throw err;
        }
    },
    async findByEmail(email) {
        const query = 'SELECT * FROM customer WHERE email = $1';
        try {
            const res = await DB.query(query, [email]);
            return res.rows[0];
        }
        catch (err) {
            throw err;
        }   
    },
    async getallcustomers() {
        try {
            const query = 'SELECT  C.full_name, C.email, C.phone FROM customer C';
            const res = await DB.query(query);
            return res.rows;
        } catch (err) {
            throw err;
        }
    },
    async getById(id) {
        try {
            const query = 'SELECT  C.full_name, C.email, C.phone FROM customer C WHERE C.id = $1';
            const res = await DB.query(query, [id]);
            return res.rows[0];
        } catch (err) {
            throw err;
        }
    }
};
export default CustomerRepository;