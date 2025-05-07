import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../../assets/image.jpg";

const AdminSidebar = ({ isOpen, toggleSidebar }) => {
  // State to manage submenu visibility
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isPlatformOpen, setIsPlatformOpen] = useState(true);

  // Toggle functions for submenus with mutual exclusivity
  const toggleAdminMenu = () => {
    setIsAdminOpen(!isAdminOpen);
    setIsPlatformOpen(false); // Close Platform Management when Administration is toggled
  };

  const togglePlatformMenu = () => {
    setIsPlatformOpen(!isPlatformOpen);
    setIsAdminOpen(false); // Close Administration when Platform Management is toggled
  };

  return (
    <>
      {/* Header */}
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
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
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

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 w-64 !bg-gradient-to-b !from-blue-800 !to-blue-600 text-white transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300 ease-in-out z-50 shadow-xl mt-16 md:mt-0`}
      >
        <div className="p-6 flex flex-col items-center">
          <img
            src={logo}
            alt="School Logo"
            className="w-24 h-24 rounded-full shadow-md mb-3 transform hover:scale-105 transition-transform duration-200"
          />
          <h2 className="text-lg font-semibold text-center">SMS</h2>
          <p className="text-sm text-blue-200 font-light italic animate-pulse">
            School Management System
          </p>
        </div>
        <nav className="mt-4 px-4">
          {/* Dashboard */}
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex items-center space-x-3 py-3 px-4 rounded-lg ${
                isActive ? "bg-indigo-900" : "hover:bg-indigo-700"
              } transition-colors duration-200`
            }
            onClick={() => toggleSidebar()}
            end
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 10h16M4 14h16M4 18h16"
              />
            </svg>
            <span>Home</span>
          </NavLink>

          {/* Administration with Submenu */}
          <div>
            <button
              onClick={toggleAdminMenu}
              className="flex items-center justify-between w-full py-3 px-4 rounded-lg hover:bg-indigo-700 transition-colors duration-200"
            >
              <div className="flex items-center space-x-3">
                <svg
                  className="w-5 h-5"
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
                <span>Administration</span>
              </div>
              <svg
                className={`w-4 h-4 transform transition-transform duration-200 ${
                  isAdminOpen ? "rotate-180" : "rotate-0"
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {isAdminOpen && (
              <div className="mt-1">
                <NavLink
                  to="/administration/sub-item-1"
                  className={({ isActive }) =>
                    `flex items-center space-x-3 py-2 px-4 rounded-lg ${
                      isActive ? "bg-indigo-900" : "hover:bg-indigo-700"
                    } transition-colors duration-200`
                  }
                  onClick={() => toggleSidebar()}
                >
                  <svg
                    className="w-5 h-5 opacity-0"
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
                  <span>Sub Item 1</span>
                </NavLink>
                <NavLink
                  to="/administration/sub-item-2"
                  className={({ isActive }) =>
                    `flex items-center space-x-3 py-2 px-4 rounded-lg ${
                      isActive ? "bg-indigo-900" : "hover:bg-indigo-700"
                    } transition-colors duration-200`
                  }
                  onClick={() => toggleSidebar()}
                >
                  <svg
                    className="w-5 h-5 opacity-0"
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
                  <span>Sub Item 2</span>
                </NavLink>
              </div>
            )}
          </div>

          {/* Platform Management with Submenu */}
          <div>
            <button
              onClick={togglePlatformMenu}
              className="flex items-center justify-between w-full py-3 px-4 rounded-lg hover:bg-indigo-700 transition-colors duration-200"
            >
              <div className="flex items-center space-x-3 whitespace-nowrap">
                <svg
                  className="w-5 h-5"
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
                <span>Platform Management</span>
              </div>
              <svg
                className={`w-4 h-4 transform transition-transform duration-200 ${
                  isPlatformOpen ? "rotate-180" : "rotate-0"
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {isPlatformOpen && (
              <div className="mt-1">
                {/* Organizations */}
                <NavLink
                  to="/organizations"
                  className={({ isActive }) =>
                    `flex items-center space-x-3 py-2 px-4 rounded-lg ${
                      isActive ? "bg-indigo-900" : "hover:bg-indigo-700"
                    } transition-colors duration-200`
                  }
                  onClick={() => toggleSidebar()}
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                  <span>Organizations</span>
                </NavLink>

                {/* Institute Dashboard */}
                <NavLink
                  to="/institute/dashboard"
                  className={({ isActive }) =>
                    `flex items-center space-x-3 py-2 px-4 mt-2 rounded-lg ${
                      isActive ? "bg-indigo-900" : "hover:bg-indigo-700"
                    } transition-colors duration-200`
                  }
                  onClick={() => toggleSidebar()}
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                  <span>Institute Dashboard</span>
                </NavLink>

                {/* Super Admins */}
                <NavLink
                  to="/super-admins"
                  className={({ isActive }) =>
                    `flex items-center space-x-3 py-2 px-4 mt-2 rounded-lg ${
                      isActive ? "bg-indigo-900" : "hover:bg-indigo-700"
                    } transition-colors duration-200`
                  }
                  onClick={() => toggleSidebar()}
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
                    />
                  </svg>
                  <span>Super Admins</span>
                </NavLink>

                {/* Global Users */}
                <NavLink
                  to="/global-users"
                  className={({ isActive }) =>
                    `flex items-center space-x-3 py-2 px-4 mt-2 rounded-lg ${
                      isActive ? "bg-indigo-900" : "hover:bg-indigo-700"
                    } transition-colors duration-200`
                  }
                  onClick={() => toggleSidebar()}
                >
                  <svg
                    className="w-5 h-5"
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
                  <span>Global Users</span>
                </NavLink>

                {/* Platform Insights */}
                <NavLink
                  to="/platform-insights"
                  className={({ isActive }) =>
                    `flex items-center space-x-3 py-2 px-4 mt-2 rounded-lg ${
                      isActive ? "bg-indigo-900" : "hover:bg-indigo-700"
                    } transition-colors duration-200`
                  }
                  onClick={() => toggleSidebar()}
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 19v-8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                  <span>Platform Insights</span>
                </NavLink>
              </div>
            )}
          </div>
        </nav>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 md:hidden z-40"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
};

export default AdminSidebar;
