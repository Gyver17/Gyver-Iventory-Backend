const pool = require("../database");
const { v4 } = require("uuid");

const getProducts = async (req, res) => {
  try {
    const response = await pool.query(
      "select * from products order by name asc"
    );
    res.status(200).json(response.rows);
  } catch (error) {
    res.status(404).send(error);
  }
};

const getProductsById = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await pool.query("select * from products where id=$1", [
      id,
    ]);
    res.status(200).json(response.rows);
  } catch (error) {
    res.status(404).send(error);
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
    res.status(200).send({
      id,
      code,
      name,
      id_category,
      quantity,
      price_buy,
      price_sell,
    });
  } catch (error) {
    res.status(404).send(error);
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
      res.status(200).send("Products Updating Sucess");
    } else {
      res.status(404).send("Id Not Found");
    }
  } catch (error) {
    res.status(404).send(error);
  }
};

const deleteProducts = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await pool.query("delete from products where id=$1", [id]);
    if (response.rowCount > 0) {
      res.status(200).send("Product Deleted SuccessFully");
    } else {
      res.status(404).send("Id Not Found");
    }
  } catch (error) {
    res.status(404).send(error);
  }
};

const innerProducts = async (req, res) => {
  try {
    const response = await pool.query(
      "select products.code, products.name, category.name as category, products.quantity, products.price_buy, products.price_sell from products inner join category on products.id_category=category.id"
    );
    res.status(200).json(response.rows);
  } catch (error) {
    res.status(404).send(error);
  }
};

module.exports = {
  getProducts,
  getProductsById,
  createProducts,
  updateProducts,
  deleteProducts,
  innerProducts,
};
