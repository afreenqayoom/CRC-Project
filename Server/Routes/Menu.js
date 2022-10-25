const globalfunc= require('./Global.js');
const express =require("express");
let router=express.Router();
const db=require("./db").db;
router.post("",async (req,res)=>{
    const USER_ID=req.body.USER_ID;
    try{
        //console.log(USER_ID);
     const result= await globalfunc.dbquery("Select * from user_privileges where Username=?", [USER_ID]);
        res.send(result);
        //console.log(result);
    }catch (error) {
        res.send(error);
      }
})

module.exports=router;