const pool = require("../database");
const { v4 } = require("uuid");
const { handleError } = require("../lib/handleError");

const getProductSell = async (req, res) => {
  try {
    const response = await pool.query("select * from product_sell");
    res.status(200).json(response.rows);
  } catch (error) {
    handleError(res, error)
  }
};

const getProductSellById = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await pool.query(
      "select * from product_sell where id=$1",
      [id]
    );
    res.status(200).json(response.rows[0]);
  } catch (error) {
    handleError(res, error)
  }
};

const createProductSell = async (req, res) => {
  try {
    const id = v4();
    const { id_product, quantity, price_total, id_invoice, description } =
      req.body;
    await pool.query(
      "insert into product_sell (id, id_product, quantity, price_total, id_invoice, description) values ($1, $2, $3, $4, $5, $6)",
      [id, id_product, quantity, price_total, id_invoice, description]
    );
    res.status(200).send({ message: "Successful" });
  } catch (error) {
    handleError(res, error)
  }
};

module.exports = {
  getProductSell,
  getProductSellById,
  createProductSell,
};
