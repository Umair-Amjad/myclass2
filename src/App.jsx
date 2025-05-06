import React from "react";
import {BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EditOrganization from "./pages/organization/EditOrganization";
import ViewInstitutes from "./pages/organization/ViewInstitutes";
import InstituteDashboard from "./pages/dashboard/InstituteDashboard";
import AddInstitute from "./pages/organization/AddInstitute";
import AdminDashboard from "./pages/dashboard/AdminDashboard";
import OrganizationManagement from "./pages/organization/OrganizationManagement";
import OrganizationAdd from "./pages/organization/OrganizationAdd";
import OrganizationDetails from "./pages/organization/OrganizationDetails";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/signup";

const App = () => {
  return (

    <Router>
      <Routes>
        <Route path="/dashboard" element={<AdminDashboard />} />
        <Route path="/organizations" element={<OrganizationManagement />} />
        <Route path="/organizations/add" element={<OrganizationAdd />} />
        <Route path="/organizations/:id" element={<OrganizationDetails />} />
        <Route path="/organizations/:id/edit" element={<EditOrganization />} />
        <Route path="/institute/dashboard" element={<InstituteDashboard />} />
        <Route path="/institutes/add" element={<AddInstitute />} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/Signup" element={<Signup/>}/>
        <Route
          path="/organizations/:id/institutes"
          element={<ViewInstitutes />}
        />
        {/* <Route path="/" element={<AdminDashboard />} /> */}
        <Route path="*" element={<div>404 - Page Not Found</div>} />
      </Routes>
    </Router>
  );
};

export default App;
