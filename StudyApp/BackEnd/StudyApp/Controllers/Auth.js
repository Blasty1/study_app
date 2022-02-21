const jwt = require('jsonwebtoken');
const Controller  = require('./Controller');
const mysql = require("mysql2");
const { encrypt } = require('../helper/crypto');

class AuthController extends Controller{

    #jwt
    #user
    #deviceId
   
    /**
     * store in database user and create token
     */
    registration()
    {
        this.db().query(
        `
            INSERT INTO users(device_id) VALUES(${mysql.escape(this.#deviceId)})
        `,
        function(err)
        {
            if(err) throw err
        }
        )
        this.#jwt = jwt.sign(encrypt(JSON.stringify({ deviceId: this.#deviceId })), process.env.JWT_TOKEN,{expiresIn : 86400}); //24h
        


    }

    /**
     * Serve per fare il login e creare il token JWT, se non risulti essere registrato allora vieni registrato e si crea il token
     * @param {string} deviceId 
     * @returns 
     */
    async login(deviceId)
    {
        this.#deviceId = deviceId
        const results = await this.db().promise().query(
            `
             SELECT * FROM users WHERE device_id = ${mysql.escape(this.#deviceId)};
            `
        )
        if(results[0].length !== 0)
        {
            if(results[0][0])
            {
                this.#jwt = jwt.sign( encrypt(JSON.stringify({ deviceId : this.#deviceId })), process.env.JWT_TOKEN,{expiresIn : 86400}) //24 ore
                return 
            }
        }

        this.registration()
        return 


    }


    jwt()
    {
        return this.#jwt
    }

    user()
    {
        return this.#user
    }


    
}

module.exports = AuthController