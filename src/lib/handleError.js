const handleError = (res, err) => {
    if (err.code) {
        if (err.code === "23505" || err.code === "23503") {
            res.status(500).json({ code: err.code, detail: err.constraint })
        }
        else {
            res.status(500).json({ code: err.code })
        }
    } else {
        res.status(500)
        res.send({ code: "50115" })
    }
}

module.exports = { handleError }