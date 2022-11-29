const globalfunc= require('./Global.js');
const express =require("express");
let router=express.Router();
 const db=require("./db").db;
router.post("",async (req,res,next)=>{
    const USER_ID=req.body.USER_ID;
    try{
        //console.log(USER_ID);
     const result= await globalfunc.dbquery(db,"Select * from user_privileges where Username=?", [USER_ID]);
        res.send(result);
        //console.log(result);
    }catch (error) {
        next(error);
      }
})

module.exports=router;