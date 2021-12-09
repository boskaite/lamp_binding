const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: "localhost",
    port: 3106,
    user: "root",
    database: "lamp",
    password: "root",
    timezone: "utc"
});
module.exports = connection;


