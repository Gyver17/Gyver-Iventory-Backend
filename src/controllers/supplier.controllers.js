const pool = require("../database");
const { v4 } = require("uuid");
const { handleError } = require("../lib/handleError");

const getSupplier = async (req, res) => {
  try {
    const response = await pool.query(
      "select * from supplier order by name asc"
    );
    res.status(200).json(response.rows);
  } catch (error) {
    handleError(res, error)
  }
};

const getSupplierById = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await pool.query("select * from supplier where id=$1", [
      id,
    ]);
    res.status(200).json(response.rows[0]);
  } catch (error) {
    handleError(res, error)
  }
};

const createSupplier = async (req, res) => {
  try {
    const id = v4();
    const { code, name, doc_id, mail, phone } =
      req.body;
    await pool.query(
      "insert into supplier (id, code, name, doc_id, mail, phone) values ($1, $2, $3, $4, $5, $6)",
      [id, code, name, doc_id, mail, phone]
    );
    res.status(200).send({ message: "Successful" });
  } catch (error) {
    handleError(res, error)
  }
};

const updateSupplier = async (req, res) => {
  try {
    const { id } = req.params;
    const { code, name, doc_id, mail, phone } =
      req.body;
    const response = await pool.query(
      "update supplier set code = $1, name=$2, doc_id=$3, mail=$4, phone=$5 where id=$6",
      [code, name, doc_id, mail, phone, id]
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

const deleteSupplier = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await pool.query("delete from supplier where id=$1", [id]);
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
  getSupplier,
  getSupplierById,
  createSupplier,
  updateSupplier,
  deleteSupplier,
};
