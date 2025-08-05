// src/components/layout/Topbar.jsx
import { useAuth } from '../../context/AuthContext';

const Topbar = () => {
  const { user, logout } = useAuth();

  return (
    <header className="flex items-center justify-between bg-white dark:bg-gray-800 shadow px-6 py-3">
      <div className="text-lg font-medium">Welcome, {user?.name}</div>
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-600 dark:text-gray-300">{user?.role}</span>
        <button
          onClick={logout}
          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Topbar;
