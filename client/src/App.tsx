import React, { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Lazy load portal pages for performance
const StudentDashboard = lazy(() => import('./pages/student/Dashboard.tsx'));
const AdminDashboard = lazy(() => import('./pages/admin/Dashboard.tsx'));
const CompanyDashboard = lazy(() => import('./pages/company/Dashboard.tsx'));
const Auth = lazy(() => import('./pages/shared/Auth.tsx'));
const Landing = lazy(() => import('./pages/shared/Landing.tsx'));

const App: React.FC = () => {
  return (
    <Router>
      <Suspense fallback={<div className="h-screen w-full bg-black flex items-center justify-center text-white text-xl animate-pulse uppercase tracking-[0.5em] font-black italic">ELITEX AI...</div>}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Auth />} />
          <Route path="/register" element={<Auth />} />
          
          {/* Simple test routes for now */}
          <Route path="/student/dashboard" element={<div className="min-h-screen bg-black text-white flex items-center justify-center"><h1>Student Dashboard</h1></div>} />
          <Route path="/admin/dashboard" element={<div className="min-h-screen bg-black text-white flex items-center justify-center"><h1>Admin Dashboard</h1></div>} />
          <Route path="/company/dashboard" element={<div className="min-h-screen bg-black text-white flex items-center justify-center"><h1>Company Dashboard</h1></div>} />
          
          {/* Catch all - redirect to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
      <ToastContainer theme="dark" position="bottom-right" />
    </Router>
  );
};

export default App;
