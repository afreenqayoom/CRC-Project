import React from 'react';
import './PatientHistory.css';
// import jspdf from 'jspdf';
import { useRef } from 'react';
import ReactToPrint from 'react-to-print';
import * as FaIcons from 'react-icons/fa';

export default function PatientHistory(props) {
    const ref = useRef();

   
    return (
        <>
        <div className="history-container " id="content"  ref={ref}>
            <div className="history-header">Patient History</div>
            <div className="row printbtn" style={{ paddingLeft: "40px" }}>
                    <ReactToPrint
                        trigger={() => <i className="btn" style={{fontSize:"24px", width:"40px"}}><FaIcons.FaPrint /></i>}
                        content={() => ref.current}
                        documentTitle={"Patient History"}
                    />
                </div>
            <div className="history-body">
                    <div className="row small-row">
                        <span>Registration ID:-</span>
                        <span>{props.regId}</span>
                    </div>
                    {(props.historydata.length > 0) &&
                        props.historydata.map((item, key) => {
                            return (
                                <div className="history-card">
                                    <div className="row small-row">
                                        <span>Dated:-</span>
                                        <span>{item.Date}</span>
                                    </div>

                                    <div className="row small-row" style={{ paddingLeft: "40px" }}>
                                        <span>Department-</span>
                                        <span>{item.Department}</span>
                                    </div>
                                    {(props.historydata[key]['Diagnosis'].length > 0) &&
                                        <>
                                        <div className="row small-row" style={{ paddingLeft: "40px" }}>
                                            <span>Clinical Conditions:</span>
                                        </div>
                                        {props.historydata[key]['Diagnosis'].map((diagItem) => {
                                            return (
                                                <div className="row small-row" style={{ paddingLeft: "100px" }}>
                                                    <span>{diagItem}</span>
                                                </div>
                                            )
                                        })}
                                        </>
                                    }
                                    {(props.historydata[key]['Treatment'].length > 0) &&
                                        <>
                                        <div className="row small-row" style={{ paddingLeft: "40px" }}>
                                            <span>Treatment advised:</span>
                                        </div>
                                        {props.historydata[key]['Treatment'].map((treatItem) => {
                                            return (
                                                <div className="row small-row" style={{ paddingLeft: "100px" }}>
                                                    <span>{treatItem}</span>
                                                </div>
                                            )
                                        })}
                                        </>
                                    }
                                    {(props.historydata[key]['Supportive_Services'].length > 0) &&
                                        <>
                                        <div className="row small-row" style={{ paddingLeft: "40px" }}>
                                            <span>Supportive Services advised:</span>
                                        </div>
                                        {props.historydata[key]['Supportive_Services'].map((ssItem) => {
                                            return (
                                                <div className="row small-row" style={{ paddingLeft: "100px" }}>
                                                    <span>{ssItem}</span>
                                                </div>
                                            )
                                        })}
                                        </>
                                    }
                                    <div className="row small-row" style={{ paddingLeft: "40px" }}>
                                        <span>Remarks:-</span>
                                        <span>{item.Remarks}</span>
                                    </div>

                                </div>
                            )
                        })

                    }
                    {/*  */}
            
               
            </div>
            <div className="page-footer"></div>
        </div>
       


        </>
    );

}