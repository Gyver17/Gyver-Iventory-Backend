const { check } = require('express-validator')
const { validateResult } = require('../lib/validateResult')
const { expresions } = require('../ExpReg')

const validateCreate = [
    check('code')
        .exists()
        .isString()
        .custom((value) => {
            if (!expresions.code.test(value)) {
                throw new Error('Invalid Value')
            }
            return true
        })
        .notEmpty(),
    check('name')
        .exists()
        .isString()
        .custom((value) => {
            if (!expresions.productName.test(value)) {
                throw new Error('Invalid Value')
            }
            return true
        })
        .notEmpty(),
    check('id_category')
        .exists()
        .isString()
        .notEmpty(),
    check('quantity')
        .exists()
        .isFloat()
        .notEmpty(),
    check('price_buy')
        .exists()
        .isFloat()
        .custom((value, { req }) => {
            const { price_sell } = req.body
            if (value > price_sell) {
                throw new Error('Invalid Value')
            }
            return true
        })
        .notEmpty(),
    check('price_sell')
        .exists()
        .isFloat()
        .custom((value, { req }) => {
            const { price_buy } = req.body
            if (value < price_buy) {
                throw new Error('Invalid Value')
            }
            return true
        })
        .notEmpty()
    ,
    (req, res, next) => {
        validateResult(req, res, next)
    }
]

module.exports = { validateCreate }