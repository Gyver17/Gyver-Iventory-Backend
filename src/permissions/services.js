const { query } = require('./query')

const services = async (req, res, next) => {
    try {
        const data = await query(req, res)
        if (data.services) {
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
        if (data.services_create) {
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
        if (data.services_update) {
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
        if (data.services_delete) {
            next()
        } else {
            return res.status(403).send({ code: "43114" })
        }
    } catch (error) {
        handleError(res, error)
    }
}

module.exports = { services, create, update, Delete }