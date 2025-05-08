import React, { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import AdminSidebar from "../../components/layout/AdminSidebar";

const OrganizationManagement = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState({});
  const buttonRefs = useRef({});
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState(""); // State for sorting
  const [filterType, setFilterType] = useState(""); // State for filtering by type
  const [organizations, setOrganizations] = useState([]);
  const [metrics, setMetrics] = useState({
    organizations: 0,
    activeOrganizations: 0,
    pendingOrganizations: 0,
    institutes: 0,
    totalUsers: 0,
  });

  const toggleSidebar = () => setIsOpen(!isOpen);

  // Fetch organizations from localStorage and calculate metrics
  useEffect(() => {
    const storedOrganizations =
      JSON.parse(localStorage.getItem("organizations")) || [];
    setOrganizations(storedOrganizations);

    // Calculate metrics
    const activeOrgs = storedOrganizations.filter(
      (org) => org.status === "Active"
    ).length;
    const pendingOrgs = storedOrganizations.filter(
      (org) => org.status === "Pending"
    ).length;
    setMetrics({
      organizations: storedOrganizations.length,
      activeOrganizations: activeOrgs,
      pendingOrganizations: pendingOrgs,
      institutes: 0,
      totalUsers: 0,
    });
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      let isClickInsideAnyButtonOrDropdown = false;

      Object.entries(buttonRefs.current).forEach(([id, buttonRef]) => {
        const dropdown = buttonRef?.nextSibling;
        if (
          (buttonRef && buttonRef.contains(event.target)) ||
          (dropdown && dropdown.contains(event.target))
        ) {
          isClickInsideAnyButtonOrDropdown = true;
        }
      });

      if (!isClickInsideAnyButtonOrDropdown) {
        setDropdownOpen({});
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  // Filter, sort, and search organizations
  const filteredOrganizations = organizations
    .filter((org) =>
      Object.values(org)
        .filter((value) => typeof value === "string")
        .some((value) =>
          value.toLowerCase().includes(searchQuery.toLowerCase())
        )
    )
    .filter((org) =>
      filterType ? org.type.toLowerCase() === filterType.toLowerCase() : true
    )
    .sort((a, b) => {
      if (sortBy === "name") {
        return a.name.localeCompare(b.name);
      } else if (sortBy === "type") {
        return a.type.localeCompare(b.type);
      } else if (sortBy === "location") {
        const locationA = `${a.address}${a.city ? `, ${a.city}` : ""}${
          a.state ? `, ${a.state}` : ""
        }${a.postalCode ? `, ${a.postalCode}` : ""}${
          a.country ? `, ${a.country}` : ""
        }`;
        const locationB = `${b.address}${b.city ? `, ${b.city}` : ""}${
          b.state ? `, ${b.state}` : ""
        }${b.postalCode ? `, ${b.postalCode}` : ""}${
          b.country ? `, ${b.country}` : ""
        }`;
        return locationA.localeCompare(locationB);
      } else if (sortBy === "status") {
        return a.status.localeCompare(b.status);
      }
      return 0; // Default: no sorting
    });

  // Handle Refresh button click
  const handleRefresh = () => {
    const storedOrganizations =
      JSON.parse(localStorage.getItem("organizations")) || [];
    setOrganizations(storedOrganizations);

    const activeOrgs = storedOrganizations.filter(
      (org) => org.status === "Active"
    ).length;
    const pendingOrgs = storedOrganizations.filter(
      (org) => org.status === "Pending"
    ).length;
    setMetrics({
      organizations: storedOrganizations.length,
      activeOrganizations: activeOrgs,
      pendingOrganizations: pendingOrgs,
      institutes: 0,
      totalUsers: 0,
    });
    setSearchQuery("");
    setSortBy(""); // Reset sorting
    setFilterType(""); // Reset filter
  };

  // Handle Delete action
  const handleDelete = (id) => {
    const updatedOrganizations = organizations.filter((org) => org.id !== id);
    setOrganizations(updatedOrganizations);
    localStorage.setItem("organizations", JSON.stringify(updatedOrganizations));
    setDropdownOpen((prev) => {
      const newState = { ...prev };
      delete newState[id];
      return newState;
    });

    // Update metrics after deletion
    const activeOrgs = updatedOrganizations.filter(
      (org) => org.status === "Active"
    ).length;
    const pendingOrgs = updatedOrganizations.filter(
      (org) => org.status === "Pending"
    ).length;
    setMetrics({
      organizations: updatedOrganizations.length,
      activeOrganizations: activeOrgs,
      pendingOrganizations: pendingOrgs,
      institutes: 0,
      totalUsers: 0,
    });
  };

  // Handle dropdown toggle
  const toggleDropdown = useCallback((id) => {
    setDropdownOpen((prev) => {
      const newState = { ...prev, [String(id)]: !prev[String(id)] };
      return newState;
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <AdminSidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col md:ml-64">
        {/* Organization Management Content */}
        <main className="p-24 flex-1">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                Organization Management
              </h1>
              <p className="text-gray-600 mt-1">
                Create, view, edit, and manage organizations
              </p>
            </div>
            <Link
              to="/platform/organizations/add"
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
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Add Organization
            </Link>
          </div>

          {/* Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-lg flex items-center space-x-4">
              <div className="bg-blue-500 p-3 rounded-full">
                <svg
                  className="w-6 h-6 text-white"
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
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-600">
                  Total Organizations
                </h3>
                <p className="text-2xl font-bold text-gray-800">
                  {metrics.organizations}
                </p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg flex items-center space-x-4">
              <div className="bg-green-500 p-3 rounded-full">
                <svg
                  className="w-6 h-6 text-white"
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
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-600">
                  Active Organizations
                </h3>
                <p className="text-2xl font-bold text-gray-800">
                  {metrics.activeOrganizations}
                </p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg flex items-center space-x-4">
              <div className="bg-orange-500 p-3 rounded-full">
                <svg
                  className="w-6 h-6 text-white"
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
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-600">
                  Pending Organizations
                </h3>
                <p className="text-2xl font-bold text-gray-800">
                  {metrics.pendingOrganizations}
                </p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg flex items-center space-x-4">
              <div className="bg-purple-500 p-3 rounded-full">
                <svg
                  className="w-6 h-6 text-white"
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
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-600">
                  Total Institutes
                </h3>
                <p className="text-2xl font-bold text-gray-800">
                  {metrics.institutes}
                </p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg flex items-center space-x-4">
              <div className="bg-cyan-500 p-3 rounded-full">
                <svg
                  className="w-6 h-6 text-white"
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
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-600">
                  Total Users
                </h3>
                <p className="text-2xl font-bold text-gray-800">
                  {metrics.totalUsers}
                </p>
              </div>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="flex items-center space-x-3 mb-6">
            <input
              type="text"
              placeholder="Search organizations..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <select
              className="border border-gray-300 rounded-md px-2 py-1"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="">Sort by</option>
              <option value="name">Name</option>
              <option value="type">Type</option>
              <option value="location">Location</option>
              <option value="status">Status</option>
            </select>
            <select
              className="border border-gray-300 rounded-md px-2 py-1"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="">All Types</option>
              <option value="college">College</option>
              <option value="school">School</option>
            </select>
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
              to="/platform/organizations/add"
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
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Add
            </Link>
          </div>

          {/* Organizations Table */}
          <div className="bg-white p-6 rounded-xl shadow-lg backdrop-blur-sm bg-opacity-80">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b">
                  <th className="py-3 text-gray-600">Name</th>
                  <th className="py-3 text-gray-600">Type</th>
                  <th className="py-3 text-gray-600">Email</th>
                  <th className="py-3 text-gray-600">Location</th>
                  <th className="py-3 text-gray-600">Status</th>
                  <th className="py-3 text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrganizations.length > 0 ? (
                  filteredOrganizations.map((org) => (
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
                      <td className="py-3 capitalize">{org.type}</td>
                      <td className="py-3">{org.email}</td>
                      <td className="py-3">
                        {`${org.address}${org.city ? `, ${org.city}` : ""}${
                          org.state ? `, ${org.state}` : ""
                        }${org.postalCode ? `, ${org.postalCode}` : ""}${
                          org.country ? `, ${org.country}` : ""
                        }`}
                      </td>
                      <td className="py-3">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            org.status === "Active"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {org.status}
                        </span>
                      </td>
                      <td className="py-3 relative">
                        <button
                          ref={(el) => (buttonRefs.current[org.id] = el)}
                          onClick={() => toggleDropdown(org.id)}
                          className="text-gray-600 hover:text-gray-800"
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
                              d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                            />
                          </svg>
                        </button>
                        {dropdownOpen[String(org.id)] && (
                          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                            <Link
                              to={`/platform/organizations/${org.id}`}
                              className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
                              onClick={() => toggleDropdown(org.id)}
                            >
                              <svg
                                className="w-4 h-4 mr-2"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                />
                              </svg>
                              View Details
                            </Link>
                            <Link
                              to={`/platform/organizations/${org.id}/edit`}
                              className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
                              onClick={() => toggleDropdown(org.id)}
                            >
                              <svg
                                className="w-4 h-4 mr-2"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                />
                              </svg>
                              Edit
                            </Link>
                            <Link
                              to={`/platform/organizations/${org.id}/institutes`}
                              className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
                              onClick={() => toggleDropdown(org.id)}
                            >
                              <svg
                                className="w-4 h-4 mr-2"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"
                                />
                              </svg>
                              View Institutes
                            </Link>
                            <button
                              onClick={() => handleDelete(org.id)}
                              className="flex items-center px-4 py-2 text-red-600 hover:bg-gray-100 w-full text-left"
                            >
                              <svg
                                className="w-4 h-4 mr-2"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5-4h4m-4 0h4m-7 4h14"
                                />
                              </svg>
                              Delete
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="py-4 text-center text-gray-500">
                      {searchQuery || filterType
                        ? "No matching organizations found"
                        : "No organizations found"}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            {/* Pagination */}
            <div className="flex justify-end items-center mt-4 space-x-4">
              <div className="flex items-center space-x-2">
                <span className="text-gray-600">Rows per page:</span>
                <select className="border border-gray-300 rounded-md px-2 py-1">
                  <option>10</option>
                  <option>25</option>
                  <option>50</option>
                </select>
              </div>
              <div className="text-gray-600">
                {filteredOrganizations.length > 0
                  ? `1-${filteredOrganizations.length} of ${filteredOrganizations.length}`
                  : "0-0 of 0"}
              </div>
              <div className="flex space-x-2">
                <button
                  className="px-3 py-1 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-100"
                  disabled
                >
                  &lt;
                </button>
                <button
                  className="px-3 py-1 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-100"
                  disabled
                >
                  &gt;
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default OrganizationManagement;
