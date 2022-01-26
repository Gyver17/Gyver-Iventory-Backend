const products = (res, error) => {
    try {
        if (error.constraint === "products_code_key") {
            res.status(500).send({ code: "16261" })
        }
        if (error.constraint === "products_id_category_fkey") {
            res.status(500).send({ code: "80857" })
        }
    } catch (err) {
        res.status(500).send({ code: "50115" })
    }
}

module.exports = { products }