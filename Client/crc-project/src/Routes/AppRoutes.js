import React from 'react';
import Login from '../Components/Login/Login';
import Layout from '../Components/Layout/Layout';
import RegistrationDashboard from '../Components/Patientreg/RegistrationDashboard';
import Patientreg from '../Components/Patientreg/Patientreg';
import Viewpatient from '../Components/Viewpatient/Viewpatient';
import RecieptDashboard from '../Components/Reciept/RecieptDashboard';
import Reciept from '../Components/Reciept/Reciept';
import ViewReciept from '../Components/Reciept/ViewReciept';
import PhysiotherapyDashboard from '../Components/Physiotherapy/PhysiotherapyDashboard';
import Physiotherapy from '../Components/Physiotherapy/Physiotherapy';
import ViewPhysioReport from '../Components/Physiotherapy/ViewPhysioReport';
import AdminDashboard from '../Components/Admin/AdminDashboard';
import CreateUser from '../Components/Createuser/Createuser';
import PatientReport from '../Components/PatientReport/PatientReport';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RequireAuth from '../hooks/RequireAuth';
import { Outlet } from 'react-router';
export default function AppRoutes() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route element={<RequireAuth/>}>
                <Route path="/crc" exact element={<Layout />}>
                    <Route path="Guest" element={<Outlet/>}/>
                    <Route path="Registration" element={<RegistrationDashboard />} />
                    <Route path="Registration/Patientregistration" element={<Patientreg />} />
                    <Route path="Registration/PatientReport" element={<PatientReport/>}/>
                    <Route path="ViewPatient" element={<Viewpatient />} />
                    <Route path="Accounts" element={<RecieptDashboard />}/>
                        <Route path="Accounts/PatientReciept" element={<Reciept />} />
                        <Route path="Accounts/ViewReciept" element={<ViewReciept />} />
                    
                    <Route path="Physiotherapy" element={<PhysiotherapyDashboard />}/>
                        <Route path="Physiotherapy/Patient" element={<Physiotherapy />} />
                        <Route path="Physiotherapy/ViewPhysioReport" element={<ViewPhysioReport/>}/>
                   
                    <Route path="Administration" element={<AdminDashboard />}/>
                        <Route path="Administration/CreateUser" element={<CreateUser />} />
                        {/* <Route path="Administration/Financialyear" element={<Financialyear/>}/> */}
                    
                </Route>
                </Route>
                <Route path="*" element={<Login/>}/>
            </Routes>
        </Router>
    )
}