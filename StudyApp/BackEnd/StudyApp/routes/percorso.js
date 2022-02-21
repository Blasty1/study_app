var express = require('express');
const Percorsi = require('../Controllers/Percorsi');
const isAuthenticated = require('../middleware/auth');
const arrayOfObjects = require('../middleware/parametres');
var router = express.Router();


// store a percorso
router.post('/store',isAuthenticated,arrayOfObjects,function(req,res)
{
    const percorsoController = new Percorsi()
    for(let percorso of req.percorsi)
    {
        percorsoController.store(Object.values(percorso)[0],req.deviceId,res)
    }
    res.status(200).json('Completato')
})

module.exports = router