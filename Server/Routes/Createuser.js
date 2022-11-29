const globalfunc = require('./Global.js');
const express = require("express");
let router = express.Router();
const db = require("./db").db;
router.post("", async (req, res, next) => {
    const USER_ID = req.body.USER_ID;
    const USER_PASS = req.body.USER_PASS;
    const USER_EMAIL = req.body.USER_EMAIL;
    const USER_DOB = req.body.USER_DOB;
    const USER_TYPE = req.body.USER_TYPE;
    const USER_ROLE = req.body.USER_ROLE;
    try {
        const q1 = await globalfunc.dbquery(db, "Select * from users where Username=?", [USER_ID]);
        if (q1.length > 0)
            res.send("0");
        else {
            db.beginTransaction();
            const q2 = await globalfunc.dbquery(db, "insert into users(Username,Password,EmailID,DOB,UserType) values (?,?,?,?,?)", [USER_ID, USER_PASS, USER_EMAIL, USER_DOB, USER_TYPE]);

            const q3 = await globalfunc.dbquery(db, "insert into user_privileges(Username,Admin,Registration,Search,Accounts,Physiotherapy) values(?,?,?,?,?,?)", [USER_ID, USER_ROLE[0], USER_ROLE[1], USER_ROLE[2], USER_ROLE[3], USER_ROLE[4]]);
            db.commit();
            res.send("1");
        }

    } catch (error) {
        await db.rollback();
        next(error);
    }
});

module.exports = router;