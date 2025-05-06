import React from "react";

const DashboardHeader = ({ isOpen, toggleSidebar }) => {
  return (

    <header className="bg-blue-800 text-white p-4 flex justify-between items-center shadow-md ">
    <header className="fixed top-0 left-0 w-full bg-blue-800 text-white p-4 flex justify-between items-center shadow-md z-10">

      {/* Hamburger Icon for Mobile */}
      <div className="flex items-center">
        <button
          onClick={toggleSidebar}
          className="md:hidden p-2 focus:outline-none"
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
              d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>
        {/* <h1 className="text-lg font-semibold">
          School Management System - Admin
        </h1> */}
      </div>

      {/* Right Side: Notifications and User Profile */}
      <div className="flex items-center space-x-4">
        <button className="relative p-2">
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
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            2
          </span>
        </button>
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-300">
          <span className="text-gray-800 font-medium">U</span>
        </div>
      </div>
    </header>
  </header>
  );
};

export default DashboardHeader;
