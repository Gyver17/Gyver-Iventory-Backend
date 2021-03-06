const { validationResult } = require('express-validator'); //TODO:

const validateResult = (req, res, next) => {
    try {
        validationResult(req).throw()
        return next()
    } catch (err) {
        console.log(err.array())
        res.status(403)
        res.send({
            code: "43097",
            details: err.array({ onlyFirstError: true })
        })
    }
}

module.exports = { validateResult }