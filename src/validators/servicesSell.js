const { check } = require('express-validator')
const { validateResult } = require('../lib/validateResult')
const { expresions } = require('../ExpReg')

const validateCreate = [
    check('id_services')
        .exists()
        .isString()
        .notEmpty(),
    check('quantity')
        .exists()
        .isFloat()
        .notEmpty(),
    check('price_total')
        .exists()
        .isFloat()
        .notEmpty(),
    check('id_invoice')
        .exists()
        .isString()
        .notEmpty(),
    check('description')
        .exists()
        .isString()
        .custom((value) => {
            if (!expresions.observation.test(value)) {
                throw new Error('Invalid Value')
            }
            return true
        })
        .notEmpty(),
    check('id_employee')
        .exists()
        .isString()
        .notEmpty()
    ,
    (req, res, next) => {
        validateResult(req, res, next)
    }
]

module.exports = { validateCreate }