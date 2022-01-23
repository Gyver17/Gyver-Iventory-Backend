const pool = require("../database");
const { handleError } = require("../lib/handleError");

const getNumbersInvoice = async (req, res) => {
    try {
        const response = await pool.query("select * from numbers_invoice where id=1")
        res.status(200).json(response.rows)
    } catch (error) {
        handleError(res, error)
    }
}

const updateNumbersInvoice = async (req, res) => {
    try {
        const { buy, sell } = req.body;
        await pool.query("update numbers_invoice set buy=$1, sell=$2 where id=1", [buy, sell]);
        res.status(200).json({ message: 'success' });
    } catch (error) {
        handleError(res, error)
    }
}

module.exports = { getNumbersInvoice, updateNumbersInvoice }