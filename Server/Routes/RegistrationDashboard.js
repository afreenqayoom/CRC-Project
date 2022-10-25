const express = require("express");
let router = express.Router();
const db = require("./db").dbnew;
let DATEFROM;
const current=new Date();
router.post("/todaycases", async (req, res) => {
    const resdata = [];
    const YEARFLAG=req.body.YEARFLAG;
  
  
    try {

        const result1 = await dbquery("select count(Registration_ID) as NewCases FROM patient_transaction_detail where Patient_Type='New Patient' and Dated=curdate()");
        resdata.push(result1[0]);
        const result2 = await dbquery("select count(Registration_ID) as FollowUp FROM patient_transaction_detail where Patient_Type='Follow Up' and Dated=curdate()");
        resdata.push(result2[0]);
        const result3 = await dbquery("select count(Registration_ID) as MonthlyNewCases FROM patient_transaction_detail where Patient_Type='New Patient' and MONTH(Dated)=MONTH(now());");
        resdata.push(result3[0]);
        const result4 = await dbquery("select count(Registration_ID) as MonthlyFollowUp FROM patient_transaction_detail where Patient_Type='Follow Up' and MONTH(Dated)=MONTH(now());");
        resdata.push(result4[0]);
      //  console.log("yflag",YEARFLAG);
        if(YEARFLAG)
        DATEFROM=((current.getFullYear()-1)) + '-04-01';
        else
        DATEFROM=(current.getFullYear()) + '-04-01';
        const result5= await dbquery("select count(Registration_ID) as YearlyNewCases FROM patient_transaction_detail where Patient_Type='New Patient' and Dated BETWEEN ? and curdate()",[DATEFROM]);
        resdata.push(result5[0]);
        const result6= await dbquery("select count(Registration_ID) as YearlyFollowUp FROM patient_transaction_detail where Patient_Type='Follow Up' and Dated BETWEEN ? and curdate()",[DATEFROM]);
        resdata.push(result6[0]);
        res.send(resdata);
        //console.log(result1);
 
    } catch (error) {
        res.send(error);
    }

});
router.post("/getweekdata",(req,res)=>{
    db.query("select substring(dayname(Dated),1,3) as name,sum(Patient_Type='New Patient') as NewCases,sum(Patient_Type='Follow Up') as FollowUp from crcdb_year.patient_transaction_detail where Patient_Type in ('New Patient','Follow Up') and week(Dated)=week(now()) group by dayname(Dated) order by Dated", (error, result) => {
        if (error) {
            res.send(error);
        }
        else {
                res.send(result);
        }

    })
})
router.post("/getmonthwisedata",(req,res)=>{
    const YEARFLAG=req.body.YEARFLAG;
    if(YEARFLAG)
        DATEFROM=((current.getFullYear()-1)) + '-04-01';
        else
        DATEFROM=(current.getFullYear()) + '-04-01';
    db.query("select substring(monthname(Dated),1,3) as Month,sum(Patient_Type='New Patient') as NewCases,sum(Patient_Type='Follow Up') as FollowUp from crcdb_year.patient_transaction_detail where Patient_Type in ('New Patient','Follow Up') and  Dated BETWEEN ? and curdate() group by monthname(Dated) order by year(Dated),month(Dated)",[DATEFROM], (error, result) => {
        if (error) {
            res.send(error);
        }
        else {
                res.send(result);
        }

    })
})
router.post("/getyearwisedata",(req,res)=>{
    db.query("select case when month(Dated)<=3 then concat((year(Dated)-1)%100,'-',year(Dated)%100)  else concat(year(Dated)%100,'-',(year(Dated)+1)%100) end as name,sum(Patient_Type='New Patient') as NewCases,sum(Patient_Type='Follow Up') as FollowUp from crcdb_year.patient_transaction_detail where Patient_Type in ('New Patient','Follow Up') group by name order by year(Dated) limit 5", (error, result) => {
        if (error) {
            res.send(error);
        }
        else {
                res.send(result);
        }

    })
})
router.post("/gettabledata", (req, res) => {
    db.query("select DATE_format(Dated,'%d-%m-%Y') as Dated,Registration_ID,Patient_Type from patient_transaction_detail where Dated=CURDATE() group by Registration_ID order by Registration_ID desc limit 10",(error, result) => {
        if (error) {
            res.send(error);
        }
        else {
            
                res.send(result);
        }

    })

})
function dbquery(query, params) {
    return new Promise((resolve, reject) => {
        db.query(query, params, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}
module.exports = router;