const { check } = require('express-validator')
const { validateResult } = require('../lib/validateResult')

const validateCreate = [
    check('id_product')
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
            if (value === 'Compra' || value === 'Devolución') {
                return true
            }
            throw new Error('Invalid value')
        })
        .notEmpty()
    ,
    (req, res, next) => {
        validateResult(req, res, next)
    }
]

module.exports = { validateCreate }