
function arrayOfObjects(req,res,next)
{
    req.percorsi = JSON.parse(req.body.percorsi)
    if(!req.body.percorsi)
    {
        return res.status(400).json('Errore, valori mancanti')
    }
    if( !Array.isArray(req.percorsi) )
    {
        return res.status(400).json('Errore, il tipo di dato inviato non è un array!')
    }
    next()

}
module.exports = arrayOfObjects