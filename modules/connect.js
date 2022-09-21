const mysql = require('mysql2');

const dbConnection = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'YGb1bffTHEmb2d!',
        database: 'company_db',
    },
    console.log(`connected to company_db`)
).promise();

dbConnection.connect((err) => {
    if (err) throw err
});

module.exports = dbConnection