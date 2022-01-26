const pool = require("../database");
const { v4 } = require("uuid");
const { handleError } = require("../lib/handleError");

const getServices = async (req, res) => {
  try {
    const response = await pool.query(
      "select * from services order by name asc"
    );
    res.status(200).json(response.rows);
  } catch (error) {
    handleError(res, error)
  }
};

const getServicesById = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await pool.query("select * from services where id=$1", [
      id,
    ]);
    res.status(200).json(response.rows[0]);
  } catch (error) {
    handleError(res, error)
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
    res.status(200).send({ message: "Successful" });
  } catch (error) {
    handleError(res, error)
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
      res.status(200).send({ message: "Successful" });
    } else {
      res.status(404).send({ code: "44947" });
    }
  } catch (error) {
    handleError(res, error)
  }
};

const deleteServices = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await pool.query("delete from services where id=$1", [id]);
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
  getServices,
  getServicesById,
  createServices,
  updateServices,
  deleteServices,
};
