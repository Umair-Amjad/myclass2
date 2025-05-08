import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SidebarLayout from "./components/layout/SidebarLayout";
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

const router = createBrowserRouter([
  {
    path: "/",
    element: <SidebarLayout />,
    children: [
      // PlatformOnwer Routes
      { path: "", element: <PlatformOwnerDashboard /> },
      { path: "platform/organizations", element: <OrganizationManagement /> },
      { path: "platform/organizations/add", element: <OrganizationAdd /> },
      { path: "platform/organizations/:id", element: <OrganizationDetails /> },
      {
        path: "platform/organizations/:id/edit",
        element: <EditOrganization />,
      },
      { path: "platform/institutes/add", element: <AddInstitute /> },
      {
        path: "platform/organizations/:id/institutes",
        element: <ViewInstitutes />,
      },
      { path: "platform-insights", element: <Platforminsite /> },
      { path: "institute/dashboard", element: <InstituteDashboard /> },
      { path: "settings", element: <Settings /> },
      { path: "*", element: <div className="p-4">404 - Page Not Found</div> },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
