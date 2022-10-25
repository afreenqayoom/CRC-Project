import React from 'react';
import { useState } from 'react';
import { useFormik } from 'formik';
import axios from '../../axios';
import Tablewidget from '../Widgets/Tablewidget';
import PatientHistory from '../PatientHistory/PatientHistory';
import Multiselectlist from '../Widgets/Multiselectlist';
import './Physiotherapy.css';
import * as FaIcons from 'react-icons/fa';
import Creatable from 'react-select/creatable';
import {toast} from 'react-toastify';
// import { ActionMeta, OnChangeValue } from 'react-select';
// import CreatableSelect from 'react-select/creatable';
// import { DiagnosisOption, diagnosisOptions } from './data';
export default function Physiotherapy() {
  const [flag, setflag] = useState(false);
  const [phistory, setphistory] = useState([]);
  const DiagnosisOption = [
    { value: "Cervical Spondylosis", label: "Cervical Spondylosis" },
    { value: "Lumbar Spondylosis", label: "Lumbar Spondylosis" },
    { value: "Cervical Brachialgia", label: "Cervical Brachialgia" },
    { value: "Lumbar Radiculopathy", label: "Lumbar Radiculopathy" },
    { value: "Intervertebral Disc Prolapse",label:"Intervertebral Disc Prolapse" },
    { value:"Sondylolisthesis" ,label:"Sondylolisthesis"},
    { value:"Spondylolysis" ,label:"Spondylolysis" },
    { value:"Colles Fracture" ,label: "Colles Fracture"},
    { value:"Fracture Shaft of Femur" ,label:"Fracture Shaft of Femur" },
    { value:"Fracture Humerus" ,label: "Fracture Humerus"},
    {value:"Fracture",label:"Fracture"},
    {value:"Trauma",label:"Trauma"},
    {value:"Soft Tissue Injury",label:"Soft Tissue Injury"},
    {value:"Stiffness",label:"Stiffness"},
    {value:"Deformity",label:"Deformity"},
    {value:"Burn",label:"Burn"},
    {value:"Wound",label:"Wound"},
    {value:"Pressure",label:"Pressure"},
    { value:"Supracondylar Fracture" ,label: "Supracondylar Fracture"},
    { value: "Olecranon Fracture",label:"Olecranon Fracture" },
    { value: "Both Bone Fracture Upper Limb" ,label: "Both Bone Fracture Upper Limb"},
    { value: "Both Bone Fracture Lower Limb",label: "Both Bone Fracture Lower Limb"},
    { value:"Post Traumatic Elbow Stiffness" ,label:"Post Traumatic Elbow Stiffness" },
    { value: "Shoulder Stiffness" ,label: "Shoulder Stiffness" },
    { value: "ACL Reconstruction",label:"ACL Reconstruction" },
    { value:"Periarthritic Shoulder" ,label: "Periarthritic Shoulder"},
    {value:"Frozen Shoulder",label:"Frozen Shoulder"},
    {value:"Osteoarthritic Knees",label:"Osteoarthritic Knees"},
    {value:"Osteoarthritic Hip",label:"Osteoarthritic Hip"},
    {value:"Rheumatoid Arthritis",label:"Rheumatoid Arthritis"},
    {value:"Gouty Arthritis",label:"Gouty Arthritis"},
    {value: "Metatarsalgia",label: "Metatarsalgia"},
    {value:"Above Knee Amputation",label:"Above Knee Amputation"},
    {value:"Below Knee Amputation",label:"Below Knee Amputation"},
    {value:"Above Elbow Amputation",label:"Above Elbow Amputation"},
    {value: "Below Elbow Amputation",label: "Below Elbow Amputation"},
    {value:"Symes Amputation",label:"Symes Amputation"},
    {value:"Bilateral Knee Amputation",label:"Bilateral Knee Amputation"},
    {value:"Finger Amputation",label:"Finger Amputation"},
    {value:"Medial Meniscal Tear",label:"Medial Meniscal Tear"},
    {value:"TB Spine",label:"TB Spine"},
    {value:"Scoliosis",label:"Scoliosis"},
    {value:" Kyphoscoliosis",label:" Kyphoscoliosis"},
    {value:"CTEV",label:"CTEV"},
    {value:"Wry Neck",label:"Wry Neck"},
    {value: "Total Knee Replacement",label: "Total Knee Replacement"},
    {value:"Toal Hip Replacement",label:"Toal Hip Replacement"},
    {value:"Hemiarthroplasty",label:"Hemiarthroplasty"},
    {value:"Medial Epicondylitis",label:"Medial Epicondylitis"},
    {value:"Lateral Epicondylitis",label:"Lateral Epicondylitis"},
    {value:"Hallux Valgus",label:"Hallux Valgus"},
    {value:"Trigger Finger",label:"Trigger Finger"},
    {value:"Triger Thumb",label:"Triger Thumb"},
    {value:"Ape Thumb Deformity",label:"Ape Thumb Deformity"},
    {value:"Partial Claw Hand",label:"Partial Claw Hand"},
    {value:"Total Claw Hand",label:"Total Claw Hand"},
    {value:"Cubbitus Valgus",label:"Cubbitus Valgus"},
    {value:"Genu Valgum",label:"Genu Valgum"},
    {value:"Genu Varum",label:"Genu Varum"},
    {value:"Kock Knees",label:"Kock Knees"},
    {value:"Bow Legs",label:"Bow Legs"},
    {value:"R.Stroke",label:"R.Stroke"},
    {value: "L.Stroke",label: "L.Stroke"},
    {value:"Lt. Hemiplegia",label:"Lt. Hemiplegia"},
    {value: "Rt. Hemiplegia",label: "Rt. Hemiplegia"},
    {value:"Cerebral Palsy",label:"Cerebral Palsy"},
    {value:"Developmental Delay",label:"Developmental Delay"},
    {value:"Siezure Disorder",label:"Siezure Disorder"},
    {value:"Hydrocephalus",label:"Hydrocephalus"},
    {value:"Mental Retardation",label:"Mental Retardation"},
    {value:"Downs Syndrome",label:"Downs Syndrome"},
    {value:"Turners Syndrome",label:"Turners Syndrome"},
    {value:"Paraplegia",label:"Paraplegia"},
    {value: "Quardriplegia",label: "Quardriplegia"},
    {value:"Monoplegia",label:"Monoplegia"},
    {value:"Bracial Plexus Injury",label:"Bracial Plexus Injury"},
    {value:"Erbs Paralysis",label:"Erbs Paralysis"},
    {value: "Carpal Tunnel Syndrome",label: "Carpal Tunnel Syndrome"},
    {value:"Foot Drop",label:"Foot Drop"},
    {value: "Post Polio Residual Paralysis",label: "Post Polio Residual Paralysis"},
    {value:"Gullian Barre Syndrome",label:"Gullian Barre Syndrome"},
    {value:"Duchenes Muscular Dystrophy",label:"Duchenes Muscular Dystrophy"},
    {value:"Scapulofascial Muscular Dystropy",label:"Scapulofascial Muscular Dystropy"},
    {value:"Spinal Muscular Atrophy",label:"Spinal Muscular Atrophy"},
    {value:"Cerebellar Ataxia",label:"Cerebellar Ataxia"},
    {value:"Parkinsons Disease",label:"Parkinsons Disease"},
    {value: "Multiple Sclerosis",label: "Multiple Sclerosis"},
    {value: "Wrisrt Drop",label: "Wrisrt Drop"},
    {value: "Crutch Paralysis",label: "Crutch Paralysis"}
 
  ];
  const TreatmentOption = [
    { value: "TENS", label: "TENS" },
    { value:  "Interferential Therapy", label:  "Interferential Therapy"},
    { value: "Ultrasonic Therapy", label: "Ultrasonic Therapy"},
    { value: "Lumbar Radiculopathy", label: "Lumbar Radiculopathy" },
    { value: 'Shortwave Diathermy', label: "Shortwave Diathermy" },
    { value: "Hydrocollator Pack", label: "Hydrocollator Pack" },
    { value: "Wax Bath", label: "Wax Bath" },
    { value: "Laser", label: "Laser" },
    { value: "Long Wave Diathermy", label:"Long Wave Diathermy" },
    { value: "Microwave Diathermy", label: "Microwave Diathermy" },
    {value:"Cervical Traction",label:"Cervical Traction"},
    {value: "Electric Stimulation",label: "Electric Stimulation"},
    {value: "Continous Passive Motion Exerciser",label: "Continous Passive Motion Exerciser"},
    {value: "Suspension Therapy",label: "Suspension Therapy"},
    {value:"Wobble Board Exerciser",label:"Wobble Board Exerciser"},
    {value: "Over Head Pulley",label: "Over Head Pulley"},
     {value:"Manual Mobilisation",label:"Manual Mobilisation"},
      {value:"Shoulder Wheel Exercise",label:"Shoulder Wheel Exercise"},
      {value: "Theraband Exercise",label:"Theraband Exercise"},
      {value: "Wall Bar Exercise",label:"Wall Bar Exercise"},
      {value: "Gait Training",label:"Gait Training"},
      {value: "Balance Exercise",label:"Balance Exercise"},
        {value:"Coordination Exercise",label:"Coordination Exercise"},
        {value: "Strengthening Exercise",label: "Strengthening Exercise"},
        {value: "Quadriceps Table",label: "Quadriceps Table"},
        {value:"Medicine Ball Exercise",label:"Medicine Ball Exercise"},
         {value:"Gym Ball Exercise",label:"Gym Ball Exercise"},
         {value: "MAT Exercise",label:"MAT Exercise"},
         {value:"Hand Exercise Table",label:"Hand Exercise Table"},
         {value:"Putty Exercise",label:"Putty Exercise"},
         {value: "Grip Exerciser",label: "Grip Exerciser"},
         {value: "Ankle Exerciser",label: "Ankle Exerciser"},
         {value: "Isometric Exercise Cervical",label:"Isometric Exercise Cervical"},
        {value:"Isometric Quadriceps Exercise",label:"Isometric Quadriceps Exercise"},
        {value: "Tilt Table",label:"Tilt Table"},
        {value: "Standing Frame Exercise",label:"Standing Frame Exercise"},
        {value: "Crutch Walking",label:"Crutch Walking"},
        {value: "Static Cycling",label:"Static Cycling"},
        {value: "Rowing Machiene Exercise",label:"Rowing Machiene Exercise"}
  ];
  const [diagnosisValue,setDiagnosisValue] = useState('');
  const [treatmentValue,setTreatmentValue]=useState('');
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
  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      borderBottom: '1px',
      color: state.isSelected ? 'white' : 'black',
      padding: 5
    })
  }
  
  
  const ServicesData = [
    {
      GroupTitle: "Supportive Services",
      ListItem: ["Speech And Hearing", "Prosthetics/Orthotics", "Psychology", "Aids And Appliances", "Occupational Therapy", "Visual Impairment","Rehabilitation Section"]
    }
  ]
  const [card1, showcard1] = useState(false);
  const [card2, showcard2] = useState(false);
  const [card3, showcard3] = useState(false);
  const theading1 = ["Diagnosis"];
  const theading2 = ["Treatment"];
  const [diagnosisdata, setdiagnosisdata] = useState([]);
  const [treatmentdata,settreatmentdata]=useState([]);
  const [dcounter, setdcounter] = useState(0);
  const [tcounter, settcounter] = useState(0);
  const addDiagnosis = (event) => {
   if(diagnosisValue.value){
   // event.preventDefault();
    const rowdata = { "Diagnosis": diagnosisValue.value};
    setdcounter(dcounter + 1);
    const tempdata = [...diagnosisdata, rowdata];
    setdiagnosisdata(tempdata);

   }
   
 
  
}
const addTreatment = (event) => {
  if(treatmentValue.value){
  // event.preventDefault();
   const rowdata = { "Treatment": treatmentValue.value};
   settcounter(tcounter + 1);
   const tempdata = [...treatmentdata, rowdata];
   settreatmentdata(tempdata);

  }
  

 
}
const deleteDrow = (index) => {

  let temp = 0;
  const temptable = diagnosisdata.filter((item, itemIndex) => {
      return itemIndex !== index
  })

  setdiagnosisdata(temptable);
 
  setdcounter(dcounter - 1);

}
const deleteTrow = (index) => {

  let temp = 0;
  const temptable = treatmentdata.filter((item, itemIndex) => {
      return itemIndex !== index
  })

  settreatmentdata(temptable);
 
  settcounter(tcounter - 1);

}
  const togglecard1 = () => {
    showcard2(false);
    showcard3(false);
    card1 ? showcard1(false) : showcard1(true);

  }
  const togglecard2 = () => {
    showcard1(false);
    showcard3(false);
    card2 ? showcard2(false) : showcard2(true);

  }
  const togglecard3 = () => {
    showcard1(false);
    showcard2(false);

    card3 ? showcard3(false) : showcard3(true);

  }
  const [historytoolbox, sethistorytoolbox] = useState(false);
  
  const toggleHistorytoolbox = () => {
    sethistorytoolbox(!historytoolbox);
    console.log("phistry on cl", phistory);
  };
  const current = new Date();
  const formatDate = current.getDate() < 10 ? `0${current.getDate()}` : current.getDate();
  const formatMonth = (current.getMonth() + 1) < 10 ? `0${current.getMonth() + 1}` : current.getMonth() + 1;
  const date = [current.getFullYear(), formatMonth, formatDate].join('-');
  const handleChange = (field, value) => {
    switch (field) {
      case 'DiagnosisOption':
        setDiagnosisValue(value)
        break
      case 'TreatmentOption':
      setTreatmentValue(value)
      break
      default:
        break
    }

  }

  const handleBlur = (e) => {
    formik.handleBlur(e);
    axios.post("getdetails", {
      REG_ID: formik.values.regId
    }).then((response) => {
      if (response.data !== 0) {
        formik.values.pname = response.data[0].Patient_Name;
        formik.values.address = response.data[0].Address;
        formik.values.age = response.data[0].Age;
      }
      else {
        formik.values.pname = "";
        formik.values.address = "";
        formik.values.age = "";
      }
    
    }).catch((error)=>{
      showToast(error.message,0);
      })
   
    axios.post("getpatienthistory", {
      REG_ID: formik.values.regId
    }).then((response) => {
      console.log("respo", response.data);
      response.data.forEach(element => {
        if (element !== null)
          console.log(element);
        // setphistory(response.data);
      });
      setphistory(response.data);


      //this event is called to refresh page
      //formik.handleBlur(e);
      console.log("phistory", phistory);
    }).catch((error)=>{
      showToast(error.message,0);
      })
    axios.post("getptype", {
      REG_ID: formik.values.regId,
      DATED: formik.values.dated
    }).then((response) => {
      if (response.data !== 0) {
        formik.values.ptype = response.data[0].Patient_Type;
      }
      else {
        formik.values.ptype = ""
      }
      //this event is called to refresh page
      formik.handleBlur(e);
    }).catch((error)=>{
      showToast(error.message,0);
      })

  }
  const physioregister = () => {
    axios.post("physioregister", {
      REG_ID: formik.values.regId,
      PTYPE: formik.values.ptype,
      DATED: formik.values.dated,
      CONDITION_TYPE:formik.values.conditionType,
      CONDITIONS: formik.values.condition.toString(),
      TREATMENTS: formik.values.treatment.toString(),
      SERVICES: formik.values.services.toString(),
      REMARKS: formik.values.remarks
    }).then((response) => {
      if (response.data === 1) {
        showToast("Saved Successfully...",1);
       
        formik.resetForm();
      }
      
    }).catch((error)=>{
      showToast(error.message,0);
      })
  }
  const [initialValues, setinitialValues] = useState({
    regId: "",
    dated: date,
    pname: '',
    ptype: '',
    address: '',
    age: '',
    conditionType:'Orthopedic',
    condition: [],
    treatment: [],
    services: [],
    remarks: ''

  })
  const validate = values => {
    let errors = {};
    if (values.regId === '')
      errors.regId = "Required";
    else if (isNaN(values.regId))
      errors.regId = "Invalid RegistrationID";
    if (values.pname === '' && values.regId !== '')
      errors.regId = "Registration No. doesn't exist"
    if (values.ptype === '' && values.regId !== '')
      errors.ptype = "Patient need to register for today"
    return errors;
  }
  const onSubmit = (values, { resetForm }) => {
    console.log("Diag",diagnosisdata);
    console.log("Treat",treatmentdata);
    values.condition=[];
    values.treatment=[];
    // values.services=[];
    diagnosisdata.forEach(element => {
      values.condition.push(element.Diagnosis);
   });
   treatmentdata.forEach(element => {
    values.treatment.push(element.Treatment);
 }); 
    console.log("Form values", values);
   physioregister();
   setdiagnosisdata([]);
   settreatmentdata([]);
    setflag(true);
    resetForm({ values: '' });
  }
  const formik = useFormik({
    initialValues,
    validate,
    onSubmit,
    enableReinitialize: true
  });
  return (
    <div className="Physiotherapy-Container">

      <div className="input-boxes">
        <form id="physio" onSubmit={formik.handleSubmit}>
          <div className="row">
            <div className="col-50">
              <div className="col-25">
                <label>Registration Id</label>
              </div>
              <div className="col-75">
                <input type="text" className="input-com" name="regId" value={formik.values.regId} onChange={formik.handleChange} onBlur={e => { handleBlur(e) }} />
                {formik.touched.regId && formik.errors.regId ? <div className="error">* {formik.errors.regId}</div> : null}
              </div>
            </div>
            <div className="col-50">
              <div className="col-25" style={{ textAlign: "center" }}>
                <label>Date</label>
              </div>
              <div className="col-75">
                <input type="date" className="input-com" name="dated" value={formik.values.dated} onChange={formik.handleChange} />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-50">
              <div className="col-25">
                <label>Patient Name</label>
              </div>
              <div className="col-75">
                <input type="text" disabled className="input-com" name="pname" value={formik.values.pname} onChange={formik.handleChange} />
              </div>
            </div>
            <div className="col-50">
              <div className="col-25" style={{ textAlign: "center" }}>
                <label>Patient Type</label>
              </div>
              <div className="col-75">
                <input type="text" disabled className="input-com" name="ptype" value={formik.values.ptype} onChange={formik.handleChange} />
                {formik.touched.regId && formik.errors.ptype ? <div className="error">* {formik.errors.ptype}</div> : null}
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-50">
              <div className="col-25">
                <label>Address</label>
              </div>
              <div className="col-75">
                <input type="text" className="input-com" disabled name="address" value={formik.values.address} onChange={formik.handleChange} />
              </div>
            </div>
            <div className="col-50">
              <div className="col-25" style={{ textAlign: "center" }}>
                <label>Age</label>
              </div>
              <div className="col-75">
                <input type="text" className="input-com" disabled name="age" value={formik.values.age} onChange={formik.handleChange} />
              </div>
            </div>
          </div>

          <section className="createcont" style={{ minHeight: "auto" }}>
            <div className="acc-cont">
              <div className="acc-body">
                <div className={card1 ? "card opencard" : "card"}>
                  <div className="card-header" onClick={togglecard1}>
                    <button type="button">Diagnosis</button>
                    <div className="icon">
                      {card1 ? <FaIcons.FaMinus /> : <FaIcons.FaPlus />}
                    </div>
                  </div>
                  <div className="collapse-reg" id="collapse1">
                    <div className="card-content">
                      <div className="row" style={{ justifyContent: "center",padding:"0" }}>

                        <div className="col-20" >
                          <label>Condition Type</label>
                        </div>
                        <div className="col-60">
                          <select name="conditionType" value={formik.values.conditionType} onChange={formik.handleChange}>
                            <option>Orthopedic</option>
                            <option>Neurological</option>
                          
                          </select>



                        </div>
                        <div className="col-20" >
                        </div>

                      </div>
                      <div className="row" style={{ justifyContent: "center",padding:"0"}}>

                        <div className="col-20" >
                          <label>Prov.Diagnosis</label>
                        </div>
                        <div className="col-60">
                          <Creatable
                            isClearable
                            onChange={(value) => handleChange('DiagnosisOption', value)}
                            options={DiagnosisOption}
                            value={diagnosisValue}
                            styles={customStyles}
                          />
                          {console.log("sValue", diagnosisValue)}


                        </div>
                        <div className="col-20" style={{ textAlign: "center" }}>
                          <button type="button" className="btn" style={{ width: "50px" }} onClick={addDiagnosis}>+</button>
                        </div>

                      </div>
                      <div className="row" style={{ marginBottom: "20px" }}>
                <Tablewidget data={diagnosisdata} theading={theading1} color='#7d2ae8' action={true} autoincrement={true} deleteRow={deleteDrow} />

            </div>

                    </div>
                  </div>
                </div>
                <div className={card2 ? "card opencard" : "card"}>
                  <div className="card-header" onClick={togglecard2}>
                    <button type="button">Treatments</button>
                    <div className="icon">
                      {card2 ? <FaIcons.FaMinus /> : <FaIcons.FaPlus />}
                    </div>
                  </div>
                  <div className="collapse-reg"  id="collapse2">
                    <div className="card-content">
                      <div className="row" style={{ justifyContent: "center",padding:"0" }}>

                        <div className="col-20" >
                          <label>Treatment</label>
                        </div>
                        <div className="col-60">
                          <Creatable
                            isClearable
                            onChange={(value) => handleChange('TreatmentOption',value)}
                            options={TreatmentOption}
                            value={treatmentValue}
                            styles={customStyles}
                          />
                          {console.log("tValue", treatmentValue)}
                          </div>
                          <div className="col-20" style={{ textAlign: "center" }}>
                          <button type="button" className="btn" style={{ width: "50px" }} onClick={addTreatment}>+</button>
                        </div>
                        

                      </div>
                      <div className="row ">
                        {/* <div className="col-33" style={{ height: "420px" }}> */}
                        <Tablewidget data={treatmentdata} theading={theading2} color='#7d2ae8' action={true} autoincrement={true} deleteRow={deleteTrow} />
                        {/* </div> */}
                      </div>
                    </div>
                  </div>
                </div>
                <div className={card3 ? "card opencard" : "card"}>
                  <div className="card-header" onClick={togglecard3}>
                    <button type="button">Supportive Services</button>
                    <div className="icon">
                      {card3 ? <FaIcons.FaMinus /> : <FaIcons.FaPlus />}
                    </div>
                  </div>
                  <div className="collapse-reg"  id="collapse3">
                    <div className="card-content">

                      <div className="row ">
                        {/* <div className="col-33" style={{ height: "420px" }}> */}
                        <Multiselectlist  listData={ServicesData} name="services" value={formik.values.services} flag={flag} setflag={setflag} />
                        {/* </div> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* <div className="row smallrow">
            <div className="col-33" style={{ height: "420px" }}>
              <Multiselectlist listTitle="Clinical Conditions" grouped={true} listData={listData} name="condition" value={formik.values.condition} flag={flag} setflag={setflag} />
            </div>
            <div className="col-33" style={{ height: "420px" }}>
              <Multiselectlist listTitle="Treatments/Services" listData={TreatData} name="treatment" value={formik.values.treatment} flag={flag} setflag={setflag} /></div>
            <div className="col-33" style={{ height: "420px" }}>
              <Multiselectlist listTitle="Supportive Services" listData={ServicesData} name="services" value={formik.values.services} flag={flag} setflag={setflag} />
            </div>
          </div> */}
          <div className="row">
            <div className="col-30">
              <label>Remarks</label>
            </div>
            <div className="col-70">
              <textarea rows="4" className="input-com" name="remarks" value={formik.values.remarks} onChange={formik.handleChange}>
              </textarea>
            </div>
          </div>
          {/*  */}
        </form>
        <div className="row " style={{ justifyContent: "center" }}>
          <button type="submit" form="physio" className="btn" style={{ width: "150px", margin: '10px 0 40px 0' }}>Save</button>
        </div>
                                             
      </div>
      <div
        className={
          historytoolbox ? 'history-toolbox-container open' : 'history-toolbox-container'
        }
      >
        <div className="history-toolbox" onClick={toggleHistorytoolbox}>
          <span className="history-toolbox-span"> <i><FaIcons.FaHistory /></i></span>
        </div>
        <PatientHistory regId={formik.values.regId} historydata={phistory} />
      </div>

    </div >
  )
}