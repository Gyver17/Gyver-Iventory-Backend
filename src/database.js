const { Pool } = require('pg')
const { database } = require('./key')

const pool = new Pool (database);

module.exports = pool;