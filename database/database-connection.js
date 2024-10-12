//importing mysql module
const mysql = require('mysql2');

//Always update this with your Mysql password before you run the server
const databaseConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'travelexperts',
    password: 'mysqlpass'
});

//exporting the connection for use in any js file
module.exports = databaseConnection;