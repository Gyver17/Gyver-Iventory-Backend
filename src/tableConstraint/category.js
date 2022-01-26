const category = (res, error) => {
    try {
        if (error.constraint === "category_name_key") {
            res.status(500).send({ code: "30385" })
        }
    } catch (err) {
        res.status(500).send({ code: "50115" })
    }
}

module.exports = { category }