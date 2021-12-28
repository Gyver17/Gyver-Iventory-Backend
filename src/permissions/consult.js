const { query } = require('./query')

const product = async (req, res, next) => {
    try {
        const data = await query(req, res)
        if (data.consult_product) {
            next()
        } else {
            return res.status(404).send({ message: "you do not have the permissions to access" })
        }
    } catch (error) {
        return res.status(404).send(error)
    }
}

const invoice = async (req, res, next) => {
    try {
        const data = await query(req, res)
        if (data.consult_invoice) {
            next()
        } else {
            return res.status(404).send({ message: "you do not have the permissions to access" })
        }
    } catch (error) {
        return res.status(404).send(error)
    }
}

const movement = async (req, res, next) => {
    try {
        const data = await query(req, res)
        if (data.consult_movement) {
            next()
        } else {
            return res.status(404).send({ message: "you do not have the permissions to access" })
        }
    } catch (error) {
        return res.status(404).send(error)
    }
}

const supplier = async (req, res, next) => {
    try {
        const data = await query(req, res)
        if (data.consult_supplier) {
            next()
        } else {
            return res.status(404).send({ message: "you do not have the permissions to access" })
        }
    } catch (error) {
        return res.status(404).send(error)
    }
}

const client = async (req, res, next) => {
    try {
        const data = await query(req, res)
        if (data.consult_client) {
            next()
        } else {
            return res.status(404).send({ message: "you do not have the permissions to access" })
        }
    } catch (error) {
        return res.status(404).send(error)
    }
}

module.exports = { product, invoice, movement, supplier, client }