const pool = require("../database");
const { v4 } = require("uuid");
const { handleError } = require("../lib/handleError");

const getProducts = async (req, res) => {
  try {
    const response = await pool.query(
      `select 
      products.id as id,
      products.code as code,
      products.name as name,
      products.id_category as id_category,
      category.name as category,
      products.quantity as quantity,
      products.price_buy as price_buy,
      products.price_sell as price_sell
      from products 
      inner join category on products.id_category=category.id 
      order by products.name asc`
    );
    res.status(200).json(response.rows);
  } catch (error) {
    handleError(res, error)
  }
};

const getProductsById = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await pool.query("select * from products where id=$1", [
      id,
    ]);
    res.status(200).json(response.rows[0]);
  } catch (error) {
    handleError(res, error)
  }
};

const createProducts = async (req, res) => {
  try {
    id = v4();
    const { code, name, id_category, quantity, price_buy, price_sell } =
      req.body;
    await pool.query(
      "insert into products (id, code, name, id_category, quantity, price_buy, price_sell) values ($1, $2, $3, $4, $5, $6, $7)",
      [id, code, name, id_category, quantity, price_buy, price_sell]
    );
    res.status(200).send({ message: "Successful" });
  } catch (error) {
    handleError(res, error)
  }
};

const updateProducts = async (req, res) => {
  try {
    const { id } = req.params;
    const { code, name, id_category, quantity, price_buy, price_sell } =
      req.body;
    const response = await pool.query(
      "update products set code=$1, name=$2, id_category=$3, quantity=$4, price_buy=$5, price_sell=$6 where id=$7",
      [code, name, id_category, quantity, price_buy, price_sell, id]
    );
    if (response.rowCount > 0) {
      res.status(200).send({ message: "Successful" });
    } else {
      res.status(404).send({ code: "44947" });
    }
  } catch (error) {
    handleError(res, error)
  }
};

const deleteProducts = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await pool.query("delete from products where id=$1", [id]);
    if (response.rowCount > 0) {
      res.status(200).send({ message: "Successful" });
    } else {
      res.status(404).send({ code: "44947" });
    }
  } catch (error) {
    handleError(res, error)
  }
};

module.exports = {
  getProducts,
  getProductsById,
  createProducts,
  updateProducts,
  deleteProducts,
};
