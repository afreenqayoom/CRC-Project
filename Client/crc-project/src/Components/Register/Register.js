import React from 'react';
import axios from '../../axios';
import dateFormat from "dateformat";
import {toast} from 'react-toastify';
const handlePtype = (p, e) => {
    const regID = document.getElementsByName("regId")[0];
    p.onChangeValue(e);
    p.setfollowup(false);
    if (e.target.value === 'Follow Up') {
        p.value.regfee=0;
        p.clearregId();
        regID.disabled = "";
        regID.placeholder = "";
       

    }
    else {
        p.value.regfee=10;
        p.getregId();
        regID.disabled = "true";
    }

}
const handleEdit=(p,e)=>{
    const edit=document.getElementsByName("edit")[0];
    const ptype = document.getElementsByName("ptype")[0];
    const regID = document.getElementsByName("regId")[0];
    const datecomp=document.getElementsByName("regDate")[0];
    if(edit.checked===true)
    {
        p.clearregId();
        regID.disabled = "";
        ptype.disabled="true";
        datecomp.disabled="true";
        p.setedit(true);
    }
    else
   {
       p.setedit(false);
       p.getregId();
       regID.disabled = "true";
       ptype.disabled="";
       datecomp.disabled="";
   }
}
const search = (p, rid, e) => {
    const edit=document.getElementsByName("edit")[0];
  //  const datecomp=document.getElementsByName("regDate")[0];
    axios.post("getdetails", {
        REG_ID: rid.value
    }).then((response) => {
        p.setfollowup(false);
        if (response.data !== 0) {
            p.setfollowup(true);
            console.log(response.data);
            p.value.pname = response.data[0].Patient_Name;
            p.value.parentage = response.data[0].Parentage;
            p.value.category = response.data[0].Category;
            p.value.address = response.data[0].Address;
            p.value.district = response.data[0].District;
            p.value.age = response.data[0].Age;
            p.value.gender = response.data[0].Gender;
            p.value.phno = response.data[0].Phone_Number;
            p.value.qualification = response.data[0].Education;
            p.value.religion = response.data[0].Religion;
            p.value.caste = response.data[0].Caste;
            p.value.martial = response.data[0].Martial_Status;
            p.value.martialchange = response.data[0].Martial_Status_Change;
            p.value.occupation = response.data[0].Occupation_Before;
            p.value.occupationchange = response.data[0].Occupation_After;
            p.value.familyoccupation = response.data[0].Family_Occupation;
            p.value.income = response.data[0].Income_Before;
            p.value.incomechange = response.data[0].Income_After;
            p.value.disabilitycause = response.data[0].Disability_Cause;
            p.value.disabilitytype = response.data[0].Disability_Type;
            p.value.disabilityParts = (response.data[0].Parts_Affected).split(',');
            p.value.disability = (response.data[0].Disability_Effect).split(',');
            p.value.familydisabled = response.data[0].Family_Disable;
            p.value.totalfamily = response.data[0].Total_Family;
            p.value.totaldisabled = response.data[0].Total_Disabled_Family;
            p.value.rehab = (response.data[0].Rehab_Facilities).split(',');

            if(edit.checked===true)
            {
            p.value.regDate=dateFormat(response.data[0].Registration_Date,"yyyy-mm-dd");
           // datecomp.disabled="true";
            }
            // else
            // datecomp.disabled="";

            rid.disabled = "true";
            //this event is called to refresh page
            p.formobj.handleBlur(e);

        }
    //    else if(edit.checked===true)
    //  {  console.log("no")
    //  p.formobj.errors.regId ="No such record to edit";
    //  //  p.formobj.handleBlur(e);
    // }
    }).catch((error)=>{
        toast.error(error.message, {
          position: "top-center",autoClose: 2000});});;

}
const handleBlur = (p, e) => {
    const regID = document.getElementsByName("regId")[0];
    const ptype = document.getElementsByName("ptype")[0];
    
    p.formobj.handleBlur(e);
    if (ptype.value === "Follow Up") {
        if (regID.value !== "" && !isNaN(regID.value))
            search(p, regID, e);

    }

}

export default function Register(props) {
    React.useEffect(() => {
        const regID = document.getElementsByName("regId")[0];
        const edit=document.getElementsByName("edit")[0];
        const ptype = document.getElementsByName("ptype")[0];
        props.setregcomp(regID);
        props.seteditcomp(edit);
        props.setptypecomp(ptype);
    }, []);
    React.useEffect(() => {
        const regID = document.getElementsByName("regId")[0];

        setTimeout(() => {
            if ((props.value.ptype === 'New Patient') && (regID.value === "")) {
                regID.disabled = "";
                regID.placeholder = "Enter First RegId";
            }
            else
                regID.placeholder = "";
        }, 3000);

        // 
    }, [props.value.regId])

    return (

        <div className="input-boxes">
            <div className="row">
            <div className="col-50">
                    <div className="col-25">
                <label>Edit Details</label>
                </div>
                <div className="col-75">
                <label className="switch">
                    <input type="checkbox" name="edit" onChange={e=>{handleEdit(props,e)}}/>
                    <span className="slider round"></span>
                </label>
                </div>
                </div>
            </div>
            <div className="row">
                <div className="col-50">
                    <div className="col-25">
                        <label>Patient Type</label>
                    </div>
                    <div className="col-75">
                        <select name="ptype" value={props.value.ptype} onChange={e => { handlePtype(props, e) }}>

                            <option>New Patient</option>
                            <option>Follow Up</option>
                        </select>
                    </div>
                </div>
                <div className="col-50">
                    <div className="col-25" style={{ textAlign: "center" }}>
                        <label>Registration Fee</label>
                    </div>
                    <div className="col-75">
                        <input type="text" className="input-com" name="regfee" value={props.value.regfee} onChange={props.onChangeValue} onBlur={props.formobj.handleBlur} />
                        {props.formobj.touched.regfee && props.formobj.errors.regfee ? <div className="error">* {props.formobj.errors.regfee}</div> : null}
                    </div>

                </div>

            </div>
            <div className="row">
                <div className="col-50">
                    <div className="col-25">
                        <label>Registration Id</label>
                    </div>
                    <div className="col-75">
                        <input type="text" disabled className="input-com" name="regId" value={props.value.regId} onChange={props.onChangeValue} onBlur={e => { handleBlur(props, e) }} />
                        {props.formobj.touched.regId && props.formobj.errors.regId ? <div className="error">* {props.formobj.errors.regId}</div> : null}
                    </div>
                </div>
                <div className="col-50">
                    <div className="col-25" style={{ textAlign: "center" }}>
                        <label>Date *</label>
                    </div>
                    <div className="col-75">
                        <input type="date"  className="input-com" name="regDate" value={props.value.regDate} onChange={props.onChangeValue} />
                    </div>
                </div>

            </div>
            <div className="row">
                <div className="col-30">
                    <label>Name *</label>
                </div>
                <div className="col-70">
                    <input type="text" className="input-com" name="pname" value={props.value.pname} onChange={props.onChangeValue} onBlur={props.formobj.handleBlur} />
                    {props.formobj.touched.pname && props.formobj.errors.pname ? <div className="error">* {props.formobj.errors.pname}</div> : null}
                </div>
            </div>


            <div className="row">
                <div className="col-30">
                    <label>Parentage/Guardian</label>
                </div>
                <div className="col-70">
                    <input type="text" className="input-com" name="parentage" value={props.value.parentage} onChange={props.onChangeValue} />
                </div>
            </div>
            <div className="row">
                <div className="col-30">
                    <label>Category</label>
                </div>
                <div className="col-70">
                    <select name="category" value={props.value.category} onChange={props.onChangeValue}>
                        <option>General</option>
                        <option>RBA</option>
                        <option>Schedule Caste</option>
                        <option>Schedule Tribe</option>
                        <option>Other</option>
                    </select>
                </div>
            </div>
            <div className="row">
                <div className="col-50">
                    <div className="col-25">
                        <label>Address</label>
                    </div>
                    <div className="col-75">
                        <input type="text" className="input-com" name="address" value={props.value.address} onChange={props.onChangeValue} />
                    </div>
                </div>
                <div className="col-50">
                    <div className="col-25" style={{ textAlign: "center" }}>
                        <label>District</label>
                    </div>
                    <div className="col-75">
                        <input type="text" className="input-com" name="district" value={props.value.district} onChange={props.onChangeValue} />
                    </div>
                </div>

            </div>
            <div className="row">
                <div className="col-50">
                    <div className="col-25">
                        <label>Age</label>
                    </div>
                    <div className="col-75">
                        <input type="text" className="input-com" name="age" value={props.value.age} onChange={props.onChangeValue} onBlur={props.formobj.handleBlur} />
                        {props.formobj.touched.age && props.formobj.errors.age ? <div className="error">* {props.formobj.errors.age}</div> : null}
                    </div>
                </div>
                <div className="col-50">
                    <div className="col-25" style={{ textAlign: "center" }}>
                        <label>Gender</label>
                    </div>
                    <div className="col-75">
                        <select name="gender" value={props.value.gender} onChange={props.onChangeValue}>
                            <option>Male</option>
                            <option>Female</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-30">
                    <label>Phone No. *</label>
                </div>
                <div className="col-70">
                    <input type="text" className="input-com" name="phno" value={props.value.phno} onChange={props.onChangeValue} onBlur={props.formobj.handleBlur} />
                    {props.formobj.touched.phno && props.formobj.errors.phno ? <div className="error">* {props.formobj.errors.phno}</div> : null}
                </div>
            </div>
            <div className="row">
                <div className="col-30">
                    <label>Refer To Department 
                    </label>
                </div>
                <div className="col-70">
                    <select name="refDept" value={props.value.refDept} onChange={props.onChangeValue}>
                        <option>Select Department</option>
                        <option>Physiotherapy</option>
                        <option>Speech And Hearing</option>
                        <option>Visual Impairment</option>
                        <option>Prosthetics/Orthotics</option>
                        <option>Occupational Therapy</option>
                        <option>Psychology</option>
                        <option>Aids And Appliances</option>

                    </select>
                    {props.formobj.errors.refDept ? <div className="error">* {props.formobj.errors.refDept}</div> : null}
                </div>

            </div>

        </div>

    );
}