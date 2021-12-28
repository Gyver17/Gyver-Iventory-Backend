const pool = require("../database");
const { v4 } = require("uuid");

const getServices = async (req, res) => {
  try {
    const response = await pool.query(
      "select * from services order by name asc"
    );
    res.status(200).json(response.rows);
  } catch (error) {
    res.status(404).json(error);
  }
};

const getServicesById = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await pool.query("select * from services where id=$1", [
      id,
    ]);
    res.status(200).json(response.rows);
  } catch (error) {
    res.status(404).send(error);
  }
};

const createServices = async (req, res) => {
  try {
    const id = v4();
    const { code, name, description, unit_symbol, price_unit } = req.body;
    await pool.query(
      "insert into services (id, code, name, description, unit_symbol, price_unit) values ($1, $2, $3, $4, $5, $6)",
      [id, code, name, description, unit_symbol, price_unit]
    );
    res
      .status(200)
      .send({ id, code, name, description, unit_symbol, price_unit });
  } catch (error) {
    res.status(404).send(error);
  }
};

const updateServices = async (req, res) => {
  try {
    const { id } = req.params;
    const { code, name, description, unit_symbol, price_unit } = req.body;
    const response = await pool.query(
      "update services set code=$1, name=$2, description=$3, unit_symbol=$4, price_unit=$5 where id=$6",
      [code, name, description, unit_symbol, price_unit, id]
    );
    if (response.rowCount > 0) {
      res.status(200).send("Servies Updated SuccessFully");
    } else {
      res.status(404).send("Id Not Found");
    }
  } catch (error) {
    res.status(404).send(error);
  }
};

const deleteServices = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await pool.query("delete from services where id=$1", [id]);
    if (response.rowCount > 0) {
      res.status(200).send("Delete Services Success");
    } else {
      res.status(404).send("Id Not Found");
    }
  } catch (error) {
    res.status(404).send(error);
  }
};

module.exports = {
  getServices,
  getServicesById,
  createServices,
  updateServices,
  deleteServices,
};
