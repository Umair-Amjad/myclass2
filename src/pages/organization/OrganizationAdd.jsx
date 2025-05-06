import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import AdminSidebar from "../../components/layout/AdminSidebar";
import DashboardHeader from "../../components/layout/DashboardHeader";

// Yup validation schema
const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  phone: Yup.string()
    .matches(/^\d{11}$/, "Phone number must be exactly 11 digits")
    .required("Phone number is required"),
  address: Yup.string().required("Address is required"),
  contactEmail: Yup.string().email("Invalid email address"),
});

const OrganizationAdd = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const initialValues = {
    name: "",
    type: "School",
    email: "",
    description: "",
    phone: "",
    website: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
    contactName: "",
    position: "",
    contactEmail: "",
    contactPhone: "",
    status: "Active",
    logoUrl: "",
  };

  const handleSubmit = (values, { setSubmitting }) => {
    // Retrieve existing organizations from localStorage or initialize an empty array
    const existingOrganizations =
      JSON.parse(localStorage.getItem("organizations")) || [];

    // Add the new organization to the array (with a unique ID for listing purposes)
    const newOrganization = {
      id: Date.now(), // Simple unique ID based on timestamp
      ...values,
    };
    const updatedOrganizations = [...existingOrganizations, newOrganization];

    // Save the updated array back to localStorage
    localStorage.setItem("organizations", JSON.stringify(updatedOrganizations));

    console.log("Form values:", values);
    setSubmitting(false);
    navigate("/organizations");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-gray-100 to-blue-50 flex">
      {/* Sidebar */}
      <AdminSidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col md:ml-64">
        {/* Header */}
        <DashboardHeader isOpen={isOpen} toggleSidebar={toggleSidebar} />

        {/* Form Content */}
        <main className="p-24 flex-1">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-8 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-500 animate-fade-in">
            Add New Organization
          </h1>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="bg-white/80 backdrop-blur-lg p-8 rounded-2xl shadow-2xl border border-gray-100/50">
                {/* Basic Information */}
                <div className="mb-10">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-6 pb-2 border-b-2 border-indigo-200 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-t-lg px-4 py-2">
                    Basic Information
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Name */}
                    <div className="relative">
                      <label
                        htmlFor="name"
                        className="block text-gray-700 font-medium mb-2 transition-all duration-300"
                      >
                        Name <span className="text-red-500">*</span>
                      </label>
                      <Field
                        type="text"
                        name="name"
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 hover:shadow-md"
                        placeholder="Enter organization name"
                      />
                      <ErrorMessage
                        name="name"
                        component="div"
                        className="absolute text-red-500 text-sm mt-1 animate-fade-in"
                      />
                    </div>
                    {/* Type */}
                    <div className="relative">
                      <label
                        htmlFor="type"
                        className="block text-gray-700 font-medium mb-2 transition-all duration-300"
                      >
                        Type
                      </label>
                      <Field
                        as="select"
                        name="type"
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 hover:shadow-md cursor-pointer appearance-none bg-no-repeat bg-[url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%3D%220%200%2024%2024%22%20stroke%3D%22%23666666%22%20stroke-width%3D%222%22%3E%3Cpath%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20d%3D%22M19%209l-7%207-7-7%22%2F%3E%3C%2Fsvg%3E')] bg-[length:1.5rem_1.5rem] bg-[right_0.5rem_center]"
                      >
                        <option value="School">School</option>
                        <option value="College">College</option>
                        <option value="Online">Online</option>
                        <option value="Higher Education">
                          Higher Education
                        </option>
                      </Field>
                    </div>
                    {/* Email */}
                    <div className="relative">
                      <label
                        htmlFor="email"
                        className="block text-gray-700 font-medium mb-2 transition-all duration-300"
                      >
                        Email <span className="text-red-500">*</span>
                      </label>
                      <Field
                        type="email"
                        name="email"
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 hover:shadow-md"
                        placeholder="Enter email address"
                      />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="absolute text-red-500 text-sm mt-1 animate-fade-in"
                      />
                    </div>
                    {/* Description */}
                    <div className="md:col-span-2 relative">
                      <label
                        htmlFor="description"
                        className="block text-gray-700 font-medium mb-2 transition-all duration-300"
                      >
                        Description
                      </label>
                      <Field
                        as="textarea"
                        name="description"
                        rows="3"
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 hover:shadow-md resize-none"
                        placeholder="Describe the organization"
                      />
                    </div>
                    {/* Phone */}
                    <div className="relative">
                      <label
                        htmlFor="phone"
                        className="block text-gray-700 font-medium mb-2 transition-all duration-300"
                      >
                        Phone <span className="text-red-500">*</span>
                      </label>
                      <Field
                        type="text"
                        name="phone"
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 hover:shadow-md"
                        placeholder="Enter 11-digit phone number"
                      />
                      <ErrorMessage
                        name="phone"
                        component="div"
                        className="absolute text-red-500 text-sm mt-1 animate-fade-in"
                      />
                    </div>
                    {/* Website */}
                    <div className="relative">
                      <label
                        htmlFor="website"
                        className="block text-gray-700 font-medium mb-2 transition-all duration-300"
                      >
                        Website
                      </label>
                      <Field
                        type="text"
                        name="website"
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 hover:shadow-md"
                        placeholder="Enter website URL"
                      />
                    </div>
                  </div>
                </div>

                {/* Location */}
                <div className="mb-10">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-6 pb-2 border-b-2 border-indigo-200 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-t-lg px-4 py-2">
                    Location
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Address */}
                    <div className="relative">
                      <label
                        htmlFor="address"
                        className="block text-gray-700 font-medium mb-2 transition-all duration-300"
                      >
                        Address <span className="text-red-500">*</span>
                      </label>
                      <Field
                        type="text"
                        name="address"
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 hover:shadow-md"
                        placeholder="Enter address"
                      />
                      <ErrorMessage
                        name="address"
                        component="div"
                        className="absolute text-red-500 text-sm mt-1 animate-fade-in"
                      />
                    </div>
                    {/* City */}
                    <div className="relative">
                      <label
                        htmlFor="city"
                        className="block text-gray-700 font-medium mb-2 transition-all duration-300"
                      >
                        City
                      </label>
                      <Field
                        type="text"
                        name="city"
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 hover:shadow-md"
                        placeholder="Enter city"
                      />
                    </div>
                    {/* State/Province */}
                    <div className="relative">
                      <label
                        htmlFor="state"
                        className="block text-gray-700 font-medium mb-2 transition-all duration-300"
                      >
                        State/Province
                      </label>
                      <Field
                        type="text"
                        name="state"
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 hover:shadow-md"
                        placeholder="Enter state/province"
                      />
                    </div>
                    {/* Postal Code */}
                    <div className="relative">
                      <label
                        htmlFor="postalCode"
                        className="block text-gray-700 font-medium mb-2 transition-all duration-300"
                      >
                        Postal Code
                      </label>
                      <Field
                        type="text"
                        name="postalCode"
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 hover:shadow-md"
                        placeholder="Enter postal code"
                      />
                    </div>
                    {/* Country */}
                    <div className="relative">
                      <label
                        htmlFor="country"
                        className="block text-gray-700 font-medium mb-2 transition-all duration-300"
                      >
                        Country
                      </label>
                      <Field
                        type="text"
                        name="country"
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 hover:shadow-md"
                        placeholder="Enter country"
                      />
                    </div>
                  </div>
                </div>

                {/* Contact Person */}
                <div className="mb-10">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-6 pb-2 border-b-2 border-indigo-200 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-t-lg px-4 py-2">
                    Contact Person
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Contact Person Name */}
                    <div className="relative">
                      <label
                        htmlFor="contactName"
                        className="block text-gray-700 font-medium mb-2 transition-all duration-300"
                      >
                        Contact Person Name
                      </label>
                      <Field
                        type="text"
                        name="contactName"
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 hover:shadow-md"
                        placeholder="Enter contact person name"
                      />
                    </div>
                    {/* Position */}
                    <div className="relative">
                      <label
                        htmlFor="position"
                        className="block text-gray-700 font-medium mb-2 transition-all duration-300"
                      >
                        Position
                      </label>
                      <Field
                        type="text"
                        name="position"
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 hover:shadow-md"
                        placeholder="Enter position"
                      />
                    </div>
                    {/* Contact Person Email */}
                    <div className="relative">
                      <label
                        htmlFor="contactEmail"
                        className="block text-gray-700 font-medium mb-2 transition-all duration-300"
                      >
                        Contact Person Email
                      </label>
                      <Field
                        type="email"
                        name="contactEmail"
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 hover:shadow-md"
                        placeholder="Enter contact email"
                      />
                      <ErrorMessage
                        name="contactEmail"
                        component="div"
                        className="absolute text-red-500 text-sm mt-1 animate-fade-in"
                      />
                    </div>
                    {/* Contact Person Phone */}
                    <div className="relative">
                      <label
                        htmlFor="contactPhone"
                        className="block text-gray-700 font-medium mb-2 transition-all duration-300"
                      >
                        Contact Person Phone
                      </label>
                      <Field
                        type="text"
                        name="contactPhone"
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 hover:shadow-md"
                        placeholder="Enter contact phone"
                      />
                    </div>
                  </div>
                </div>

                {/* Status & Settings */}
                <div className="mb-10">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-6 pb-2 border-b-2 border-indigo-200 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-t-lg px-4 py-2">
                    Status & Settings
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Status */}
                    <div className="relative">
                      <label
                        htmlFor="status"
                        className="block text-gray-700 font-medium mb-2 transition-all duration-300"
                      >
                        Status
                      </label>
                      <Field
                        as="select"
                        name="status"
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 hover:shadow-md cursor-pointer appearance-none bg-no-repeat bg-[url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%3D%220%200%2024%2024%22%20stroke%3D%22%23666666%22%20stroke-width%3D%222%22%3E%3Cpath%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20d%3D%22M19%209l-7%207-7-7%22%2F%3E%3C%2Fsvg%3E')] bg-[length:1.5rem_1.5rem] bg-[right_0.5rem_center]"
                      >
                        <option value="Active">Active</option>
                        <option value="Pending">Pending</option>
                        <option value="Inactive">Inactive</option>
                      </Field>
                    </div>
                    {/* Logo URL */}
                    <div className="relative">
                      <label
                        htmlFor="logoUrl"
                        className="block text-gray-700 font-medium mb-2 transition-all duration-300"
                      >
                        Logo URL
                      </label>
                      <Field
                        type="text"
                        name="logoUrl"
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 hover:shadow-md"
                        placeholder="Enter logo URL"
                      />
                    </div>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex justify-end space-x-4">
                  <Link
                    to="/organizations"
                    className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg shadow-md hover:bg-gray-300 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                  >
                    Cancel
                  </Link>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-blue-500 text-white rounded-lg shadow-md hover:from-indigo-700 hover:to-blue-600 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Create Organization
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </main>
      </div>

      {/* Custom CSS for Animations */}
      <style>
        {`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-fade-in {
            animation: fadeIn 0.5s ease-in-out;
          }
        `}
      </style>
    </div>
  );
};

export default OrganizationAdd;
