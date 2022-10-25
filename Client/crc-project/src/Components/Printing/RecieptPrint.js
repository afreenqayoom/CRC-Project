import React from 'react';
import Tablewidget from '../Widgets/Tablewidget';
export const RecieptPrint = React.forwardRef((props, ref) => {
    const theading = ["Services", "Charges"];
    return (
        <div ref={ref}>
        
            <div className="head">
                <h1 style={{ textAlign: "center" }}>COMPOSITE REGIONAL CENTRE</h1>
                <h3 style={{ textAlign: "center" }}>(MINISTRY OF SOCIAL JUSTICE AND EMPOWERMENT. GOVT OF INDIA)</h3>
                <h3 style={{ textAlign: "center" }}>NEAR SKIMS MEDICAL COLLEGE,BEMINA,SRINAGAR-190017</h3>
            </div>
            <div className="row">
                <div className="col-50">
                    <div className="col-25">
                        <label>Registration Id</label>
                    </div>
                    <div className="col-75">
                        {props.regId}
                    </div>
                </div>
                <div className="col-50">
                    <div className="col-25" style={{ textAlign: "center" }}>
                        <label>Date</label>
                    </div>
                    <div className="col-75">
                        {props.recieptDate}
                    </div>
                </div>

            </div>
            <div className="row">
                <div className="col-30">
                    <label>Name</label>
                </div>
                <div className="col-70">
                    {props.pname}
                </div>
            </div>
            <div className="row">
                <div className="col-30">
                    <label>RecieptID</label>
                </div>
                <div className="col-70">
                    {props.recieptId}
                </div>
            </div>
            <div className="row" style={{ marginTop: "20px", marginBottom: "20px" }}>
            {props.tabledata?
                <Tablewidget tname="Patient Services" data={props.tabledata} theading={theading} color='#7d2ae8' autoincrement={false}  />
                :null}
            </div>
            <div className="row">
                <div className="col-75" >
                    <label style={{ float: "right",padding:"10px" }}>Total Charges</label>
                </div>
                <div className="col-20" style={{textAlign:"right"}}>
                {props.totalamount}
                    {/* <input type="text" className="input-com" value={props.totalcharges} style={{ textAlign: "right",fontSize:"14px" }} /> */}
                </div>
                
            </div>
            
            </div>
    )})
    export default RecieptPrint;