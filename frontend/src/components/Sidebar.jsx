import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, BookOpen, CheckSquare, Calendar as CalendarIcon, LogOut, GraduationCap, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Sidebar = ({ onClose }) => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { to: '/', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
    { to: '/subjects', icon: <BookOpen size={20} />, label: 'Subjects' },
    { to: '/tasks', icon: <CheckSquare size={20} />, label: 'Tasks' },
    { to: '/calendar', icon: <CalendarIcon size={20} />, label: 'Calendar' },
  ];

  return (
    <div className="w-72 lg:w-64 bg-slate-800/80 lg:bg-slate-800/50 backdrop-blur-xl border-r border-slate-700/50 flex flex-col h-screen overflow-y-auto">
      <div className="p-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-primary-600 p-2 rounded-lg shadow-lg shadow-primary-500/20">
            <GraduationCap className="text-white" size={24} />
          </div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
            StudyFlow
          </h1>
        </div>
        <button 
          onClick={onClose}
          className="lg:hidden p-2 hover:bg-slate-700 rounded-lg transition-colors text-slate-400"
        >
          <X size={20} />
        </button>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                isActive
                  ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/25'
                  : 'text-slate-400 hover:bg-slate-700/50 hover:text-white'
              }`
            }
          >
            <span className="group-hover:scale-110 transition-transform">{item.icon}</span>
            <span className="font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-700/50">
        <div className="flex items-center gap-3 px-4 py-3 mb-4 rounded-xl bg-slate-700/30">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary-500 to-indigo-500 flex items-center justify-center text-sm font-bold">
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{user?.name}</p>
            <p className="text-xs text-slate-400 truncate">{user?.email}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-all duration-200"
        >
          <LogOut size={20} />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
