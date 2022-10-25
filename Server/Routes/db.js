const mysql = require('mysql')
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'afreen',
    database: 'crcdb',
});
const dbnew=mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'afreen',
    database: 'crcdb_year',
});
db.connect(function(error){
if(error){
 console.log('Error',error);
}
else{
    console.log('Connected');
}

}
)
dbnew.connect(function(er){
    if (er) {
        console.log('Error',er);
    }
})
module.exports.db=db;
module.exports.dbnew=dbnew;