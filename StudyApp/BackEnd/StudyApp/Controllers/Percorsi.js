const Controller = require("./Controller");
const mysql = require("mysql2")
var moment = require('moment');

class Percorsi extends Controller
{
    store(percorso,device_id,res)
    {
        this.db().query(
        `
            INSERT INTO percorsi_effettuati (user_id,nome,minuti,created_at) VALUES(${mysql.escape(device_id)}, ${mysql.escape(percorso.name)},${mysql.escape(percorso.minuti)},${mysql.escape(moment(percorso.created_at).format('YYYY-MM-DD HH:mm:ss'))})
        `,
        function(err,result)
        {
            if(err)
            {   
                return res.status(400).json(err)
            }
        }
        )
    }
}
module.exports = Percorsi