import { FaBell } from "react-icons/fa";

const TopBar = () => {
  return (
    <div className="w-full bg-white shadow-md p-4 flex justify-between items-center">
      <img 
        src="https://www.huboweb.com/assets/logo_dark-CZo1AmUt.png" 
        alt="Logo" 
        className="w-48 h-12 md:w-40 md:h-10 sm:w-28 sm:h-8 transition-all duration-300" 
      />

    
      <div className="flex items-center space-x-4">
        <div className="px-4 py-2 rounded-lg flex items-center space-x-3">
          <span className="text-gray-800 text-lg md:text-base sm:text-sm transition-all duration-300">
            Welcome Akhter Abbas
          </span>
          <FaBell className="text-gray-500 text-xl md:text-lg sm:text-base cursor-pointer transition-all duration-300" />
        </div>
      </div>
    </div>
  );
};

export default TopBar;
