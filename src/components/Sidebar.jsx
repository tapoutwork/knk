import {
  FaTachometerAlt,
  FaFolder,
  FaUsers,
  FaCog,
} from "react-icons/fa";

import { Link, useLocation } from "react-router-dom";

function Sidebar() {
  const location = useLocation();

  const menuItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <FaTachometerAlt />,
    },
    {
      name: "Cases",
      path: "/cases",
      icon: <FaFolder />,
    },
    {
      name: "Users",
      path: "/users",
      icon: <FaUsers />,
    },
    {
      name: "Settings",
      path: "/settings",
      icon: <FaCog />,
    },
  ];

  return (
    <div className="w-[260px] bg-white h-screen border-r fixed left-0 top-0 p-5">
      
      <h1 className="text-2xl font-bold text-blue-600 mb-10">
        KNK Admin
      </h1>

      <div className="flex flex-col gap-3">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all
              
              ${
                location.pathname === item.path
                  ? "bg-blue-100 text-blue-600 font-semibold"
                  : "text-gray-700 hover:bg-gray-100"
              }
            `}
          >
            {item.icon}
            {item.name}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;