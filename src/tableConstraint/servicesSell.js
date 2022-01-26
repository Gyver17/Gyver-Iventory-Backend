const servicesSell = (res, error) => {
    try {
        if (error.constraint === "services_sell_id_employee_fkey") {
            res.status(500).send({ code: "12275" })
        }
        if (error.constraint === "services_sell_id_services_fkey") {
            res.status(500).send({ code: "63566" })
        }
        if (error.constraint === "services_sell_id_invoice_fkey") {
            res.status(500).send({ code: "64716" })
        }
    } catch (err) {
        res.status(500).send({ code: "50115" })
    }
}

module.exports = { servicesSell }