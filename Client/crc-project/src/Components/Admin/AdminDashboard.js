import React from 'react';
import Cardwidget from '../Widgets/Cardwidget';
import Chartcontainer from '../Widgets/Chartcontainer';
import Tablewidget from '../Widgets/Tablewidget';
import './AdminDashboard.css';
import { useState } from 'react';
import axios from '../../axios';
import { isNull } from 'util';
import * as FaIcons from 'react-icons/fa';
import {toast} from 'react-toastify';
const AdminDashboard = () => {
  const current = new Date();
  const [monthnewcases, setmonthnewcases] = useState();
  const [monthfollowup, setmonthfollowup] = useState();
  const [monthtotal, setmonthtotal] = useState();
  const [yearnewcases, setyearnewcases] = useState();
  const [yearfollowup, setyearfollowup] = useState();
  const [yeartotal, setyeartotal] = useState();
  const [monthlyamount, setmonthlyamount] = useState();
  const [totalmonthlyreciept, settotalmonthlyreciept] = useState();
  const [yearlyamount, setyearlyamount] = useState();
  const [totalyearlyreciept, settotalyearlyreciept] = useState();
  const [monthdata,setmonthdata]=useState([]);
  const [yeardata,setyeardata]=useState([]);
  const [monthrecieptdata, setmonthrecieptdata] = useState([]);
  const tmonrheading = ["Month", "Total_Reciepts", "MonthlyAmount"];
  const tmonheading=["Month","NewCases","FollowUp"];
  const [fyear, setfyear] = useState("");
  //const [isError,setIsError]=useState("");
  
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const [type,setType]=useState(0);
  const showToast=((msg,type) => {
    if (type===0){
      toast.error(msg, {
        position: "top-center", autoClose: 2000
      });
    }else if(type===1){
      toast.success(msg, {
        position: "top-center", autoClose: 2000
      });
    }
  });
  const getdata = () => {
    let yearflag = false;
    if ((current.getMonth() + 1) < 4) {
      setfyear((current.getFullYear() - 1) + '-' + current.getFullYear());
      yearflag = true;
      //console.log("tt", yearflag)
    }
    else {
      setfyear(current.getFullYear() + '-' + (current.getFullYear() + 1));
      yearflag = false
    }

    // console.log(yearflag);
    axios.post("getregistrationdash/todaycases", {
      YEARFLAG: yearflag
    }).then((response) => {
      setmonthnewcases(response.data[2].MonthlyNewCases);
      setmonthfollowup(response.data[3].MonthlyFollowUp);
      setmonthtotal((response.data[2].MonthlyNewCases + response.data[3].MonthlyFollowUp));
      setyearnewcases(response.data[4].YearlyNewCases);
      setyearfollowup(response.data[5].YearlyFollowUp);
      setyeartotal((response.data[4].YearlyNewCases + response.data[5].YearlyFollowUp));
    }).catch((error)=>{
      showToast(error.message,0);
      })
    axios.post("getaccountdash/getmonthly", {

    }).then((response) => {
      if (isNull(response.data[0].Charges))
        setmonthlyamount('Rs. 0.00');
      else
        setmonthlyamount('Rs. ' + response.data[0].Charges.toFixed(2));
      settotalmonthlyreciept('Total Reciepts-' + response.data[0].Total_Reciepts);
    }).catch((error)=>{
      showToast(error.message,0);
      })
    axios.post("getaccountdash/getyearly", {
      YEARFLAG: yearflag
    }).then((response) => {
      if (isNull(response.data[0].Charges))
        setyearlyamount('Rs. 0.00');
      else
        setyearlyamount('Rs. ' + response.data[0].Charges.toFixed(2));
      settotalyearlyreciept('Total Reciepts-' + response.data[0].Total_Reciepts);
    }).catch((error)=>{
      showToast(error.message,0);
      })
    axios.post("getregistrationdash/getmonthwisedata",{
      YEARFLAG: yearflag
      }).then((response) => {
        setmonthdata(response.data);
    }).catch((error)=>{
      showToast(error.message,0);
      })
    axios.post("getregistrationdash/getyearwisedata",{
      }).then((response) => {
        setyeardata(response.data);
    }).catch((error)=>{
      showToast(error.message,0);
      })
    axios.post("getaccountdash/getmonthwisedata", {
      YEARFLAG: yearflag
    }).then((response) => {
      setmonthrecieptdata(response.data);
    }).catch((error)=>{
      showToast(error.message,0);
      })
  }

  React.useEffect(() => {

    getdata();
  }, []);

  return (
    <div className="mydash">

      <div className="content">

        <div className="dashcont">
          <div className="widgetcont">

            <div className="cardwidget"><Cardwidget bgcolor='#00cae3' headericon= {<FaIcons.FaArchive/>} headertitle='Total Cases' headerbody={monthtotal} footer1={months[current.getMonth()] + ' New Cases-' + monthnewcases} footer2={'Follow Up-' + monthfollowup} /> </div>
            <div className="cardwidget"><Cardwidget bgcolor='#4caf50' headericon={<FaIcons.FaChartLine/>} headertitle='Total Cases' headerbody={yeartotal} footer1={fyear + '  New Cases-' + yearnewcases} footer2={'Follow Up-' + yearfollowup} />  </div>
            <div className="cardwidget"><Cardwidget bgcolor='#4caf50' headericon={<FaIcons.FaArchive/>} headertitle='Amount Recieved' headerbody={monthlyamount} footer1={months[current.getMonth()]} footer2={totalmonthlyreciept} /> </div>
            <div className="cardwidget"><Cardwidget bgcolor='#fb8c00' headericon={<FaIcons.FaChartBar/>} headertitle='Amount Recieved' headerbody={yearlyamount} footer1={fyear} footer2={totalyearlyreciept} />  </div>

          </div>
          <div className="widgetcont">
            <div className="chartwidget">
            <Chartcontainer bgcolor='#e91e63' data={monthdata} headertitle='Total Cases' headerbody={yeartotal} footer1={fyear +' New Cases-' + yearnewcases} footer2={'Follow Up-' + yearfollowup} listdata={["NewCases","FollowUp"]} dkey="Month"/>

            </div>
            <div className="chartwidget">
            <Chartcontainer bgcolor='#4caf50' data={yeardata} headertitle='Yearly Cases' headerbody={yeartotal} footer1={fyear + '  New Cases-' + yearnewcases} footer2={'Follow Up-' + yearfollowup} listdata={["NewCases","FollowUp"]}/>

            </div>
            <div className="chartwidget">
            <Chartcontainer bgcolor='#00cae3' data={monthrecieptdata} headertitle='Total Amount' headerbody={yearlyamount} footer1={current.getFullYear()} footer2={totalyearlyreciept} listdata={["MonthlyAmount", "Total_Reciepts"]}  dkey="Month"/>

            </div>

          </div>
          <div className="widgetcont">
            <div className="tablewidget">
            <Tablewidget data={monthdata} theading={tmonheading} tname={"Patient Stats - " +fyear} color='#fb8c00' />
            </div>
            <div className="tablewidget">
            <Tablewidget data={monthrecieptdata} theading={tmonrheading} tname={"Reciept Stats- " + current.getFullYear()} color='#4caf50' />
            </div>
          </div>
        </div>
      </div>
    </div>


  );
}

export default AdminDashboard;