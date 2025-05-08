import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDashboardMetrics } from "../../store/slices/dashboardSlice";
import AdminSidebar from "../../components/layout/AdminSidebar";
import { Link, useNavigate } from "react-router-dom";
import { Line, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const PlatformOwnerDashboard = () => {
  const dispatch = useDispatch();
  const { metrics, loading, error } = useSelector((state) => state.dashboard);
  const [isOpen, setIsOpen] = useState(false);
  const [growthPeriod, setGrowthPeriod] = useState("Monthly");
  const navigate = useNavigate();

  const toggleSidebar = () => setIsOpen(!isOpen);

  useEffect(() => {
    dispatch(fetchDashboardMetrics());
  }, [dispatch]);

  // Handle Refresh button click
  const handleRefresh = () => {
    dispatch(fetchDashboardMetrics());
  };

  // Handle Organization button click (placeholder)
  const handleOrganization = () => {
    console.log(
      "Organization button clicked - functionality to be implemented"
    );
    navigate("platform/organizations");
  };

  // User Growth Line Chart Data (switch between Monthly and Yearly)
  const userGrowthData = {
    labels:
      growthPeriod === "Monthly"
        ? metrics.userGrowthMonthly
          ? metrics.userGrowthMonthly.map((trend) => trend.month)
          : []
        : metrics.userGrowthYearly
        ? metrics.userGrowthYearly.map((trend) => trend.year)
        : [],
    datasets: [
      {
        label: "New Users",
        data:
          growthPeriod === "Monthly"
            ? metrics.userGrowthMonthly
              ? metrics.userGrowthMonthly.map((trend) => trend.users)
              : []
            : metrics.userGrowthYearly
            ? metrics.userGrowthYearly.map((trend) => trend.users)
            : [],
        fill: false,
        borderColor: "rgba(34, 197, 94, 0.8)",
        tension: 0.4,
      },
    ],
  };

  // User Distribution Doughnut Chart Data
  const userDistributionData = {
    labels: ["Teachers", "Students", "Admins", "Others"],
    datasets: [
      {
        data: [
          metrics.teachers || 0,
          metrics.students || 0,
          metrics.admins || 0,
          metrics.others || 0,
        ],
        backgroundColor: [
          "rgba(59, 130, 246, 0.8)",
          "rgba(255, 99, 132, 0.8)",
          "rgba(255, 206, 86, 0.8)",
          "rgba(54, 162, 235, 0.8)",
        ],
        borderColor: [
          "rgba(59, 130, 246, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(54, 162, 235, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "#1F2937",
        },
      },
      title: {
        display: true,
        color: "#1F2937",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: "#1F2937",
        },
      },
      x: {
        ticks: {
          color: "#1F2937",
        },
      },
    },
  };

  // Dummy data for recent organizations (replace with actual data from metrics if available)
  const recentOrganizations = [
    {
      id: 1,
      name: "Acme Schools",
      type: "K-12",
      status: "Active",
      users: 245,
      institutes: 3,
    },
    {
      id: 2,
      name: "Better Education Group",
      type: "Higher Education",
      status: "Active",
      users: 512,
      institutes: 2,
    },
    {
      id: 3,
      name: "City College",
      type: "College",
      status: "Active",
      users: 189,
      institutes: 1,
    },
    {
      id: 4,
      name: "Digital Learning",
      type: "Online",
      status: "Pending",
      users: 56,
      institutes: 1,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <AdminSidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col md:ml-64">
        {/* Header */}
        {/* <DashboardHeader isOpen={isOpen} toggleSidebar={toggleSidebar} /> */}

        {/* Dashboard Content */}
        <main className="p-24 flex-1">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-4xl font-bold text-gray-800 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-500">
              PlatformOwner Dashboard
            </h1>
            <div className="flex space-x-3">
              <button
                onClick={handleRefresh}
                className="flex items-center px-4 py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 transition-colors"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                Refresh
              </button>
              <button
                onClick={handleOrganization}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 10h16M4 14h16M4 18h16"
                  />
                </svg>
                Organizations
              </button>
            </div>
          </div>

          {error && (
            <p className="text-red-500 bg-red-100 p-3 rounded-lg mb-4">
              {error}
            </p>
          )}

          {/* Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-gradient-to-br from-blue-500 to-blue-700 text-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="flex items-center space-x-4">
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
                <div>
                  <h3 className="text-lg font-medium">Total Users</h3>
                  <p className="text-3xl font-bold">
                    {loading ? "Loading..." : metrics.totalUsers || "0"}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-green-500 to-green-700 text-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="flex items-center space-x-4">
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7v-2a3 3 0 005.356-1.857M17 20V9m-5 11V9m-5 11V9m5 11a3 3 0 01-5.356-1.857M7 9H5v2a3 3 0 005.356 1.857M7 9V5a3 3 0 016 0v4m-6 0h6"
                  />
                </svg>
                <div>
                  <h3 className="text-lg font-medium">Organizations</h3>
                  <p className="text-3xl font-bold">
                    {loading ? "Loading..." : metrics.organizations || "0"}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-purple-500 to-purple-700 text-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="flex items-center space-x-4">
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"
                  />
                </svg>
                <div>
                  <h3 className="text-lg font-medium">Institutes</h3>
                  <p className="text-3xl font-bold">
                    {loading ? "Loading..." : metrics.institutes || "0"}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-orange-500 to-orange-700 text-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="flex items-center space-x-4">
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <div>
                  <h3 className="text-lg font-medium">Admins</h3>
                  <p className="text-3xl font-bold">
                    {loading ? "Loading..." : metrics.admins || "0"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Analytics Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Analytics
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* User Growth Line Chart */}
              <div className="bg-white p-6 rounded-xl shadow-lg card-glass h-80">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-gray-700">
                    User Growth
                  </h3>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setGrowthPeriod("Monthly")}
                      className={`px-3 py-1 rounded-full text-sm font-medium text-white ${
                        growthPeriod === "Monthly"
                          ? "bg-blue-600"
                          : "bg-blue-400"
                      } hover:bg-blue-700 transition-colors`}
                    >
                      Monthly
                    </button>
                    <button
                      onClick={() => setGrowthPeriod("Yearly")}
                      className={`px-3 py-1 rounded-full text-sm font-medium text-white ${
                        growthPeriod === "Yearly"
                          ? "bg-blue-600"
                          : "bg-blue-400"
                      } hover:bg-blue-700 transition-colors`}
                    >
                      Yearly
                    </button>
                  </div>
                </div>
                {loading ? (
                  <p className="text-center text-gray-500">Loading...</p>
                ) : (
                  <div className="h-60">
                    <Line
                      data={userGrowthData}
                      options={{
                        ...chartOptions,
                        plugins: {
                          ...chartOptions.plugins,
                          title: { display: false },
                        },
                      }}
                    />
                  </div>
                )}
              </div>
              {/* User Distribution Doughnut Chart */}
              <div className="bg-white p-6 rounded-xl shadow-lg card-glass h-80">
                <h3 className="text-lg font-medium text-gray-700 mb-4">
                  User Distribution
                </h3>
                {loading ? (
                  <p className="text-center text-gray-500">Loading...</p>
                ) : (
                  <div className="h-60 flex items-center justify-center">
                    <Doughnut
                      data={userDistributionData}
                      options={{
                        ...chartOptions,
                        plugins: {
                          ...chartOptions.plugins,
                          title: { display: false },
                        },
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Quick Actions
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Link
                to="/platform/organizations/add"
                className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow flex items-center justify-between"
              >
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 rounded-full">
                    <svg
                      className="w-6 h-6 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a2 2 0 012-2h2a2 2 0 012 2v5m-4 0h4"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      Add Organization
                    </h3>
                    <p className="text-sm text-gray-500">
                      Create a new organization
                    </p>
                  </div>
                </div>
                <svg
                  className="w-5 h-5 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
              <Link
                to="/admins/manage"
                className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow flex items-center justify-between"
              >
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-purple-100 rounded-full">
                    <svg
                      className="w-6 h-6 text-purple-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      Manage Admins
                    </h3>
                    <p className="text-sm text-gray-500">
                      Add or remove super admins
                    </p>
                  </div>
                </div>
                <svg
                  className="w-5 h-5 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
              <Link
                to="/settings"
                className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow flex items-center justify-between"
              >
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-orange-100 rounded-full">
                    <svg
                      className="w-6 h-6 text-orange-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      Platform Settings
                    </h3>
                    <p className="text-sm text-gray-500">
                      Configure system settings
                    </p>
                  </div>
                </div>
                <svg
                  className="w-5 h-5 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
              <Link
                to="/analytics"
                className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow flex items-center justify-between"
              >
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-green-100 rounded-full">
                    <svg
                      className="w-6 h-6 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 elyn24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      View Analytics
                    </h3>
                    <p className="text-sm text-gray-500">
                      Full platform analytics
                    </p>
                  </div>
                </div>
                <svg
                  className="w-5 h-5 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </div>
          </div>

          {/* Recent Organizations Table */}
          <div className="bg-white p-6 rounded-xl shadow-lg backdrop-blur-sm bg-opacity-80">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-gray-800">
                Recent Organizations
              </h2>
              <Link
                to="/organizations"
                className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
              >
                View All
                <svg
                  className="w-5 h-5 ml-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </div>
            <table className="w-full text-left">
              <thead>
                <tr className="border-b">
                  <th className="py-3 text-gray-600">Name</th>
                  <th className="py-3 text-gray-600">Type</th>
                  <th className="py-3 text-gray-600">Status</th>
                  <th className="py-3 text-gray-600">Users</th>
                  <th className="py-3 text-gray-600">Institutes</th>
                  <th className="py-3 text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="6" className="py-4 text-center text-gray-500">
                      Loading...
                    </td>
                  </tr>
                ) : recentOrganizations && recentOrganizations.length > 0 ? (
                  recentOrganizations.map((org) => (
                    <tr
                      key={org.id}
                      className="border-b hover:bg-gray-50 transition-colors"
                    >
                      <td className="py-3 flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 font-bold">
                          {org.name.charAt(0).toUpperCase()}
                        </div>
                        <span>{org.name}</span>
                      </td>
                      <td className="py-3">{org.type}</td>
                      <td className="py-3">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            org.status === "Active"
                              ? "bg-green-100 text-green-700"
                              : "bg-orange-100 text-orange-700"
                          }`}
                        >
                          {org.status}
                        </span>
                      </td>
                      <td className="py-3">{org.users}</td>
                      <td className="py-3">{org.institutes}</td>
                      <td className="py-3">
                        <Link
                          to={`/organizations/${org.id}`}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="py-4 text-center text-gray-500">
                      No organizations found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
};

export default PlatformOwnerDashboard;
