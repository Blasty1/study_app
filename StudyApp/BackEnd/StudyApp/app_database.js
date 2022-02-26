const dotenv = require('dotenv');
dotenv.config();
const fs = require('fs')
const mysql = require("mysql2")


let conn = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USERNAME,
    password: process.env.PASSWORD,
    database : process.env.DATABASE,
    multipleStatements: true
    })

let queries = fs.readFileSync('./database/schema.sql', { encoding: "UTF-8" }).split(";\n");

for (let query of queries) {
    query = query.trim();
    if (query.length !== 0 && !query.match(/\/\*/)) {
        conn.query(query, function (err, sets, fields) {
            if (err) {
                console.log(`Importing failed for Mysql Database  - Query:${query}`);
                console.log(err)
            } else {
                console.log(`Importing Mysql Database  - Query:${query}`);
            }
        })
    }
}
conn.end()