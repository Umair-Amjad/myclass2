import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Lazy load components
const AdminDashboard = lazy(() => import("./pages/dashboard/AdminDashboard"));
const OrganizationManagement = lazy(() => import("./pages/organization/OrganizationManagement"));
const OrganizationAdd = lazy(() => import("./pages/organization/OrganizationAdd"));
const OrganizationDetails = lazy(() => import("./pages/organization/OrganizationDetails"));
const ViewInstitutes = lazy(() => import("./pages/organization/ViewInstitutes"));
const InstituteDashboard = lazy(() => import("./pages/dashboard/InstituteDashboard"));

// Loading component
const LoadingFallback = () => (
  <div className="h-screen w-full flex items-center justify-center bg-gray-50">
    <div className="text-center">
      <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
      <p className="mt-4 text-gray-600">Loading...</p>
    </div>
  </div>
);

// Error boundary for lazy loaded components
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
            <h2 className="text-xl font-bold text-red-600 mb-4">Something went wrong</h2>
            <p className="text-gray-600 mb-4">We're sorry, but there was an error loading this page.</p>
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

const App = () => {
  return (
    <Router>
      <ErrorBoundary>
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/dashboard" element={<AdminDashboard />} />
            <Route path="/organizations" element={<OrganizationManagement />} />
            <Route path="/organizations/add" element={<OrganizationAdd />} />
            <Route path="/organizations/:id" element={<OrganizationDetails />} />
            <Route path="/institute/dashboard" element={<InstituteDashboard />} />
            <Route
              path="/organizations/:id/institutes"
              element={<ViewInstitutes />}
            />
            
            <Route path="/" element={<AdminDashboard />} />
            <Route path="*" element={<div>404 - Page Not Found</div>} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </Router>
  );
};

export default App;
