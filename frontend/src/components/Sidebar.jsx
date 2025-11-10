import {
  LayoutDashboard,
  Book,
  CalendarCheck,
  User,
  Briefcase,
  Users,
  Layers2,
  ClipboardCheck,
  Building,
  LogIn,
  LogOut,
  ArrowRightToLine,
  ArrowLeftToLine,
  ChevronDown,
  ChevronUp
} from "lucide-react";

import axios from "axios";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Sidebar({
  collapsed,
  toggleSidebar,
  active,
  setActive,
  onLogout
}) {
  const [attendanceHovered, setAttendanceHovered] = useState(false);
  const [leaveHovered, setLeaveHovered] = useState(false);

  useEffect(() => {
    const fetchToken = async () => {
      const token = localStorage.getItem("token");
      const user = JSON.parse(localStorage.getItem("user"));

      if (token && user?.id) {
        try {
          const response = await axios.get(
            `http://localhost:5000/api/tokens/token/${user.id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`
              }
            }
          );
          if (response.status === 200) {
            localStorage.setItem("token", response.data.token);
          }
        } catch (err) {
          console.error("Token refresh failed:", err);
        }
      }
    };

    fetchToken();
  }, []);

  return (
    <aside
      className={`${
        collapsed ? "w-20" : "w-54"
      } bg-white dark:bg-gray-800 shadow-lg h-screen overflow-hidden transition-all duration-500 ease-in-out flex flex-col relative`}
    >
      {/* White Header Section with Logo / Favicon */}
      <div className="h-16 flex items-center justify-center px-4 shadow-md dark:shadow-gray-800 bg-white">
        {collapsed ? (
          <img
            src="/src/assets/image/favicon 1.png"
            alt="Huboweb Icon"
            className="h-8 w-8"
          />
        ) : (
          <img
            src="/src/assets/image/huboweb.png"
            alt="Huboweb Logo"
            className="h-9 w-auto"
          />
        )}
      </div>

      {/* Sidebar Menu */}
      <div className="flex-1 bg-gradient-to-b from-[#1E3A8A] to-[#abd2ff] p-2 overflow-y-auto relative scrollbar-hide">
        {/* Toggle button fixed in top-right corner */}
        <button
          onClick={toggleSidebar}
          className="absolute top-1 right-[-10px]  p-2 rounded-md transition-colors duration-300  text-white hover:text-blue-300 z-10"
        >
          {collapsed ? (
            <ArrowRightToLine className="w-6 h-5" />
          ) : (
            <ArrowLeftToLine className="w-6 h-5" />
          )}
        </button>

        <nav className="flex flex-col gap-1 mt-5">
          <SidebarLink
            to="/dashboard"
            icon={LayoutDashboard}
            label="Dashboard"
            active={active}
            setActive={setActive}
            collapsed={collapsed}
          />
          <SidebarLink
            to="/handbook"
            icon={Book}
            label="Handbook"
            active={active}
            setActive={setActive}
            collapsed={collapsed}
          />

          <DropdownSection
            label="Attendance"
            icon={CalendarCheck}
            hovered={attendanceHovered}
            setHovered={setAttendanceHovered}
            collapsed={collapsed}
            items={[
              { to: "/checkin", icon: LogIn, label: "Check In" },
              { to: "/checkout", icon: LogOut, label: "Check Out" }
            ]}
            setActive={setActive}
          />

          <SidebarLink
            to="/user"
            icon={User}
            label="User"
            active={active}
            setActive={setActive}
            collapsed={collapsed}
          />
          <SidebarLink
            to="/role"
            icon={Briefcase}
            label="Role"
            active={active}
            setActive={setActive}
            collapsed={collapsed}
          />
          <SidebarLink
            to="/employee"
            icon={Users}
            label="Employee"
            active={active}
            setActive={setActive}
            collapsed={collapsed}
          />

          <DropdownSection
            label="Leave"
            icon={ClipboardCheck}
            hovered={leaveHovered}
            setHovered={setLeaveHovered}
            collapsed={collapsed}
            items={[
              {
                to: "/apply-leave",
                icon: ArrowRightToLine,
                label: "Apply Leave"
              },
              {
                to: "/leave-history",
                icon: ArrowLeftToLine,
                label: "Leave History"
              }
            ]}
            setActive={setActive}
          />

          <SidebarLink
            to="/task"
            icon={ClipboardCheck}
            label="Task"
            active={active}
            setActive={setActive}
            collapsed={collapsed}
          />
          <SidebarLink
            to="/client"
            icon={Building}
            label="Client"
            active={active}
            setActive={setActive}
            collapsed={collapsed}
          />
          <SidebarLink
            to="/projects"
            icon={Layers2}
            label="Projects"
            active={active}
            setActive={setActive}
            collapsed={collapsed}
          />

          <button
            onClick={onLogout}
            className={`flex items-center gap-1 w-full p-2 mt-2 text-red-600 hover:bg-red-100 rounded-lg transition 
           ${collapsed ? "justify-start pl-2" : "justify-start pl-3"}
           `}
           >
            <LogOut className="w-5 h-5" />
            {!collapsed && <span>Logout</span>}
          </button>
        </nav>
      </div>
    </aside>
  );
}

/* --- SidebarLink Component --- */
function SidebarLink({ to, icon: Icon, label, active, setActive, collapsed }) {
  return (
    <NavLink
      to={to}
      onClick={() => setActive(label)}
      className={({ isActive }) =>
        `${
          isActive || active === label
            ? "bg-blue-100/60 text-black dark:bg-blue-900"
            : "hover:bg-blue-100/60 hover:text-black text-white dark:text-gray-300"
        } flex items-center gap-3 w-full p-3 rounded-lg transition`
      }
    >
      <Icon className="w-5 h-5" />
      {!collapsed && <span>{label}</span>}
    </NavLink>
  );
}

/* --- DropdownSection (hover bug fixed cleanly) --- */
function DropdownSection({
  label,
  icon: Icon,
  hovered,
  setHovered,
  collapsed,
  items,
  setActive
}) {
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={(e) => {
        const related = e.relatedTarget;
        if (!e.currentTarget.contains(related)) {
          setHovered(false);
        }
      }}
      className="relative"
    >
      <div
        className={`${
          hovered
            ? "bg-blue-100/60 text-black dark:bg-blue-900"
            : "hover:bg-blue-100/60 hover:text-black text-white dark:text-gray-300"
        } flex items-center justify-between gap-3 w-full p-3 rounded-lg transition cursor-pointer`}
      >
        <div className="flex items-center gap-3">
          <Icon className="w-5 h-5" />
          {!collapsed && <span>{label}</span>}
        </div>
        {!collapsed &&
          (hovered ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          ))}
      </div>

      {/* Dropdown Items */}
      <div
        className={`overflow-hidden transition-all duration-200 ease-in-out ${
          hovered && !collapsed ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="ml-4 mt-1 flex flex-col rounded-md">
          {items.map(({ to, icon: ItemIcon, label: itemLabel }) => (
            <NavLink
              key={itemLabel}
              to={to}
              onClick={() => setActive(itemLabel)}
              className="px-2 py-2 hover:bg-blue-200 rounded-lg hover:text-black text-white dark:text-gray-300 text-sm flex items-center gap-2 transition"
            >
              <ItemIcon className="w-4 h-4" />
              <span>{itemLabel}</span>
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
}
