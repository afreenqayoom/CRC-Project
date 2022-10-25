import React from 'react';
import Tablewidget from '../Widgets/Tablewidget';
import { useState } from 'react';
import axios from '../../axios';
import * as FaIcons from 'react-icons/fa';
import {toast} from 'react-toastify';
export default function Viewpatient() {
    const [searchvalue,setsearchvalue]=useState("")
    const theading=["Registration_ID","Dated","Patient_Name","Address","Phone_Number"];
    const [tabledata,settabledata]=useState([]);
 
    const submitValue=()=>{
        axios.post("getdetails/search",{
        SEARCH: searchvalue
    }).then((response) => {
        settabledata(response.data);
       
    }).catch((error)=>{
        toast.error(error.message, {
          position: "top-center",autoClose: 2000});})
    }
    return (
        <div className="input-boxes" style={{justifyContent:"flex-start"}}>
            <div className="searchbox">
    
                   
                        <input type="text" className="input-com" onChange={e=>setsearchvalue(e.target.value)}/>
                        <i className="searchicon" onClick={submitValue}><FaIcons.FaSearch/></i>
                    </div>
        
            <div className="col-80">
            <Tablewidget tname="Patient Stats" data={tabledata} theading={theading} color='#7d2ae8'/>
        
            </div>
        </div>
    );
}