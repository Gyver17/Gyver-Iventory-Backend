const pool = require("../database");

const rol = async (req, res, next) => {
  try {
    const id = req.userId;
    const response = await pool.query("select * from users where id = $1", [
      id,
    ]);
    console.log(response.rows)
    const { rol } = response.rows[0];
    if (rol === "admin") {
      next();
      return;
    } else {
      return res
        .status(404)
        .send({ message: "you do not have the permissions to access" });
    }
  } catch (error) {
    return res.status(404).send({ message: error });
  }
};

module.exports = { rol };
