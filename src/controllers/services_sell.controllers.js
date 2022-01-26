const pool = require("../database");
const { v4 } = require("uuid");
const { handleError } = require("../lib/handleError");

const getServicesSell = async (req, res) => {
  try {
    const response = await pool.query("select * from services_sell");
    res.status(200).json(response.rows);
  } catch (error) {
    handleError(res, error)
  }
};

const getServicesSellById = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await pool.query(
      "select * from services_sell where id=$1",
      [id]
    );
    res.status(200).json(response.rows[0]);
  } catch (error) {
    handleError(res, error)
  }
};

const createServicesSell = async (req, res) => {
  try {
    const id = v4();
    const {
      id_services,
      quantity,
      price_total,
      id_invoice,
      description,
      id_employee,
    } = req.body;
    await pool.query(
      "insert into services_sell (id, id_services, quantity, price_total,  id_invoice, description, id_employee) values ($1, $2, $3, $4, $5, $6, $7)",
      [
        id,
        id_services,
        quantity,
        price_total,
        id_invoice,
        description,
        id_employee,
      ]
    );
    res.status(200).send({ message: "Successful" });
  } catch (error) {
    handleError(res, error)
  }
};

module.exports = {
  getServicesSell,
  getServicesSellById,
  createServicesSell,
};
