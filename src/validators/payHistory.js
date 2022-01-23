const { check } = require('express-validator')
const { validateResult } = require('../lib/validateResult')
const { expresions } = require('../ExpReg')

const validateCreate = [
    check('id_invoice')
        .exists()
        .isString()
        .notEmpty(),
    check('date')
        .exists()
        .notEmpty()
        .custom((value) => {
            if (!expresions.date.test(value)) {
                throw new Error('Invalid value')
            }
            return true
        })
    ,
    check('amount')
        .exists()
        .isFloat()
        .notEmpty(),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]

module.exports = { validateCreate }