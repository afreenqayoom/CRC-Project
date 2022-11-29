const globalfunc = require('./Global.js');
const express = require("express");
let router = express.Router();
const db = require("./db").db;
router.post("/insertservice", async (req, res, next) => {
    const SERVICEID=req.body.SERVICEID;
    const SERVICE_CATEGORY=req.body.SERVICE_CATEGORY;
    const SERVICE=req.body.SERVICE;
    const CHARGES=req.body.CHARGES;
    try{
        const q1 = await globalfunc.dbquery(db, "insert into services values (?,?,?,?)", [SERVICEID, SERVICE_CATEGORY, SERVICE,CHARGES]);
        res.send("Service Created Successfully!!");
    }catch (error) {
        next(error);
    }

});
router.post("/updateservice", async (req, res, next) => {
    const SERVICEID=req.body.SERVICEID;
    const SERVICE_CATEGORY=req.body.SERVICE_CATEGORY;
    const SERVICE=req.body.SERVICE;
    const CHARGES=req.body.CHARGES;
    try{
        const q1 = await globalfunc.dbquery(db, "update services set Service_Category=?,Services=?,Service_Charges=? where ServiceId=?", [SERVICE_CATEGORY, SERVICE,CHARGES,SERVICEID]);
        res.send("Service Updated Successfully!!");
    }catch (error) {
        next(error);
    }

});

router.post("/deleteservice", async (req, res, next) => {
    const SERVICEID=req.body.SERVICEID;
    
    try{
        const q1 = await globalfunc.dbquery(db, "delete from services where ServiceId=?", [SERVICEID]);
        res.send("Service Deleted Successfully!!");
    }catch (error) {
        next(error);
    }

});
module.exports=router;