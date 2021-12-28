const pool = require("../database");
const { v4 } = require("uuid");

const getClient = async (req, res) => {
  try {
    const response = await pool.query("select * from client order by name asc");
    res.status(200).json(response.rows);
  } catch (error) {
    res.status(404).send(error);
  }
};

const getClientById = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await pool.query("select * from client where id=$1", [id]);
    res.status(200).json(response.rows);
  } catch (error) {
    res.status(404).send(error);
  }
};

const createClient = async (req, res) => {
  try {
    const id = v4();
    const { code, name, prefix_doc, doc_id, mail, prefix_phone, phone } =
      req.body;
    await pool.query(
      "insert into client (id, code, name, prefix_doc, doc_id, mail, prefix_phone, phone) values ($1, $2, $3, $4, $5, $6, $7, $8)",
      [id, code, name, prefix_doc, doc_id, mail, prefix_phone, phone]
    );
    res
      .status(200)
      .send({ id, code, name, prefix_doc, doc_id, mail, prefix_phone, phone });
  } catch (error) {
    res.status(404).send(error);
  }
};

const updateClient = async (req, res) => {
  try {
    const { id } = req.params;
    const { code, name, prefix_doc, doc_id, mail, prefix_phone, phone } =
      req.body;
    const response = await pool.query(
      "update client set code = $1, name=$2, prefix_doc=$3, doc_id=$4, mail=$5, prefix_phone=$6, phone=$7 where id=$8",
      [code, name, prefix_doc, doc_id, mail, prefix_phone, phone, id]
    );
    if (response.rowCount > 0) {
      res.status(200).send("Client Update Sucess");
    } else {
      res.status(404).send("Id Not Found");
    }
  } catch (error) {
    res.status(404).send(error);
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
    res.status(404).send(error);
  }
};

module.exports = {
  getClient,
  getClientById,
  createClient,
  updateClient,
  deleteClient,
};
