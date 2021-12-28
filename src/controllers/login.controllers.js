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

const logoutUsers = (req, res) => {
    try {
        req.logOut();
        res.status(200).send({ message: "Success Logout" });
    } catch (error) {
        res.status(404).send({ message: error });
    }
};

module.exports = { loginUsers, logoutUsers }