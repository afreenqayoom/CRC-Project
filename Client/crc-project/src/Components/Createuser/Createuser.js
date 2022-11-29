import React from 'react';
import './Createuser.css';
import { useState } from 'react';
import { useFormik } from 'formik';
import axios from '../../axios';
import * as FaIcons from 'react-icons/fa';
import {ToastContainer,toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function Createuser() {
   
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
    const createnewuser = () => {
        axios.post("createuser", {
            USER_ID: formik.values.username,
            USER_EMAIL: formik.values.uemail,
            USER_DOB: formik.values.udob,
            USER_PASS: formik.values.password,
            USER_TYPE: formik.values.usertype,
            USER_ROLE:formik.values.roles
        }).then((response) => {
            
            if (response.data === 0) {
             showToast("UserID already available.",0);
                }
            else if(response.data===1)
            showToast("User Successfully created!!",1);
          
           
           
        }).catch((error)=>{ 
            if (error.response)
                showToast(error.response.data["message"], 0);

            else
                showToast(error.message, 0);
        })

    };
    const [card1, showcard1] = useState(false);
    const [card2, showcard2] = useState(false);
  
    const togglecard1 = () => {
        showcard2(false);
     
        card1 ? showcard1(false) : showcard1(true);

    }
    const togglecard2 = () => {
        showcard1(false);
       
        card2 ? showcard2(false) : showcard2(true);

    }
    
    const initialValues = {
        username: '',
        uemail: '',
        udob: '',
        password: '',
        usertype: '',
        roles:[]
    }
    React.useEffect(()=>{
        const privilege=document.querySelectorAll('input[name="roles"]');
        const utype = document.getElementsByName("usertype")[0];
        // privilege.forEach(element=>{
        //     element.checked=false;
        // })
        privilege.forEach(element => {
            // (props.value.rehab).map((item=>{
              if(element.value===utype.value)
              {
                  element.checked=true;
              }
            //   else
            //   element.checked=false;
              if(utype.value==='Administration')
              element.checked=true;
              if(utype.value==='Guest' && element.value==='Search')
              element.checked=true;
              
            // }))
         
       });

        
    });
    const onSubmit = (values,{resetForm}) => {

        let role=document.querySelectorAll('input[name="roles"]');
        const privilege=document.querySelectorAll('input[name="roles"]');
       
       
       values.roles=[];
       role.forEach(element => {
           values.roles.push(element.checked);
       });
    //    var mystring=values.roles.toString();
    //    console.log(" my string",mystring);
    //     var myarray=mystring.split(',');
    //     console.log("myarray",myarray);
      //  console.log("User data", values);
       
        createnewuser();
        resetForm({values:''});
         privilege.forEach(element=>{
            element.checked=false;
        })
    }
    const validate = values => {
        let errors = {};
        const utype = document.getElementsByName("usertype");
       // console.log("selected index", utype[0].selectedIndex);
        if (!values.username) {
            errors.username = "Required"
        }
        if (!values.uemail) {
            errors.uemail = "Required"
        } else if (!/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/i.test(values.uemail)) {
            errors.uemail = "Invalid Email Format"
        }
        if (!values.udob) {
            errors.udob = "Required"
        }
        if (!values.password) {
            errors.password = "Required"
        }else if (values.password.length < 5) {
            errors.password = "Increase length of password"
          }
        if (!values.usertype || utype[0].selectedIndex === 0) {
            errors.usertype = "Required"
        }

        return errors;
    }
    const formik = useFormik({
        initialValues,
        onSubmit,
        validate
    });

    return (

        <section className="createcont">

        <div className="acc-cont">
            
                <div className="head">
                    <h2>Create user</h2>
                </div>
                <form id="users" onSubmit={formik.handleSubmit}>
                <div className="acc-body">
                    <div className={card1 ? "card opencard" : "card"}>

                        <div className="card-header" onClick={togglecard1}>
                            <button type="button">User Details</button>
                            <div className="icon">
                           {card1 ? <FaIcons.FaMinus/> :<FaIcons.FaPlus/>}
                            </div>
                        </div>
                        <div className="collapse" id="collapse1">
                            <div className="card-content">
                               
                                    <div className="input-boxes">

                                        <div className="input-box">
                                          <i>  <FaIcons.FaUser/></i>
                                            <input type="text" className="inputi" name="username" placeholder="Username" value={formik.values.username} onBlur={formik.handleBlur} onChange={formik.handleChange} />
                                        </div>
                                        {formik.touched.username && formik.errors.username ? <div className="error">* {formik.errors.username}</div> : null}
                                        <div className="input-box">
                                            <i><FaIcons.FaAt/></i>
                                            <input type="email" className="inputi" name="uemail" placeholder="Email" value={formik.values.uemail} onBlur={formik.handleBlur} onChange={formik.handleChange} />
                                        </div>
                                        {formik.touched.uemail && formik.errors.uemail ? <div className="error">* {formik.errors.uemail}</div> : null}
                                        <div className="input-box">
                                            <i><FaIcons.FaCalendar/></i>
                                            <input type="date" className="inputi" name="udob" placeholder="DOB" value={formik.values.udob} onBlur={formik.handleBlur} onChange={formik.handleChange} />
                                        </div>
                                        {formik.touched.udob && formik.errors.udob ? <div className="error">* {formik.errors.udob}</div> : null}
                                        <div className="input-box">
                                            <i><FaIcons.FaLock/></i>
                                            <input type="password" className="inputi" name="password" placeholder="Password" value={formik.values.password} onBlur={formik.handleBlur} onChange={formik.handleChange} />
                                        </div>
                                        {formik.touched.password && formik.errors.password ? <div className="error">* {formik.errors.password}</div> : null}
                                        <div className="input-box">

                                            <select name="usertype" required value={formik.values.usertype} onBlur={formik.handleBlur} onChange={formik.handleChange}>
                                                <option>Select User Type</option>
                                                <option>Administration</option>
                                                <option>Registration</option>
                                                <option>Accounts</option>
                                                <option>Physiotherapy</option>
                                                <option>Guest</option>
                                            </select>
                                        </div>
                                        {formik.touched.usertype && formik.errors.usertype ? <div className="error">* {formik.errors.usertype}</div> : null}
                                    </div>

                            </div>
                        </div>
                    </div>
                    <div className={card2 ? "card opencard" : "card"}>

                        <div className="card-header" onClick={togglecard2}>
                            <button type="button">Privileges</button>
                            <div className="icon">
                            {card2 ? <FaIcons.FaMinus/> :<FaIcons.FaPlus/>}
                            </div>
                        </div>
                        <div className="collapse" id="collapse2">
                            <div className="card-content">
                                <div className="row">

                                    <div className="checkboxes">
                                        <label htmlfor="one">
                                            <input type="checkbox" id="role1" name="roles" value="Administration"/> Administration</label>
                                        <label htmlfor="two">
                                            <input type="checkbox" id="role2" name="roles" value="Registration"/> Registration</label>
                                        <label htmlfor="three">
                                        <input type="checkbox" id="role3" name="roles" value="Search"/> Search</label>
                                           
                                        <label htmlfor="four">
                                        <input type="checkbox" id="role4" name="roles" value="Accounts"/> Accounts</label>
                                          
                                        <label htmlfor="five">
                                        <input type="checkbox" id="role5" name="roles" value="Physiotherapy"/> Physiotherapy</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <div className={card3 ? "card opencard" : "card"}>

                        <div className="card-header" onClick={togglecard3}>
                            <button type="button">Roles</button>
                            <div className="icon">
                                <i className={card3 ? "fa fa-minus" : "fa fa-plus"} />
                            </div>
                        </div>
                        <div className="collapse" id="collapse3">
                            <div className="card-content">
                                <p>This is Roles page.This is Roles page.This is Roles page.This is Roles page.This is Roles page.
                    This is Roles page.This is Roles page.This is Roles page.This is Roles page.This is Roles page.This is Roles page.
                    This is Roles page.This is Roles page.This is Roles page.
                    </p>
                            </div>
                        </div>
                    </div> */}
                </div>
                    </form>
                <button type="submit" form="users" className="btn" style={{ width: "150px" }}>Save</button>
                <ToastContainer position="top-center" autoClose={2000}/>
            </div>

        </section>


    );
}