import React, { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/signup";
import ForgetPassword from "./pages/Auth/Forgetpassword";

// Layout

// Lazy load major pages
const PlatformOwnerDashboard = lazy(() =>
  import("./pages/dashboard/PlatformOwnerDashboard")
);
const OrganizationManagement = lazy(() =>
  import("./pages/organization/OrganizationManagement")
);
const OrganizationAdd = lazy(() =>
  import("./pages/organization/OrganizationAdd")
);
const OrganizationDetails = lazy(() =>
  import("./pages/organization/OrganizationDetails")
);
const EditOrganization = lazy(() =>
  import("./pages/organization/EditOrganization")
);
const ViewInstitutes = lazy(() =>
  import("./pages/organization/ViewInstitutes")
);
const InstituteDashboard = lazy(() =>
  import("./pages/dashboard/InstituteDashboard")
);
const AddInstitute = lazy(() => import("./pages/organization/AddInstitute"));
const Platforminsite = lazy(() =>
  import("./pages/organization/Platforminsite")
);
const Settings = lazy(() => import("./pages/Setting"));
const SidebarLayout = lazy(() => import("./components/layout/SidebarLayout"));

// Fallback loader
const LoadingFallback = () => (
  <div className="h-screen w-full flex items-center justify-center bg-gray-50">
    <div className="text-center">
      <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
      <p className="mt-4 text-gray-600">Loading...</p>
    </div>
  </div>
);

// Error Boundary
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="h-screen w-full flex items-center justify-center bg-gray-50">
          <div className="text-center max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-red-600 mb-4">
              Something went wrong
            </h2>
            <p className="text-gray-600 mb-4">
              We're sorry, but there was an error loading this page.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Router setup
const router = createBrowserRouter([
  {
    path: "/",
    element: <SidebarLayout />,
    children: [
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
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
    // { path: "forget", element: <ForgetPassword /> },
  },
  {
    path: "/forget",
    element: <ForgetPassword/>
  }
]);

// Final App
const App = () => {
  return (
    <ErrorBoundary>
      <Suspense fallback={<LoadingFallback />}>
        <RouterProvider router={router} />
      </Suspense>
    </ErrorBoundary>
  );
};

export default App;
