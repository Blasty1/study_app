var express = require('express');
const  AuthController  = require('../Controller/Auth');
var router = express.Router();


/* GET users listing. */
router.post('/registration', function(req, res, next) {
    const auth = new AuthController
    res.json(auth.registration(req.body.deviceID))
});

module.exports = router;
