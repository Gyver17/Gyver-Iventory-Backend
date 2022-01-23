const pool = require("../database");
const { handleError } = require("../lib/handleError")

const InnerUsers = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await pool.query(
            "select * from users inner join permissions on users.id=permissions.id_user where users.id=$1",
            [id]
        );
        res.status(200).send(response.rows);
    } catch (error) {
        handleError(res, error)
    }
};

module.exports = { InnerUsers };