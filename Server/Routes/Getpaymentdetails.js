const express =require("express");
let router=express.Router();
const db=require("./db").dbnew;
router.post("", (req, res) => {
    const DATEFROM=req.body.DATEFROM;
    const DATETO=req.body.DATETO;
    db.query("select DATE_format(Dated,'%d-%m-%Y') as Dated,Reciept_ID,Registration_ID,Sum(Charges) as Charges from patient_payment where Dated between ? and ? group by Reciept_ID",[DATEFROM,DATETO], (error, result) => {
        if (error) {
            res.send(error);
        }
        else {
                //console.log(result);
                res.send(result);
        }

    })

})


module.exports=router;