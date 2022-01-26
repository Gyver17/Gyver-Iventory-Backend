const supplier = (res, error) => {
    try {
        if (error.constraint === "supplier_code_key") {
            res.status(500).send({ code: "72533" })
        }
        if (error.constraint === "supplier_doc_id_key") {
            res.status(500).send({ code: "17259" })
        }
    } catch (err) {
        res.status(500).send({ code: "50115" })
    }
}

module.exports = { supplier }