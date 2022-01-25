const { handleError } = require('../lib/handleError')
const { query } = require('./query')

const product = async (req, res, next) => {
    try {
        const data = await query(req, res)
        if (data.products) {
            next()
        } else {
            return res.status(403).send({ code: "43114" })
        }
    } catch (error) {
        handleError(res, error)
    }
}

const create = async (req, res, next) => {
    try {
        const data = await query(req, res)
        if (data.products_create) {
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
        if (data.products_update) {
            next()
        } else {
            return res.status(403).send({ code: "43114" })
        }
    } catch (error) {
        handleError(res, error)
    }
}

const Delete = async (req, res, next) => {
    try {
        const data = await query(req, res)
        if (data.products_delete) {
            next()
        } else {
            return res.status(403).send({ code: "43114" })
        }
    } catch (error) {
        handleError(res, error)
    }
}

module.exports = { product, create, update, Delete }
