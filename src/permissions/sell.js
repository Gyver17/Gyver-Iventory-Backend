const { handleError } = require('../lib/handleError')
const { query } = require('./query')

const create = async (req, res, next) => {
    try {
        const data = await query(req, res)
        if (data.sell || data.sell_return) {
            next()
        } else {
            return res.status(403).send({ code: "43114" })
        }
    } catch (error) {
        handleError(res, error)
    }
}

const invoice = async (req, res, next) => {
    try {
        const data = await query(req, res)
        if (data.sell_return || data.sell_pay) {
            next()
        } else {
            return res.status(403).send({ code: "43114" })
        }
    } catch (error) {
        handleError(res, error)
    }
}
const update = async (req, res, next) => {
    try {
        const data = await query(req, res)
        if (data.sell_pay) {
            next()
        } else {
            return res.status(403).send({ code: "43114" })
        }
    } catch (error) {
        handleError(res, error)
    }
}

const products = async (req, res, next) => {
    try {
        const data = await query(req, res)
        if (data.sell || data.sell_return) {
            next()
        } else {
            return res.status(403).send({ code: "43114" })
        }
    } catch (error) {
        handleError(res, error)
    }
}


module.exports = { create, invoice, update, products }