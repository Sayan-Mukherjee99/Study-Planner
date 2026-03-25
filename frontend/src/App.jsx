import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Menu, X } from 'lucide-react';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Subjects from './pages/Subjects';
import Tasks from './pages/Tasks';
import Calendar from './pages/Calendar';
import Sidebar from './components/Sidebar';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  if (loading) return <div className="flex items-center justify-center h-screen bg-slate-900 text-white">Loading...</div>;
  if (!user) return <Navigate to="/login" />;

  return (
    <div className="flex bg-slate-900 min-h-screen text-slate-100 overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 transform lg:relative lg:translate-x-0 transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <Sidebar onClose={() => setIsSidebarOpen(false)} />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="lg:hidden flex items-center justify-between p-4 bg-slate-900/50 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="bg-primary-600 p-1.5 rounded-lg">
              <Menu className="text-white" size={20} />
            </div>
            <span className="font-bold">StudyFlow</span>
          </div>
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
          >
            <Menu size={24} />
          </button>
        </header>

        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/subjects" element={<ProtectedRoute><Subjects /></ProtectedRoute>} />
          <Route path="/tasks" element={<ProtectedRoute><Tasks /></ProtectedRoute>} />
          <Route path="/calendar" element={<ProtectedRoute><Calendar /></ProtectedRoute>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
