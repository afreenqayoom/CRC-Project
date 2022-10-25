const express =require("express");
let router=express.Router();
const db=require("./db").db;
router.post("", (req, res) => {
    const USER_ID = req.body.USER_ID;
    const USER_PASS = req.body.USER_PASS;
    db.query("Select * from Users where Username=? and Password=?", [USER_ID, USER_PASS], (error, result) => {
        if (error) {
            res.send(error);
        }
        else {
            if(result.length>0){
                res.send(result);
            }
            else
            {
                res.send("0"); 
            }
        }
    })

});
router.post("/forgetpassword",(req,res)=>{
    const USER_ID=req.body.USER_ID;
    const USER_EMAIL=req.body.USER_EMAIL;
    const USER_DOB=req.body.USER_DOB;
    db.query("Select * from Users where Username=? and EmailID=? and DOB=?", [USER_ID, USER_EMAIL,USER_DOB], (error, result) => {
        if (error) {
            res.send(error);
        }
        else {
            if(result.length>0){
                res.send("1");
            }
            else
            {
                res.send("0"); 
            }
        }
    })
});
router.post("/setnewpassword",(req,res)=>{
    const USER_ID=req.body.USER_ID;
    const USER_EMAIL=req.body.USER_EMAIL;
    const USER_DOB=req.body.USER_DOB;
    const NEW_PASSWORD=req.body.NEW_PASSWORD;
    
    console.log("DATA",USER_ID + USER_EMAIL + USER_DOB + NEW_PASSWORD);
    db.query("Update Users set Password=? where Username=? and EmailID=? and DOB=?", [NEW_PASSWORD,USER_ID, USER_EMAIL,USER_DOB], (error, result) => {
        if(error)
        {
            res.send(error);
            
        }
        else{
            if(result.affectedRows<1)
            {
                res.send("0");
            }
            else{
                res.send("1");
            }
        }
    })
});

module.exports=router;