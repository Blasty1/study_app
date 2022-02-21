const mysql = require("mysql2")

class Database{

    db()
    {
        let conn = mysql.createConnection({
            host: process.env.HOST,
            user: process.env.USERNAME,
            password: process.env.PASSWORD,
            database: process.env.DATABASE,
            multipleStatements: true
            })
        
        conn.connect()
        return conn
    }
    
   
}
module.exports = Database