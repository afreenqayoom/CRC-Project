import React from 'react';
import Tablewidget from '../Widgets/Tablewidget';
import axios from '../../axios';
import { useState } from 'react';
import { useFormik } from 'formik';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import {toast} from 'react-toastify';
export default function ViewReciept() {
    const theading=["Sno","Registration_ID","Dated","Patient_Name","Parentage","Address","Phone_Number","Gender","Age","Department","Category"];
    // const [totalcharges, settotal] = useState(0);
    const [tabledata,settabledata]=useState([]);

    const getdetails=()=>{
        // let amt=0;
        axios.post("patientreport", {
           DATEFROM:formik.values.datefrom,
           DATETO:formik.values.dateto,
           PTYPE:formik.values.ptype
        }).then((response) => {
            settabledata(response.data);
            console.log(response.data);
        //     response.data.forEach(el => {
        //         amt=amt+el.Charges;
        //     })
        //     settotal(amt);
        //    amt=0;
        }).catch((error)=>{
            toast.error(error.message, {
              position: "top-center",autoClose: 2000});})
    }
    const initialValues = {
        datefrom: '',
        dateto: '',
        ptype:'New Patient'
    }
    const onSubmit = (values) => {
    console.log("fv",values);
    }
    const formik = useFormik({
        initialValues,
        onSubmit
    });
    return(
        <div className="input-boxes">
        <form id="payment" onSubmit={formik.handleSubmit}>
             <div className="row">
             <div className="col-20"><label>Date From</label></div>
             <div className="col-25"><input type="date" className="input-com" name="datefrom" onChange={formik.handleChange}/></div>
             <div className="col-20" style={{textAlign:"center"}}><label >Date To</label></div>
             <div className="col-25"><input type="date" className="input-com"name="dateto" onChange={formik.handleChange}/></div>
             {/* <div className="col-20" style={{textAlign:"center"}}> <button type="submit" form="payment" className="btn" style={{ width: "120px" }} onClick={getdetails}>View</button></div> */}
             </div>
             <div className="row">
             <div className="col-25" style={{textAlign:"center"}}><label >Patient Type</label></div>
             <div className="col-25"> <select name="ptype" value ={formik.values.ptype}  onChange={formik.handleChange}>
                                <option>New Patient</option>
                                <option>Follow Up</option>
                                
                            </select></div>
             <div className="col-25" style={{textAlign:"center"}}> <button type="submit" form="payment" className="btn" style={{ width: "120px" }} onClick={getdetails}>View</button></div> 
            </div>
            <div classname="row" style={{display:"flex",justifyContent:"flex-end",paddingRight:"10px",paddingTop:"40px"}}>
            <div style={{width:"200px"}}>
            <ReactHTMLTableToExcel
            id="table-xls-button"
            className="btn"
            table="table-to-xls"
            filename="patientreport"
            sheet="patientreport"
            buttonText="Download as Excel"/></div>
            </div>
             <div className="row" style={{paddingBottom:"60px"}}>
            <Tablewidget tname="Patient Report" data={tabledata} theading={theading} color='#7d2ae8'/>
        
            </div>
            
            {/* <div className="row">
                <div className="col-80" >
                    <label style={{ float: "right",padding:"10px" }}>Total Amount</label>
                </div>
                <div className="col-20">
                    <input type="text" disabled className="input-com" value={totalcharges} style={{ textAlign: "right",fontSize:"20px" }} />
                </div>
                
                
            </div> */}
           </form>
        </div>
    );
}