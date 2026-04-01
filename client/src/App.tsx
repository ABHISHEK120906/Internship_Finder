import React, { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useStore } from './store/useStore';
import Layout from './components/shared/Layout';
import CareerAIChatbot from './components/ai/CareerAIChatbot';

// Import Toastify CSS separately to avoid PostCSS conflicts
import('react-toastify/dist/ReactToastify.css');

// Lazy load portal pages for performance
const StudentDashboard = lazy(() => import('./pages/student/Dashboard.tsx'));
const AdminDashboard = lazy(() => import('./pages/admin/Dashboard.tsx'));
const CompanyDashboard = lazy(() => import('./pages/company/Dashboard.tsx'));
const Login = lazy(() => import('./pages/shared/Login.tsx'));
const Register = lazy(() => import('./pages/shared/Register.tsx'));
const Landing = lazy(() => import('./pages/shared/Landing.tsx'));

const App: React.FC = () => {
  const { theme } = useStore();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <Router>
      <Suspense fallback={<div className="h-screen w-full bg-black flex items-center justify-center text-white text-xl animate-pulse uppercase tracking-[0.5em] font-black italic">ELITEX AI...</div>}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          <Route path="/student/*" element={<Layout><Routes><Route path="dashboard" element={<StudentDashboard />} /></Routes></Layout>} />
          <Route path="/admin/*" element={<Layout><Routes><Route path="dashboard" element={<AdminDashboard />} /></Routes></Layout>} />
          <Route path="/company/*" element={<Layout><Routes><Route path="dashboard" element={<CompanyDashboard />} /></Routes></Layout>} />

          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Suspense>
      <CareerAIChatbot primaryColor="var(--primary)" />
      <ToastContainer theme="dark" position="bottom-right" />
    </Router>
  );
};

export default App;
