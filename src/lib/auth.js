module.exports = {
    isLoggedIn(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        } else {
            return res
                .status(403)
                .send({ message: "You is not logged" });

        }
    },
    isNotLoggedIn(req, res, next) {
        if (!req.isAuthenticated()) {
            return next();
        } else {
            return res
                .status(403)
                .send({ message: "You is logged" });

        }
    }
}