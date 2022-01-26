const employee = (res, error) => {
    try {
        if (error.constraint === "employee_code_key") {
            res.status(500).send({ code: "42149" })
        }
        if (error.constraint === "employee_doc_id_key") {
            res.status(500).send({ code: "31535" })
        }
    } catch (err) {
        res.status(500).send({ code: "50115" })
    }
}
module.exports = { employee }