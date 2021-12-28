const pool = require("../database");
const { v4 } = require("uuid");

const getServicesSell = async (req, res) => {
  try {
    const response = await pool.query("select * from services_sell");
    res.status(200).json(response.rows);
  } catch (error) {
    res.status(404).send(error);
  }
};

const getServicesSellById = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await pool.query(
      "select * from services_sell where id=$1",
      [id]
    );
    res.status(200).json(response.rows);
  } catch (error) {
    res.status(404).send(error);
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
    res.status(200).send({
      id,
      id_services,
      quantity,
      price_total,
      id_invoice,
      description,
      id_employee,
    });
  } catch (error) {
    res.status(404).send(error);
  }
};

const innerServicesSell = async (req, res) => {
  try {
    const { id_invoice } = req.params;
    const response = await pool.query(
      "select * from services_sell as b join services as s on b.id_services=s.id join invoice_sell as i on b.id_invoice=i.id join employee as e on b.id_employee=e.id where b.id_invoice=$1",
      [id_invoice]
    );
    res.status(200).json(response.rows);
  } catch (error) {
    res.status(404).send(error);
  }
};

module.exports = {
  getServicesSell,
  getServicesSellById,
  createServicesSell,
  innerServicesSell,
};
