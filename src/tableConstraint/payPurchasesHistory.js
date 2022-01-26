const payPurchasesHistory = (res, error) => {
    try {
        if (error.constraint === "pay_purchases_history_id_invoice_fkey") {
            res.status(500).send({ code: "15850" })
        }
    } catch (err) {
        res.status(500).send({ code: "50115" })
    }
}

module.exports = { payPurchasesHistory }