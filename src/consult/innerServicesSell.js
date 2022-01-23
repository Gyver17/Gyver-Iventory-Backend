const pool = require("../database");
const { handleError } = require("../lib/handleError");

const innerServicesSell = async (req, res) => {
    try {
        const { id_invoice } = req.params;
        const response = await pool.query(
            "select * from services_sell as b join services as s on b.id_services=s.id join invoice_sell as i on b.id_invoice=i.id join employee as e on b.id_employee=e.id where b.id_invoice=$1",
            [id_invoice]
        );
        res.status(200).json(response.rows);
    } catch (error) {
        handleError(res, error)
    }
};

module.exports = { innerServicesSell };