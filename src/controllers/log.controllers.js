const { v4 } = require("uuid")
const jwt = require("jsonwebtoken")
const pool = require('../database')
const bcrypt = require("../lib/bcrypt")
const { handleError } = require("../lib/handleError")

const loginUsers = async (req, res) => {
    try {
        const { mail, password } = req.body
        const response = await pool.query(
            "select * from users where mail=$1",
            [mail]
        );
        if (response.rowCount > 0) {
            const user = response.rows[0];
            const validPassword = await bcrypt.matchPassword(password, user.password);
            if (validPassword) {
                const { id, rol, name, mail } = user;
                const secretKey = v4()
                await pool.query("update sessions set secret_key=$1 where id_user=$2", [secretKey, id])
                const payload = {
                    id: id
                };
                const token = jwt.sign(payload, secretKey, {
                    expiresIn: 60 * 60 * 24,
                    audience: "http://192.168.1.24:4000/",
                    issuer: "http://localhost:3000"
                });
                const data = { id, rol, name, mail, token }
                res.status(200).send({ data, message: "Succes" })
            } else {
                rres.status(200).send(false, { message: "Password Incorret" })
            }
        } else {
            res.status(200).send(false, { message: "Not User Found" })
        }
    } catch (error) {
        handleError(res, error)
    }
};

module.exports = { loginUsers }