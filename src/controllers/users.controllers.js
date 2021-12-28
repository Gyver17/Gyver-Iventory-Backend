const pool = require("../database");
const { v4 } = require("uuid");
const bcrypt = require("../lib/bcrypt")

const getUsers = async (req, res) => {
  try {
    const response = await pool.query("select * from users order by name asc");
    res.status(200).json(response.rows);
  } catch (error) {
    res.status(404).send(error);
  }
};

const getUsersById = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await pool.query("select * from users where id = $1", [
      id,
    ]);
    res.status(200).json(response.rows);
  } catch (error) {
    res.status(404).send(error);
  }
};

const createUsers = async (req, res) => {
  try {
    const id = v4();
    const { rol, name, mail, password } = req.body;
    newPassword = await bcrypt.encryptPassword(password);
    console.log(newPassword)
    await pool.query(
      "insert into users (id, rol, name, mail, password) values ($1, $2, $3, $4, $5)",
      [id, rol, name, mail, newPassword]
    );
    res.status(200).send({ id, rol, name, mail, newPassword });
  } catch (error) {
    res.status(404).send(error);
  }
};

const updateUsers = async (req, res) => {
  try {
    const { id } = req.params;
    const { rol, name, mail, password } = req.body;
    const response = await pool.query(
      "update users set rol=$1, name=$2, mail=$3, password=$4 where id=$5",
      [rol, name, mail, password, id]
    );
    if (response.rowCount > 0) {
      res.status(200).send("User Updating Success");
    } else {
      res.status(404).send("Id Not Found");
    }
  } catch (error) {
    res.status(404).send(error);
  }
};

const deleteUsers = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await pool.query("delete from users where id=$1", [id]);
    if (response.rowCount > 0) {
      res.status(200).send("Delete Users Sucess");
    } else {
      res.status(200).send("Id Not Found");
    }
  } catch (error) {
    res.status(404).send(error);
  }
};

const InnerUsers = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await pool.query(
      "select * from users inner join permissions on users.id=permissions.id_user where users.id=$1",
      [id]
    );
    res.status(200).send(response.rows);
  } catch (error) {
    res.status(404).send(404);
  }
};

module.exports = {
  getUsers,
  getUsersById,
  createUsers,
  updateUsers,
  deleteUsers,
  InnerUsers,
};
