const Database = require("./Database");
const fs = require('fs')

let db = new Database()
let queries = fs.readFileSync('schema.sql', { encoding: "UTF-8" }).split(";\n");

for (let query of queries) {
    query = query.trim();
    if (query.length !== 0 && !query.match(/\/\*/)) {
        db.conn.query(query, function (err, sets, fields) {
            if (err) {
                console.log(`Importing failed for Mysql Database  - Query:${query}`);
                console.log(err)
            } else {
                console.log(`Importing Mysql Database  - Query:${query}`);
            }
        })
    }
}