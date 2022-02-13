const pool = require("../database");
const { v4 } = require("uuid");
const bcrypt = require("../lib/bcrypt")
const { handleError } = require("../lib/handleError");
const { expresions } = require("../ExpReg");

const getUsers = async (req, res) => {
  try {
    const response = await pool.query("select id, rol, name, mail from users order by name asc");
    res.status(200).json(response.rows);
  } catch (error) {
    handleError(res, error)
  }
};

const getUsersById = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await pool.query("select id, rol, name, mail from users where id = $1", [
      id,
    ]);
    res.status(200).json(response.rows[0]);
  } catch (error) {
    handleError(res, error)
  }
};

const createUsers = async (req, res) => {
  try {
    const id = v4();
    const idSession = v4()
    const { rol, name, mail, password } = req.body;
    newPassword = await bcrypt.encryptPassword(password);
    await pool.query(
      "insert into users (id, rol, name, mail, password) values ($1, $2, $3, $4, $5)",
      [id, rol, name, mail, newPassword]
    );
    await pool.query("insert into sessions (id, id_user) values ($1, $2)", [idSession, id])
    res.status(200).send({ id });
  } catch (error) {
    handleError(res, error)
  }
};

const updateUsers = async (req, res) => {
  try {
    const { id } = req.params;
    const { rol, name, mail } = req.body;
    const response = await pool.query(
      "update users set rol=$1, name=$2, mail=$3 where id=$4",
      [rol, name, mail, id]
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

const updatePassword = async (req, res) => {
  try {
    const { id } = req.params
    const { password } = req.body
    if (Boolean(password)) {
      if (expresions.password.test(password)) {
        newPassword = await bcrypt.encryptPassword(password);
        const response = await pool.query(
          "update users set password=$1 where id=$2",
          [newPassword, id]
        );
        if (response.rowCount > 0) {
          res.status(200).send({ message: "Successful" });
        } else {
          res.status(404).send({ code: "44947" });
        }
      } else {
        res.status(403).send({ code: "43097" })
      }
    }
    else {
      res.status(403).send({ code: "43097" })
    }
  } catch (error) {
    handleError(res, error)
  }
}

const deleteUsers = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("delete from sessions where id_user=$1", [id]);
    const response = await pool.query("delete from users where id=$1", [id]);
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
  getUsers,
  getUsersById,
  createUsers,
  updateUsers,
  updatePassword,
  deleteUsers,
};
