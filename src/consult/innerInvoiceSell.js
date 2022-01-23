const pool = require("../database");
const { handleError } = require("../lib/handleError");

const innerInvoiceSell = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await pool.query(
            "select *, client.name as client, employee.name as employee from invoice_sell join client on invoice_sell.id_client=client.id join employee on invoice_sell.id_employee=employee.id where invoice_sell.id=$1",
            [id]
        );
        res.status(200).json(response.rows);
    } catch (error) {
        handleError(res, error)
    }
};

module.exports = { innerInvoiceSell };