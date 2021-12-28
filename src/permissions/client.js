const { query } = require('./query')

const client = async (req, res, next) => {
    try {
        const data = await query(req, res)
        if (data.client) {
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
        if (data.client_create) {
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
        if (data.client_update) {
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
        if (data.client_delete) {
            next()
        } else {
            return res.status(404).send({ message: "you do not have the permissions to access" })
        }
    } catch (error) {
        return res.status(404).send(error)
    }
}

module.exports = { client, create, update, Delete }