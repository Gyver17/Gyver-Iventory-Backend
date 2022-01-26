const invoiceSell = (res, error) => {
    try {
        if (error.constraint === "invoice_sell_id_employee_fkey") {
            res.status(500).send({ code: "12275" })
        }
        if (error.constraint === "invoice_sell_id_client_fkey") {
            res.status(500).send({ code: "18700" })
        }
    } catch (err) {
        res.status(500).send({ code: "50115" })
    }
}

module.exports = { invoiceSell }