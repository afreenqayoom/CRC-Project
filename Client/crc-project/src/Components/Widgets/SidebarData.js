import React from 'react';
import * as FaIcons from 'react-icons/fa';
// const ut=localStorage.getItem('UT');
export const SidebarData=[
// {
//     menuTitle:"Dashboard",
//     path:"/crc/"+ ut,
//     icon:<FaIcons.FaGem/>,
//     subNav:[]
// },
{
    menuTitle:"Administration",
    path:"/crc/Administration",
    icon:<FaIcons.FaUser/>,
    subNav:[{
        menuTitle:"New User",
        //path:"CreateUser",  
        path:"/crc/Administration/CreateUser", 
        icon:<FaIcons.FaUser/>,
    }
//    {
//     menuTitle:"Financial Year", 
//     path:"/crc/Admin/Financialyear", 
//     icon:<FaIcons.FaCalendar/>,
//    }
]
},
{
    menuTitle:"Registration ",
    path:"/crc/Registration",
    icon:<FaIcons.FaMedkit/>,
    subNav:[{
        menuTitle:"Patient Registration",
        path:"/crc/Registration/Patientregistration",  
        //path:"/home/Registration/Patientregistration",  
        icon:<FaIcons.FaHospitalUser/>, 
    },
    {
        menuTitle:"Patient Reports",
        path:"/crc/Registration/PatientReport", 
        icon:<FaIcons.FaReceipt/>,
    }]
 },
{
    menuTitle:"Search",
    path:"/crc/ViewPatient",
    icon:<FaIcons.FaSearch/>,
    subNav:[]
},
{
    menuTitle:"Accounts ",
    path:"/crc/Accounts",
    icon:<FaIcons.FaBookMedical/>,
    subNav:[{
        menuTitle:"Patient Reciept",
        path:"/crc/Accounts/PatientReciept",  
        icon:<FaIcons.FaAddressCard/>, 
    },
    {
        menuTitle:"View Reciepts",
        path:"/crc/Accounts/ViewReciept", 
        icon:<FaIcons.FaReceipt/>,
    }
]
},
{
    menuTitle:"Physiotherapy",
    path:"/crc/Physiotherapy",
    icon:<FaIcons.FaHeartbeat/>,
    subNav:[{
        menuTitle:"Patient", 
        path:"/crc/Physiotherapy/Patient",  
        icon:<FaIcons.FaUser/>, 
    },
    {
        menuTitle:"Physiotherapy Reports",
        path:"/crc/Physiotherapy/ViewPhysioReport", 
        icon:<FaIcons.FaReceipt/>,
    }
]
}
]