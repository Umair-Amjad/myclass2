import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/image.jpg";

const AdminSidebar = ({ isOpen, toggleSidebar }) => {
  // State for submenu visibility
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isPlatformOpen, setIsPlatformOpen] = useState(true);
  // State for notification dropdown
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  // State for profile dropdown
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  // State for notifications
  const [notifications, setNotifications] = useState([
    { id: 1, message: "New organization added", isRead: false },
    { id: 2, message: "System update available", isRead: false },
    { id: 3, message: "Welcome to SMS!", isRead: true },
  ]);
  // State for user
  const [user, setUser] = useState({
    name: "Admin User",
    email: "admin@example.com",
  });

  const navigate = useNavigate();

  // Toggle functions for submenus with mutual exclusivity
  const toggleAdminMenu = () => {
    setIsAdminOpen(!isAdminOpen);
    setIsPlatformOpen(false);
  };

  const togglePlatformMenu = () => {
    setIsPlatformOpen(!isPlatformOpen);
    setIsAdminOpen(false);
  };

  // Toggle notification dropdown
  const toggleNotificationDropdown = () => {
    setIsNotificationOpen(!isNotificationOpen);
    setIsProfileOpen(false); // Close profile dropdown
  };

  // Toggle profile dropdown
  const toggleProfileDropdown = () => {
    setIsProfileOpen(!isProfileOpen);
    setIsNotificationOpen(false); // Close notification dropdown
  };

  // Mark notification as read
  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  // Mark all notifications as read
  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  // Handle logout
  const handleLogout = () => {
    setUser(null);
    navigate("/login");
  };

  // Calculate unread notifications
  const unreadCount = notifications.filter((n) => !n.isRead).length;

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
          {/* Notification Button with Dropdown */}
          <div className="relative">
            <button
              onClick={toggleNotificationDropdown}
              className="relative p-2 focus:outline-none"
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
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
              {unreadCount > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>
            {isNotificationOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white text-gray-800 rounded-lg shadow-xl z-50 max-h-96 overflow-y-auto">
                <div className="p-4 border-b flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <svg
                      className="w-5 h-5 text-blue-500"
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
                    <h3 className="text-lg font-semibold">Notifications</h3>
                  </div>
                  {notifications.length > 0 && (
                    <button
                      onClick={markAllAsRead}
                      className="text-blue-500 hover:text-blue-700 text-sm"
                    >
                      Mark all as read
                    </button>
                  )}
                </div>
                {notifications.length === 0 ? (
                  <div className="p-4 text-center text-gray-500">
                    No notifications
                  </div>
                ) : (
                  notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 border-b hover:bg-gray-100 flex justify-between items-center ${
                        notification.isRead ? "opacity-50" : ""
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        <svg
                          className="w-5 h-5 text-gray-600"
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
                        <span>{notification.message}</span>
                      </div>
                      {!notification.isRead && (
                        <button
                          onClick={() => markAsRead(notification.id)}
                          className="text-blue-500 hover:text-blue-700 text-sm"
                        >
                          Mark as read
                        </button>
                      )}
                    </div>
                  ))
                )}
              </div>
            )}
          </div>

          {/* User Profile Dropdown */}
          <div className="relative">
            <button
              onClick={toggleProfileDropdown}
              className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-300 focus:outline-none"
            >
              <span className="text-gray-800 font-medium">
                {user?.name?.charAt(0)?.toUpperCase() || "U"}
              </span>
            </button>
            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white text-gray-800 rounded-lg shadow-xl z-50">
                <div className="p-4 border-b">
                  <div className="flex ml-2 items-center space-x-2">
                    <svg
                      className="w-5 h-5 text-gray-600"
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
                    <div>
                      <p className="text-sm  font-semibold">{user?.name || "User"}</p>
                      <p className="text-xs  text-gray-500">{user?.email || "user@example.com"}</p>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <NavLink
                    to="/profile"
                    className="flex items-center space-x-2 text-sm text-gray-800 p-2 hover:bg-gray-100 hover:text-blue-700 mb-2"
                    onClick={() => setIsProfileOpen(false)}
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
                        d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>Profile</span>
                  </NavLink>
                  <NavLink
                    to="/settings"
                    className="flex items-center space-x-2 text-sm text-gray-800 p-2 hover:bg-gray-100 hover:text-blue-700 mb-2"
                    onClick={() => setIsProfileOpen(false)}
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
                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <span>Settings</span>
                  </NavLink>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 w-full text-left text-red-500 p-2 hover:bg-gray-100 hover:text-red-700 text-sm font-medium"
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
                        d="M17 16l4-4m0 0l-4-4m4 4H7m5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h3a3 3 0 013 3v1"
                      />
                    </svg>
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 w-72 !bg-gradient-to-b !from-blue-800 !to-blue-600 text-white transform ${
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
                  to="/platform/organization"
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