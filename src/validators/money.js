const { check } = require('express-validator')
const { validateResult } = require('../lib/validateResult')
const { expresions } = require('../ExpReg')

const validateCreate = [
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
    check('symbol')
        .exists()
        .isString()
        .isLength({ min:1, max: 3 })
        .notEmpty(),
    check('value')
        .exists()
        .isFloat()
        .notEmpty()
    ,
    (req, res, next) => {
        validateResult(req, res, next)
    }
]

module.exports = { validateCreate }