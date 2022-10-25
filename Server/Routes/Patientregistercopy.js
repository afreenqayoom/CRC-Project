const express = require("express");
let router = express.Router();
const db = require("./db").dbnew;
router.post("", async (req, res) => {
    const PATIENT_TYPE = req.body.PATIENT_TYPE;
    const REG_ID = req.body.REG_ID;
    const QUALIFICATION = req.body.QUALIFICATION;
    const REG_FEE = req.body.REG_FEE;
    const REG_DATE = req.body.REG_DATE;
    const PATIENT_NAME = req.body.PATIENT_NAME;
    const PARENTAGE = req.body.PARENTAGE;
    const CATEGORY = req.body.CATEGORY;
    const ADDRESS = req.body.ADDRESS;
    const DISTRICT = req.body.DISTRICT;
    const AGE = req.body.AGE;
    const GENDER = req.body.GENDER;
    const PHONE_NO = req.body.PHONE_NO;
    const REFDEPT = req.body.REFDEPT;
    const RELIGION = req.body.RELIGION;
    const CASTE = req.body.CASTE;
    const MARTIAL = req.body.MARTIAL;
    const MARTIAL_CHANGE = req.body.MARTIAL_CHANGE;
    const OCCUPATION = req.body.OCCUPATION;
    const OCC_CHANGE = req.body.OCC_CHANGE;
    const FAMILY_OCC = req.body.FAMILY_OCC;
    const INCOME = req.body.INCOME;
    const INCOME_CHANGE = req.body.INCOME_CHANGE;
    const DISABILITY_CAUSE = req.body.DISABILITY_CAUSE;
    const DISABILITY_TYPE = req.body.DISABILITY_TYPE;
    const FAMILY_DISABLE = req.body.FAM_DISABLE;
    const TOTAL_FAM = req.body.TOTAL_FAM;
    const TOTAL_DISABLED = req.body.TOTAL_DISABLED;
    const DISABILITY = req.body.DISABILITY;
    const DISABILITY_PARTS = req.body.DISABILITY_PARTS;
    const REHAB = req.body.REHAB;
    const FOLLOWUP = req.body.FOLLOWUP;
    const EDIT = req.body.EDIT;
    if (EDIT && FOLLOWUP) {

        db.query("Update patient_masterdetail set Patient_Name=?,Parentage=?,Category=?,Address=?,District=?,Age=?,Gender=?,Phone_Number=?,Education=?,Religion=?,Caste=?,Martial_Status=?,Martial_Status_Change=?,Occupation_Before=?,Occupation_After=?,Family_Occupation=?,Income_Before=?,Income_After=?,Disability_Cause=?,Disability_Type=?,Parts_Affected=?,Disability_Effect=?,Family_Disable=?,Total_Family=?,Total_Disabled_Family=?,Rehab_Facilities=? where Registration_ID=?", [PATIENT_NAME, PARENTAGE, CATEGORY, ADDRESS, DISTRICT, AGE, GENDER, PHONE_NO, QUALIFICATION, RELIGION, CASTE, MARTIAL, MARTIAL_CHANGE, OCCUPATION, OCC_CHANGE, FAMILY_OCC, INCOME, INCOME_CHANGE, DISABILITY_CAUSE, DISABILITY_TYPE, DISABILITY_PARTS, DISABILITY, FAMILY_DISABLE, TOTAL_FAM, TOTAL_DISABLED, REHAB, REG_ID], (er, re) => {
            if (er)
                res.send("0");
            else {
                res.send("-1");
                //console.log("Updated");
            }
        })
    }
    else if (!EDIT) {
        await db.beginTransaction();
        try {
            if (FOLLOWUP) {
                db.query("Update patient_masterdetail set Patient_Name=?,Parentage=?,Category=?,Address=?,District=?,Age=?,Gender=?,Phone_Number=?,Education=?,Religion=?,Caste=?,Martial_Status=?,Martial_Status_Change=?,Occupation_Before=?,Occupation_After=?,Family_Occupation=?,Income_Before=?,Income_After=?,Disability_Cause=?,Disability_Type=?,Parts_Affected=?,Disability_Effect=?,Family_Disable=?,Total_Family=?,Total_Disabled_Family=?,Rehab_Facilities=? where Registration_ID=?", [PATIENT_NAME, PARENTAGE, CATEGORY, ADDRESS, DISTRICT, AGE, GENDER, PHONE_NO, QUALIFICATION, RELIGION, CASTE, MARTIAL, MARTIAL_CHANGE, OCCUPATION, OCC_CHANGE, FAMILY_OCC, INCOME, INCOME_CHANGE, DISABILITY_CAUSE, DISABILITY_TYPE, DISABILITY_PARTS, DISABILITY, FAMILY_DISABLE, TOTAL_FAM, TOTAL_DISABLED, REHAB, REG_ID]);
            }
            else {
                db.query("insert into patient_masterdetail values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", [REG_ID, REG_DATE, PATIENT_TYPE, PATIENT_NAME, PARENTAGE, CATEGORY, ADDRESS, DISTRICT, AGE, GENDER, PHONE_NO, QUALIFICATION, RELIGION, CASTE, MARTIAL, MARTIAL_CHANGE, OCCUPATION, OCC_CHANGE, FAMILY_OCC, INCOME, INCOME_CHANGE, DISABILITY_CAUSE, DISABILITY_TYPE, DISABILITY_PARTS, DISABILITY, FAMILY_DISABLE, TOTAL_FAM, TOTAL_DISABLED, REHAB]);
            }
            db.query("insert into patient_transaction_detaill values(?,?,?,?,?)", [REG_ID, REG_DATE, PATIENT_TYPE, REFDEPT, REG_FEE]);
            await db.commit();
            res.send("1");
        } catch(error){
            await db.rollback();
            res.send("0");
        }
    }

    else {
        res.send("-2");
    }
});
module.exports = router;