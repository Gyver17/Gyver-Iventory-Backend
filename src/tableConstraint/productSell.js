const productSell = (res, error) => {
    try {
        if (error.constraint === "product_sell_id_invoice_fkey") {
            res.status(500).send({ code: "64716" })
        }
        if (error.constraint === "product_sell_id_product_fkey") {
            res.status(500).send({ code: "63250" })
        }
    } catch (err) {
        res.status(500).send({ code: "50115" })
    }
}

module.exports = { productSell }