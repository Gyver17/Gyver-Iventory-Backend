const dotenv = require("dotenv");
const path = require('path');

dotenv.config({
  path: path.resolve('.env' + '.' + process.env.NODE_ENV)
});
// console.log(process.env.PORT)

module.exports = {
  database: {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT,
  }
};
