const jwt = require("jsonwebtoken");
const { key } = require("../key");

const verifyToken = async (req, res, next) => {
  const token = req.headers["x-access-token"];

  if (!token) {
    res.status(404).send({ auth: false, message: "No Token Was Provided" });
  } else {
    await jwt.verify(token, key, (error, decoded) => {
      if (error) {
        res.status(404).json({ message: "Token is not valid" });
      } else {
        req.userId = decoded.id;
        next();
      }
    });
  }
};

module.exports = { verifyToken };
