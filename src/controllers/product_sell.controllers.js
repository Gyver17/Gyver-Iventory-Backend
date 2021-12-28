const pool = require("../database");
const { v4 } = require("uuid");

const getProductSell = async (req, res) => {
  try {
    const response = await pool.query("select * from product_sell");
    res.status(200).json(response.rows);
  } catch (error) {
    res.status(404).send(error);
  }
};

const getProductSellById = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await pool.query(
      "select * from product_sell where id=$1",
      [id]
    );
    res.status(200).json(response.rows);
  } catch (error) {
    res.status(404).send(error);
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
    res
      .status(200)
      .send({ id, id_product, quantity, price_total, id_invoice, description });
  } catch (error) {
    res.status(404).send(error);
  }
};

const innerProductSell = async (req, res) => {
  try {
    const { id_invoice } = req.params;
    const response = await pool.query(
      "select *, products.quantity as stock, b.quantity as qty, i.price_total as invoice_total, b.price_total as product_total, b.description as des from product_sell as b join products on b.id_product=products.id join invoice_sell as i on b.id_invoice=i.id where b.id_invoice=$1",
      [id_invoice]
    );
    res.status(200).json(response.rows);
  } catch (error) {
    res.status(404).send(error);
  }
};

module.exports = {
  getProductSell,
  getProductSellById,
  createProductSell,
  innerProductSell,
};
