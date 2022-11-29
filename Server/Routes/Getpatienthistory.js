const globalfunc= require('./Global.js');
const express = require("express");
const { resolve } = require("path");
let router = express.Router();
const db = require("./db").dbnew;
 
router.post("", async (req, res,next) => {
  const resdata = [];
  const REG_ID = req.body.REG_ID;
  //history will be shown only if patient is reffered to dept need changes
  try {
    const result = await globalfunc.dbquery(db,"select RegistrationID,Dated,Department from patient_history where RegistrationID= ? ORDER BY Dated desc",
      [REG_ID]
    );
 
    for await (const el of result) {
      if (el.Department=== "Physiotherapy") {
        const resu = await globalfunc.dbquery(db,"select Registration_Id,DATE_format(Dated,'%d-%m-%Y') as Dated,Clinical_Conditions,Treatments,Supportive_Services,Remarks from physiotherapy where Registration_Id=? and Dated=?",
          [REG_ID, el.Dated]
        );
        
        if (resu.length > 0) {
            for await(const item of resu){
          resdata.push({
            Date:item.Dated,
            Department: "Physiotherapy",
            Diagnosis:item.Clinical_Conditions.split(','),
            Treatment:item.Treatments.split(','),
            Supportive_Services:item.Supportive_Services.split(','),
            Remarks:item.Remarks
          });
        }
        }
      }
    }
    res.send(resdata);
  } catch (error) {
   next(error);
  }
});



module.exports = router;