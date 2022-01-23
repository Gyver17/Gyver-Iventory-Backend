const pool = require("../database");
const { handleError } = require("../lib/handleError");

const innerProducts = async (req, res) => {
    try {
        const response = await pool.query(
            "select products.code, products.name, category.name as category, products.quantity, products.price_buy, products.price_sell from products inner join category on products.id_category=category.id"
        );
        res.status(200).json(response.rows);
    } catch (error) {
        handleError(res, error)
    }
};

module.exports = { innerProducts };