const users = (res, error) => {
    try {
        if (error.constraint === "users_mail_key") {
            res.status(500).send({ code: "22121" })
        }
    } catch (err) {
        res.status(500).send({ code: "50115" })
    }
}

module.exports = { users }