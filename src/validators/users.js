const { check } = require('express-validator')
const { validateResult } = require('../lib/validateResult')
const { expresions } = require('../ExpReg')

const validateCreate = [
    check('rol')
        .exists()
        .isString()
        .custom((value) => {
            if (value === 'admin' || value === 'user') {
                return true
            }
            throw new Error('Invalid Value')
        })
        .notEmpty(),
    check('name')
        .exists()
        .isString()
        .custom((value) => {
            if (!expresions.name.test(value)) {
                throw new Error('Invalid Value')
            }
            return true
        })
        .notEmpty(),
    check('mail')
        .exists()
        .isEmail()
        .notEmpty(),
    check('password')
        .exists()
        .isString()
        .custom((value) => {
            if (!expresions.password.test(value)) {
                throw new Error("Invalid Value")
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