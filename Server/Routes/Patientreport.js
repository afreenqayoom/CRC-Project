const express =require("express");
let router=express.Router();
const db=require("./db").dbnew;
router.post("", (req, res) => {
    const DATEFROM=req.body.DATEFROM;
    const DATETO=req.body.DATETO;
    const PTYPE=req.body.PTYPE;
    db.query("select Row_Number() Over(order by patient_transaction_detail.Dated) as Sno,patient_transaction_detail.Registration_ID,DATE_format(patient_transaction_detail.Dated,'%d-%m-%Y') as Dated,patient_masterdetail.Patient_Name,patient_masterdetail.Parentage,patient_masterdetail.Address,patient_masterdetail.Phone_Number,patient_masterdetail.Gender,patient_masterdetail.Age,patient_transaction_detail.Department_Refer as Department,patient_masterdetail.Category from patient_transaction_detail inner join patient_masterdetail on patient_transaction_detail.Registration_ID=patient_masterdetail.Registration_ID where patient_transaction_detail.Patient_Type= ? and crcdb_year.patient_transaction_detail.Dated between ? and ?",[PTYPE,DATEFROM,DATETO], (error, result) => {
        if (error) {
            res.send(error);
        }
        else {
                // console.log(result);
                res.send(result);
        }

    })

})


module.exports=router;