const pool = require("../database");
const { v4 } = require("uuid");

const getMoney = async (req, res) => {
  try {
    const response = await pool.query("select * from money order by name");
    res.status(200).json(response.rows);
  } catch (error) {
    res.status(404).send(error);
  }
};

const getMoneyById = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await pool.query("select * from money where id=$1", [id]);
    res.status(200).json(response.rows);
  } catch (error) {
    res.status(404).send(error);
  }
};

const createMoney = async (req, res) => {
  try {
    const id = v4();
    const { name, symbol, value } = req.body;
    await pool.query(
      "insert into money (id, name, symbol, value) values ($1, $2, $3, $4)",
      [id, name, symbol, value]
    );
    res.status(200).send({ id, name, symbol, value });
  } catch (error) {
    res.status(404).send(error);
  }
};

const updateMoney = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, symbol, value } = req.body;
    const response = await pool.query(
      "update money set name=$1, symbol=$2, value=$3 where id=$4",
      [name, symbol, value, id]
    );
    if (response.rowCount > 0) {
      res.status(200).send("Update Success");
    } else {
      res.status(404).send("Id Not Found");
    }
  } catch (error) {
    res.status(404).send(error);
  }
};

const deleteMoney = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await pool.query("delete from money where id=$1", [id]);
    if (response.rowCount > 0) {
      res.status(200).send("Delete Success");
    } else {
      res.status(404).send("Id Not Found");
    }
  } catch (error) {
    res.status(404).send(error);
  }
};

module.exports = {
  getMoney,
  getMoneyById,
  createMoney,
  updateMoney,
  deleteMoney,
};
