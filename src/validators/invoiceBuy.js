const { check } = require('express-validator')
const { validateResult } = require('../lib/validateResult')
const { expresions } = require('../ExpReg')

const validateCreate = [
    check('number')
        .exists()
        .isString()
        .custom((value) => {
            if (!expresions.code.test(value)) {
                throw new Error('Invalid value')
            }
            return true
        })
        .notEmpty(),
    check('id_supplier')
        .exists()
        .isString()
        .notEmpty(),
    check('id_employee')
        .exists()
        .isString()
        .notEmpty(),
    check('price_sub')
        .exists()
        .isFloat()
        .notEmpty(),
    check('price_porcent')
        .exists()
        .isFloat()
        .notEmpty(),
    check('price_iva')
        .exists()
        .isFloat()
        .notEmpty(),
    check('price_total')
        .exists()
        .isFloat()
        .custom((value, { req }) => {
            const { price_sub, price_porcent, price_iva } = req.body
            if (value === price_sub + price_iva - price_porcent) {
                return true
            }
            throw new Error('Invalid value')
        })
        .notEmpty(),
    check('date')
        .exists()
        .isString()
        .custom((value) => {
            if (!expresions.date.test(value)) {
                throw new Error('Invalid value')
            }
            return true
        })
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
        .notEmpty(),
    check('pay_type')
        .exists()
        .isString()
        .custom((value) => {
            if (value === 'Débito' || value === 'Efectivo' || value === 'Ambos') {
                return true
            }
            throw new Error('Invalid value')
        })
        .notEmpty(),
    check('pay_debit')
        .exists()
        .isFloat()
        .custom((value, { req }) => {
            const { price_total, pay_cash, credit, amount_pay } = req.body
            if (credit === 'No') {
                if (value === price_total - pay_cash) {
                    return true
                }
            } else {
                if (value === amount_pay - pay_cash){
                    return true
                }
            }
            throw new Error('Invalid value')
        })
        .notEmpty(),
    check('pay_cash')
        .exists()
        .isFloat()
        .custom((value, { req }) => {
            const { price_total, pay_debit, credit, amount_pay } = req.body
            if(credit==='No'){
                if (value === price_total - pay_debit) {
                    return true
                }
            }
            else{
                if (value === amount_pay - pay_debit) {
                    return true
                }
            }
            throw new Error('Invalid value')
        })
        .notEmpty(),
    check('credit')
        .exists()
        .isString()
        .custom((value) => {
            if (value === 'Si' || value === 'No') {
                return true
            }
            throw new Error('Invalid value')
        })
        .notEmpty(),
    check('amount_pay')
        .exists()
        .isFloat()
        .custom((value, { req }) => {
            const { credit, amount_remaining, pay_debit, pay_cash, price_total } = req.body
            if (credit === 'Si') {
                if (value === pay_debit + pay_cash && value === price_total - amount_remaining) {
                    return true
                }
            } else {
                if (value === 0) {
                    return true
                }
            }
            throw new Error('Invalid value')
        })
        .notEmpty(),
    check('amount_remaining')
        .exists()
        .isFloat()
        .custom((value, { req }) => {
            const { credit, amount_pay, price_total } = req.body
            if (credit === 'Si') {
                if (value === price_total - amount_pay) {
                    return true
                }
            } else {
                if (value === 0) {
                    return true
                }
            }
            throw new Error('Invalid value')
        })
        .notEmpty(),
    check('observation')
        .exists()
        .isString()
        .custom((value) => {
            if (!expresions.observation.test(value)) {
                throw new Error('Invalid value')
            }
            return true
        })
    ,
    (req, res, next) => {
        validateResult(req, res, next)
    }
]

module.exports = { validateCreate }