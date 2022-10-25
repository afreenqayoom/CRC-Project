import React from 'react';
import './Multiselectlist.css';

export default function Multiselectlist(props) {

   const handleChange=()=>{
    let items=document.querySelectorAll('input[name='+ props.name + ']:checked');
    while(props.value.length){
        props.value.pop();
    }
   items.forEach(element => {
       props.value.push(element.value);
    });    

 
    
   }
   React.useEffect(()=>{
    const inputItem=document.querySelectorAll('input[name='+ props.name + ']');
    if(props.flag)
    {
    inputItem.forEach(element=>{
        element.checked=false;
    })
    props.setflag(false);
}
},[props.flag]);

    return (
        <div className="list">
            {props.listTitle &&<h2>{props.listTitle}</h2>}
            <div className="listBody">
                {props.listData.map((item, key) => {
                    return (
                        <>
                        {props.grouped &&
                        <div className="Conditiontitle">
                            <label style={{ color: "#7d2ae8" }}>
                                {item.GroupTitle}
                            </label>
                        </div>}
                        <ul>
                            {item.ListItem.map((listItem, listkey) => {
                                return (
                                    < li >
                                        <label>
                                            <input type="checkbox" name={props.name} value={listItem} onChange={handleChange}/>
                                            <p>{listItem}</p>
                                            <span></span>
                                        </label>
                                    </li>
                                )
                            })}
                        </ul>
                        </>
                    );
                })}
            </div>
        </div>
    )
}
Multiselectlist.defaultProps={
    grouped:false
}