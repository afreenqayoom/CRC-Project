import React from 'react';
import Cardwidget from '../Widgets/Cardwidget';
import Chartcontainer from '../Widgets/Chartcontainer';
import Tablewidget from '../Widgets/Tablewidget';
import './RecieptDashboard.css';
import { useState } from 'react';
import axios from '../../axios';
import { isNull } from 'util';
import * as FaIcons from 'react-icons/fa';
import { toast } from 'react-toastify';
const RecieptDashboard = () => {
  const [dailyamount, setdailyamount] = useState();
  const [totaldailyreciept, settotaldailyreciept] = useState();
  const [weeklyamount, setweeklyamount] = useState(0);
  const [monthlyamount, setmonthlyamount] = useState();
  const [totalmonthlyreciept, settotalmonthlyreciept] = useState();
  const [yearlyamount, setyearlyamount] = useState();
  const [totalyearlyreciept, settotalyearlyreciept] = useState();
  const [totalweeklyreciept, settotalweeklyreciept] = useState();
  const [yearwiseamt, setyearwiseamt] = useState(0);
  const [yearwisereciept, setyearwisereciept] = useState(0);
  const theading = ["Dated", "Reciept_ID", "Registration_ID", "Charges"];
  const [tabledata, settabledata] = useState([]);
  const tmonheading = ["Month", "Total_Reciepts", "MonthlyAmount"];
  // const [monthtable, setmonthtable] = useState([]);
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
  const [fyear, setfyear] = useState("");
  const current = new Date();
  const formatDate = current.getDate() < 10 ? `0${current.getDate()}` : current.getDate();
  const formatMonth = (current.getMonth() + 1) < 10 ? `0${current.getMonth() + 1}` : current.getMonth() + 1;
  const date = [formatDate, formatMonth, current.getFullYear()].join('-');
  const [weekdata, setweekdata] = useState([])
  const [monthdata, setmonthdata] = useState([])
  const [yeardata, setyeardata] = useState([])
  const [totalregfee,settotalregfee]=useState();
  const [totalreg,settotalreg]=useState();
  const [isError, setIsError] = useState("");
  React.useEffect(() => {
    if (isError !== "")
      toast.error(isError, {
        position: "top-center", autoClose: 2000
      });

  }, [isError]);
  const getamount = () => {
    let wamt = 0, wreciept = 0;
    let yamt = 0, yreciept = 0;
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
    axios.post("getaccountdash", {

    }).then((response) => {
      if (isNull(response.data[0].Charges))
        setdailyamount('Rs. 0.00');
      else
        setdailyamount('Rs. ' + response.data[0].Charges.toFixed(2));
      settotaldailyreciept('Total Reciepts - ' + response.data[0].Total_Reciepts);
    }).catch((error) => {
      console.log("Error", error);
      setIsError(error.message);
    })
    axios.post("getaccountdash/getmonthly", {

    }).then((response) => {
      if (isNull(response.data[0].Charges))
        setmonthlyamount('Rs. 0.00');
      else
        setmonthlyamount('Rs. ' + response.data[0].Charges.toFixed(2));
      settotalmonthlyreciept('Total Reciepts - ' + response.data[0].Total_Reciepts);
    }).catch((error) => {
      console.log("Error", error);
      setIsError(error.message);
    })
    axios.post("getaccountdash/getyearly", {
      YEARFLAG: yearflag
    }).then((response) => {
      if (isNull(response.data[0].Charges))
        setyearlyamount('Rs. 0.00');
      else
        setyearlyamount('Rs. ' + response.data[0].Charges.toFixed(2));
      settotalyearlyreciept('Total Reciepts - ' + response.data[0].Total_Reciepts);
    }).catch((error) => {
      console.log("Error", error);
      setIsError(error.message);
    })

    axios.post("getaccountdash/getweekdata", {

    }).then((response) => {
      if (response.data.length === 0)
        setweeklyamount(0);
      else {
        response.data.forEach(element => {
          wamt = wamt + element.DailyAmount;
          wreciept = wreciept + element.Total_Reciepts;
        })
        setweeklyamount('Rs. ' + wamt.toFixed(2));
        settotalweeklyreciept('Total Reciepts - ' + wreciept);
        setweekdata(response.data);
      }
    }).catch((error) => {
      console.log("Error", error);
      setIsError(error.message);
    })
    axios.post("getaccountdash/getmonthwisedata", {
      YEARFLAG: yearflag
    }).then((response) => {
      setmonthdata(response.data);
    }).catch((error) => {
      console.log("Error", error);
      setIsError(error.message);
    })
    axios.post("getaccountdash/getyearwisedata", {

    }).then((response) => {
      if (response.data.length === 0)
        setyearwiseamt(0);
      else {
        response.data.forEach(element => {
          yamt = yamt + element.YearlyAmount;
          yreciept = yreciept + element.Total_Reciepts;
        })
        setyearwiseamt('Rs. ' + yamt.toFixed(2));
        setyeardata(response.data);
        setyearwisereciept('Total Reciepts - ' + yreciept);
      }
    }).catch((error) => {
      console.log("Error", error);
      setIsError(error.message);
    })
    axios.post("getaccountdash/getpaymentdata", {
    }).then((response) => {
      settabledata(response.data);
    }).catch((error) => {
      console.log("Error", error);
      setIsError(error.message);
    })
    axios.post("getaccountdash/gettotalregfee", {
      YEARFLAG: yearflag
    }).then((response) => {
      if (isNull(response.data[0].TotalRegFee))
        settotalregfee('Rs. 0.00');
      else
      settotalregfee('Rs. ' + response.data[0].TotalRegFee.toFixed(2));
      settotalreg('Total Registrations - ' + response.data[0].TotalRegistrations);
    }).catch((error) => {
      console.log("Error", error);
      setIsError(error.message);
    })
    // Axios.post("http://CRC-SERVER:3001/getaccountdash/getmonthpayment", {
    // }).then((response) => {
    //   setmonthtable(response.data);
    // })
  }
  React.useEffect(() => {
    getamount();
  }, []);


  return (
    <div className="mydash">
      <div className="content">
        <div className="dashcont">
          <div className="widgetcont">
            <div className="cardwidget"><Cardwidget bgcolor='#00cae3' headericon={<FaIcons.FaChartBar />} headertitle='Amount Recieved' headerbody={dailyamount} footer1={date} footer2={totaldailyreciept} /> </div>
            <div className="cardwidget"><Cardwidget bgcolor='#4caf50' headericon={<FaIcons.FaArchive />} headertitle='Amount Recieved' headerbody={monthlyamount} footer1={months[current.getMonth()]} footer2={totalmonthlyreciept} /> </div>
            <div className="cardwidget"><Cardwidget bgcolor='#ff9800' headericon={<FaIcons.FaChartLine />} headertitle='Amount Recieved' headerbody={yearlyamount} footer1={fyear} footer2={totalyearlyreciept} />  </div>
            <div className="cardwidget"><Cardwidget bgcolor='#00cae3' headericon={<FaIcons.FaChartBar />} headertitle='Total Registration Fee' headerbody={totalregfee} footer1={fyear} footer2={totalreg} />  </div>
            {/* <div className="cardwidget"><Cardwidget bgcolor='#ff9800' headericon='fa fa-th-large' headertitle='Total Cases' headerbody='+275' footer1='Male Cases - 3' footer2='Female Cases - 10' />  </div> */}
          </div>
          <div className="widgetcont">
            <div className="chartwidget">
              <Chartcontainer bgcolor='#e91e63' data={weekdata} headertitle='Total Amount' headerbody={weeklyamount} footer1='Weekly' footer2={totalweeklyreciept} listdata={["DailyAmount", "Total_Reciepts"]} />

            </div>
            <div className="chartwidget">
              <Chartcontainer bgcolor='#4caf50' data={monthdata} headertitle='Total Amount' headerbody={yearlyamount} footer1={current.getFullYear()} footer2={totalyearlyreciept} listdata={["MonthlyAmount", "Total_Reciepts"]} dkey="Month" />

            </div>
            <div className="chartwidget">
              <Chartcontainer bgcolor='#00cae3' data={yeardata} headertitle='Total Amount' headerbody={yearwiseamt} footer1='Yearly' footer2={yearwisereciept} listdata={["YearlyAmount", "Total_Reciepts"]} />

            </div>

          </div>
          <div className="widgetcont">
            <div className="tablewidget">
              <Tablewidget data={tabledata} theading={theading} tname={"Reciept Stats- " + date} color='#fb8c00' />
            </div>
            <div className="tablewidget">
              <Tablewidget data={monthdata} theading={tmonheading} tname={"Reciept Stats- " + current.getFullYear()} color='#4caf50' />
            </div>
          </div>
        </div>
      </div>
    </div>


  );
}

export default RecieptDashboard;