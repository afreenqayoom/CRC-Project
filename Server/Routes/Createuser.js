const express =require("express");
let router=express.Router();
const db=require("./db").db;
router.post("",(req,res)=>{
    const USER_ID=req.body.USER_ID;
    const USER_PASS=req.body.USER_PASS;
    const USER_EMAIL=req.body.USER_EMAIL;
    const USER_DOB=req.body.USER_DOB;
    const USER_TYPE=req.body.USER_TYPE;
    const USER_ROLE=req.body.USER_ROLE;
    db.query("Select * from users where Username=?", [USER_ID], (error, result) => {
        if (error) {
            res.send(error);
        }
        else {
            if(result.length>0){
                res.send("0");
            }
            else
            {
                db.query("insert into users(Username,Password,EmailID,DOB,UserType) values (?,?,?,?,?)",[USER_ID,USER_PASS,USER_EMAIL,USER_DOB,USER_TYPE], (er, re) =>{
                    if(er){
                        res.send(er);

                    }
                    else
                    {
                        db.query("insert into user_privileges(Username,Admin,Registration,Search,Accounts,Physiotherapy) values(?,?,?,?,?,?)",[USER_ID,USER_ROLE[0],USER_ROLE[1],USER_ROLE[2],USER_ROLE[3],USER_ROLE[4]],(e,r)=>{
                            if(e){res.send(e);}
                            else{res.send("1")}
                        });
                        
                    }

                })
                
            
            }
        }
    })

});
module.exports=router;