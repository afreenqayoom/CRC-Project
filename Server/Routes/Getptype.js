const express =require("express");
let router=express.Router();
const db=require("./db").dbnew;
router.post("", (req, res) => {
    const REG_ID= req.body.REG_ID;
    const DATED=req.body.DATED;
    db.query("select Patient_Type from patient_transaction_detail where Registration_ID=? and Dated=?",[REG_ID,DATED],(error, result) => {
        if (error) {
            res.send(error);
        }
        else if(result.length>0)
        {        res.send(result);
        }
        else
        res.send("0");

    })

})


module.exports=router;