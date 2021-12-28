const { query } = require('./query')

const supplier = async (req, res, next) => {
    try {
        const data = await query(req, res)
        if (data.supplier) {
            next()
        } else {
            return res.status(404).send({ message: "you do not have the permissions to access" })
        }
    } catch (error) {
        return res.status(404).send(error)
    }
}

const create = async (req, res, next) => {
    try {
        const data = await query(req, res)
        if (data.supplier_create) {
            next()
        } else {
            return res.status(404).send({ message: "you do not have the permissions to access" })
        }
    } catch (error) {
        return res.status(404).send(error)
    }
}

const update = async (req, res, next) => {
    try {
        const data = await query(req, res)
        if (data.supplier_update) {
            next()
        } else {
            return res.status(404).send({ message: "you do not have the permissions to access" })
        }
    } catch (error) {
        return res.status(404).send(error)
    }
}

const Delete = async (req, res, next) => {
    try {
        const data = await query(req, res)
        if (data.supplier_delete) {
            next()
        } else {
            return res.status(404).send({ message: "you do not have the permissions to access" })
        }
    } catch (error) {
        return res.status(404).send(error)
    }
}

module.exports = { supplier, create, update, Delete }