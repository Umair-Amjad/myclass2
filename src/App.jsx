import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { store } from './store';
import AdminDashboard from './pages/dashboard/AdminDashboard';
import OrganizationManagement from './pages/organization/OrganizationManagement';
import OrganizationAdd from './pages/organization/OrganizationAdd';
import OrganizationDetails from './pages/organization/OrganizationDetails';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/dashboard" element={<AdminDashboard />} />
          <Route path="/organizations" element={<OrganizationManagement />} />
          <Route path="/organizations/add" element={<OrganizationAdd/>}/>
          <Route path="/organizations/:id" element={<OrganizationDetails />} />
          {/* <Route path="/organizations/:id" element={<div>View Organization Details (To Be Implemented)</div>} />
          <Route path="/organizations/:id/edit" element={<div>Edit Organization (To Be Implemented)</div>} />
          <Route path="/organizations/:id/institutes" element={<div>View Institutes (To Be Implemented)</div>} />
          <Route path="/organizations/add" element={<div>Add Organization (To Be Implemented)</div>} /> */}
          <Route path="/" element={<AdminDashboard />} />
          {/* <Route path="*" element={<div>404 - Page Not Found</div>} /> */}
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;