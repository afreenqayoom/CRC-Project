import React from 'react';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

export default function Chartwidget(props) {
  
  return (
     <div style={{ backgroundColor: props.bgColor, width: "100%",borderRadius:"2px"}}>
      <ResponsiveContainer width="98%" height={props.height}>
        <BarChart
          data={props.data}
          margin={{
            top: 15,
            right: 30,
            left: 20,
            bottom: 5
          }}
        >
          <XAxis dataKey={props.dkey} stroke="#fff" />
          <YAxis stroke="#fff"/>
          <Tooltip />
          <Legend />
            {props.listdata.map((val,key)=>{
             //console.log(val + key)
              return(
                <Bar dataKey={val} fill={props.colorlist[key]} />
              );
            })}
        </BarChart>
</ResponsiveContainer>
</div>
  );
}
Chartwidget.defaultProps={
colorlist:["#ccc","#d4caa3"]

}