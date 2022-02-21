var express = require('express');
const AuthController = require('../Controllers/Auth');
var router = express.Router();


/* GET users listing. */
router.post('/login', function(req, res, next) {
    const auth = new AuthController
    auth.login(req.body.deviceID).then(() => res.json(auth.jwt()))
    
});

module.exports = router;
