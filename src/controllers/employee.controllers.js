const pool = require("../database");
const { v4 } = require("uuid");

const getEmploye = async (req, res) => {
  try {
    const response = await pool.query(
      "select * from employee order by name asc"
    );
    res.status(200).json(response.rows);
  } catch (error) {
    handleError(res, error)
  }
};

const getEmployeById = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await pool.query("select * from employee where id=$1", [
      id,
    ]);
    res.status(200).json(response.rows);
  } catch (error) {
    handleError(res, error)
  }
};

const createEmploye = async (req, res) => {
  try {
    const id = v4();
    const {
      code,
      name,
      doc_id,
      mail,
      phone,
      salary,
      com_sell,
      com_service,
    } = req.body;
    await pool.query(
      "insert into employee (id, code, name, doc_id, mail, phone, salary, com_sell, com_service) values ($1, $2, $3, $4, $5, $6, $7, $8, $9)",
      [
        id,
        code,
        name,
        doc_id,
        mail,
        phone,
        salary,
        com_sell,
        com_service,
      ]
    );
    res.status(200).send({
      id,
      code,
      name,
      doc_id,
      mail,
      phone,
      salary,
      com_sell,
      com_service,
    });
  } catch (error) {
    handleError(res, error)
  }
};

const updateEmploye = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      code,
      name,
      doc_id,
      mail,
      prefix_phone,
      salary,
      com_sell,
      com_service,
    } = req.body;
    const response = await pool.query(
      "update employee set code = $1, name=$2, doc_id=$3, mail=$4, phone=$5, salary=$6, com_sell=$7, com_service=$8 where id=$9",
      [
        code,
        name,
        doc_id,
        mail,
        phone,
        salary,
        com_sell,
        com_service,
        id,
      ]
    );
    if (response.rowCount > 0) {
      res.status(200).send("Employee Update Sucess");
    } else {
      res.status(404).send("Id Not Found");
    }
  } catch (error) {
    handleError(res, error)
  }
};

const deleteEmploye = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await pool.query("delete from employee where id=$1", [id]);
    if (response.rowCount > 0) {
      res.status(200).send("Delete Employee Success");
    } else {
      res.status(404).send("Id Not Found");
    }
  } catch (error) {
    handleError(res, error)
  }
};

module.exports = {
  getEmploye,
  getEmployeById,
  createEmploye,
  updateEmploye,
  deleteEmploye,
};
