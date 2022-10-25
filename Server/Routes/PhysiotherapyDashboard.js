const express = require("express");
let router = express.Router();
const db = require("./db").dbnew;
let DATEFROM;
const current=new Date();
router.post("/todaycases", async (req, res) => {
    const resdata = [];
    const YEARFLAG=req.body.YEARFLAG;
  
  
    try {

        const result1 = await dbquery("select count(RegistrationID) as NewCases FROM patient_history where PType='New Patient' and Department='Physiotherapy' and Dated=curdate()");
        resdata.push(result1[0]);
        const result2 = await dbquery("select count(RegistrationID) as FollowUp FROM patient_history where PType='Follow Up' and Department='Physiotherapy' and Dated=curdate()");
        resdata.push(result2[0]);
         const result3 = await dbquery("select count(RegistrationID) as MonthlyNewCases FROM patient_history where PType='New Patient' and Department='Physiotherapy' and MONTH(Dated)=MONTH(now());");
         resdata.push(result3[0]);
         const result4 = await dbquery("select count(RegistrationID) as MonthlyFollowUp FROM patient_history where PType='Follow Up' and Department='Physiotherapy' and MONTH(Dated)=MONTH(now());");
         resdata.push(result4[0]);
    
        if(YEARFLAG)
        DATEFROM=((current.getFullYear()-1)) + '-04-01';
        else
        DATEFROM=(current.getFullYear()) + '-04-01';
        const result5= await dbquery("select count(RegistrationID) as YearlyNewCases FROM patient_history where PType='New Patient' and Department='Physiotherapy' and Dated BETWEEN ? and curdate()",[DATEFROM]);
        resdata.push(result5[0]);
        const result6= await dbquery("select count(RegistrationID) as YearlyFollowUp FROM patient_history where PType='Follow Up' and Department='Physiotherapy' and Dated BETWEEN ? and curdate()",[DATEFROM]);
        resdata.push(result6[0]);
        res.send(resdata);
        console.log(resdata);
 
    } catch (error) {
        res.send(error);
    }

});
router.post("/getweekdata",(req,res)=>{
    db.query("select substring(dayname(Dated),1,3) as name,sum(PType='New Patient') as NewCases,sum(PType='Follow Up') as FollowUp from crcdb_year.patient_history where PType in ('New Patient','Follow Up') and week(Dated)=week(now()) and Department='Physiotherapy' group by dayname(Dated) order by Dated", (error, result) => {
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
    db.query("select substring(monthname(Dated),1,3) as Month,sum(PType='New Patient') as NewCases,sum(PType='Follow Up') as FollowUp from crcdb_year.patient_history where PType in ('New Patient','Follow Up') and  Dated BETWEEN ? and curdate() and Department='Physiotherapy' group by monthname(Dated) order by year(Dated),month(Dated)",[DATEFROM], (error, result) => {
        if (error) {
            res.send(error);
        }
        else {
                res.send(result);
        }

    })
})
router.post("/getyearwisedata",(req,res)=>{
    db.query("select case when month(Dated)<=3 then concat((year(Dated)-1)%100,'-',year(Dated)%100)  else concat(year(Dated)%100,'-',(year(Dated)+1)%100) end as name,sum(PType='New Patient') as NewCases,sum(PType='Follow Up') as FollowUp from crcdb_year.patient_history where PType in ('New Patient','Follow Up') and Department='Physiotherapy' group by name order by year(Dated) limit 5", (error, result) => {
        if (error) {
            res.send(error);
        }
        else {
                res.send(result);
        }

    })
})
router.post("/gettabledata", (req, res) => {
    db.query("select DATE_format(Dated,'%d-%m-%Y') as Dated,RegistrationID,PType as Patient_Type from patient_history where Dated=CURDATE() and Department='Physiotherapy' group by RegistrationID order by RegistrationID desc limit 10",(error, result) => {
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