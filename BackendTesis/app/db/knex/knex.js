const dotenv = (require("dotenv").config()).parsed

const knex = require('knex')({
    client: 'mysql2',
    connection: {
        host: dotenv.DB_HOST || 'localhost',
        port: 3306,
        user: dotenv.MYSQL_USER,
        password: dotenv.MYSQL_PASSWORD,
        database: dotenv.MYSQL_DATABASE,
    },
});

module.exports = knex;