const mysql = require('mysql')
const pool = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'my_project_db',
    port: 3306,
})
module.exports = pool
