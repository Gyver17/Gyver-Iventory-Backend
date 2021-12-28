const { query } = require('./query')

const create = async (req, res, next) => {
    try {
        const data = await query(req, res)
        if (data.buy || data.buy_return) {
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
        if (data.buy_return || data.buy_pay) {
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
        if (data.buy_pay) {
            next()
        } else {
            return res.status(404).send({ message: "you do not have the permissions to access" })
        }
    } catch (error) {
        return res.status(404).send(error)
    }
}

const products = async (req, res, next) => {
    try {
        const data = await query(req, res)
        if (data.buy || data.buy_return) {
            next()
        } else {
            return res.status(404).send({ message: "you do not have the permissions to access" })
        }
    } catch (error) {
        return res.status(404).send(error)
    }
}


module.exports = { create, invoice, update, products }