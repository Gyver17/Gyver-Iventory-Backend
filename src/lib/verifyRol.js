const pool = require("../database");
const { handleError } = require("./handleError");

const verifyRol = async (req, res, next) => {
  try {
    const id = req.userId;
    const response = await pool.query("select * from users where id = $1", [
      id,
    ]);
    const { rol } = response.rows[0];
    if (rol === "admin") {
      next();
      return;
    } else {
      return res
        .status(403)
        .send({ code: "43178" });
    }
  } catch (error) {
    handleError(res, error)
  }
};

module.exports = { verifyRol };
