const { check } = require('express-validator')
const { validateResult } = require('../lib/validateResult')
const { expresions } = require('../ExpReg')

const validateCreate = [
    check('code')
        .exists()
        .isString()
        .custom((value) => {
            if (!expresions.code.test(value)) {
                throw new Error('Invalid value')
            }
            return true
        })
        .notEmpty(),
    check('name')
        .exists()
        .isString()
        .custom((value) => {
            if (!expresions.name.test(value)) {
                throw new Error('Invalid value')
            }
            return true
        })
        .notEmpty(),
    check('doc_id')
        .exists()
        .isString()
        .custom((value) => {
            if (!expresions.docId.test(value)) {
                throw new Error('Invalid value')
            }
            return true
        })
        .notEmpty(),
    check('mail')
        .exists()
        .isEmail()
        .notEmpty(),
    check('phone')
        .exists()
        .isString()
        .custom((value) => {
            if (!expresions.numberPhone.test(value)) {
                throw new Error('Invalid value')
            }
            return true
        })
        .notEmpty(),
    check('salary')
        .exists()
        .isFloat()
        .notEmpty(),
    check('com_sell')
        .exists()
        .isFloat()
        .notEmpty(),
    check('com_service')
        .exists()
        .isFloat()
        .notEmpty()
    ,
    (req, res, next) => {
        validateResult(req, res, next)
    }
]

module.exports = { validateCreate }