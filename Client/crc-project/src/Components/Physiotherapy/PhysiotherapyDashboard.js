import React from 'react';
import Cardwidget from '../Widgets/Cardwidget';
import Chartcontainer from '../Widgets/Chartcontainer';
import Tablewidget from '../Widgets/Tablewidget';
import './PhysiotherapyDashboard.css';
import axios from '../../axios';
import { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import {toast} from 'react-toastify';
const PhysiotherapyDashboard = () => {
  const [todaynewcases, settodaynewcases] = useState();
  const [todayfollowup, settodayfollowup] = useState();
  const [todaytotal, settodaytotal] = useState();
  const [monthnewcases, setmonthnewcases] = useState();
  const [monthfollowup, setmonthfollowup] = useState();
  const [monthtotal, setmonthtotal] = useState();
  const [yearnewcases, setyearnewcases] = useState();
  const [yearfollowup, setyearfollowup] = useState();
  const [yeartotal, setyeartotal] = useState();
  const [weeklycases,setweeklycases]=useState(0);
  const [weeknewcases,setweeknew]=useState(0);
  const [weekfollowup,setweekfollowup]=useState(0);
  const [weekdata,setweekdata]=useState([]);
  const [monthdata,setmonthdata]=useState([]); 
  const [yeardata,setyeardata]=useState([])
  const [fyear, setfyear] = useState(""); 
  const [tabledata,settabledata]=useState([]);
  const theading=["Dated","RegistrationID","Patient_Type"];
  const tmonheading=["Month","NewCases","FollowUp"];
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
    let wcases=0,wncases=0,wfcases=0;
    if ((current.getMonth() + 1) < 4) {
      setfyear((current.getFullYear() - 1) + '-' + current.getFullYear());
      yearflag = true;
      //console.log("tt", yearflag)
    }
    else {
      setfyear(current.getFullYear() + '-' + (current.getFullYear() + 1));
      yearflag = false
    }
  axios.post("getphysiodash/todaycases", {
      YEARFLAG: yearflag
    }).then((response) => {
    
      settodaynewcases(response.data[0].NewCases);
      settodayfollowup(response.data[1].FollowUp);
      settodaytotal((response.data[0].NewCases + response.data[1].FollowUp));
       setmonthnewcases(response.data[2].MonthlyNewCases);
       setmonthfollowup(response.data[3].MonthlyFollowUp);
       setmonthtotal((response.data[2].MonthlyNewCases + response.data[3].MonthlyFollowUp));
       setyearnewcases(response.data[4].YearlyNewCases);
       setyearfollowup(response.data[5].YearlyFollowUp);
       setyeartotal((response.data[4].YearlyNewCases + response.data[5].YearlyFollowUp));
    }).catch((error)=>{
      showToast(error.message,0); 
      })
    axios.post("getphysiodash/getweekdata", {
      
    }).then((response) => {
      if(response.data.length===0)
        setweeklycases(0);
        else
        {
          response.data.forEach(element => {
            wcases=wcases+element.NewCases+element.FollowUp;
            wncases=wncases+element.NewCases;
            wfcases=wfcases+element.FollowUp;
        })
      }
      setweeklycases(wcases);
      setweeknew(wncases);
      setweekfollowup(wfcases);              
      setweekdata(response.data);
    }).catch((error)=>{
       showToast(error.message,0);
      })
    axios.post("getphysiodash/getmonthwisedata",{
      YEARFLAG: yearflag
      }).then((response) => {
        setmonthdata(response.data);
    }).catch((error)=>{
      showToast(error.message,0);
      })
    axios.post("getphysiodash/getyearwisedata",{
    }).then((response) => {
      setyeardata(response.data);
  }).catch((error)=>{
    showToast(error.message,0);
    })
  axios.post("getphysiodash/gettabledata",{
  }).then((response) => {
    settabledata(response.data);
}).catch((error)=>{
  showToast(error.message,0);
  })
}
   
      React.useEffect(() => {

        getdata();
      }, []);
      const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
      const current = new Date();
      const formatDate=current.getDate()<10 ? `0${current.getDate()}`:current.getDate();
          const formatMonth=(current.getMonth()+1)<10 ? `0${current.getMonth()+1}`:current.getMonth()+1;
          const date=[formatDate,formatMonth,current.getFullYear()].join('-');
    return (
        <div className="mydash">
       
        <div className="content">
         
            <div className="dashcont">
            <div className="widgetcont">

    <div className="chartwidget"><Cardwidget bgcolor='#00cae3' headericon={<FaIcons.FaChartBar/>} headertitle='Total Cases' headerbody={todaytotal} footer1={date +' New Cases-' + todaynewcases} footer2={'Follow Up-' + todayfollowup} /> </div>
                <div className="chartwidget"><Cardwidget bgcolor='#4caf50' headericon={<FaIcons.FaArchive/>} headertitle='Total Cases' headerbody={monthtotal} footer1= {months[current.getMonth()] + ' New Cases - ' + monthnewcases} footer2={'Follow Up - ' + monthfollowup} /> </div>
                <div className="chartwidget"><Cardwidget bgcolor='#ff9800' headericon={<FaIcons.FaThLarge/>} headertitle='Total Cases' headerbody={yeartotal} footer1={fyear + '  New Cases-' + yearnewcases} footer2={'Follow Up-' + yearfollowup} />  </div>

            </div>
            <div className="widgetcont">
                <div className="chartwidget">
               <Chartcontainer bgcolor='#e91e63' data={weekdata} headertitle='Total Cases' headerbody={weeklycases} footer1={'New Cases-' + weeknewcases}footer2={'Follow Up-'+weekfollowup} listdata={["NewCases","FollowUp"]}/>

                </div>
                <div className="chartwidget">
                <Chartcontainer bgcolor='#4caf50' data={monthdata} headertitle='Total Cases' headerbody={yeartotal} footer1={'New Cases-' + yearnewcases} footer2={'Follow Up-' + yearfollowup} listdata={["NewCases","FollowUp"]} dkey="Month"/>

                </div>
                <div className="chartwidget">
                <Chartcontainer bgcolor='#00cae3' data={yeardata} headertitle='Yearly Cases' headerbody={yeartotal} footer1={fyear + '  New Cases-' + yearnewcases} footer2={'Follow Up-' + yearfollowup} listdata={["NewCases","FollowUp"]}/>

                </div>
               
            </div>
            <div className="widgetcont">
             <div className="tablewidget">
             <Tablewidget data={tabledata} theading={theading} tname={"Patient Stats - " + date} color='#fb8c00' />
              </div>
              <div className="tablewidget">
              <Tablewidget data={monthdata} theading={tmonheading} tname={"Patient Stats - " +fyear} color='#4caf50' />
              </div>
            </div>
            </div>
            </div>
            </div>
       

    );
}

export default PhysiotherapyDashboard;