import React from 'react';
import './Layout.css'
import Sidebar from '../Widgets/Sidebar';
import { useState} from 'react';
import { Outlet } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
import {ToastContainer,toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Layout() {
    const imsg="Login Successfull"
    React.useEffect(()=>{
        toast.success("Login Successfull..");
    },[imsg])
    // const {state} = useLocation();
    // if(state)
    // const { id } = state;
     console.log(localStorage.getItem('UN'));
    
    const [sidebar, setsidebar] = useState(false);
    const [smallbar, setbar] = useState(false);
    const screenw = useState(window.innerWidth);
    const toggleSidebar = () => {
        const db = document.querySelector(".sidebar-container");
        if (screenw[0] > 599) {
            sidebar ? setsidebar(false) : setsidebar(true);
        }
        if (screenw[0] <= 599 && smallbar) {

            setsidebar(false);
            // db.classList.add('removeside');
            db.classList.remove('openside');
        }
        else if (screenw[0] <= 599 && !smallbar) {

            setsidebar(false);
            db.classList.add('openside');
        }
        smallbar ? setbar(false) : setbar(true);
    };
    return (
        <div className="layoutcontainer">
           
                <div className="layoutheader">
                    <div className="hamburger" id="hamburger" onClick={() => toggleSidebar()}>
                        <span>
                        <i><FaIcons.FaBars/></i>
                            {/* <i className="fa fa-bars" aria-hidden="true"></i> */}
                        </span>
                    </div>
                    <span className="app-title">Composited Regional Centre Srinagar</span>
                </div>
          

            <div className="layoutbody">

                <div className="sidebar-container">
                    <Sidebar sidebar={sidebar}/>
                </div>
                <div className="content-container">
               
                    <Outlet />
              
                </div>

            </div>
            <div className="layoutfooter">
            <p>© Copyright Reserved 2022 - Composite Regional Centre, Srinagar</p>
            </div>
            <ToastContainer position="top-center" autoClose={2000} limit={1}/>
        </div>
    )
}
