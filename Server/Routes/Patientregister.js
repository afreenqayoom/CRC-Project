const globalfunc = require('./Global.js');
const express = require("express");
let router = express.Router();
const db = require("./db").dbnew;
var querystr;
router.post("", async (req, res, next) => {
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
    try {
        if (EDIT && FOLLOWUP) {
            const q1 = await globalfunc.dbquery(db, "Update patient_masterdetail set Patient_Name=?,Parentage=?,Category=?,Address=?,District=?,Age=?,Gender=?,Phone_Number=?,Education=?,Religion=?,Caste=?,Martial_Status=?,Martial_Status_Change=?,Occupation_Before=?,Occupation_After=?,Family_Occupation=?,Income_Before=?,Income_After=?,Disability_Cause=?,Disability_Type=?,Parts_Affected=?,Disability_Effect=?,Family_Disable=?,Total_Family=?,Total_Disabled_Family=?,Rehab_Facilities=? where Registration_ID=?", [PATIENT_NAME, PARENTAGE, CATEGORY, ADDRESS, DISTRICT, AGE, GENDER, PHONE_NO, QUALIFICATION, RELIGION, CASTE, MARTIAL, MARTIAL_CHANGE, OCCUPATION, OCC_CHANGE, FAMILY_OCC, INCOME, INCOME_CHANGE, DISABILITY_CAUSE, DISABILITY_TYPE, DISABILITY_PARTS, DISABILITY, FAMILY_DISABLE, TOTAL_FAM, TOTAL_DISABLED, REHAB, REG_ID])
            res.send("-1");
        }
        else if (!EDIT) {

            const q2 = await globalfunc.dbquery(db, "select * from patient_transaction_detail where Registration_ID=? and Dated=?", [REG_ID, REG_DATE]);
            if (q2.length > 0)
                res.send("3");
            else {
                await db.beginTransaction();
                if (FOLLOWUP)
                    querystr = `Update patient_masterdetail set Patient_Name="${PATIENT_NAME}",Parentage="${PARENTAGE}",Category="${CATEGORY}",Address="${ADDRESS}",District="${DISTRICT}",Age="${AGE}",Gender="${GENDER}",Phone_Number="${PHONE_NO}",Education="${QUALIFICATION}",Religion="${RELIGION}",Caste="${CASTE}",Martial_Status="${MARTIAL}",Martial_Status_Change="${MARTIAL_CHANGE}",Occupation_Before="${OCCUPATION}",Occupation_After="${OCC_CHANGE}",Family_Occupation="${FAMILY_OCC}",Income_Before="${INCOME}",Income_After="${INCOME_CHANGE}",Disability_Cause="${DISABILITY_CAUSE}",Disability_Type="${DISABILITY_TYPE}",Parts_Affected="${DISABILITY_PARTS}",Disability_Effect="${DISABILITY}",Family_Disable="${FAMILY_DISABLE}",Total_Family="${TOTAL_FAM}",Total_Disabled_Family="${TOTAL_DISABLED}",Rehab_Facilities="${REHAB}" where Registration_ID="${REG_ID}"`
                else
                    querystr = `insert into patient_masterdetail values ("${REG_ID}","${REG_DATE}","${PATIENT_TYPE}","${PATIENT_NAME}","${PARENTAGE}","${CATEGORY}","${ADDRESS}","${DISTRICT}","${AGE}","${GENDER}","${PHONE_NO}","${QUALIFICATION}","${RELIGION}","${CASTE}","${MARTIAL}","${MARTIAL_CHANGE}","${OCCUPATION}","${OCC_CHANGE}","${FAMILY_OCC}","${INCOME}","${INCOME_CHANGE}","${DISABILITY_CAUSE}","${DISABILITY_TYPE}","${DISABILITY_PARTS}","${DISABILITY}","${FAMILY_DISABLE}","${TOTAL_FAM}","${TOTAL_DISABLED}","${REHAB}")`
                const q3=await globalfunc.dbquery(db,querystr);
                const q4=await globalfunc.dbquery(db,"insert into patient_transaction_detail values(?,?,?,?,?)", [REG_ID, REG_DATE, PATIENT_TYPE, REFDEPT, REG_FEE]);
                await db.commit();
                 res.send("1");
            }
        }
    } catch (error) {
        await db.rollback();
        next(error);
    }
})
// router.post("", async (req, res, next) => {

//     try {
//         const result = await patientRegister(req);
//         // console.log(result);
//         res.send(result);
//     } catch (error) {
//         next(error);
//     }
// });
// function patientRegister(req) {
//     const PATIENT_TYPE = req.body.PATIENT_TYPE;
//     const REG_ID = req.body.REG_ID;
//     const QUALIFICATION = req.body.QUALIFICATION;
//     const REG_FEE = req.body.REG_FEE;
//     const REG_DATE = req.body.REG_DATE;
//     const PATIENT_NAME = req.body.PATIENT_NAME;
//     const PARENTAGE = req.body.PARENTAGE;
//     const CATEGORY = req.body.CATEGORY;
//     const ADDRESS = req.body.ADDRESS;
//     const DISTRICT = req.body.DISTRICT;
//     const AGE = req.body.AGE;
//     const GENDER = req.body.GENDER;
//     const PHONE_NO = req.body.PHONE_NO;
//     const REFDEPT = req.body.REFDEPT;
//     const RELIGION = req.body.RELIGION;
//     const CASTE = req.body.CASTE;
//     const MARTIAL = req.body.MARTIAL;
//     const MARTIAL_CHANGE = req.body.MARTIAL_CHANGE;
//     const OCCUPATION = req.body.OCCUPATION;
//     const OCC_CHANGE = req.body.OCC_CHANGE;
//     const FAMILY_OCC = req.body.FAMILY_OCC;
//     const INCOME = req.body.INCOME;
//     const INCOME_CHANGE = req.body.INCOME_CHANGE;
//     const DISABILITY_CAUSE = req.body.DISABILITY_CAUSE;
//     const DISABILITY_TYPE = req.body.DISABILITY_TYPE;
//     const FAMILY_DISABLE = req.body.FAM_DISABLE;
//     const TOTAL_FAM = req.body.TOTAL_FAM;
//     const TOTAL_DISABLED = req.body.TOTAL_DISABLED;
//     const DISABILITY = req.body.DISABILITY;
//     const DISABILITY_PARTS = req.body.DISABILITY_PARTS;
//     const REHAB = req.body.REHAB;
//     const FOLLOWUP = req.body.FOLLOWUP;
//     const EDIT = req.body.EDIT;
//     return new Promise((resolve, reject) => {
//         if (EDIT && FOLLOWUP) {

//             return db.query("Update patient_masterdetail set Patient_Name=?,Parentage=?,Category=?,Address=?,District=?,Age=?,Gender=?,Phone_Number=?,Education=?,Religion=?,Caste=?,Martial_Status=?,Martial_Status_Change=?,Occupation_Before=?,Occupation_After=?,Family_Occupation=?,Income_Before=?,Income_After=?,Disability_Cause=?,Disability_Type=?,Parts_Affected=?,Disability_Effect=?,Family_Disable=?,Total_Family=?,Total_Disabled_Family=?,Rehab_Facilities=? where Registration_ID=?", [PATIENT_NAME, PARENTAGE, CATEGORY, ADDRESS, DISTRICT, AGE, GENDER, PHONE_NO, QUALIFICATION, RELIGION, CASTE, MARTIAL, MARTIAL_CHANGE, OCCUPATION, OCC_CHANGE, FAMILY_OCC, INCOME, INCOME_CHANGE, DISABILITY_CAUSE, DISABILITY_TYPE, DISABILITY_PARTS, DISABILITY, FAMILY_DISABLE, TOTAL_FAM, TOTAL_DISABLED, REHAB, REG_ID], (er, re) => {
//                 if (er)
//                     return reject(new AppError("Update Failed..", 404))
//                 else {
//                     return resolve("-1");
//                     //console.log("Updated");
//                 }
//             })
//         }
//         else if (!EDIT) {
//             return db.beginTransaction((err) => {
//                 if (err) {
//                     return reject(new AppError("Transaction Beginning Error", 404));
//                 }
//                 return db.query("select * from patient_transaction_detail where Registration_ID=? and Dated=?", [REG_ID, REG_DATE], (err, reslt) => {
//                     if (err) {
//                         return db.rollback(() => {
//                             reject(new AppError(err.code, 404));
//                         })
//                     }
//                     else {
//                         if (reslt.length > 0)
//                             return resolve("3");
//                         else {
//                             if (FOLLOWUP)
//                                 querystr = `Update patient_masterdetail set Patient_Name="${PATIENT_NAME}",Parentage="${PARENTAGE}",Category="${CATEGORY}",Address="${ADDRESS}",District="${DISTRICT}",Age="${AGE}",Gender="${GENDER}",Phone_Number="${PHONE_NO}",Education="${QUALIFICATION}",Religion="${RELIGION}",Caste="${CASTE}",Martial_Status="${MARTIAL}",Martial_Status_Change="${MARTIAL_CHANGE}",Occupation_Before="${OCCUPATION}",Occupation_After="${OCC_CHANGE}",Family_Occupation="${FAMILY_OCC}",Income_Before="${INCOME}",Income_After="${INCOME_CHANGE}",Disability_Cause="${DISABILITY_CAUSE}",Disability_Type="${DISABILITY_TYPE}",Parts_Affected="${DISABILITY_PARTS}",Disability_Effect="${DISABILITY}",Family_Disable="${FAMILY_DISABLE}",Total_Family="${TOTAL_FAM}",Total_Disabled_Family="${TOTAL_DISABLED}",Rehab_Facilities="${REHAB}" where Registration_ID="${REG_ID}"`
//                             else
//                                 querystr = `insert into patient_masterdetail values ("${REG_ID}","${REG_DATE}","${PATIENT_TYPE}","${PATIENT_NAME}","${PARENTAGE}","${CATEGORY}","${ADDRESS}","${DISTRICT}","${AGE}","${GENDER}","${PHONE_NO}","${QUALIFICATION}","${RELIGION}","${CASTE}","${MARTIAL}","${MARTIAL_CHANGE}","${OCCUPATION}","${OCC_CHANGE}","${FAMILY_OCC}","${INCOME}","${INCOME_CHANGE}","${DISABILITY_CAUSE}","${DISABILITY_TYPE}","${DISABILITY_PARTS}","${DISABILITY}","${FAMILY_DISABLE}","${TOTAL_FAM}","${TOTAL_DISABLED}","${REHAB}")`

//                             return db.query(querystr, (err, re) => {
//                                 if (err)
//                                     return reject(new AppError(err.code, 404));
//                                 else {
//                                     return db.query("insert into patient_transaction_detail values(?,?,?,?,?)", [REG_ID, REG_DATE, PATIENT_TYPE, REFDEPT, REG_FEE], (err, r) => {
//                                         if (err) {
//                                             return db.rollback(() => {
//                                                 reject(new AppError(err.code, 404));
//                                             })
//                                         }
//                                         else {
//                                            return db.commit((err) => {
//                                                 if (err) {
//                                                     return db.rollback(() => {
//                                                         reject(new AppError("Error in committing the data",404));
//                                                     })
//                                                 }
//                                                 else {
//                                                 return resolve("1");
//                                                 }

//                                             })
//                                         }
//                                     })
//                                 }
//                             })
//                         }
//                     }

//                 })
//             })
//         }
//     })

// }



module.exports = router;