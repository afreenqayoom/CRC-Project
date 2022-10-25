const express = require("express");
const { resolve } = require("path");
let router = express.Router();
const db = require("./db").dbnew;

router.post("", async (req, res) => {
  const resdata = [];
  const REG_ID = req.body.REG_ID;
  //history will be shown only if patient is reffered to dept need changes
  try {
    const result = await dbquery(
      "select RegistrationID,Dated,Department from patient_history where RegistrationID= ? ORDER BY Dated",
      [REG_ID]
    );
 
    for await (const el of result) {
      if (el.Department=== "Physiotherapy") {
        const resu = await dbquery(
          "select Registration_Id,DATE_format(Dated,'%d-%m-%Y') as Dated,Clinical_Conditions,Treatments,Supportive_Services,Remarks from physiotherapy where Registration_Id=? and Dated=?",
          [REG_ID, el.Dated]
        );
        // const resu = await dbquery(
        //   "select Registration_Id,DATE_format(Dated,'%d-%m-%Y') as Dated,Clinical_Conditions,Treatments,Supportive_Services,Remarks from physiotherapy where Registration_Id=?",
        //   [REG_ID]
        // );

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
    res.send(error);
  }
});

function dbquery(query, params) {
  return new Promise((resolve, reject) => {
    db.query(query, params, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

module.exports = router;