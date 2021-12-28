const pool = require("../database");
const jwt = require("jsonwebtoken");
const { key } = require("../key");
const bcrypt = require("../lib/bcrypt")
const passport = require("passport")


const loginUsers = async (req, res, next) => {
    try {
        await passport.authenticate('local.signin', (err, data, message) => {
            if (err) throw err;
            if (data) {
                req.logIn(data, (err) => {
                    if (err) throw err;
                    res.status(200).send({ data, message });
                });
            } else {
                res.status(401).send({ data, message });
            }
        })(req, res, next);
    } catch (error) {
        res.status(404).send(error)
    }
};

module.exports = { loginUsers }