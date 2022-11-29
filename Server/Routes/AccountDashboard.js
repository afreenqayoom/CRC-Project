const express =require("express");
let router=express.Router();
const db=require("./db").dbnew;
let DATEFROM;
const current=new Date();
router.post("", (req, res) => {
  
    db.query("select sum(charges) as Charges,count(distinct Reciept_ID) as Total_Reciepts  from patient_payment where Dated=CURDATE()", (error, result) => {
        if (error) {
            res.send(error);
        }
        else {
                res.send(result);
        }

    })

})
router.post("/getmonthly", (req, res) => {
  
    db.query("select sum(charges) as Charges,count(distinct Reciept_ID) as Total_Reciepts  from patient_payment where MONTH(Dated)=MONTH(now())", (error, result) => {
        if (error) {
            res.send(error);
        }
        else {
                res.send(result);
        }

    })

})
router.post("/getyearly", (req, res) => {
    const YEARFLAG=req.body.YEARFLAG;
    if(YEARFLAG)
    DATEFROM=((current.getFullYear()-1)) + '-04-01';
    else
    DATEFROM=(current.getFullYear()) + '-04-01';
    db.query("select sum(charges) as Charges,count(distinct Reciept_ID) as Total_Reciepts  from patient_payment where Dated BETWEEN ? and curdate()",[DATEFROM], (error, result) => {
        if (error) {
            res.send(error);
        }
        else {
                res.send(result);
        }

    })

})
router.post("/getweekdata",(req,res)=>{
    db.query("select substring(dayname(Dated),1,3) as name,sum(charges) as DailyAmount,count(distinct Reciept_ID) as Total_Reciepts from crcdb_year.patient_payment where week(Dated)=week(now()) group by dayname(Dated)  order by Dated", (error, result) => {
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
    db.query("select substring(monthname(Dated),1,3) as Month,count(distinct Reciept_ID) as Total_Reciepts,sum(charges) as MonthlyAmount from crcdb_year.patient_payment where  Dated BETWEEN ? and curdate() group by monthname(Dated) order by year(Dated),month(Dated)",[DATEFROM], (error, result) => {
        if (error) {
            res.send(error);
        }
        else {
                res.send(result);
        }

    })
})

router.post("/getyearwisedata",(req,res)=>{
    db.query("select case when month(Dated)<=3 then concat((year(Dated)-1)%100,'-',year(Dated)%100)  else concat(year(Dated)%100,'-',(year(Dated)+1)%100) end as name,sum(charges) as YearlyAmount,count(distinct Reciept_ID) as Total_Reciepts from patient_payment  group by name order by year(Dated) limit 5", (error, result) => {
        if (error) {
            res.send(error);
        }
        else {
                res.send(result);
        }

    })
})

router.post("/getpaymentdata", (req, res) => {
    db.query("select DATE_format(Dated,'%d-%m-%Y') as Dated,Reciept_ID,Registration_ID,Sum(Charges) as Charges from patient_payment where Dated=CURDATE() group by Reciept_ID order by Reciept_ID desc limit 10",(error, result) => {
        if (error) {
            res.send(error);
        }
        else {
            
                res.send(result);
        }

    })

})
router.post("/getmonthpayment",(req,res)=>{
    db.query("select substring(monthname(Dated),1,3) as Month,count(distinct Reciept_ID) as Total_Reciepts,sum(charges) as Monthly_Amount from crcdb_year.patient_payment where year(Dated)=year(now()) group by monthname(Dated) order by year(Dated),month(Dated)", (error, result) => {
        if (error) {
            res.send(error);
        }
        else {
                res.send(result);
        }

    })
})
router.post("/gettotalregfee", (req, res) => {
    const YEARFLAG=req.body.YEARFLAG;
    if(YEARFLAG)
    DATEFROM=((current.getFullYear()-1)) + '-04-01';
    else
    DATEFROM=(current.getFullYear()) + '-04-01';
    db.query("select sum(Registration_Fee) as TotalRegFee,count(Registration_ID) as TotalRegistrations from patient_transaction_detail where Dated BETWEEN ? and curdate()",[DATEFROM], (error, result) => {
        if (error) {
            res.send(error);
        }
        else {
                res.send(result);
        }

    })

})
module.exports=router;