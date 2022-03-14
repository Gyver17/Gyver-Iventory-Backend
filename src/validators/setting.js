const { check } = require('express-validator')
const { validateResult } = require('../lib/validateResult')
const { expresions } = require('../ExpReg')

const validateCreate = [
    check('id_money_1')
        .exists()
        .isString()
        .notEmpty(),
    check('id_money_2')
        .exists()
        .isString()
        .notEmpty(),
    check('qty_decimal')
        .exists()
        .isInt()
        .notEmpty(),
    check('number_format')
        .exists()
        .isString()
        .custom((value) => {
            if (!expresions.numberFormat.test(value)) {
                throw new Error('Invalid Value')
            }
            return true
        })
        .notEmpty(),
    check('company_name')
        .exists()
        .isString()
        .custom((value) => {
            if (!expresions.productName.test(value)) {
                throw new Error('Invalid Value')
            }
            return true
        })
        .notEmpty(),
    check('company_rif')
        .exists()
        .isString()
        .notEmpty(),
    check('company_mail')
        .exists()
        .isEmail()
        .notEmpty(),
    check('company_phone_first')
        .exists()
        .isString()
        .custom((value) => {
            if (!expresions.numberPhone.test(value)) {
                throw new Error('Invalid Value')
            }
            return true
        })
        .notEmpty(),
    check('company_phone_second')
        .exists()
        .isString()
        .custom((value) => {
            if (!expresions.numberPhone.test(value)) {
                throw new Error('Invalid Value')
            }
            return true
        })
        .notEmpty(),
    check('iva')
        .exists()
        .isFloat({ min: 0, max: 1 })
        .notEmpty()
    ,
    (req, res, next) => {
        validateResult(req, res, next)
    }
]

module.exports = { validateCreate }