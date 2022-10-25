import React from 'react';
import './Login.css';
import { useFormik } from 'formik';
import axios from '../../axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import * as FaIcons from 'react-icons/fa';
import useAuth from '../../hooks/useAuth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function Login() {
  const { setAuth } = useAuth();
  const [mesg, setmesg] = useState("");
  const [type,setType]=useState(0);
  const navigate = useNavigate();
  const toggleForm = () => {
    setmesg("");
    const container = document.querySelector(".container");
    container.classList.toggle("active");
  };
  const opensetnew = () => {
    const setnew = document.querySelector(".setnew");
    const reset = document.querySelector(".reset");
    setmesg("");
    setnew.classList.toggle("opensetnew");
    reset.classList.toggle("closereset");
  }
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
  const FormLogin = () => {
    const userlogin = () => {

      axios.post("login", {
        USER_ID: formik.values.username,
        USER_PASS: formik.values.password,
      }).then((response) => {
       
        console.log(response);
        if (response.data === 0) {
        showToast("Wrong UserName/Password.",0);

        }
        else {
        
          setAuth({ user: formik.values.username, usertype: response.data[0].UserType })
          localStorage.setItem('UN', formik.values.username);
          localStorage.setItem('UT', response.data[0].UserType);
          navigate("/crc/" + response.data[0].UserType);
         
        }
      }).catch((error) => {
        showToast(error.message,0);
      });

    };
    const initialValues = {
      username: '',
      password: ''
    }
    const onSubmit = (values) => {
      userlogin();

    }
    const validate = values => {
      let errors = {};
      if (!values.username) {
        errors.username = "Required"
      }
      if (!values.password) {
        errors.password = "Required"
      }

      return errors;
    }
    const formik = useFormik({
      initialValues,
      onSubmit,
      validate
    });
    return (
      <>
      <div className="formBx">
        <div className="error" style={{ textAlign: "center" }}>{mesg}</div>
        <form onSubmit={formik.handleSubmit}>
          <h2>Sign In</h2>
          <div className="input-boxes">
            <div className="input-box">
              <i><FaIcons.FaUser /></i>
              <input type="text" className="inputi" name="username" placeholder="Username" value={formik.values.username} onBlur={formik.handleBlur} onChange={formik.handleChange} />
            </div>
            {formik.touched.username && formik.errors.username ? <div className="error">* {formik.errors.username}</div> : null}
            <div className="input-box">
              <i><FaIcons.FaLock /></i>
              <input type="password" className="inputi" name="password" placeholder="Password" value={formik.values.password} onBlur={formik.handleBlur} onChange={formik.handleChange} />
            </div>
            {formik.touched.password && formik.errors.password ? <div className="error">* {formik.errors.password}</div> : null}
            <p className="forgot">
              <a href="#" onClick={toggleForm}>Forget Password ?</a>
            </p>

            <button type="submit" className="btn">Login</button>


          </div>
        </form>

      </div>
      <ToastContainer position="top-center" autoClose={2000} />
      </>
    );
  }
  const FormSetnew = (props) => {
    const setnewpassword = () => {
      axios.post("login/setnewpassword", {
        USER_ID: props.formikResetValue.uname,
        USER_EMAIL: props.formikResetValue.uemail,
        USER_DOB: props.formikResetValue.udob,
        NEW_PASSWORD: formik.values.confirmpass
      }).then((response) => {
        // window.location.reload();
        if(response.data===0){
          showToast("This User does not exist..",0)
        }else if(response.data===1){
          showToast("Password changed successfully..",1)
        }

        // toast(response.data, {
        //   position: "top-center",autoClose: 2000});
      }).catch((error) => {
        showToast(error.message,0)
      });

    };
    const initialValues = {
      newpass: '',
      confirmpass: ''
    }
    const onSubmit = values => {
      // console.log("Password data", values);
      // console.log("Formik Reset",props.formikResetValue.uemail);
      setnewpassword();
      toggleForm();

    }
    const validate = values => {
      let errors = {};
      if (!values.newpass) {
        errors.newpass = "Required"
      } else if (values.newpass.length < 5) {
        errors.newpass = "Increase length of password"
      }
      if (values.confirmpass !== values.newpass) {
        errors.confirmpass = "Not same as New Password"
      }
      return errors;
    }
    const formik = useFormik({
      initialValues,
      onSubmit,
      validate
    });
    return (

      <div className="setnew">

        <div className="error" style={{ textAlign: "center" }}>{mesg}</div>
        <form onSubmit={formik.handleSubmit}>
          <div className="input-box">
            <i><FaIcons.FaLock /></i>
            <input type="text" className="inputi" name="newpass" placeholder="New Password" value={formik.values.newpass} onBlur={formik.handleBlur} onChange={formik.handleChange} />
          </div>
          {formik.touched.newpass && formik.errors.newpass ? <div className="error">* {formik.errors.newpass}</div> : null}
          <div className="input-box">
            <i><FaIcons.FaLock /></i>
            <input type="text" className="inputi" name="confirmpass" placeholder="Confirm Password" value={formik.values.confirmpass} onBlur={formik.handleBlur} onChange={formik.handleChange} />
          </div>
          {formik.touched.confirmpass && formik.errors.confirmpass ? <div className="error">* {formik.errors.confirmpass}</div> : null}
          <button type="submit" className="btn">Save</button>
        </form>
      </div>
    );
  }

  const FormReset = () => {
    const forgetpassword = () => {
      axios.post("login/forgetpassword", {
        USER_ID: formikReset.values.uname,
        USER_EMAIL: formikReset.values.uemail,
        USER_DOB: formikReset.values.udob
      }).then((response) => {
        if (response.data === 0) {
          // console.log("Wrong User Credentials");
          showToast("Wrong User Credentials..",0);
          // toast.error("Wrong User Credentials..", {
          //   position: "top-center",autoClose: 2000})
          //toggleForm();
        }
        else {
          setmesg("");
          opensetnew();

        }

      }).catch((error) => {
       showToast(error.message,0)
      });

    };
    const [initialValues, setinit] = useState({
      uname: '',
      uemail: '',
      udob: ''
    });
    const onSubmit = values => {
      // console.log("Reset data", values);
      forgetpassword();
      // opensetnew();

    }
    const validate = values => {
      let errors = {};
      if (!values.uname) {
        errors.uname = "Required"
      }
      if (!values.uemail) {
        errors.uemail = "Required"
      } else if (!/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/i.test(values.uemail)) {
        errors.uemail = "Invalid Email Format"
      }
      if (!values.udob) {
        errors.udob = "Required"
      }
      return errors;
    }
    const formikReset = useFormik({
      initialValues,
      onSubmit,
      validate
    });

    return (
      <div className="formBx">
        <div className="error" style={{ textAlign: "center" }}>{mesg}</div>
        <div className="input-boxes" style={{ justifyContent: "center" }}>
          <h2>Reset Password</h2>
          <form onSubmit={formikReset.handleSubmit}>
            <div className="reset">
              <div className="input-box">
                <i><FaIcons.FaUser /></i>
                <input type="text" className="inputi" name="uname" placeholder="Username" value={formikReset.values.uname} onBlur={formikReset.handleBlur} onChange={formikReset.handleChange} />
              </div>
              {formikReset.touched.uname && formikReset.errors.uname ? <div className="error">* {formikReset.errors.uname}</div> : null}
              <div className="input-box">
                <i><FaIcons.FaAt /></i>
                <input type="email" className="inputi" name="uemail" placeholder="Email" value={formikReset.values.uemail} onBlur={formikReset.handleBlur} onChange={formikReset.handleChange} />
              </div>
              {formikReset.touched.uemail && formikReset.errors.uemail ? <div className="error">* {formikReset.errors.uemail}</div> : null}
              <div className="input-box">
                <i><FaIcons.FaCalendar /></i>
                <input type="date" className="inputi" name="udob" placeholder="DOB" value={formikReset.values.udob} onBlur={formikReset.handleBlur} onChange={formikReset.handleChange} />
              </div>
              {formikReset.touched.udob && formikReset.errors.udob ? <div className="error">* {formikReset.errors.udob}</div> : null}
              <div className="button">
                <button type="submit" className="btn">Reset</button>
              </div>
            </div>

          </form>

          <FormSetnew formikResetValue={formikReset.values} />
          <p className="forgot">
            Already have an account ?
          <a href="#" onClick={toggleForm}> Sign in.</a>
          </p>

        </div>

      </div>
    );

  }
  return (

    <section>
      <div className="container">
        <div className="user signinBx">
          <div className="imgBx"><img src={require('./login.jpg').default} alt="" /></div>
          <FormLogin />
        </div>
        <div className="user forgotBx">
          <FormReset />
          <div className="imgBx"><img src={require('./Forget.jpg').default} alt="" /></div>
        </div>
      </div>
    </section>


  );
}
