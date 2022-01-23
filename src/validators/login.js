const { check } = require('express-validator')
const { validateResult } = require('../lib/validateResult')

const validateCreate = [
    check('mail')
        .exists()
        .isEmail(),
    check('password')
        .exists()
        .isString()
        .notEmpty()
    ,
    (req, res, next) => {
        validateResult(req, res, next)
    }
]

module.exports = { validateCreate }