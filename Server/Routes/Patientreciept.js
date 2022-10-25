const express =require("express");
let router=express.Router();
const db=require("./db").dbnew;
router.post("", (req, res) => {
  const REG_ID=req.body.REG_ID;
  const RECIEPT_DATE=req.body.RECIEPT_DATE;
  const SERVICES=req.body.SERVICES;
  const RECIEPT_ID=req.body.RECIEPT_ID;
  for(i=0;i<SERVICES.length;i++)
  {
    db.query("insert into patient_payment values(?,?,?,?,?)",[REG_ID,RECIEPT_DATE,RECIEPT_ID,SERVICES[i].Services,SERVICES[i].Charges],(err,re)=>{
        if(err)
        throw err;
    });
     
  }
  res.send("1");
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