const pool = require("../database");
const { v4 } = require("uuid");
const { handleError } = require("../lib/handleError");

const getPayPurchasesHistory = async (req, res) => {
    try {
        const response = await pool.query("select * from pay_purchases_history")
        res.status(200).json(response.rows)
    } catch (err) {
        handleError(res, error)
    }
}

const getPayPurchasesHistoryById = async (req, res) => {
    try {
        const { id } = req.params
        const response = await pool.query("select * from pay_purchases_history where id_invoice=$1", [id])
        res.status(200).json(response.rows)
    } catch (err) {
        handleError(res, error)
    }
}

const createPayPurchasesHistory = async (req, res) => {
    try {
        const id = v4()
        const { id_invoice, date, amount, remainig } = req.body
        await pool.query(
            "insert into pay_purchases_history (id, id_invoice, date, amount, remainig) values ($1, $2, $3, $4, $5)",
            [id, id_invoice, date, amount, remainig])
        res.status(200).send({ message: "Successful" })
    } catch (err) {
        handleError(res, error)
    }
}

module.exports = { getPayPurchasesHistory, getPayPurchasesHistoryById, createPayPurchasesHistory }