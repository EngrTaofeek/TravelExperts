//importing mysql module
const mysql = require("mysql2/promise");

//Always update this with your Mysql password before you run the server
const databaseConnection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'travelexperts',
    password: 'root',
});

//exporting the connection for use in any js file
module.exports = databaseConnection;