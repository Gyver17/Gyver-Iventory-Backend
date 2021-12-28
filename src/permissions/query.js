const pool = require('../database')

const query = async (req, res) => {
    try {
        const id = req.userId;
        const response = await pool.query(
            "select * from users inner join permissions on users.id=permissions.id_user where users.id=$1",
            [id]
        );
        return response.rows[0];
    } catch (error) {
        res.status(404).send({ message: "Verify Failed" });
    }
};

module.exports = { query }