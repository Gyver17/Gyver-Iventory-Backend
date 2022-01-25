const { handleError } = require('../lib/handleError')
const { query } = require('./query')

const supplier = async (req, res, next) => {
    try {
        const data = await query(req, res)
        if (data.supplier) {
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
        if (data.supplier_create) {
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
        if (data.supplier_update) {
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
        if (data.supplier_delete) {
            next()
        } else {
            return res.status(403).send({ code: "43114" })
        }
    } catch (error) {
        handleError(res, error)
    }
}

module.exports = { supplier, create, update, Delete }