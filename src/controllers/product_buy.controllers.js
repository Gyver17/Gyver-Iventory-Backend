const pool = require("../database");
const { v4 } = require("uuid");
const { handleError } = require("../lib/handleError");

const getProductBuy = async (req, res) => {
  try {
    const response = await pool.query("select * from product_buy");
    res.status(200).json(response.rows);
  } catch (error) {
    handleError(res, error);
  }
};

const getProductBuyById = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await pool.query(
      `
      select
      product_buy.id_invoice,
      product_buy.id_product,
      products.code,
      products.name,
      sum(product_buy.quantity) over 
      (partition by product_buy.id_product, product_buy.id_invoice ) as quantity, 
      products.price_buy,
      sum(product_buy.price_total) over 
      (partition by product_buy.id_product, product_buy.id_invoice ) as price_total   
      from product_buy 
      join products on products.id=product_buy.id_product
      where product_buy.id_invoice=$1`,
      [id]
    );

    const data = response.rows;
    var hash = {};
    const result = data.filter((item) =>
      hash[item.id_product] ? false : (hash[item.id_product] = true)
    );

    res.status(200).json(result);
  } catch (error) {
    handleError(res, error);
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
    res.status(200).send({ message: "Successful" });
  } catch (error) {
    handleError(res, error);
  }
};

module.exports = {
  getProductBuy,
  getProductBuyById,
  createProductBuy,
};
