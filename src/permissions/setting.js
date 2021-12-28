const { query } = require('./query')

const setting = async (req, res, next) => {
    try {
        const data = await query(req, res)
        if (data.setting) {
            next()
        } else {
            return res.status(404).send({ message: "you do not have the permissions to access" })
        }
    } catch (error) {
        return res.status(404).send(error)
    }
}

module.exports = { setting }