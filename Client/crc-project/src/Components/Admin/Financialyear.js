import React from 'react';
import Tablewidget from '../Widgets/Tablewidget';
import { useState } from 'react'
export default function Financialyear() {
    // var counter = 1;
    const [value, setvalue] = useState("2015-2016");
    const theading = ["Financial Year"];
   
    const [counter, setcounter] = useState(1);
   
    const [tabledata, settabledata] = useState([]);



    const adddata = (event) => {
        event.preventDefault();
        const rowdata = { "Financial Year": value};
        setcounter(counter + 1);
        const tempdata = [...tabledata, rowdata];
        settabledata(tempdata);
    }
    const handleChange = (event) => {
        setvalue(event.target.value);
      
    }
  
    return (
        <div className="input-boxes" style={{justifyContent:"flex-start"}}>

            <div className="row">
                <div className="col-20">
                    <label>Financial Year</label>
                </div>
                <div className="col-60">
                    <select name="Services" onChange={handleChange}>  
                            <option>2015-2016</option>
                            <option>2016-2017</option>
                            <option>2017-2018</option>
                            <option>2018-2019</option>
                            <option>2019-2020</option>
                       
                    </select>
                </div>
                <div className="col-20" style={{ textAlign: "center" }}>
                    <button type="button" className="btn"  onClick={adddata}>Create Session</button>
                </div>
            </div>
            <div className="col-70" style={{ marginTop: "20px", marginBottom: "20px" }}>
                <Tablewidget tname="Financial Years" data={tabledata} theading={theading} color='#7d2ae8' autoincrement={true} />

            </div>

          
        </div>
    );
}