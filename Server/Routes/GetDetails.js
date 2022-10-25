const express =require("express");
let router=express.Router();
const db=require("./db").dbnew;
router.post("", (req, res) => {
    const REG_ID= req.body.REG_ID;
    //here if you wont get regid from current year get it from lst session nd add one to it nd if no session is der then generte new 
    db.query("select * from patient_masterdetail where Registration_ID=?",[REG_ID],(error, result) => {
        if (error) {
            res.send(error);
        }
        else if(result.length>0)
        {        res.send(result);
            console.log(result);
        }
        else
        res.send("0");
    })


})
router.post("/search", (req, res) => {
    const SEARCH= req.body.SEARCH;
    db.query("select Registration_ID,DATE_format(Registration_Date,'%d-%m-%Y') as Dated,Patient_Name,Address,Phone_Number from patient_masterdetail where Registration_ID=? or Phone_Number=? or Patient_Name=?",[SEARCH,SEARCH,SEARCH],(error, result) => {
        if (error) {
            res.send(error);
        }
        else {
                res.send(result);
        }
    })


})


module.exports=router;