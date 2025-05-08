import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PlatformOwnerDashboard from "./pages/dashboard/PlatformOwnerDashboard";
import OrganizationManagement from "./pages/organization/OrganizationManagement";
import OrganizationAdd from "./pages/organization/OrganizationAdd";
import OrganizationDetails from "./pages/organization/OrganizationDetails";
import EditOrganization from "./pages/organization/EditOrganization";
import ViewInstitutes from "./pages/organization/ViewInstitutes";
import InstituteDashboard from "./pages/dashboard/InstituteDashboard";
import AddInstitute from "./pages/organization/AddInstitute";
import Platforminsite from "./pages/organization/Platforminsite";
import Settings from "./pages/Setting";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* plateform owner Routes */}
        <Route path="/" element={<PlatformOwnerDashboard />} />
        <Route
          path="/platform/organizations"
          element={<OrganizationManagement />}
        />
        <Route
          path="/platform/organizations/add"
          element={<OrganizationAdd />}
        />
        <Route
          path="/platform/organizations/:id"
          element={<OrganizationDetails />}
        />
        <Route
          path="/platform/organizations/:id/edit"
          element={<EditOrganization />}
        />
        <Route path="/platform/institutes/add" element={<AddInstitute />} />
        <Route
          path="/platform/organizations/:id/institutes"
          element={<ViewInstitutes />}
        />
        <Route path="/platform-insights" element={<Platforminsite />} />

        {/* organization Routes */}
        <Route path="*" element={<div>404 - Page Not Found</div>} />
        <Route path="/settings" element={<Settings />} />

        {/* Institute Routes */}
        <Route path="/institute/dashboard" element={<InstituteDashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
