const money = (res, error) => {
    try {
        if (error.constraint === "money_name_key") {
            res.status(500).send({ code: "41585" })
        }
    } catch (err) {
        res.status(500).send({ code: "50115" })
    }
}

module.exports = { money }