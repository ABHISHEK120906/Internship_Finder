import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Simple test component
const TestPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gold-primary mb-4">ELITEX AI</h1>
        <p className="text-xl text-silver-primary mb-8">Website is working!</p>
        <div className="space-y-4">
          <div className="luxury-card p-6">
            <h2 className="text-2xl font-bold text-white mb-2">Test Card</h2>
            <p className="text-silver-primary">This is a test card to verify styling is working.</p>
          </div>
          <button className="gold-btn px-6 py-3">
            Test Button
          </button>
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TestPage />} />
        <Route path="*" element={<TestPage />} />
      </Routes>
      <ToastContainer theme="dark" position="bottom-right" />
    </Router>
  );
};

export default App;
