const paySalesHistory = (res, error) => {
    try {
        if (error.constraint === "pay_sales_history_id_invoice_fkey") {
            res.status(500).send({ code: "64716" })
        }
    } catch (err) {
        res.status(500).send({ code: "50115" })
    }
}

module.exports = { paySalesHistory }