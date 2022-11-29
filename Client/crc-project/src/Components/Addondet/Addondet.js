import React from 'react';
import { useState, useRef, useEffect } from 'react';
export default function Addondet(props) {
    const [expanded, setexpand] = useState(false);
    const[expanded1,setexpand1]=useState(false);
    const ref = useRef();
    const ref1=useRef();
    useEffect(() => {
        const checkIfClickedoutside = e => {
            if (expanded && ref.current && !ref.current.contains(e.target)) {
                setexpand(false);
                showmultiselect();
            }
            if(expanded1 && ref1.current && !ref1.current.contains(e.target)){
                setexpand1(false);
                showmultiselect1();
            }
        }
        document.addEventListener("mousedown", checkIfClickedoutside)
        return () => {
            document.removeEventListener("mousedown", checkIfClickedoutside)
        }

    },[expanded,expanded1])
    React.useEffect(()=>{
        const rehab=document.querySelectorAll('input[name="rehab"]');
        rehab.forEach(element=>{
            element.checked=false;
        })
        rehab.forEach(element => {
            (props.value.rehab).map((item=>{
                
              if(element.value===item)
              {
                  
                  element.checked=true;
              }
        
            }))
         
       });

        
    },[props.value.rehab]);
    const showmultiselect = (p) => {
      const multiselect=document.querySelectorAll(".multi-select")[1]; 
      const disability=document.querySelectorAll('input[name="disability"]');
      disability.forEach(element=>{
        element.checked=false;
    })
        if (!expanded) {
            multiselect.style.display = "block";
            setexpand(true);
            disability.forEach(element => {
                (p.value.disability).map((item=>{
                  if(element.value===item)
                  {
                      element.checked=true;
                  }
                  
                }))
             
           });
        }
        else {
            multiselect.style.display = "none";
            setexpand(false);

        }
      

    }
    const showmultiselect1 = (p) => {
        const multiselect=document.querySelectorAll(".multi-select")[0]; 
        const genchk=document.querySelectorAll('input[name="disabilityParts"]');
        genchk.forEach(element=>{
            element.checked=false;
        })
          if (!expanded1) {
              multiselect.style.display = "block";
              setexpand1(true);
              genchk.forEach(element => {
                (p.value.disabilityParts).map((item=>{
                  if(element.value===item)
                  {
                      element.checked=true;
                  }
                }))
             
           });
          }
          else {
              multiselect.style.display = "none";
              setexpand1(false);
          }
         
  
      }
    const handleClick=(e)=>{
        let rehab=document.querySelectorAll('input[name="rehab"]:checked');
       
         props.value.rehab=[];
        rehab.forEach(element => {
            props.value.rehab.push(element.value);
         });
        
        
    }
    const handleDisability=(e)=>{
        let disability=document.querySelectorAll('input[name="disability"]:checked');
        //props.value.props.name =[];
         props.value.disability=[];
        disability.forEach(element => {
            props.value.disability.push(element.value);
         });    
    }
    const handleDisabilityParts=(e)=>{
        let disabilityParts=document.querySelectorAll('input[name="disabilityParts"]:checked');
       
       props.value.disabilityParts=[];
       //console.log("dp bef",props.value.disabilityParts);
       disabilityParts.forEach(element => {
           props.value.disabilityParts.push(element.value);
        });
        //console.log("dp",props.value.disabilityParts);

    }
    return (
        
            <div className="input-boxes">
                <div className="row">
                    <div className="col-30">
                        <label>Educational Qualification</label>
                    </div>
                    <div className="col-70">
                        <select name="qualification" value={props.value.qualification} onChange={props.onChangeValue}>
                            <option>None</option>
                            <option>Illiterate</option>
                            <option>Upto Class 5</option>
                            <option>Upto Class 8</option>
                            <option>Matriculation</option>
                            <option>Higher Secondary</option>
                            <option>Above</option>
                        </select>
                    </div>
                </div>
                <div className="row">
                    <div className="col-50">
                        <div className="col-25">
                            <label>Religion</label>
                        </div>
                        <div className="col-75">
                            <select name="religion" value={props.value.religion} onChange={props.onChangeValue}>
                                <option>None</option>
                                <option>Muslim</option>
                                <option>Hindu</option>
                                <option>Sikh</option>
                                <option>Christan</option>
                                <option>Other</option>
                            </select>

                        </div>
                    </div>
                    <div className="col-50">
                        <div className="col-25" style={{textAlign:"center"}}>
                            <label>Caste</label>
                        </div>
                        <div className="col-75">
                            <select name="caste" value={props.value.caste} onChange={props.onChangeValue}>
                                <option>None</option>
                                <option>SC</option>
                                <option>ST</option>
                                <option>OBC</option>
                                <option>Other</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-30">
                        <label>Martial Status</label>
                    </div>
                    <div className="col-70">
                        <select name="martial" value={props.value.martial} onChange={props.onChangeValue}>
                            <option>None</option>
                            <option>Single</option>
                            <option>Married</option>
                            <option>Widow</option>
                            <option>Separate</option>
                            <option>Widower</option>
                        </select>
                    </div>
                </div>
                <div className="row">
                    <div className="col-30">
                        <label>Change in Martial Status After Disability</label>
                    </div>
                    <div className="col-70">
                        <select name="martialchange" value={props.value.martialchange} onChange={props.onChangeValue}>
                            <option>None</option>
                            <option>No Change</option>
                            <option>Separate</option>
                            <option>Divorced</option>
                        </select>
                    </div>
                </div>

                <div className="row">
                    <div className="col-30">
                        <label>Occupation Before Disability</label>
                    </div>
                    <div className="col-70">
                        <select name="occupation" value={props.value.occupation} onChange={props.onChangeValue}>
                            <option>None</option>
                            <option>Service</option>
                            <option>Business</option>
                            <option>Agriculture</option>
                            <option>Daily Labour</option>
                            <option>Skilled Worker</option>
                            <option>Unemployed</option>
                        </select>
                    </div>
                </div>
                <div className="row">
                    <div className="col-30">
                        <label>Occupation After Disability</label>
                    </div>
                    <div className="col-70">
                        <select name="occupationchange" value={props.value.occupationchange} onChange={props.onChangeValue}>
                            <option>None</option>
                            <option>Service</option>
                            <option>Business</option>
                            <option>Agriculture</option>
                            <option>Daily Labour</option>
                            <option>Skilled Worker</option>
                            <option>Unemployed</option>
                            <option>Other</option>
                        </select>

                    </div>
                </div>
                <div className="row">
                    <div className="col-30">
                        <label>Family Occupation</label>
                    </div>
                    <div className="col-70">
                        <select name="familyoccupation" value={props.value.familyoccupation} onChange={props.onChangeValue}>
                            <option>None</option>
                            <option>Service</option>
                            <option>Business</option>
                            <option>Agriculture</option>
                            <option>Daily Labour</option>
                            <option>Skilled Worker</option>
                            <option>Other</option>
                        </select>

                    </div>
                </div>
                <div className="row">
                    <div className="col-50">
                        <div className="col-25">
                            <label>Monthly Income Before Disability</label>
                        </div>
                        <div className="col-75">
                            <select name="income" value={props.value.income} onChange={props.onChangeValue}>
                                <option>None</option>
                                <option>Less than 1000</option>
                                <option>Between 1000-3000</option>
                                <option>Between 3000-5000</option>
                                <option>Above 5000</option>

                            </select>
                        </div>
                    </div>
                    <div className="col-50">
                        <div className="col-25" style={{textAlign:"center"}}>
                            <label>Monthly Income After Disability</label>
                        </div>
                        <div className="col-75">
                            <select name="incomechange" value={props.value.incomechange} onChange={props.onChangeValue}>
                                <option>None</option>
                                <option>Less than 1000</option>
                                <option>Between 1000-3000</option>
                                <option>Between 3000-5000</option>
                                <option>Above 5000</option>

                            </select>
                        </div>
                    </div>

                </div>
                <div className="row">
                    <div className="col-50">
                        <div className="col-25">
                            <label>Cause of Disability</label>
                        </div>
                        <div className="col-75">
                            <select name="disabilitycause" value={props.value.disabilitycause} onChange={props.onChangeValue}>
                                <option>None</option>
                                <option>Disease</option>
                                <option>Accident</option>
                                <option>Since Birth</option>
                                <option>Other</option>

                            </select>
                        </div>
                    </div>
                    <div className="col-50">
                        <div className="col-25" style={{textAlign:"center"}}>
                            <label>Type Of Disability</label>
                        </div>
                        <div className="col-75">
                            <select name="disabilitytype" value={props.value.disabilitytype} onChange={props.onChangeValue}>
                                <option>None</option>
                                <option>Locomotor</option>
                                <option>Speech/Hearing</option>
                                <option>Visual Impairment</option>
                                <option>Mentally Retarded</option>
                                <option>Multiple</option>
                            </select>
                        </div>
                    </div>

                </div>
                <div className="row" style={{alignItems:"flex-start"}}>
                    <div className="col-30">
                        <label>Part Of Body Affected</label>
                    </div>
                    <div className="col-70">
                    <div className="selectboxcontainer" ref={ref1}>
                            <div className="selectbox" onClick={e=>showmultiselect1(props)}>
                                <select>
                                    <option>Parts Affected</option>
                                </select>
                                <div className="overselect"></div>
                            </div>
                            {/* onclick event changed to onchange for testing */}
                            <div className="multi-select">
                                 <label htmlFor="op1">
                                    <input type="checkbox" id="op1" name="disabilityParts" value="Left Lower Limb" onChange={handleDisabilityParts}/> Left Lower Limb</label>
                                    <label htmlFor="op2">
                                    <input type="checkbox" id="op2" name="disabilityParts" value="Right Lower Limb" onChange={handleDisabilityParts}/> Right Lower Limb</label>
                                    <label htmlFor="op3">
                                    <input type="checkbox" id="op3" name="disabilityParts" value="Both Lower Limbs" onChange={handleDisabilityParts}/> Both Lower Limbs</label>
                                    <label htmlFor="op4">
                                    <input type="checkbox" id="op4" name="disabilityParts" value="Left Upper Limb" onChange={handleDisabilityParts}/> Left Upper Limb</label>
                                    <label htmlFor="op5">
                                    <input type="checkbox" id="op5" name="disabilityParts" value="Right Upper Limb" onChange={handleDisabilityParts}/> Right Upper Limb</label>
                                    <label htmlFor="op6">
                                    <input type="checkbox" id="op6" name="disabilityParts" value="Both Upper Limbs" onChange={handleDisabilityParts}/> Both Upper Limbs</label>
                                    <label htmlFor="op7">
                                    <input type="checkbox" id="op7" name="disabilityParts" value="Trunk Weakness" onChange={handleDisabilityParts}/> Trunk Weakness</label>
                                    <label htmlFor="op8">
                                    <input type="checkbox" id="op8" name="disabilityParts" value="Trunk Deformity" onChange={handleDisabilityParts}/> Trunk Deformity</label>
                                    <label htmlFor="op9">
                                    <input type="checkbox" id="op9" name="disabilityParts" value="Left Eye" onChange={handleDisabilityParts}/> Left Eye</label>
                                    <label htmlFor="op10">
                                    <input type="checkbox" id="op10" name="disabilityParts" value="Right Eye" onChange={handleDisabilityParts}/> Right Eye</label>
                                    <label htmlFor="op11">
                                    <input type="checkbox" id="op11" name="disabilityParts" value="Both Eyes" onChange={handleDisabilityParts}/> Both Eyes</label>
                                    <label htmlFor="op12">
                                    <input type="checkbox" id="op12" name="disabilityParts" value="Left Ear" onChange={handleDisabilityParts}/> Left Ear</label>
                                    <label htmlFor="op13">
                                    <input type="checkbox" id="op13" name="disabilityParts" value="Right Ear" onChange={handleDisabilityParts}/> Right Ear</label>
                                    <label htmlFor="op14">
                                    <input type="checkbox" id="op14" name="disabilityParts" value="Both Ears" onChange={handleDisabilityParts}/> Both Ears</label>
                                    <label htmlFor="op15">
                                    <input type="checkbox" id="op15" name="disabilityParts" value="Mental Retardation" onChange={handleDisabilityParts}/> Mental Retardation</label>
               </div>

                        </div>
                        
                    </div>
                </div>
                <div className="row" style={{alignItems:"flex-start"}}>
                    <div className="col-30">
                        <label>Disability Effect</label>
                    </div>
                    <div className="col-70">

                        <div className="selectboxcontainer" ref={ref}>
                            <div className="selectbox" onClick={e=>showmultiselect(props)}>
                                <select>
                                    <option>Select Disability Effect</option>
                                </select>
                                <div className="overselect"></div>
                            </div>
                            <div className="multi-select" name="disabilityEffect">
                                <label htmlFor="m1">
                                    <input type="checkbox" id="m1" name="disability" value="Weak" onClick={handleDisability}/> Weak</label>
                                <label htmlFor="m2">
                                    <input type="checkbox" id="m2" name="disability" value="Deformed" onClick={handleDisability}/> Deformed</label>
                                <label htmlFor="m3">
                                    <input type="checkbox" id="m3" name="disability" value="Absence" onClick={handleDisability}/> Absence</label>
                                <label htmlFor="m4">
                                    <input type="checkbox" id="m4" name="disability" value="Amputated" onClick={handleDisability}/> Amputated</label>
                                <label htmlFor="m5">
                                    <input type="checkbox" id="m5" name="disability" value="Blind" onClick={handleDisability}/> Blind</label>
                                <label htmlFor="m6">
                                    <input type="checkbox" id="m6" name="disability" value="Low Vision" onClick={handleDisability}/> Low Vision</label>
                                <label htmlFor="m7">
                                    <input type="checkbox" id="m7" name="disability" value="Deaf" onClick={handleDisability}/> Deaf</label>
                                <label htmlFor="m8">
                                    <input type="checkbox" id="m8" name="disability" value="Speech Impairment" onClick={handleDisability}/> Speech Impairment</label>
                                <label htmlFor="m9">
                                    <input type="checkbox" id="m9" name="disability" value="Delayed Speech Development" onClick={handleDisability}/> Delayed Speech Development</label>
                                <label htmlFor="m10">
                                    <input type="checkbox" id="m10" name="disability" value="Hearing Impairment" onClick={handleDisability}/> Hearing Impairment</label>
                                <label htmlFor="m11">
                                    <input type="checkbox" id="m11" name="disability" value="Mentally Retarded" onClick={handleDisability}/> Mentally Retarded</label>
                            </div>
                        </div>
                    </div>

                </div>



                <div className="row">
                    <div className="col-30">
                        <label>Any other Disabled in Family</label>
                    </div>
                    <div className="col-70">
                        <select name="familydisabled" value={props.value.familydisabled} onChange={props.onChangeValue}>
                            <option>No</option>
                            <option>Yes</option>
                        </select>

                    </div>
                </div>
                <div className="row">
                    <div className="col-50">
                        <div className="col-25">
                            <label>Total No. of Family Members</label>
                        </div>
                        <div className="col-75">
                            <input type="text" className="input-com" name="totalfamily" value={props.value.totalfamily} onChange={props.onChangeValue}  onBlur={props.formobj.handleBlur}/>
                            {props.formobj.touched.totalfamily && props.formobj.errors.totalfamily ? <div className="error">* {props.formobj.errors.totalfamily}</div> : null}
                        </div>
                    </div>
                    <div className="col-50">
                        <div className="col-25">
                            <label>Total No. of Disabled in Family</label>
                        </div>
                        <div className="col-75">
                            <input type="text" className="input-com" name="totaldisabled" value={props.value.totaldisabled} onChange={props.onChangeValue}  onBlur={props.formobj.handleBlur}/>
                            {props.formobj.touched.totaldisabled && props.formobj.errors.totaldisabled ? <div className="error">* {props.formobj.errors.totaldisabled}</div> : null}
                        </div>
                    </div>

                </div>

                <div className="row">
                    <label>Rehab. Facilities already availed to the person</label>
                </div>

                <div className="row">

                    <div className="checkboxes">
                        <label htmlFor="one">
                            <input type="checkbox" id="one" name="rehab" value="Pension" onClick={handleClick}/> Pension</label>
                        <label htmlFor="two">
                            <input type="checkbox" id="two" name="rehab" value="Lone from Bank" onClick={handleClick}/> Lone from Bank</label>
                        <label htmlFor="three">
                            <input type="checkbox" id="three" name="rehab" value="Vocational Training" onClick={handleClick}/> Vocational Training</label>
                        <label htmlFor="four">
                            <input type="checkbox" id="four" name="rehab" value="Help from Block" onClick={handleClick}/> Help from Block</label>
                        <label htmlFor="five">
                            <input type="checkbox" id="five" name="rehab" value="Railway Concession" onClick={handleClick}/> Railway Concession</label>
                        <label htmlFor="six">
                            <input type="checkbox" id="six" name="rehab" value="Bus Concession" onClick={handleClick}/> Bus Concession</label>
                        <label htmlFor="seven">
                            <input type="checkbox" id="seven" name="rehab" value="Reservation in Services" onClick={handleClick}/> Reservation in Services</label>
                        <label htmlFor="eight">
                            <input type="checkbox" id="eight" name="rehab" value="Handicapped Certificate" onClick={handleClick}/> Handicapped Certificate</label>
                        <label htmlFor="nine">
                            <input type="checkbox" id="nine" name="rehab" value="Scholarship" onClick={handleClick}/> Scholarship</label>
                        <label htmlFor="ten">
                            <input type="checkbox" id="ten" name="rehab" value="Crurch" onClick={handleClick}/> Crurch</label>
                        <label htmlFor="eleven">
                            <input type="checkbox" id="eleven" name="rehab" value="Tri Wheeler" onClick={handleClick}/> Tri Wheeler</label>
                        <label htmlFor="twelve">
                            <input type="checkbox" id="twelve" name="rehab" value="Wheel Chair" onClick={handleClick}/> Wheel Chair</label>
                        <label htmlFor="thirteen">
                            <input type="checkbox" id="thirteen" name="rehab" value="Caliper" onClick={handleClick}/> Caliper</label>
                        <label htmlFor="fourteen">
                            <input type="checkbox" id="fourteen" name="rehab" value="Artificial Limb" onClick={handleClick}/> Artificial Limb</label>
                        <label htmlFor="fifteen">
                            <input type="checkbox" id="fifteen" name="rehab" value="Hearing Aid" onClick={handleClick}/> Hearing Aid</label>
                        <label htmlFor="sixteen">
                            <input type="checkbox" id="sixteen" name="rehab" value="Blind Stick" onClick={handleClick}/> Blind Stick</label>
                        <label htmlFor="seventeen">
                            <input type="checkbox" id="seventeen" name="rehab" value="Special Education" onClick={handleClick}/> Special Education</label>
                        <label htmlFor="eighteen">
                            <input type="checkbox" id="eighteen" name="rehab" value="Integrated Education" onClick={handleClick}/> Integrated Education</label>

                    </div>


                </div>
            </div>

    );
}