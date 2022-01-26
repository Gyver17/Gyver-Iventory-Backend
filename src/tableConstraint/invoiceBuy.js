const invoiceBuy = (res, error) => {
    try {
        if(error.constraint === "invoice_buy_id_employee_fkey"){
            res.status(500).send({code: "12275"})
        }
        if(error.constraint === "invoice_buy_id_supplier_fkey"){
            res.status(500).send({code: "49171"})
        }
    } catch (err) {
        res.status(500).send({ code: "50115" })
    }
}

module.exports = { invoiceBuy }