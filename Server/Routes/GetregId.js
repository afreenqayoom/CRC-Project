const express =require("express");
let router=express.Router();
const db=require("./db").dbnew;
router.get("", (req, res) => {
    //here if you wont get regid from current year get it from lst session nd add one to it nd if no session is der then generte new 
    db.query("select MAX(Registration_ID) as Registration_ID from patient_masterdetail where Patient_Type='New Patient'", (error, result) => {
        if (error) {
            res.send(error);
        }
        else {
                res.send(result);
        }

    })

})


module.exports=router;