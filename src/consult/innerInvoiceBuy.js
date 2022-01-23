const pool = require("../database");
const { handleError } = require("../lib/handleError");

const innerInvoiceBuy = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await pool.query(
            "select *, supplier.name as supplier, employee.name as employee from invoice_buy join supplier on invoice_buy.id_supplier=supplier.id join employee on invoice_buy.id_employee=employee.id where invoice_buy.id=$1",
            [id]
        );
        res.status(200).json(response.rows);
    } catch (error) {
        handleError(res, error)
    }
};

module.exports = { innerInvoiceBuy };