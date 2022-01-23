const handleError = (res, err) => {
    //console.log(err)
    if (err.code) {
        if (err.code === "23505" || err.code === "23503") {
            res.status(500).json({ code: err.code, detail: err.detail, constraint: err.constraint })
        }
        else {
            res.status(500).json({ code: err.code, detail: err.detail })
        }
    } else {
        res.status(500)
        res.send({ error: 'Something is Wrong' })
    }
}

module.exports = { handleError }