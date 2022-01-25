const { handleError } = require('../lib/handleError')
const { query } = require('./query')

const setting = async (req, res, next) => {
    try {
        const data = await query(req, res)
        if (data.setting) {
            next()
        } else {
            return res.status(403).send({ code: "43114" })
        }
    } catch (error) {
        handleError(res, error)
    }
}

module.exports = { setting }