import DB from '../config/db.js'

const accountsystemRepository = {
    async create(user) {
        const { email, password} = user;
        const query = 'INSERT INTO accountsystem (email, password) VALUES ($1, $2) RETURNING *';
        const values = [email, password];
        try {
            const res = await DB.query(query, values);
            return res.rows[0];
        } catch (err) {
            throw err;
        }
    },
    async findByEmail(email) {
        const query = 'SELECT * FROM accountsystem WHERE email = $1';
        try {
            const res = await DB.query(query, [email]);
            return res.rows[0];
        } catch (err) {
            throw err;
        }
    }
};

export default accountsystemRepository;