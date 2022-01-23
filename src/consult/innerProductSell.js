const pool = require("../database");
const { handleError } = require("../lib/handleError");

const innerProductSell = async (req, res) => {
    try {
        const { id_invoice } = req.params;
        const response = await pool.query(
            "select *, products.quantity as stock, b.quantity as qty, i.price_total as invoice_total, b.price_total as product_total, b.description as des from product_sell as b join products on b.id_product=products.id join invoice_sell as i on b.id_invoice=i.id where b.id_invoice=$1",
            [id_invoice]
        );
        res.status(200).json(response.rows);
    } catch (error) {
        handleError(res, error)
    }
};

module.exports = { innerProductSell };