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
    check('unit_symbol')
        .exists()
        .isString()
        .custom((value) => {
            if (!expresions.unitSymbol.test(value)) {
                throw new Error('Invalid Value')
            }
            return true
        })
        .notEmpty(),
    check('price_unit')
        .exists()
        .isFloat()
        .notEmpty()
    ,
    (req, res, next) => {
        validateResult(req, res, next)
    }
]

module.exports = { validateCreate }