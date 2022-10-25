import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import { NavLink } from 'react-router-dom';
import '../../Routes/AppRoutes';
import React from 'react';
import { SidebarData } from './SidebarData';
import axios from '../../axios';
import { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import {toast} from 'react-toastify';
export default function Sidebar(props) {
    // const [sidebar, setsidebar] = useState(false);

    // const toggleSidebar = () => {
    //     sidebar ? setsidebar(false):setsidebar(true);
    //     };
const [menu,setmenu]=useState([]);

React.useEffect(()=>{
    let mdata=[];
    axios.post("getmenu", {
        USER_ID:localStorage.getItem('UN')
    }).then((response) => {
        // setmmenu(1,response.data[0].Admin,response.data[0].Registration,response.data[0].Search,response.data[0].Accounts,response.data[0].Physiotherapy);
       // mdata[0]=1;
        mdata[0]=response.data[0].Admin;
        mdata[1]=response.data[0].Registration;
        mdata[2]=response.data[0].Search;
        mdata[3]=response.data[0].Accounts;
        mdata[4]=response.data[0].Physiotherapy;
        setmenu(mdata);
        console.log(mdata);
        console.log(localStorage.getItem('UT'))
    }).catch((error)=>{
        toast.error(error.message, {
          position: "top-center",autoClose: 2000});})
},[])
    return (
        <div style={{ minHeight: '100%', backgroundColor: 'black' }}>
            {/* <div className="hamburger" id="hamburger" onClick={() => toggleSidebar()}>
           <span>
                <i className="fa fa-bars" aria-hidden="true"></i>
          </span>
          
        </div> */}
            <ProSidebar collapsed={props.sidebar}>
                <Menu iconShape="circle">
                <MenuItem icon={<FaIcons.FaGem/>}><NavLink to={"/crc/" + localStorage.getItem('UT')}>Dashboard</NavLink></MenuItem>
                    {SidebarData.map((item, index) => {
                         

                        return (
                           
                           (menu[index]===1) ?(
                           
                          (item.subNav.length === 0) ?
                            (
                                <MenuItem icon={item.icon}> <NavLink to={item.path}>{item.menuTitle}</NavLink></MenuItem>
                            ):
                            (  
                                        <SubMenu title={<NavLink to={item.path}>{item.menuTitle}</NavLink>} icon={item.icon}>
                                        {item.subNav.map((subitem, subindex) => {
                                            return(
                                                <MenuItem icon={subitem.icon}> <NavLink to={subitem.path}>{subitem.menuTitle}</NavLink></MenuItem>
                                            )
                                        })
                                        }
                                        </SubMenu>
                            ) 
                            //

                           
                        ):null
                        )
                    
                    })}
                     <MenuItem icon={<FaIcons.FaPowerOff/>}><NavLink to="/">Logout</NavLink></MenuItem>
                    {/* <MenuItem icon={<FaIcons.FaGem />}> <NavLink to={"/home/Admin"}>Dashboard</NavLink></MenuItem>
                    
                <SubMenu title="Services" icon={<FaIcons.FaHeart />}>
                    <SubMenu title={<NavLink to={"/home/Registration"}>Registration</NavLink>} icon={<FaIcons.FaHeart />} >
                    
                        <MenuItem>Cardio Therapy</MenuItem>
                        <MenuItem>Heat Therapy</MenuItem>
                    </SubMenu>

                    <MenuItem>Treatment</MenuItem>
                </SubMenu>
                <SubMenu title="Products" icon={<FaIcons.FaBars />}>
                    <MenuItem>Component 1</MenuItem>
                    <MenuItem>Component 2</MenuItem>
                </SubMenu> */}
                </Menu>

            </ProSidebar>

        </div>
    );
}