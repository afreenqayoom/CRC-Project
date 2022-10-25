const express = require('express')
const app=express()
const cors = require('cors')
const login=require("./Routes/Login")
const createuser=require("./Routes/Createuser")
const patientregister=require("./Routes/Patientregister")
const getregId=require("./Routes/GetregId")
const getDetails=require("./Routes/GetDetails")
const reciept=require("./Routes/Patientreciept")
const getptype=require("./Routes/Getptype")
const physioregister=require("./Routes/Physioregister")
const getpayment=require("./Routes/Getpaymentdetails")
const getaccountdash=require("./Routes/AccountDashboard")
const getpatienthistory=require("./Routes/Getpatienthistory")
const getregistrationdash=require("./Routes/RegistrationDashboard")
const getphysiodash=require("./Routes/PhysiotherapyDashboard")
const menu=require("./Routes/Menu")
const patientreport=require("./Routes/Patientreport")
app.use(express.json());
app.use(cors());
app.use("/login",login);            
app.use("/createuser",createuser);
app.use("/registration",patientregister);
app.use("/getregid",getregId);
app.use("/getdetails",getDetails);
app.use("/patientreciept",reciept);
app.use("/getptype",getptype);
app.use("/physioregister",physioregister);
app.use("/getpayment",getpayment);
app.use("/getaccountdash",getaccountdash);
app.use("/getpatienthistory",getpatienthistory);
app.use("/getregistrationdash",getregistrationdash);
app.use("/getphysiodash",getphysiodash);
app.use("/getmenu",menu);
app.use("/patientreport",patientreport);
app.listen(3001,err => {
    if(err){
        return console.log("Error",err);
    }
    console.log("Server is running on port 3001.....");
}); 