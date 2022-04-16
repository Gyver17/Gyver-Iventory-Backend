const { check } = require('express-validator')
const { validateResult } = require('../lib/validateResult')
const { expresions } = require('../ExpReg')

const validateCreate = [
    check('number')
        .exists()
        .isInt()
        .notEmpty(),
    check('id_supplier')
        .exists()
        .isString()
        .notEmpty(),
    check('id_employee')
        .exists()
        .isString()
        .notEmpty(),
    check("products").exists().isArray().notEmpty(),
    check('products.*.id_product')
        .exists()
        .isString()
        .notEmpty(),
    check('products.*.quantity')
        .exists()
        .isFloat()
        .notEmpty(),
    check('products.*.price_total')
        .exists()
        .isFloat()
        .notEmpty(),
    check('price_sub')
        .exists()
        .isFloat()
        .custom((value, { req }) => {
            const { products } = req.body
            const sub_total = products.reduce(
                (prev, next) => prev + (next["price_total"] || 0),
                0
            );
            if (value === sub_total && value > 0) {
                return true
            }
            throw new Error('Invalid value')
        })
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
    check('credit')
        .exists()
        .isBoolean()
        .notEmpty(),
    check('amount_pay')
        .exists()
        .isFloat()
        .custom((value, { req }) => {
            const { credit, amount_remaining, price_total } = req.body
            if (credit) {
                if (value === price_total - amount_remaining) {
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
            if (credit) {
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