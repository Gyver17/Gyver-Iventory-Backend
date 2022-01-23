const pool = require("../database");
const { v4 } = require("uuid");
const { handleError } = require("../lib/handleError");

const getProductBuy = async (req, res) => {
  try {
    const response = await pool.query("select * from product_buy");
    res.status(200).json(response.rows);
  } catch (error) {
    handleError(res, error)
  }
};

const getProductBuyById = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await pool.query("select * from product_buy where id=$1", [
      id,
    ]);
    res.status(200).json(response.rows);
  } catch (error) {
    handleError(res, error)
  }
};

const createProductBuy = async (req, res) => {
  try {
    const id = v4();
    const { id_product, quantity, price_total, id_invoice, description } =
      req.body;
    await pool.query(
      "insert into product_buy (id, id_product, quantity, price_total, id_invoice, description) values ($1, $2, $3, $4, $5, $6)",
      [id, id_product, quantity, price_total, id_invoice, description]
    );
    res
      .status(200)
      .send({ id, id_product, quantity, price_total, id_invoice, description });
  } catch (error) {
    handleError(res, error)
  }
};

module.exports = {
  getProductBuy,
  getProductBuyById,
  createProductBuy,
};
