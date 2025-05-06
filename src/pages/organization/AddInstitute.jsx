import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import AdminSidebar from "../../components/layout/AdminSidebar";
import DashboardHeader from "../../components/layout/DashboardHeader";
import { addInstitute } from "../../store/slices/instituteSlice";

// Yup validation schema
const validationSchema = Yup.object({
  name: Yup.string()
    .required("Institute name is required")
    .min(3, "Name must be at least 3 characters"),
  type: Yup.string().required("Institute type is required"),
  address: Yup.string().max(500, "Address must be 500 characters or less"),
  contact: Yup.string()
    .matches(/^\+?\d{10,15}$/, "Invalid phone number")
    .nullable(),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
});

const AddInstitute = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const initialValues = {
    name: "",
    type: "",
    address: "",
    contact: "",
    email: "",
  };

  const handleSubmit = (values, { setSubmitting }) => {
    // Retrieve existing institutes from localStorage or initialize an empty array
    const existingInstitutes =
      JSON.parse(localStorage.getItem("institutes")) || [];

    // Create institute object with additional fields
    const institute = {
      id: Date.now(), // Simple unique ID for frontend
      ...values,
      status: "Active",
      students: 0,
      classes: 0,
    };

    // Add to Redux store
    dispatch(addInstitute(institute));

    // Add to localStorage
    const updatedInstitutes = [...existingInstitutes, institute];
    localStorage.setItem("institutes", JSON.stringify(updatedInstitutes));

    toast.success("Institute added successfully!");
    setSubmitting(false);
    navigate("/institutes");
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
            Add New Institute
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
                        Institute Name <span className="text-red-500">*</span>
                      </label>
                      <Field
                        type="text"
                        name="name"
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 hover:shadow-md"
                        placeholder="Enter institute name"
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
                        Type <span className="text-red-500">*</span>
                      </label>
                      <Field
                        as="select"
                        name="type"
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 hover:shadow-md cursor-pointer appearance-none bg-no-repeat bg-[url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%3D%220%200%2024%2024%22%20stroke%3D%22%23666666%22%20stroke-width%3D%222%22%3E%3Cpath%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20d%3D%22M19%209l-7%207-7-7%22%2F%3E%3C%2Fsvg%3E')] bg-[length:1.5rem_1.5rem] bg-[right_0.5rem_center]"
                      >
                        <option value="">Select type</option>
                        <option value="K-12">K-12</option>
                        <option value="Higher Education">
                          Higher Education
                        </option>
                        <option value="College">College</option>
                        <option value="Online">Online</option>
                      </Field>
                      <ErrorMessage
                        name="type"
                        component="div"
                        className="absolute text-red-500 text-sm mt-1 animate-fade-in"
                      />
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
                        placeholder="Enter institute email"
                      />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="absolute text-red-500 text-sm mt-1 animate-fade-in"
                      />
                    </div>
                    {/* Contact */}
                    <div className="relative">
                      <label
                        htmlFor="contact"
                        className="block text-gray-700 font-medium mb-2 transition-all duration-300"
                      >
                        Contact Number
                      </label>
                      <Field
                        type="tel"
                        name="contact"
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 hover:shadow-md"
                        placeholder="Enter contact number"
                      />
                      <ErrorMessage
                        name="contact"
                        component="div"
                        className="absolute text-red-500 text-sm mt-1 animate-fade-in"
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
                        Address
                      </label>
                      <Field
                        as="textarea"
                        name="address"
                        rows="3"
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 hover:shadow-md resize-none"
                        placeholder="Enter institute address"
                      />
                      <ErrorMessage
                        name="address"
                        component="div"
                        className="absolute text-red-500 text-sm mt-1 animate-fade-in"
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
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => navigate("/institute/dashboard")}
                    className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg shadow-md hover:bg-gray-300 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    onClick={() => navigate("/institute/dashboard")}
                    className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-blue-500 text-white rounded-lg shadow-md hover:from-indigo-700 hover:to-blue-600 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Adding..." : "Add Institute"}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
          <ToastContainer position="top-right" autoClose={3000} />
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

export default AddInstitute;
