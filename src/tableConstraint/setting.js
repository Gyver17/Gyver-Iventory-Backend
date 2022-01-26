const setting = (res, error) => {
    try {
        if (error.constraint == "setting_id_money_1_fkey" || error.constraint === "setting_id_money_2_fkey") {
            res.status(500).send({ code: "43455" })
        }
    } catch (err) {
        res.status(500).send({ code: "50115" })
    }
}

module.exports = { setting }