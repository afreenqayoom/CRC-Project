const express =require("express");
let router=express.Router();
const db=require("./db").dbnew;
router.post("", (req, res)=> {
    const REG_ID=req.body.REG_ID;
    const PTYPE=req.body.PTYPE;
    const DATED=req.body.DATED;
    const CONDITION_TYPE=req.body.CONDITION_TYPE;
    const CONDITIONS=req.body.CONDITIONS;
    const TREATMENTS=req.body.TREATMENTS;
    const SERVICES=req.body.SERVICES;
    const REMARKS=req.body.REMARKS;
    db.query("select * from physiotherapy where Registration_Id=? and Dated=?",[REG_ID,DATED],(err,reslt)=>{
      if (reslt.length>0)
      {
        db.query("update physiotherapy set Condition_Type=?,Clinical_Conditions=?,Treatments=?,Supportive_Services=?,Remarks=? where Registration_Id=? and Dated=?",[CONDITION_TYPE,CONDITIONS,TREATMENTS,SERVICES,REMARKS,REG_ID,DATED],(er,resu)=>{
          if(err)
        res.send(err);
        else
        res.send("1");
        })
      }
      else
      {
        db.query("insert into patient_history values(?,?,?,?)",[REG_ID,DATED,"Physiotherapy",PTYPE]);
        db.query("insert into physiotherapy values(?,?,?,?,?,?,?)",[REG_ID,DATED,CONDITION_TYPE,CONDITIONS,TREATMENTS,SERVICES,REMARKS],(err,re)=>{
            if(err)
            res.send(err);
            else
            res.send("1");
        });
      }
    })
   
  });
  router.post("/physiotherapyreport", (req, res) => {
    const DATEFROM=req.body.DATEFROM;
    const DATETO=req.body.DATETO;
   
    db.query("select  Row_Number() Over(order by p.Dated asc) as Sno,DATE_format(p.Dated,'%d-%m-%Y')as Dated,p.Registration_Id,ph.Ptype,pm.Patient_Name,pm.Age,pm.Gender,pm.Address,pm.Phone_Number,p.Condition_Type,p.Clinical_Conditions,p.Treatments,p.Supportive_Services from ((crcdb_year.physiotherapy p inner join crcdb_year.patient_history ph on p.Registration_Id=ph.RegistrationID and p.Dated=ph.Dated) inner join crcdb_year.patient_masterdetail pm on p.Registration_Id=pm.Registration_ID) where p.Dated between ? and ? order by p.Dated asc",[DATEFROM,DATETO], (error, result) => {
        if (error) {
            res.send(error);
        }
        else {
                console.log(result);
                res.send(result);
        }

    })

})
//   router.post("/getdetails",(req,res)=>{
//           const REG_ID=req.body.REG_ID;
//           const DATED=req.body.DATED;
//           db.query("select * from physiotherapy where Registration_Id=? and Dated=?",[REG_ID,DATED],(er,resu)=>{
//                    if(resu.length>0)
//                        res.send(resu);
//                   else
//                       res.send("0");
//           });
      
//       });
  module.exports=router;