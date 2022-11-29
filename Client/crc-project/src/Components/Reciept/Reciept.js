import React from 'react';
import Tablewidget from '../Widgets/Tablewidget';
import { useState } from 'react'
import { useFormik } from 'formik';
import axios from '../../axios';
import RecieptPrint from '../Printing/RecieptPrint';
import ReactToPrint from 'react-to-print';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogContentText from '@material-ui/core/DialogContentText';
import { toast } from 'react-toastify';
import { useRef } from 'react';
import {
    submitAction
} from '../Redux/action';
import { connect } from 'react-redux';
// import { render } from 'react-dom/cjs/react-dom.production.min';
function Reciept(props) {
    // var counter = 1;
    const [value, setvalue] = useState("Physiotherapy Treatment");
    const theading = ["Services", "Charges"];
    const chargesdata = [20, 20, 30, 40, 30, 30, 30, 30];
    const [charges, setcharges] = useState(chargesdata[0]);
    const [totalcharges, settotal] = useState(0);
    const current = new Date();
    const formatDate = current.getDate() < 10 ? `0${current.getDate()}` : current.getDate();
    const formatMonth = (current.getMonth() + 1) < 10 ? `0${current.getMonth() + 1}` : current.getMonth() + 1;
    const date = [current.getFullYear(), formatMonth, formatDate].join('-');
    const [counter, setcounter] = useState(0);
    const [tabledata, settabledata] = useState([]);
    const [mesg, setmesg] = useState("");
    const componentRef = useRef();
    const [open, setopen] = useState(false);
    React.useEffect(() => {
        if (mesg !== "")
            toast(mesg, {
                position: "top-center", autoClose: 2000
            });

    }, [mesg]);
    const handleClose = () => {
        setopen(false);
    }
    // var services;


    const adddata = (event) => {
        settotal((totalcharges + charges));
        event.preventDefault();
        const rowdata = { "Services": value, "Charges": charges };

        //  data["SNo"]=counter;
        //  data["Services"]=value;
        //  data["Charges"]="20";
        setcounter(counter + 1);
        const tempdata = [...tabledata, rowdata];
        settabledata(tempdata);




    }
    const handleChange = (event) => {
        //event.preventDefault();
        setvalue(event.target.value);
        setcharges(chargesdata[event.target.selectedIndex]);

    }
    const deleteRow = (index) => {

        let temp = 0;
        const temptable = tabledata.filter((item, itemIndex) => {
            return itemIndex !== index
        })

        settabledata(temptable);

        setcounter(counter - 1);
        temptable.map((item, key) => {
            return temp = temp + item.Charges;


        })

        settotal(temp);
    }
    const savepayment = () => {
        axios.post("patientreciept", {
            REG_ID: formik.values.regId,
            RECIEPT_DATE: formik.values.recieptDate,
            SERVICES: tabledata,
            RECIEPT_ID: formik.values.recieptId
            // CHARGES:totalcharges

        }).then((response) => {
            if (response.data === 0)
                setmesg("Payment not Successfull");
              
           
            else {
                formik.resetForm();
                setmesg("Payment Successfull");
               
                setopen(true);
                getrecieptId();
            }
            setTimeout(() => {
                setmesg("");
            }, 3000);

        }).catch((error) => {
            if (error.response) {
                toast.error(error.response.data["message"], {
                    position: "top-center", autoClose: 2000
                });
            }

            else {
                toast.error(error.message, {
                    position: "top-center", autoClose: 2000
                });

            }

        })
    }
    const validate = values => {
        let errors = {};
        if (values.regId === '')
            errors.regId = "Required";
        else if (isNaN(values.regId))
            errors.regId = "Invalid RegistrationID";
        if (values.pname === '' && values.regId !== '')
            errors.regId = "Registration No. doesn't exist"
        return errors;
    }
    const [initialValues, setinitialValues] = useState({
        regId: "",
        recieptDate: date,
        pname: '',
        recieptId: '',
        tabledata: [],
        totalamount: '0'
    })
    const onSubmit = values => {
        formik.values.tabledata = [];
        formik.values.tabledata = [...tabledata];
        values.totalamount = totalcharges;

        //services=tabledata.map(e=>e.Services).toString();
        if (counter > 0) {
            submitAction(values);

            savepayment();
        }

        else
            setmesg("Add some Service...");
        settabledata([]);
        settotal(0);
        setcounter(0);
    }

    const formik = useFormik({
        initialValues,
        onSubmit,
        validate,
        enableReinitialize: true

    });
    const handleBlur = (e) => {
        formik.handleBlur(e);
        axios.post("getdetails", {
            REG_ID: formik.values.regId
        }).then((response) => {
            if (response.data !== 0)
                formik.values.pname = response.data[0].Patient_Name;
            else {
                formik.values.pname = "";
            }
            //this event is called to refresh page
            formik.handleBlur(e);
        }).catch((error) => {
            toast.error(error.message, {
                position: "top-center", autoClose: 2000
            });
        })


    }
    const getrecieptId = () => {
        axios.post("patientreciept/getrecieptId").then((response) => {
            var rid;
            console.log(response.data);
            if (response.data[0].Reciept_ID === null)
                rid = 1;
            else
                rid = (response.data[0].Reciept_ID) + 1;

            setinitialValues({ ...initialValues, recieptId: rid });
        }).catch((error) => {
            toast.error(error.message, {
                position: "top-center", autoClose: 2000
            });
        })
        console.log(formik.values);
    }
    React.useEffect(() => {
        getrecieptId();
    }, [])
    const { regId,
        recieptDate,
        pname,
        recieptId,
        tdata,
        totalamount,
        submitAction } = props;
    return (

        <div className="input-boxes">
            <form id="payment" onSubmit={formik.handleSubmit}>
                <div className="row">
                    <div className="col-50">
                        <div className="col-25">
                            <label>Reciept Id</label>
                        </div>
                        <div className="col-75">
                            <input type="text" className="input-com" name="recieptId" disabled value={formik.values.recieptId} onChange={formik.handleChange} />
                        </div>
                    </div>
                    <div className="col-50">
                        <div className="col-25" style={{ textAlign: "center" }}>
                            <label>Date</label>
                        </div>
                        <div className="col-75">
                            <input type="date" className="input-com" name="recieptDate" value={formik.values.recieptDate} onChange={formik.handleChange} />
                        </div>
                    </div>

                </div>
                <div className="row">
                    <div className="col-30">
                        <label>Registration Id</label>
                    </div>
                    <div className="col-70">
                        <input type="text" className="input-com" name="regId" value={formik.values.regId} onChange={formik.handleChange} onBlur={e => { handleBlur(e) }} />
                        {formik.touched.regId && formik.errors.regId ? <div className="error">* {formik.errors.regId}</div> : null}
                    </div>
                </div>
                <div className="row">
                    <div className="col-30">
                        <label>Name</label>
                    </div>
                    <div className="col-70">
                        <input type="text" disabled className="input-com" name="pname" value={formik.values.pname} onChange={formik.handleChange} />
                    </div>
                </div>

                <div className="row">
                    <div className="col-20">
                        <label>Select Service</label>
                    </div>
                    <div className="col-60">
                        <select name="Services" onChange={handleChange}>
                            <optgroup label="Clinical Services">
                                <option>Physiotherapy Treatment</option>
                                <option>Occupational Therapy Treatment</option>
                                <option>I.Q Testing</option>
                            </optgroup>
                            <optgroup label="Speech And Hearing">
                                <option>Brain Evoke Test (BERA)</option>
                                <option>Auditory Steady State Response (ASSR)</option>
                                <option>Pure Tone Audiometry (PTA)</option>
                                <option>OTO Acoustic Emission (OAE)</option>
                                <option>Impedance Audiometry</option>
                            </optgroup>
                        </select>
                    </div>
                    <div className="col-20" style={{ textAlign: "center" }}>
                        <button type="button" className="btn" style={{ width: "120px" }} onClick={adddata}>Add</button>
                    </div>
                </div>
                <div className="row" style={{ marginTop: "20px", marginBottom: "20px" }}>
                    <Tablewidget tname="Patient Services" data={tabledata} theading={theading} color='#7d2ae8' action={true} autoincrement={true} deleteRow={deleteRow} />

                </div>

                <div className="row">
                    <div className="col-75" >
                        <label style={{ float: "right", padding: "10px" }}>Total Charges</label>
                    </div>
                    <div className="col-20">
                        <input type="text" className="input-com" value={totalcharges} style={{ textAlign: "right", fontSize: "14px" }} />
                    </div>

                </div>
            </form>
            <div className="row" style={{ justifyContent: "center" }}>
                <button type="submit" form="payment" className="btn" name="save" style={{ width: "150px" }}>Save</button>
            </div>
            <div className="error" style={{ textAlign: "center", fontSize: "16px" }}>{mesg}</div>

            <Dialog open={open} onClose={handleClose} style={{maxWidth:"400px",margin:"auto"}}>
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
                        documentTitle={"Patient Reciept"}
                    />
                </DialogActions>
            </Dialog>
            <div className="Print" style={{ height: "0px", visibility: "hidden" }}>
                <RecieptPrint regId={regId} recieptDate={recieptDate} pname={pname} recieptId={recieptId} ref={componentRef} tabledata={tdata} totalamount={totalamount} />

            </div>

        </div>
    );
}
const mapStateToProps = (state) => ({
    regId: state.regId,
    recieptDate: state.recieptDate,
    pname: state.pname,
    recieptId: state.recieptId,
    tdata: state.tabledata,
    totalamount: state.totalamount
})
const mapDispatchToProps = (dispatch) => ({
    submitAction: (data) => dispatch(submitAction(data))
})
export default connect(mapStateToProps, mapDispatchToProps)(Reciept);