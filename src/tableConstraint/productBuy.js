const productBuy = (res, error) => {
    try {
        if (error.constraint === "product_buy_id_invoice_fkey") {
            res.status(500).send({ code: "15850" })
        }
        if (error.constraint === "product_buy_id_product_fkey") {
            res.status(500).send({ code: "63250" })
        }
    } catch (err) {
        res.status(500).send({ code: "50115" })
    }
}

module.exports = { productBuy }