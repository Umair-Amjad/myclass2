import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdminSidebar from "../../components/layout/AdminSidebar";

const EditOrganization = () => {
  const { id } = useParams(); // Get the organization ID from the URL
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [organization, setOrganization] = useState({
    name: "",
    type: "",
    email: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
    status: "",
  });
  const [error, setError] = useState("");

  const toggleSidebar = () => setIsOpen(!isOpen);

  // Fetch the organization data from localStorage based on ID
  useEffect(() => {
    const storedOrganizations =
      JSON.parse(localStorage.getItem("organizations")) || [];
    const org = storedOrganizations.find((org) => org.id === parseInt(id));
    if (org) {
      setOrganization({
        name: org.name || "",
        type: org.type || "",
        email: org.email || "",
        address: org.address || "",
        city: org.city || "",
        state: org.state || "",
        postalCode: org.postalCode || "",
        country: org.country || "",
        status: org.status || "",
      });
    } else {
      setError("Organization not found");
    }
  }, [id]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrganization((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission to update the organization
  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!organization.name || !organization.email) {
      setError("Name and email are required");
      return;
    }

    // Update the organization in localStorage
    const storedOrganizations =
      JSON.parse(localStorage.getItem("organizations")) || [];
    const updatedOrganizations = storedOrganizations.map((org) =>
      org.id === parseInt(id) ? { ...org, ...organization } : org
    );
    localStorage.setItem("organizations", JSON.stringify(updatedOrganizations));

    // Redirect back to the Organization Management page
    navigate("/platform/organizations");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <AdminSidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col md:ml-64">
        {/* Header */}

        {/* Edit Organization Form */}
        <main className="p-24 flex-1">
          <div className="max-w-6xl  mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">
              Edit Organization
            </h1>

            {error && (
              <p className="text-red-500 bg-red-100 p-3 rounded-lg mb-4">
                {error}
              </p>
            )}

            <form
              onSubmit={handleSubmit}
              className="bg-white p-6 rounded-xl shadow-lg "
            >
              {/* Name */}
              <div className="mb-4">
                <label
                  className="block text-gray-700 font-medium mb-2"
                  htmlFor="name"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={organization.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter organization name"
                  required
                />
              </div>

              {/* Type */}
              <div className="mb-4">
                <label
                  className="block text-gray-700 font-medium mb-2"
                  htmlFor="type"
                >
                  Type
                </label>
                <select
                  id="type"
                  name="type"
                  value={organization.type}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  {/* <option value="">Select Type</option> */}
                  <option value="college">College</option>
                  <option value="school">School</option>
                  <option value="university">University</option>
                </select>
              </div>

              {/* Email */}
              <div className="mb-4">
                <label
                  className="block text-gray-700 font-medium mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={organization.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter email"
                  required
                />
              </div>

              {/* Address */}
              <div className="mb-4">
                <label
                  className="block text-gray-700 font-medium mb-2"
                  htmlFor="address"
                >
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={organization.address}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter address"
                />
              </div>

              {/* City */}
              <div className="mb-4">
                <label
                  className="block text-gray-700 font-medium mb-2"
                  htmlFor="city"
                >
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={organization.city}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter city"
                />
              </div>

              {/* State */}
              <div className="mb-4">
                <label
                  className="block text-gray-700 font-medium mb-2"
                  htmlFor="state"
                >
                  State
                </label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  value={organization.state}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter state"
                />
              </div>

              {/* Postal Code */}
              <div className="mb-4">
                <label
                  className="block text-gray-700 font-medium mb-2"
                  htmlFor="postalCode"
                >
                  Postal Code
                </label>
                <input
                  type="text"
                  id="postalCode"
                  name="postalCode"
                  value={organization.postalCode}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter postal code"
                />
              </div>

              {/* Country */}
              <div className="mb-4">
                <label
                  className="block text-gray-700 font-medium mb-2"
                  htmlFor="country"
                >
                  Country
                </label>
                <input
                  type="text"
                  id="country"
                  name="country"
                  value={organization.country}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter country"
                />
              </div>

              {/* Status */}
              <div className="mb-4">
                <label
                  className="block text-gray-700 font-medium mb-2"
                  htmlFor="status"
                >
                  Status
                </label>
                <select
                  id="status"
                  name="status"
                  value={organization.status}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select Status</option>
                  <option value="Active">Active</option>
                  <option value="Pending">Pending</option>
                  <option value="Inactive">Suspend</option>
                </select>
              </div>

              {/* Buttons */}
              <div className="flex space-x-3">
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => navigate("/platform/organizations")}
                  className="px-4 py-2 border border-gray-300 text-gray-600 rounded-md hover:bg-gray-100 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default EditOrganization;
