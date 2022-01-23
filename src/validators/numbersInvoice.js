const { check } = require('express-validator')
const { validateResult } = require('../lib/validateResult')

const validateCreate = [
    check('buy')
        .exists()
        .isInt()
        .notEmpty(),
    check('sell')
        .exists()
        .isInt()
        .notEmpty()
    ,
    (req, res, next) => {
        validateResult(req, res, next)
    }
]

module.exports = { validateCreate }