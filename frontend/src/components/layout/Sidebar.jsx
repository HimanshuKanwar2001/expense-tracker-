// src/components/layout/Sidebar.jsx
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Sidebar = () => {
  const { user } = useAuth();
  return (
    <div className="w-64 bg-white dark:bg-gray-800 p-6 hidden md:block">
      <h1 className="text-2xl font-bold mb-6 text-indigo-600 dark:text-indigo-400">
        FinanceTracker
      </h1>
      <nav className="space-y-3">
        <Link to="/" className="block hover:text-indigo-500">
          Dashboard
        </Link>
        {(user?.role === "admin" || user?.role === "user") && (
          <Link to="/transactions" className="block hover:text-indigo-500">
            Transactions
          </Link>
        )}
        it
        {/* Admin only */}
        {user?.role === "admin" && (
          <Link to="/admin/users" className="block hover:text-indigo-500">
            Manage Users
          </Link>
        )}
      </nav>
    </div>
  );
};

export default Sidebar;
