const globalfunc= require('./Global.js');
const express = require("express");
let router = express.Router();
const db = require("./db").dbnew;
router.post("", async (req, res, next) => {
  const REG_ID = req.body.REG_ID;
    const PTYPE = req.body.PTYPE;
    const DATED = req.body.DATED;
    const CONDITION_TYPE = req.body.CONDITION_TYPE;
    const CONDITIONS = req.body.CONDITIONS;
    const TREATMENTS = req.body.TREATMENTS;
    const SERVICES = req.body.SERVICES;
    const REMARKS = req.body.REMARKS;
    try {
      const q1 = await globalfunc.dbquery(db,"select * from physiotherapy where Registration_Id=? and Dated=?", [REG_ID, DATED]);
      if(q1.length>0){
      const q2= await globalfunc.dbquery(db,"update physiotherapy set Condition_Type=?,Clinical_Conditions=?,Treatments=?,Supportive_Services=?,Remarks=? where Registration_Id=? and Dated=?", [CONDITION_TYPE, CONDITIONS, TREATMENTS, SERVICES, REMARKS, REG_ID, DATED])
      res.send("1");
      }
      else
      {
        await db.beginTransaction();
        const q3=await globalfunc.dbquery(db,"insert into patient_history values(?,?,?,?)", [REG_ID, DATED, "Physiotherapy", PTYPE]);
        const q4=await globalfunc.dbquery(db,"insert into physiotherapy values(?,?,?,?,?,?,?)", [REG_ID, DATED, CONDITION_TYPE, CONDITIONS, TREATMENTS, SERVICES, REMARKS])
        await db.commit();
        res.send("1");
      }
    } catch (error) {
     await db.rollback();
      next(error);
    }
  })
 
// router.post("", async (req, res, next) => {
//   try {
//     const result = await physioRegister(req);
//     // console.log(result);
//     res.send(result);
//   } catch (error) {
//     next(error);
//   }
// })
// function physioRegister(req) {
//   const REG_ID = req.body.REG_ID;
//   const PTYPE = req.body.PTYPE;
//   const DATED = req.body.DATED;
//   const CONDITION_TYPE = req.body.CONDITION_TYPE;
//   const CONDITIONS = req.body.CONDITIONS;
//   const TREATMENTS = req.body.TREATMENTS;
//   const SERVICES = req.body.SERVICES;
//   const REMARKS = req.body.REMARKS;
//   return new Promise((resolve, reject) => {
//   return db.query("select * from physiotherapy where Registration_Id=? and Dated=?", [REG_ID, DATED], (err, reslt) => {
//     if (err)
//       return reject(new AppError(err.code, 404));
//     else {
//       if (reslt.length > 0) {
//         return db.query("update physiotherapy set Condition_Type=?,Clinical_Conditions=?,Treatments=?,Supportive_Services=?,Remarks=? where Registration_Id=? and Dated=?", [CONDITION_TYPE, CONDITIONS, TREATMENTS, SERVICES, REMARKS, REG_ID, DATED], (err, resu) => {
//           if (err)
//             return reject(new AppError(err.code, 404));
//           else
//             return resolve("1");
//         })
//       }
//       else {
//         return db.beginTransaction((err) => {
//           if (err) {
//             return reject(new AppError("Transaction Beginning Error", 404));
//           }
//           else {
//             return db.query("insert into patient_history values(?,?,?,?)", [REG_ID, DATED, "Physiotherapy", PTYPE], (err, re) => {
//               if (err)
//                 reject(new AppError(err.code, 404));
//               else {
//                 return db.query("insert into physiotherapy values(?,?,?,?,?,?,?)", [REG_ID, DATED, CONDITION_TYPE, CONDITIONS, TREATMENTS, SERVICES, REMARKS], (err, re) => {
//                   if (err) {
//                     return db.rollback(() => {
//                       reject(new AppError(err.code, 404));
//                     })
//                   }
//                   else {
//                     return db.commit((err) => {
//                       if (err) {
//                         return db.rollback(() => {
//                           reject(new AppError("Error in committing the data", 404));
//                         })
//                       }
//                       else {
//                         return resolve("1");
//                       }

//                     })
//                   }

//                 });
//               }
//             });
//           }
//         })
       
//       }
//     }
//   })
//   })
// }
  router.post("/physiotherapyreport", async(req, res,next) => {
    const DATEFROM=req.body.DATEFROM;
    const DATETO=req.body.DATETO;
    try{
   const result=await globalfunc.dbquery(db,"select DATE_format(p.Dated,'%d-%m-%Y')as Dated,p.Registration_Id,ph.Ptype,pm.Patient_Name,pm.Age,pm.Gender,pm.Address,pm.Phone_Number,p.Condition_Type,p.Clinical_Conditions,p.Treatments,p.Supportive_Services from ((crcdb_year.physiotherapy p inner join crcdb_year.patient_history ph on p.Registration_Id=ph.RegistrationID and p.Dated=ph.Dated) inner join crcdb_year.patient_masterdetail pm on p.Registration_Id=pm.Registration_ID) where p.Dated between ? and ? order by p.Dated asc",[DATEFROM,DATETO]);
                res.send(result);
  }catch(error){
    next(error);
  }
})

module.exports = router;