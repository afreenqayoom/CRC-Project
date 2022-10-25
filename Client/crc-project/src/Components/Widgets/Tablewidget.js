import React from 'react';
import './Tablewidget.css';
import * as FaIcons from 'react-icons/fa';
export default function Tablewidget(props) {

return(
    <div className="table-container">
        {props.tname && <div className="heading" style={{backgroundColor:props.color,borderColor:props.color}}>{props.tname}</div>}
        <table className="table" id="table-to-xls">
           <thead style={{color:props.color}}>
                <tr>
                   {props.autoincrement && <th>SNo.</th>}
                    {props.theading.map((val,key)=>{
                        return(<th key={key}>
                                {val}                        
                        </th>);
                    })}
                    {props.action && <th>Action</th>}
                {/* <th>Date</th>
                <th>New Patients</th>
                <th>FollowUp</th>
                <th>Total Cases</th> */}
                </tr>
          
        </thead>
        <tbody>
              {props.data.map((val,key)=>{
                  return(
                       <tr key={key}>
                     {props.autoincrement && <td>{key+1}</td>}
                   {props.theading.map((val1,key1)=>{
                       return(
                          
                          
                           <td key={key1} dataLabel={val1}>
                           {val[val1]}
                           {/* {console.log("val",val,"val1",val1,"key",key,"key1",key1)} */}
                           {/* { console.log(val[val1]+ ' '+key+' ' + key1)} */}
                            
                           </td>
                           
                       );
                    // <td dataLabel="Date">{val.date}</td>
                    // <td dataLabel="New Cases">{val.NewCases}</td>
                    // <td dataLabel="FollowUp">{val.FollowUp}</td>
                    // <td dataLabel="Total Cases">{val.Total}</td>
                      })}
                      {props.action && <td><i onClick={()=>props.deleteRow(key)}><FaIcons.FaTrash/></i></td>}
                </tr>);
              })}
       </tbody>
        </table>
    </div>
);

}
Tablewidget.defaultProps={
    autoincrement:false,
    action:false
}