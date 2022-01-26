const services = (res, error) => {
    try {
        if (error.constraint === "services_code_key") {
            res.status(500).send({ code: "31736" })
        }
    } catch (err) {
        res.status(500).send({ code: "50115" })
    }
}

module.exports = { services }