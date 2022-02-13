const jwt = require('jsonwebtoken');
const Controller  = require('./Controller');
const mysql = require("mysql2")

class AuthController extends Controller{

    registration(deviceId)
    {
        this.conn.query(
        `
            INSERT INTO users(device_id) VALUES(${mysql.escape(deviceId)})
        `, 
        function (err, result) {
            if (err) throw err;
          }
        )
        return jwt.sign({ deviceId: deviceId }, process.env.JWT_TOKEN,{expiresIn : 86400}); //24h



    }
}

module.exports = AuthController