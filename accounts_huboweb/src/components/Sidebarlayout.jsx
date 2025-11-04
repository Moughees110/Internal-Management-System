import {
  FaHome,
  FaUserShield,
  FaBook,
  FaCalendarCheck,
  FaChevronDown,
  FaChevronUp,
  FaTasks,
  FaUsers,
  FaUserPlus,
  FaBars,
  FaTimes,
  FaUserCheck ,
} from "react-icons/fa";
import { useState } from "react";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleDropdown = (menu) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      {/* Toggle Button for Mobile */}
      {/* Toggle Button for Mobile */}
<button
  className="lg:hidden fixed top-4 left-1/2 transform -translate-x-1/2 bg-blue-700 text-white p-2 rounded-lg z-50"
  onClick={toggleSidebar}
>
  {isSidebarOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
</button>


      {/* Sidebar */}
      <motion.div
        className={`h-screen w-80 bg-gradient-to-b from-[#1E3A8A] to-[#abd2ff] shadow-lg p-4 flex flex-col text-white fixed top-0 left-0 z-40 lg:relative ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        } transition-transform duration-300`}
      >
        <nav className="flex flex-col space-y-2 w-full">
          <NavLink
            to="#"
            className={({ isActive }) =>
              `flex items-center space-x-2 p-2 rounded-lg ${
                isActive ? "text-orange-500 font-bold" : "text-white"
              }`
            }
            onClick={() => setIsSidebarOpen(false)}
          >
            <FaHome />
            <span>Dashboard</span>
          </NavLink>

          <NavLink
            to="#"
            className={({ isActive }) =>
              `flex items-center space-x-2 p-2 rounded-lg ${
                isActive ? "text-orange-500 font-bold" : "text-white"
              }`
            }
            onClick={() => setIsSidebarOpen(false)}
          >
            <FaBook />
            <span>HandleBook</span>
          </NavLink>

          {/* Attendance Dropdown */}
          <div className="w-full">
            <motion.button
              onClick={() => toggleDropdown("attendance")}
              className="flex items-center justify-between w-full p-2 rounded-lg"
              whileHover={{ scale: 1.05 }}
            >
              <div className="flex items-center space-x-2">
                <FaCalendarCheck />
                <span>Attendance</span>
              </div>
              {openDropdown === "attendance" ? <FaChevronUp /> : <FaChevronDown />}
            </motion.button>
            {openDropdown === "attendance" && (
              <motion.div
                className="ml-4 space-y-1"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
              >
                <NavLink
                  to="/checkin"
                  className={({ isActive }) =>
                    `block p-2 rounded ${isActive ? "text-orange-500 font-bold" : "text-white"}`
                  }
                  onClick={() => setIsSidebarOpen(false)}
                >
                  Check-in
                </NavLink>
                <NavLink
                  to="/checkout"
                  className={({ isActive }) =>
                    `block p-2 rounded ${isActive ? "text-orange-500 font-bold" : "text-white"}`
                  }
                  onClick={() => setIsSidebarOpen(false)}
                >
                  Check-out
                </NavLink>
              </motion.div>
            )}
          </div>

          {/* User Section */}
          <NavLink
            to="/user"
            className={({ isActive }) =>
              `flex items-center space-x-2 p-2 rounded-lg ${
                isActive ? "text-orange-500 font-bold" : "text-white"
              }`
            }
            onClick={() => setIsSidebarOpen(false)}
          >
            <FaUserCheck />
            <span>User</span>
          </NavLink>

          <NavLink
            to="/role"
            className={({ isActive }) =>
              `flex items-center space-x-2 p-2 rounded-lg ${
                isActive ? "text-orange-500 font-bold" : "text-white"
              }`
            }
            onClick={() => setIsSidebarOpen(false)}
          >
            <FaUserShield />
            <span>Role</span>
          </NavLink>

          <NavLink
            to="/employee"
            className={({ isActive }) =>
              `flex items-center space-x-2 p-2 rounded-lg ${
                isActive ? "text-orange-500 font-bold" : "text-white"
              }`
            }
            onClick={() => setIsSidebarOpen(false)}
          >
            <FaUserPlus />
            <span>Employee</span>
          </NavLink>

          {/* Leave Dropdown */}
          <div className="w-full">
            <motion.button
              onClick={() => toggleDropdown("leave")}
              className="flex items-center justify-between w-full p-2 rounded-lg"
              whileHover={{ scale: 1.05 }}
            >
              <div className="flex items-center space-x-2">
                <FaCalendarCheck />
                <span>Leave</span>
              </div>
              {openDropdown === "leave" ? <FaChevronUp /> : <FaChevronDown />}
            </motion.button>
            {openDropdown === "leave" && (
              <motion.div
                className="ml-4 space-y-1"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
              >
                <NavLink
                  to="/applyleave"
                  className={({ isActive }) =>
                    `block p-2 rounded ${isActive ? "text-orange-500 font-bold" : "text-white"}`
                  }
                  onClick={() => setIsSidebarOpen(false)}
                >
                  Apply Leave
                </NavLink>

                <NavLink
                  to="/leavehistory"
                  className={({ isActive }) =>
                    `block p-2 rounded ${isActive ? "text-orange-500 font-bold" : "text-white"}`
                  }
                  onClick={() => setIsSidebarOpen(false)}
                >
                  Leave History
                </NavLink>
              </motion.div>
            )}
          </div>

          {/* Task Section */}
          <NavLink
            to="/task"
            className={({ isActive }) =>
              `flex items-center space-x-2 p-2 rounded-lg ${
                isActive ? "text-orange-500 font-bold" : "text-white"
              }`
            }
            onClick={() => setIsSidebarOpen(false)}
          >
            <FaTasks />
            <span>Task</span>
          </NavLink>

          <NavLink
            to="/clients"
            className={({ isActive }) =>
              `flex items-center space-x-2 p-2 rounded-lg ${
                isActive ? "text-orange-500 font-bold" : "text-white"
              }`
            }
            onClick={() => setIsSidebarOpen(false)}
          >
            < FaUsers />
            <span>Clients</span>
          </NavLink>

        </nav>
      </motion.div>

      {/* Overlay for Mobile */}
      {isSidebarOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />
      )}
    </>
  );
};

export default Sidebar;
