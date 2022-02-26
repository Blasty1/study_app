const mysql = require("mysql2")

class Database {

    db() {
        let thisClass = this
        let conn = mysql.createConnection({
            host: process.env.HOST,
            user: process.env.USERNAME,
            password: process.env.PASSWORD,
            database: process.env.DATABASE,
            multipleStatements: true
        })


        conn.connect(function (err) {              // The server is either down
            if (err) {                                     // or restarting (takes a while sometimes).
                console.log('error when connecting to db:', err);
                setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
            }                                     // to avoid a hot loop, and to allow our node script to
        })
        conn.on('error', function(err) {
            if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
                thisClass.db()                    // lost due to either server restart, or a
            } else {                                      // connnection idle timeout (the wait_timeout
              throw err;                                  // server variable configures this)
            }
          });
        return conn
    }


}
module.exports = Database