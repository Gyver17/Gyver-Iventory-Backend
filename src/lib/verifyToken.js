const jwt = require("jsonwebtoken");
const pool = require('../database')

const verifyToken = async (req, res, next) => {
  const token = req.headers["x-access-token"];

  if (!token) {
    res.status(404).send({ auth: false, message: "No Token Was Provided" });
  } else {

    /* Decoding the token to get the payload */
    var base64Url = token.split('.')[1]
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    const { id } = JSON.parse((atob(base64)))

    /* Check if there is a secret key for that user id */
    const { rows } = await pool.query("select * from sessions where id_user=$1", [id])
    const { secret_key } = rows[0]

    /* Check if the token is valid */  
    await jwt.verify(token, secret_key, (error, decoded) => {
      if (!error) {
        req.userId = decoded.id;
        next();
      }
      else {
        res.status(404).json(error);
      }

    })
  }
};

module.exports = { verifyToken };
