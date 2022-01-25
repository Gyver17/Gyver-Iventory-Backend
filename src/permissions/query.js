const pool = require('../database');
const { handleError } = require('../lib/handleError');

const query = async (req, res) => {
    try {
        const id = req.userId;
        const response = await pool.query(
            "select * from users inner join permissions on users.id=permissions.id_user where users.id=$1",
            [id]
        );
        return response.rows[0];
    } catch (error) {
        handleError(res, error)
    }
};

module.exports = { query }