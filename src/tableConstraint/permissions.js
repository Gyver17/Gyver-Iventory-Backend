const permissions = (res, error) => {
    try {
        if(error.constraint === "permissions_id_user_key"){
            res.status(500).send({code:"43919"})
        }
        if(error.constraint === "permissions_id_user_fkey"){
            res.status(500).send({code:"48681"})
        }
    } catch (err) {
        res.status(500).send({ code: "50115" })
    }
}

module.exports = { permissions }