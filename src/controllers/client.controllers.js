const pool = require("../database");
const { v4 } = require("uuid");
const { handleError } = require("../lib/handleError");

const getClient = async (req, res) => {
  try {
    const response = await pool.query("select * from client order by name asc");
    res.status(200).json(response.rows);
  } catch (error) {
    handleError(res, error)
  }
};

const getClientById = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await pool.query("select * from client where id=$1", [id]);
    res.status(200).json(response.rows);
  } catch (error) {
    handleError(res, error)
  }
};

const createClient = async (req, res) => {
  try {
    const id = v4();
    const { code, name, doc_id, mail, phone } =
      req.body;
    await pool.query(
      "insert into client (id, code, name, doc_id, mail, phone) values ($1, $2, $3, $4, $5, $6)",
      [id, code, name, doc_id, mail, phone]
    );
    res
      .status(200)
      .send({ id, code, name, doc_id, mail, phone });
  } catch (error) {
    handleError(res, error)
  }
};

const updateClient = async (req, res) => {
  try {
    const { id } = req.params;
    const { code, name, doc_id, mail, phone } =
      req.body;
    const response = await pool.query(
      "update client set code = $1, name=$2, doc_id=$3, mail=$4, phone=$5 where id=$6",
      [code, name, doc_id, mail, phone, id]
    );
    if (response.rowCount > 0) {
      res.status(200).send("Client Update Sucess");
    } else {
      res.status(404).send("Id Not Found");
    }
  } catch (error) {
    handleError(res, error)
  }
};

const deleteClient = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await pool.query("delete from client where id=$1", [id]);
    if (response.rowCount > 0) {
      res.status(200).send("Client Deleted Success");
    } else {
      res.status(404).send("Id Not Found");
    }
  } catch (error) {
    handleError(res, error)
  }
};

module.exports = {
  getClient,
  getClientById,
  createClient,
  updateClient,
  deleteClient,
};
