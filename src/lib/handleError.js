const { handleConstraint } = require("./handleConstraint")

const handleError = (res, err) => {

    if (err.code) {
        if (err.code === "23505" || err.code === "23503") {
            handleConstraint(res, err)
        }
        else {
            res.status(500).json({ code: "50115" })
        }
    } else {
        res.status(500)
        res.send({ code: "50115" })
    }
}

module.exports = { handleError }