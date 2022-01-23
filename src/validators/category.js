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
    check('unit')
        .exists()
        .isBoolean()
        .notEmpty()
    ,
    (req, res, next) => {
        validateResult(req, res, next)
    }
]

module.exports = { validateCreate }