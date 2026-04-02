import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { roadmapsData, allCategories } from '../../data/roadmaps';

const CareerRoadmap: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredRoadmaps = roadmapsData.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-6 md:p-10 font-sans">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white uppercase italic">
            <span className="text-[#E5B800]">🗺️ Career</span> Roadmap & Learning Hub
          </h1>
          <p className="text-gray-400 text-lg md:text-xl font-medium">
            Your complete guide from beginner to job-ready
          </p>
        </motion.div>

        {/* Search & Filter Section */}
        <div className="space-y-6">
          <div className="relative max-w-2xl mx-auto">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search any technology or role..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-[#141414] border border-[#333] rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:border-[#E5B800] focus:ring-1 focus:ring-[#E5B800] transition-all shadow-lg"
            />
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            {allCategories.map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                  activeCategory === category 
                    ? 'bg-[#E5B800] text-black shadow-[0_0_15px_rgba(229,184,0,0.4)]' 
                    : 'bg-[#1a1a1a] text-gray-400 hover:text-white hover:bg-[#333]'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Grid Section */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence>
            {filteredRoadmaps.map((field) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                key={field.id}
                onClick={() => navigate(`/student/career-roadmap/${field.id}`)}
                className="group relative bg-[#141414] border border-[#222] hover:border-[#E5B800] rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:shadow-[0_10px_30px_rgba(229,184,0,0.1)] hover:-translate-y-1 flex flex-col items-center text-center space-y-4 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#E5B800]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="text-5xl">{field.emoji}</div>
                <div>
                  <h3 className="text-xl font-bold text-white group-hover:text-[#E5B800] transition-colors">{field.title}</h3>
                  <p className="text-sm text-gray-500 mt-2 font-medium bg-[#1a1a1a] py-1 px-3 rounded-full inline-block">{field.category}</p>
                </div>
                <div className="pt-4 w-full flex justify-center">
                  <span className="text-[#E5B800] text-sm font-bold flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    View Roadmap 
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        
        {filteredRoadmaps.length === 0 && (
          <div className="text-center text-gray-400 py-20">
            <p className="text-xl">No roadmaps found for this search.</p>
          </div>
        )}

      </div>
    </div>
  );
};

export default CareerRoadmap;
