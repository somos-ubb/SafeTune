const path = require('path')
require('dotenv').config({path:path.join(__dirname,'./.env')});

module.exports = {
  client: 'mysql2',
  connection: {
    host: process.env.DB_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  },
  migrations: {
    directory: './app/db/migrations'
  }
};