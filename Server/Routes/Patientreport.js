const globalfunc= require('./Global.js');
const express =require("express");
let router=express.Router();
const db=require("./db").dbnew;
router.post("", async(req,res,next) => {
    const DATEFROM=req.body.DATEFROM;
    const DATETO=req.body.DATETO;
    try{
   const result=await globalfunc.dbquery(db,"select Row_Number() Over(order by patient_transaction_detail.Dated) as Sno,patient_transaction_detail.Registration_ID,DATE_format(patient_transaction_detail.Dated,'%d-%m-%Y') as Dated,patient_transaction_detail.Patient_Type,patient_masterdetail.Patient_Name,patient_masterdetail.Parentage,patient_masterdetail.Address,patient_masterdetail.Phone_Number,patient_masterdetail.Gender,patient_masterdetail.Age,patient_transaction_detail.Department_Refer as Department,patient_masterdetail.Category,patient_transaction_detail.Registration_Fee from patient_transaction_detail inner join patient_masterdetail on patient_transaction_detail.Registration_ID=patient_masterdetail.Registration_ID where  crcdb_year.patient_transaction_detail.Dated between ? and ?",[DATEFROM,DATETO]);
                res.send(result);
        }catch(error){
            next(error);
          }
})


module.exports=router;