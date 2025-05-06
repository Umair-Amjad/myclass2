import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDashboardMetrics } from "../../store/slices/dashboardSlice";
import AdminSidebar from "../../components/layout/AdminSidebar";
import DashboardHeader from "../../components/layout/DashboardHeader";
import { Link } from "react-router-dom";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
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
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const InstituteDashboard = () => {
  const dispatch = useDispatch();
  const { metrics, loading, error } = useSelector((state) => state.dashboard);
  const { institutes } = useSelector((state) => state.institute);
  const [isOpen, setIsOpen] = useState(false);
  const [growthPeriod, setGrowthPeriod] = useState("Monthly");

  const toggleSidebar = () => setIsOpen(!isOpen);

  useEffect(() => {
    dispatch(fetchDashboardMetrics());
  }, [dispatch]);

  // Handle Refresh button click
  const handleRefresh = () => {
    dispatch(fetchDashboardMetrics());
  };

  // Chart Options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: { color: "#1F2937" },
      },
      title: { display: true, color: "#1F2937" },
    },
    scales: {
      y: { beginAtZero: true, ticks: { color: "#1F2937" } },
      x: { ticks: { color: "#1F2937" } },
    },
  };

  // Bar Chart Data (Institute Metrics)
  const instituteMetricsData = {
    labels: ["Students", "Teachers", "Classes"],
    datasets: [
      {
        label: "Count",
        data: [
          metrics.instituteStudents || 0,
          metrics.instituteTeachers || 0,
          metrics.instituteClasses || 0,
        ],
        backgroundColor: ["#3B82F6", "#10B981", "#8B5CF6"],
      },
    ],
  };

  // Doughnut Chart Data (Attendance Rate)
  const attendanceRateData = {
    labels: ["Present", "Absent"],
    datasets: [
      {
        data: [92, 8], // Static for now, replace with dynamic data if available
        backgroundColor: ["#10B981", "#EF4444"],
        borderColor: ["#10B981", "#EF4444"],
        borderWidth: 1,
      },
    ],
  };

  // Line Chart Data (Institute Growth Trends)
  const instituteGrowthData = {
    labels:
      growthPeriod === "Monthly"
        ? metrics.instituteGrowthMonthly
          ? metrics.instituteGrowthMonthly.map((trend) => trend.month)
          : []
        : metrics.instituteGrowthYearly
        ? metrics.instituteGrowthYearly.map((trend) => trend.year)
        : [],
    datasets: [
      {
        label: "Institute Growth",
        data:
          growthPeriod === "Monthly"
            ? metrics.instituteGrowthMonthly
              ? metrics.instituteGrowthMonthly.map((trend) => trend.count)
              : []
            : metrics.instituteGrowthYearly
            ? metrics.instituteGrowthYearly.map((trend) => trend.count)
            : [],
        fill: false,
        borderColor: "#F59E0B",
        tension: 0.4,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <AdminSidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col md:ml-64">
        {/* Header */}
        <DashboardHeader isOpen={isOpen} toggleSidebar={toggleSidebar} />

        {/* Dashboard Content */}
        <main className="p-24 flex-1">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-4xl font-bold text-gray-800 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-500">
              Institute Dashboard
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
              <Link
                to="/institutes/add"
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
                Add Institute
              </Link>
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
                  <h3 className="text-lg font-medium">Total Students</h3>
                  <p className="text-3xl font-bold">
                    {loading ? "Loading..." : metrics.instituteStudents || "0"}
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
                  <h3 className="text-lg font-medium">Total Teachers</h3>
                  <p className="text-3xl font-bold">
                    {loading ? "Loading..." : metrics.instituteTeachers || "0"}
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
                  <h3 className="text-lg font-medium">Total Classes</h3>
                  <p className="text-3xl font-bold">
                    {loading ? "Loading..." : metrics.instituteClasses || "0"}
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
                  <h3 className="text-lg font-medium">Attendance Rate</h3>
                  <p className="text-3xl font-bold">
                    {loading ? "Loading..." : "92%"}
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Institute Metrics Bar Chart */}
              <div className="bg-white p-6 rounded-xl shadow-lg h-80">
                <h3 className="text-lg font-medium text-gray-700 mb-4">
                  Institute Metrics
                </h3>
                {loading ? (
                  <p className="text-center text-gray-500">Loading...</p>
                ) : (
                  <div className="h-60">
                    <Bar
                      data={instituteMetricsData}
                      options={{
                        ...chartOptions,
                        plugins: {
                          ...chartOptions.plugins,
                          title: { display: false },
                        },
                        scales: { y: { beginAtZero: true, max: 500 } },
                      }}
                    />
                  </div>
                )}
              </div>
              {/* Attendance Rate Doughnut Chart */}
              <div className="bg-white p-6 rounded-xl shadow-lg h-80">
                <h3 className="text-lg font-medium text-gray-700 mb-4">
                  Attendance Rate
                </h3>
                {loading ? (
                  <p className="text-center text-gray-500">Loading...</p>
                ) : (
                  <div className="h-60 flex items-center justify-center">
                    <Doughnut
                      data={attendanceRateData}
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
              {/* Institute Growth Line Chart */}
              <div className="bg-white p-6 rounded-xl shadow-lg h-80">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-gray-700">
                    Institute Growth
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
                      data={instituteGrowthData}
                      options={{
                        ...chartOptions,
                        plugins: {
                          ...chartOptions.plugins,
                          title: { display: false },
                        },
                        scales: { y: { beginAtZero: true, max: 100 } },
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
                to="/institutes/add"
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
                      Add Institute
                    </h3>
                    <p className="text-sm text-gray-500">
                      Create a new institute
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
                to="/institutes/manage"
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
                      Manage Institutes
                    </h3>
                    <p className="text-sm text-gray-500">
                      View or edit institutes
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

          {/* Recent Institutes Table */}
          <div className="bg-white p-6 rounded-xl shadow-lg backdrop-blur-sm bg-opacity-80">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-gray-800">
                Recent Institutes
              </h2>
              <Link
                to="/institutes"
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
                  <th className="py-3 text-gray-600">Students</th>
                  <th className="py-3 text-gray-600">Classes</th>
                  <th className="py-3 text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {institutes.length > 0 ? (
                  institutes.map((institute) => (
                    <tr
                      key={institute.id}
                      className="border-b hover:bg-gray-50 transition-colors"
                    >
                      <td className="py-3 flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 font-bold">
                          {institute.name.charAt(0).toUpperCase()}
                        </div>
                        <span>{institute.name}</span>
                      </td>
                      <td className="py-3">{institute.type}</td>
                      <td className="py-3">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            institute.status === "Active"
                              ? "bg-green-100 text-green-700"
                              : "bg-orange-100 text-orange-700"
                          }`}
                        >
                          {institute.status}
                        </span>
                      </td>
                      <td className="py-3">{institute.students}</td>
                      <td className="py-3">{institute.classes}</td>
                      <td className="py-3">
                        <Link
                          to={`/institutes/${institute.id}`}
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
                      No institutes found
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

export default InstituteDashboard;
