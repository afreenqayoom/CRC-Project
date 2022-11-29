const AppError= require('./errorHandler.js');
const globalfunc = require('./Global.js');
const express =require("express");
let router=express.Router();
const db=require("./db").dbnew;
router.post("", async(req, res,next) => {
  const REG_ID=req.body.REG_ID;
  const RECIEPT_DATE=req.body.RECIEPT_DATE;
  const SERVICES=req.body.SERVICES;
  const RECIEPT_ID=req.body.RECIEPT_ID;
  try{
   await db.beginTransaction();
  for(i=0;i<SERVICES.length;i++)
  {
   await globalfunc.dbquery(db,"insert into patient_payment values(?,?,?,?,?)",[REG_ID,RECIEPT_DATE,RECIEPT_ID,SERVICES[i].Services,SERVICES[i].Charges]);
     
  }
 await db.commit();
  res.send("1");
}catch (error) {
  await db.rollback();
  next(error);
}
})
  router.post("/getrecieptId",(req,res)=>{
    db.query("select MAX(Reciept_ID) as Reciept_ID from patient_payment", (error, result) => {
      if (error) {
          res.send(error);
          //console.log(error);
      }
      else {
              res.send(result);
              //console.log(result);
      }

  });
  })


module.exports=router;