const jwt = require('jsonwebtoken');
const AuthController = require('../Controllers/Auth');
const { decrypt } = require('../helper/crypto');

function isAuthenticated(req, res, next) {

    const tokenJWT = req.headers['authorization']
    jwt.verify(tokenJWT.split(' ')[1], process.env.JWT_TOKEN,async (error,user) => {
        if (error) {
            if(error.name = 'TokenExpiredError')
            {
                return res.status(409).json(error)
            }
            return res.status(401).json(error)
        }
        req.deviceId = JSON.parse(decrypt(user)).deviceId
        
        next()
    }
    )
}

module.exports = isAuthenticated