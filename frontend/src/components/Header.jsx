import { Bell, UserCircle } from "lucide-react";
import { useState, useEffect } from "react";

export default function Header({ activeComponent }) {
  const [fullName, setFullName] = useState("Loading...");

  useEffect(() => {
    const storedName = localStorage.getItem("fullName");
    if (storedName) {
      setFullName(`Welcome ${storedName} !`);
    } else {
      setFullName("Welcome User");
    }
  }, []);

  return (
    <header
      className="w-full h-16 shadow flex items-center justify-between px-4 md:px-6 bg-white text-black"
    >
      <div className="text-base md:text-lg font-semibold cursor-pointer hover:text-blue-600">
        {activeComponent}
      </div>

      <div className="flex items-center gap-3 md:gap-4">
        <span className="hidden sm:block font-medium cursor-pointer hover:text-blue-600">
          {fullName}
        </span>
        <Bell className="w-5 h-5 cursor-pointer hover:text-blue-600" />
        <UserCircle className="w-6 h-6 cursor-pointer hover:text-blue-600" />
      </div>
    </header>
  );
}
