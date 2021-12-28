const { query } = require('./query')

const category = async (req, res, next) => {
    try {
        const data = await query(req, res)
        if (data.category) {
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
        if (data.category_create) {
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
        if (data.category_update) {
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
        if (data.category_delete) {
            next()
        } else {
            return res.status(404).send({ message: "you do not have the permissions to access" })
        }
    } catch (error) {
        return res.status(404).send(error)
    }
}

module.exports = { category, create, update, Delete }