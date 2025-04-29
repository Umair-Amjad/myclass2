import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import AdminSidebar from "../../components/layout/AdminSidebar";
import DashboardHeader from "../../components/layout/DashboardHeader";

const ViewInstitutes = () => {
  const { id } = useParams(); // Get organization ID from URL
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [organization, setOrganization] = useState(null);
  const [institutes, setInstitutes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [filterType, setFilterType] = useState("");

  const toggleSidebar = () => setIsOpen(!isOpen);

  useEffect(() => {
    // Fetch organization data from localStorage
    const organizationsData = localStorage.getItem("organizations");
    const organizations = organizationsData ? JSON.parse(organizationsData) : [];
    const org = organizations.find((o) => o.id === parseInt(id));
    if (org) {
      setOrganization(org);
      // For now, use empty institutes (to match the image); replace with backend API later
      setInstitutes([]);
    } else {
      navigate("/organizations");
    }
  }, [id, navigate]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    // Add search logic here if institutes data exists
  };

  const handleSort = (e) => {
    setSortBy(e.target.value);
    // Add sorting logic here if institutes data exists
  };

  const handleFilterType = (e) => {
    setFilterType(e.target.value);
    // Add filtering logic here if institutes data exists
  };

  if (!organization) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-600">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-gray-100 to-indigo-50 flex">
      {/* Sidebar */}
      <AdminSidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          isOpen ? "md:ml-64" : "md:ml-16"
        }`}
      >
        {/* Header */}
        <DashboardHeader isOpen={isOpen} toggleSidebar={toggleSidebar} />

        {/* Institutes Content */}
        <main className="py-8 px-0 max-w-6xl ml-64">
          {/* Title */}
          <div className="flex items-center mb-6">
            <h1 className="text-3xl font-extrabold text-gray-800">
              {organization.name} - Institutes
            </h1>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 w-full sm:w-auto">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Search by name"
                  value={searchQuery}
                  onChange={handleSearch}
                  className="w-full sm:w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <svg
                  className="w-5 h-5 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <select
                value={sortBy}
                onChange={handleSort}
                className="border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">Sort by</option>
                <option value="name">Name</option>
                <option value="type">Type</option>
                <option value="location">Location</option>
                <option value="status">Status</option>
              </select>
              <select
                value={filterType}
                onChange={handleFilterType}
                className="border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">All Types</option>
                <option value="college">College</option>
                <option value="school">School</option>
              </select>
            </div>
            <Link
              to={`/organizations/${id}/institutes/add`}
              className="mt-3 sm:mt-0 px-5 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition-all duration-200 transform hover:scale-105"
            >
              Add Institute
            </Link>
          </div>

          {/* Institutes Table */}
          <div className="bg-white py-6 px-6 rounded-2xl shadow-lg">
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto">
                <thead>
                  <tr className="bg-gray-50 text-gray-700">
                    <th className="px-6 py-4 text-left font-semibold">Name</th>
                    <th className="px-6 py-4 text-left font-semibold">Type</th>
                    <th className="px-6 py-4 text-left font-semibold">Email</th>
                    <th className="px-6 py-4 text-left font-semibold">Location</th>
                    <th className="px-6 py-4 text-left font-semibold">Status</th>
                    <th className="px-6 py-4 text-left font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {institutes.length > 0 ? (
                    institutes.map((institute) => (
                      <tr key={institute.id} className="border-b hover:bg-gray-50">
                        <td className="px-6 py-4 text-gray-800">{institute.name}</td>
                        <td className="px-6 py-4 text-gray-600">{institute.type}</td>
                        <td className="px-6 py-4 text-gray-600">{institute.email}</td>
                        <td className="px-6 py-4 text-gray-600">{institute.location}</td>
                        <td className="px-6 py-4 text-gray-600">{institute.status}</td>
                        <td className="px-6 py-4">
                          <button className="text-indigo-600 hover:text-indigo-800 mr-3">
                            Edit
                          </button>
                          <button className="text-red-500 hover:text-red-700">
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center py-10">
                        <svg
                          className="w-12 h-12 mx-auto text-gray-400 mb-3"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5s3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18s-3.332-.477-4.5-1.253"
                          />
                        </svg>
                        <p className="text-gray-500 text-lg">No institutes found for this organization</p>
                        <Link
                          to={`/organizations/${id}/institutes/add`}
                          className="mt-4 inline-block px-5 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition-all duration-200 transform hover:scale-105"
                        >
                          ADD FIRST INSTITUTE
                        </Link>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Back Button */}
          <div className="mt-10 flex justify-start">
            <Link
              to={`/organizations/${id}`}
              className="flex items-center px-5 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition-all duration-200 transform hover:scale-105 mr-10"
            >
              <svg
                className="w-6 h-6 mr-2 transform transition-transform duration-200 hover:-translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back to Organization
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ViewInstitutes;