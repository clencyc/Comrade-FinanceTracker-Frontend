import { NavLink } from "react-router-dom";
import { LayoutDashboard, CreditCard, Briefcase } from "lucide-react"; // Import icons

const Sidebar = () => {
  return (
    <aside className="w-64 h-screen bg-gray-900 text-white fixed left-0 top-0 p-5">
      <h2 className="text-xl font-bold mb-6">EdgesPay</h2>
      <nav>
        <ul className="space-y-4">
          <li>
            <NavLink 
              to="/dashboard" 
              className={({ isActive }) => 
                `flex items-center gap-3 px-4 py-2 rounded-lg transition 
                ${isActive ? "bg-teal-500" : "hover:bg-gray-700"}`
              }
            >
              <LayoutDashboard size={20} /> Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/services" 
              className={({ isActive }) => 
                `flex items-center gap-3 px-4 py-2 rounded-lg transition 
                ${isActive ? "bg-teal-500" : "hover:bg-gray-700"}`
              }
            >
              <Briefcase size={20} /> Services
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/payments" 
              className={({ isActive }) => 
                `flex items-center gap-3 px-4 py-2 rounded-lg transition 
                ${isActive ? "bg-teal-500" : "hover:bg-gray-700"}`
              }
            >
              <CreditCard size={20} /> Payments
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/ai-books" 
              className={({ isActive }) => 
                `flex items-center gap-3 px-4 py-2 rounded-lg transition 
                ${isActive ? "bg-teal-500" : "hover:bg-gray-700"}`
              }
            >
              <CreditCard size={20} /> AI Book Recommendation
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
