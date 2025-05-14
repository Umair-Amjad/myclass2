import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useOutletContext } from "react-router-dom";

const OrganizationDetails = () => {
  const { toggleSidebar } = useOutletContext();
  const { id } = useParams();
  const navigate = useNavigate();
  const [organization, setOrganization] = useState(null);

  useEffect(() => {
    const organizations =
      JSON.parse(localStorage.getItem("organizations")) || [];
    const org = organizations.find((o) => o.id === parseInt(id));
    if (org) {
      setOrganization(org);
    } else {
      navigate("/platform/organizations");
    }
  }, [id, navigate]);

  const handleDelete = () => {
    const organizations =
      JSON.parse(localStorage.getItem("organizations")) || [];
    const updatedOrganizations = organizations.filter(
      (org) => org.id !== parseInt(id)
    );
    localStorage.setItem("organizations", JSON.stringify(updatedOrganizations));
    navigate("/platform/organizations");
  };

  if (!organization) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-600">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex">
      {/* Main Content */}
      <div className="flex-1 flex flex-col transition-all duration-300">
        {/* Organization Details Content */}
        <main className="py-6 px-4 sm:px-6 md:px-2 flex-1 mt-20 mr-10">
          <div className="flex justify-between items-center mb-6 ml-10">
            <div className="flex items-center space-x-4">
              {/* <button
                onClick={toggleSidebar}
                className="md:hidden p-2 focus:outline-none text-gray-800"
                title="Toggle Sidebar"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button> */}
              <h1 className="text-3xl font-extrabold text-gray-800">
                Organization Details
              </h1>
            </div>
            {/* Buttons */}
            <div className="flex space-x-4">
              <Link
                to={`/platform/organizations/${id}/edit`}
                className="flex items-center px-5 py-2 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition-all duration-200 transform hover:scale-105"
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
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
                Edit
              </Link>
              <button
                onClick={handleDelete}
                className="flex items-center px-5 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition-all duration-200 transform hover:scale-105"
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
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5-4h4m-4 0h4m-7 4h14"
                  />
                </svg>
                Delete
              </button>
            </div>
          </div>

          {/* Hero Section */}
          <div className="relative bg-gradient-to-r from-indigo-600 to-blue-500 text-white rounded-2xl shadow-xl p-6 mb-20 mt-6 sm:mt-8 md:mt-10 flex items-center space-x-6 transform hover:scale-[1.01] transition-transform duration-300 ml-4 sm:ml-10 md:ml-10">
            <img
              src={organization.logoUrl || "https://via.placeholder.com/80"}
              alt={organization.name}
              className="w-20 h-20 rounded-full border-4 border-white shadow-lg"
            />
            <div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight drop-shadow-md">
                {organization.name}
              </h2>
              <div className="flex items-center space-x-3 mt-2">
                <span className="text-base sm:text-lg font-medium capitalize opacity-90">
                  {organization.type}
                </span>
                <span
                  className={`px-3 sm:px-4 py-1 rounded-full text-xs sm:text-sm font-semibold shadow-sm ${
                    organization.status === "Active"
                      ? "bg-green-400 text-green-900"
                      : "bg-blue-400 text-blue-900"
                  }`}
                >
                  {organization.status}
                </span>
              </div>
            </div>
          </div>

          {/* Organization Info and Contact */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12 ml-10">
            {/* Organization Info */}
            <div className="bg-white p-6 rounded-2xl shadow-lg transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <svg
                  className="w-6 h-6 mr-2 text-indigo-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h-4m-6 0H5a2 2 0 001 1.732V21a2 2 0 002-2v-1h8v1a2 2 0 002 2h1a2 2 0 001-1.732V21z"
                  />
                </svg>
                About {organization.name}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {organization.description || "No description available"}
              </p>
            </div>

            {/* Contact Information */}
            <div className="bg-white p-6 rounded-2xl shadow-lg transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <svg
                  className="w-6 h-6 mr-2 text-indigo-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                Contact Information
              </h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <svg
                    className="w-5 h-5 text-indigo-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="text-gray-700">{organization.email}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <svg
                    className="w-5 h-5 text-indigo-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <span className="text-gray-700">
                    {organization.phone || "Not provided"}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <svg
                    className="w-5 h-5 text-indigo-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                    />
                  </svg>
                  <span className="text-gray-700">
                    {organization.website || "Not provided"}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <svg
                    className="w-5 h-5 text-indigo-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span className="text-gray-700">
                    {`${organization.address}${
                      organization.city ? `, ${organization.city}` : ""
                    }${organization.state ? `, ${organization.state}` : ""}${
                      organization.postalCode
                        ? `, ${organization.postalCode}`
                        : ""
                    }${
                      organization.country ? `, ${organization.country}` : ""
                    }`}
                  </span>
                </div>
              </div>
            </div>

            {/* Placeholder Section */}
            <div className="bg-white p-6 rounded-2xl shadow-lg transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <svg
                  className="w-6 h-6 mr-2 text-indigo-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Upcoming Events
              </h3>
              <p className="text-gray-500 italic">
                No upcoming events scheduled.
              </p>
            </div>
          </div>

          {/* Statistics and Other Sections */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 ml-10">
            {/* Statistics */}
            <div className="bg-white p-6 rounded-2xl shadow-lg transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
              <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                <svg
                  className="w-6 h-6 mr-2 text-indigo-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 19v-2a2 2 0 00-2-2H5a2 2 0 00-2 2v2m6 0h6m-6 0a2 2 0 002 2h2a2 2 0 002-2m-4-14v2m-6 2h12m-6 4h.01M21 9a2 2 0 01-2 2h-2a2 2 0 01-2-2V5a2 2 0 012-2h2a2 2 0 012 2v4z"
                  />
                </svg>
                Statistics
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-2 bg-indigo-50 rounded-lg transition-transform duration-200 hover:scale-105">
                  <p className="text-2xl font-extrabold text-indigo-700">0</p>
                  <p className="text-sm text-gray-600 mt-1">Total Institutes</p>
                  <Link
                    to={`/platform/organizations/${id}/institutes`}
                    className="text-indigo-600 text-sm font-semibold hover:underline mt-2 inline-block transform transition-transform duration-200 hover:scale-110"
                  >
                    View Institutes
                  </Link>
                </div>
                <div className="text-center p-4 bg-indigo-50 rounded-lg transition-transform duration-200 hover:scale-105">
                  <p className="text-2xl font-extrabold text-indigo-700">0</p>
                  <p className="text-sm text-gray-600 mt-1">Total Students</p>
                </div>
                <div className="text-center p-4 bg-indigo-50 rounded-lg transition-transform duration-200 hover:scale-105">
                  <p className="text-2xl font-extrabold text-indigo-700">0</p>
                  <p className="text-sm text-gray-600 mt-1">Total Staff</p>
                </div>
                <div className="text-center p-4 bg-indigo-50 rounded-lg transition-transform duration-200 hover:scale-105">
                  <p className="text-2xl font-extrabold text-indigo-700">0</p>
                  <p className="text-sm text-gray-600 mt-1">Total Users</p>
                </div>
              </div>
            </div>

            {/* Contact Person */}
            <div className="bg-white p-6 rounded-2xl shadow-lg transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <svg
                  className="w-6 h-6 mr-2 text-indigo-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                Contact Person
              </h3>
              <p className="text-gray-500 italic">
                No contact person assigned.
              </p>
            </div>

            {/* Settings */}
            <div className="bg-white p-6 rounded-2xl shadow-lg transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <svg
                  className="w-6 h-6 mr-2 text-indigo-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37a1.724 1.724 0 002.572-1.065z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                Settings
              </h3>
              <p className="text-gray-500 italic">No settings configured.</p>
            </div>
          </div>

          {/* Bottom Back to Organizations Button */}
          <div className="mt-10 flex justify-start">
            <Link
              to="/platform/organizations"
              className="flex items-center px-5 py-2 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition-all duration-200 transform hover:scale-105 ml-10"
            >
              <svg
                className="w-6 h-6 mr-2 transform transition-transform duration-200 hover:-translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back to Organizations
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
};

export default OrganizationDetails;