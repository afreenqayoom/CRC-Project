import React from 'react';
import './Patientreg.css';
import { useState } from 'react';
import Register from '../Register/Register';
import Addondet from '../Addondet/Addondet';
import { useFormik } from 'formik';
import axios from '../../axios';
import * as FaIcons from 'react-icons/fa';
import RegisterPrint from '../Printing/RegisterPrint';
import {useRef} from 'react';
import ReactToPrint from 'react-to-print';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogContentText from '@material-ui/core/DialogContentText';
import {toast} from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import {
    submitAction
  } from '../Redux/action';
  import { connect } from 'react-redux';

 function Patientreg(props) {
    const componentRef=useRef();
    var disabilityv, disabilityPartsv, rehabv;
    const current = new Date();
    const formatDate = current.getDate() < 10 ? `0${current.getDate()}` : current.getDate();
    const formatMonth = (current.getMonth() + 1) < 10 ? `0${current.getMonth() + 1}` : current.getMonth() + 1;
    const date = [current.getFullYear(), formatMonth, formatDate].join('-');
    const [card1, showcard1] = useState(true);
    const [card2, showcard2] = useState(false);
    const [regcomp, setregcomp] = useState();
    const [editcomp,seteditcomp]=useState();
    const [ptypecomp,setptypecomp]=useState();
    const [isfollowup, setfollowup] = useState(false);
    const [isedit,setedit]=useState(false);
   
    const [open,setopen]=useState(false);
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
    const handleClose=()=>{
        setopen(false);
    }

    const getregId = () => {

        axios.get("getregid").then((response) => {
            var rid;
            //start with regId what they tell you 

            if (response.data[0].Registration_ID === null)
                rid = "";
            else
                rid = (response.data[0].Registration_ID) + 1;

            setinitialValues({ ...initialValues, regId: rid, ptype: "New Patient" });
        }).catch((error)=>{
            showToast(error.message,0);})

    }
    const clearregId = () => {
        setinitialValues({ ...initialValues, regId: "", ptype: "Follow Up" });
    }
    const togglecard1 = () => {
        showcard2(false);
        card1 ? showcard1(false) : showcard1(true);
    }
    const togglecard2 = () => {
        showcard1(false);
        card2 ? showcard2(false) : showcard2(true);
    }
    React.useEffect(() => {
        getregId();
    }, [])
    //
    const patientregister = () => {
        axios.post("registration", {
            PATIENT_TYPE: formik.values.ptype,
            REG_ID: formik.values.regId,
            QUALIFICATION: formik.values.qualification,
            REG_FEE: formik.values.regfee,
            REG_DATE: formik.values.regDate,
            PATIENT_NAME: formik.values.pname,
            PARENTAGE: formik.values.parentage,
            CATEGORY: formik.values.category,
            ADDRESS: formik.values.address,
            DISTRICT: formik.values.district,
            AGE: formik.values.age,
            GENDER: formik.values.gender,
            PHONE_NO: formik.values.phno,
            REFDEPT: formik.values.refDept,
            RELIGION: formik.values.religion,
            CASTE: formik.values.caste,
            MARTIAL: formik.values.martial,
            MARTIAL_CHANGE: formik.values.martialchange,
            OCCUPATION: formik.values.occupation,
            OCC_CHANGE: formik.values.occupationchange,
            FAMILY_OCC: formik.values.familyoccupation,
            INCOME: formik.values.income,
            INCOME_CHANGE: formik.values.incomechange,
            DISABILITY_CAUSE: formik.values.disabilitycause,
            DISABILITY_TYPE: formik.values.disabilitytype,
            FAM_DISABLE: formik.values.familydisabled,
            TOTAL_FAM: formik.values.totalfamily,
            TOTAL_DISABLED: formik.values.totaldisabled,
            DISABILITY: disabilityv,
            DISABILITY_PARTS: disabilityPartsv,
            REHAB: rehabv,
            FOLLOWUP: isfollowup,
            EDIT:isedit

        }).then((response) => {

            if (response.data === 0) {
                  

            }
            else if(response.data===-1)
            {
               
                showToast("Details Updated Successfuly!!",1);
                setopen(true);
            }
            else if(response.data===-2)
            showToast("No such record to be edited..",0);
            else {
                showToast("Registration Successfull!!",1);
                setopen(true);
                formik.resetForm();
            }
           
        }).catch((error)=>{
            showToast(error.message,0);
            })

    };

    const [initialValues, setinitialValues] = useState({
        ptype: 'New Patient',
        regId: "",
        regfee: '10',
        regDate: date,
        pname: '',
        parentage: '',
        category: 'General',
        address: '',
        district: '',
        age: '',
        gender: 'Male',
        phno: '',
        refDept: '',
        qualification: 'None',
        religion: 'None',
        caste: 'None',
        martial: 'None',
        martialchange: 'None',
        occupation: 'None',
        occupationchange: 'None',
        familyoccupation: 'None',
        income: 'None',
        incomechange: 'None',
        disabilitycause: 'None',
        disabilitytype: 'None',
        familydisabled: 'No',
        totalfamily: '',
        totaldisabled: '',
        disability: [],
        disabilityParts: [],
        rehab: []

    })
    const onSubmit = (values) => {
        // setopen(true);
        submitAction(values);
        disabilityv = values.disability.toString();
        disabilityPartsv = values.disabilityParts.toString();
        rehabv = values.rehab.toString();
        console.log("Form values", values);
       console.log("r",rehab);
        patientregister();
        getregId();
        regcomp.disabled = "true";
        editcomp.checked=false;
        ptypecomp.disabled="";
        setfollowup(false);
        setedit(false);
        getregId();
       
    }
    const validate = values => {
        let errors = {};
        if (values.regfee === '')
            values.regfee = 0;
        else if (isNaN(values.regfee))
            errors.regfee = "Invalid Fee";
        if (values.regId === '')
            errors.regId = "Required";
        else if (isNaN(values.regId))
            errors.regId = "Invalid RegistrationID";
        if (values.pname === '')
            errors.pname = "Required";
        if (values.age === '')
            values.age = 0;
        else if (isNaN(values.age))
            errors.age = "Invalid Age";
        if (values.phno === '')
            errors.phno = "Required";
        else if (isNaN(values.phno))
            errors.phno = "Invalid Phone No";
        if (values.totalfamily === '')
            values.totalfamily = 0;
        else if (isNaN(values.totalfamily))
            errors.totalfamily = "Invalid Total Family No.";
        if (values.totaldisabled === '')
            values.totaldisabled = 0;
        else if (isNaN(values.totaldisabled))
            errors.totaldisabled = "Invalid Total Disabled No.";
        if(!isedit)
        {
        if (!values.refDept || values.refDept==="Select Department") {
            errors.refDept = "Required"
        }
    }

        return errors;
    }
    const formik = useFormik({
        initialValues,
        onSubmit,
        validate,
        enableReinitialize: true

    });

    const { regId,
        regDate,
        pname,
        parentage,
        category,
        address,
       district,
        age,
        gender,
        phno,
        qualification,
        religion,
       caste,
        martial,
       martialchange,
        occupation,
        occupationchange,
        familyoccupation,
        income,
        incomechange,
       disabilitycause,
       disabilitytype,
       familydisabled,
       totalfamily,
       totaldisabled,
       disability,
      disabilityParts,
        rehab
     ,submitAction}=props;
    return (

        <section className="createcont">
            <div className="acc-cont">

                <div className="head">
                    <h2>Patient Registration</h2>
                </div>
                <div className="acc-body">
                    <form id="patient" onSubmit={formik.handleSubmit}>
                        <div className={card1 ? "card opencard" : "card"}>

                            <div className="card-header" onClick={togglecard1}>
                                <button type="button">Patient Details</button>
                                <div className="icon">
                                {card1 ? <FaIcons.FaMinus/> :<FaIcons.FaPlus/>}
                                </div>
                            </div>
                            <div className="collapse-reg" id="collapse1">
                                <div className="card-content">

                                    <Register value={formik.values} onChangeValue={formik.handleChange} formobj={formik} clearregId={clearregId} getregId={getregId} setregcomp={setregcomp} seteditcomp={seteditcomp} setptypecomp={setptypecomp} setfollowup={setfollowup} setedit={setedit}/>

                                </div>
                            </div>
                        </div>
                        <div className={card2 ? "card opencard" : "card"}>

                            <div className="card-header" onClick={togglecard2}>
                                <button type="button">Add-On Details</button>
                                <div className="icon">
                                {card2 ? <FaIcons.FaMinus/> :<FaIcons.FaPlus/>}
                                </div>
                            </div>
                            <div className="collapse-reg" id="collapse2">
                                <div className="card-content">
                                    <Addondet value={formik.values} onChangeValue={formik.handleChange} formobj={formik} />
                                </div>
                            </div>
                        </div>
                    </form>
                </div>

                <button type="submit" className="btn" form="patient" style={{ width: "150px", margin: '10px 0 40px 0' }}>Save</button>
               
               
                    {/* <ReactToPrint
                        trigger={() => <i className="btn" style={{fontSize:"24px", width:"40px"}}><FaIcons.FaPrint /></i>}
                        content={() => componentRef.current}
                        documentTitle={"PatientRegister"}
                    /> */}
            <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Print</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Do you want to Print ?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <button className="btn" onClick={handleClose}>Cancel</button>
                <ReactToPrint
                        trigger={() => <button className="btn" autofocus>Print</button>}
                        content={() => componentRef.current}
                        documentTitle={"Patient Register"}
                    />
            </DialogActions>
            </Dialog>
                <div className="Print" style={{height:"0px",visibility:"hidden"}}>
                
                {/* <RegisterPrint value={value} ref={componentRef}/></div> */}
                <RegisterPrint regId={regId} regDate={regDate} pname={pname}
        parentage={parentage}
        category={category}
        address={address}
       district={district}
        age={age}
        gender={gender}
        phno={phno}
        qualification={qualification}
        religion={religion}
       caste={caste}
        martial={martial}
       martialchange={martialchange}
        occupation={occupation}
        occupationchange={occupationchange}
        familyoccupation={familyoccupation}
        income={income}
        incomechange={incomechange}
       disabilitycause={disabilitycause}
       disabilitytype={disabilitytype}
       familydisabled={familydisabled}
       totalfamily={totalfamily}
       totaldisabled={totaldisabled}
       disability={disability}
      disabilityParts={disabilityParts}
        rehab={rehab} ref={componentRef}/></div>
            </div>

        </section>
    );
    
 }
const mapStateToProps = (state) => ({

   regId:state.regId,
   regDate:state.regDate,
   pname:state.pname,
   parentage:state.parentage,
   category:state.category,
   address:state.address,
   district:state.district,
   age:state.age,
   gender:state.gender,
   phno:state.phno,
   qualification:state.qualification,
   religion:state.religion,
   caste:state.caste,
   martial:state.martial,
   martialchange:state.martialchange,
   occupation:state.occupation,
   occupationchange:state.occupationchange,
   familyoccupation:state.familyoccupation,
   income:state.income,
   incomechange:state.incomechange,
   disabilitycause:state.disabilitycause,
   disabilitytype:state.disabilitytype,
   familydisabled:state.familydisabled,
   totalfamily:state.totalfamily,
   totaldisabled:state.totaldisabled,
   disability:state.disability,
   disabilityParts:state.disabilityParts,
   rehab:state.rehab



  });
  
  const mapDispatchToProps = (dispatch) => ({
    submitAction: (data) => dispatch(submitAction(data))})
    export default connect(mapStateToProps, mapDispatchToProps)(Patientreg);