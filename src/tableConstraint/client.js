const client = (res, error) => {
    try {
        if (error.constraint === "client_code_key") {
            res.status(500).send({ code: "91610" })
        }
        if (error.constraint === "client_doc_id_key") {
            res.status(500).send({ code: "11916" })
        }
    } catch (err) {
        res.status(500).send({ code: "50115" })
    }
}

module.exports = { client }