const { Pool } = require('pg')
const { database } = require('./config')

const pool = new Pool (database);

module.exports = pool;