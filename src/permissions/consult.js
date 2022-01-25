const { handleError } = require('../lib/handleError')
const { query } = require('./query')

const product = async (req, res, next) => {
    try {
        const data = await query(req, res)
        if (data.consult_product) {
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
        if (data.consult_invoice) {
            next()
        } else {
            return res.status(403).send({ code: "43114" })
        }
    } catch (error) {
        handleError(res, error)
    }
}

const movement = async (req, res, next) => {
    try {
        const data = await query(req, res)
        if (data.consult_movement) {
            next()
        } else {
            return res.status(403).send({ code: "43114" })
        }
    } catch (error) {
        handleError(res, error)
    }
}

const supplier = async (req, res, next) => {
    try {
        const data = await query(req, res)
        if (data.consult_supplier) {
            next()
        } else {
            return res.status(403).send({ code: "43114" })
        }
    } catch (error) {
        handleError(res, error)
    }
}

const client = async (req, res, next) => {
    try {
        const data = await query(req, res)
        if (data.consult_client) {
            next()
        } else {
            return res.status(403).send({ code: "43114" })
        }
    } catch (error) {
        handleError(res, error)
    }
}

module.exports = { product, invoice, movement, supplier, client }