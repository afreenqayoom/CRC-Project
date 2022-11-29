const AppError= require('./errorHandler.js');
// const db = require("./db").db;
 module.exports.dbquery=function dbquery(db,query, params){
    return new Promise((resolve, reject) => {
      db.query(query, params, (err, result) => {
        if (err) {
          // reject(err);
         reject(new AppError(err.code, 404));
        }
           else {
          resolve(result);
        }
      });
    });
  }
