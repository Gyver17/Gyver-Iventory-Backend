const pool = require("../database");
const { v4 } = require("uuid");
const { handleError } = require("../lib/handleError");

const getPaySalesHistory = async (req, res) => {
    try {
        const response = await pool.query("select * from pay_sales_history")
        res.status(200).json(response.rows)
    } catch (err) {
        handleError(res, error)
    }
}

const getPaySalesHistoryById = async (req, res) => {
    try {
        const { id } = req.params
        const response = await pool.query("select * from pay_sales_history where id=$1", [id])
        res.status(200).json(response.rows[0])
    } catch (err) {
        handleError(res, error)
    }
}

const createPaySalesHistory = async (req, res) => {
    try {
        const id = v4()
        const { id_invoice, date, amount } = req.body
        await pool.query(
            "insert into pay_sales_history (id, id_invoice, date, amount) values ($1, $2, $3, $4)",
            [id, id_invoice, date, amount])
        res.status(200).send({ message: "Successful" })
    } catch (err) {
        handleError(res, error)
    }
}

module.exports = { getPaySalesHistory, getPaySalesHistoryById, createPaySalesHistory }