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
        const response = await pool.query("select * from pay_purchases_history where id=$1", [id])
        res.status(200).json(response.rows)
    } catch (err) {
        handleError(res, error)
    }
}

const createPayPurchasesHistory = async (req, res) => {
    try {
        const id = v4()
        const { id_invoice, date, amount } = req.body
        await pool.query(
            "insert into pay_purchases_history (id, id_invoice, date, amount) values ($1, $2, $3, $4)",
            [id, id_invoice, date, amount])
        res.status(200).json({ id, id_invoice, date, amount })
    } catch (err) {
        handleError(res, error)
    }
}

module.exports = { getPayPurchasesHistory, getPayPurchasesHistoryById, createPayPurchasesHistory }