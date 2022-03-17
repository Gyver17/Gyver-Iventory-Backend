const { v4 } = require("uuid");
const jwt = require("jsonwebtoken");
const pool = require("../database");
const bcrypt = require("../lib/bcrypt");
const { handleError } = require("../lib/handleError");

const loginUsers = async (req, res) => {
    try {
        const { mail, password } = req.body;
        const response = await pool.query("select * from users where mail=$1", [
            mail,
        ]);
        if (response.rowCount > 0) {
            const user = response.rows[0];
            const validPassword = await bcrypt.matchPassword(
                password,
                user.password
            );
            if (validPassword) {
                const { id } = user;

                const secondQuery = await pool.query(
                    "select * from permissions where id_user=$1",
                    [id]
                );
                const permissions = secondQuery.rows[0];

                const thirdQuery = await pool.query(
                    `select *, 
                    m1.symbol as first_symbol, 
                    m1.value as first_value, 
                    m2.symbol as second_symbol, 
                    m2.value as second_value 
                    from setting 
                    inner join money as m1 on setting.id_money_1=m1.id 
                    inner join money as m2 on setting.id_money_2=m2.id`
                );
                const setting = thirdQuery.rows[0];

                const secretKey = v4();
                await pool.query(
                    "update sessions set secret_key=$1 where id_user=$2",
                    [secretKey, id]
                );
                const payload = {
                    id: id,
                };
                const token = jwt.sign(payload, secretKey, {
                    expiresIn: 60 * 60 * 24,
                });
                user["token"] = token;

                const data = { user, permissions, setting };
                res.status(200).send(data);
            } else {
                res.status(404).send({ code: "44754" });
            }
        } else {
            res.status(404).send({ code: "44754" });
        }
    } catch (error) {
        handleError(res, error);
    }
};

const logoutUsers = async (req, res) => {
    try {
        id = req.userId;
        const secretKey = undefined;
        await pool.query("update sessions set secret_key=$1 where id_user=$2", [
            secretKey,
            id,
        ]);
        res.status(200).send({ message: "Successful" });
    } catch (error) {
        handleError(res, error);
    }
};

module.exports = { loginUsers, logoutUsers };
