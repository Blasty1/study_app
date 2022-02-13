const mysql = require("mysql2")

class Database{
    constructor()
    {
        //puntatore al DB
        this.conn = this.connection()
    }

    connection()
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
    close()
    {
        this.conn.end()
    }
    
   
}
module.exports = Database