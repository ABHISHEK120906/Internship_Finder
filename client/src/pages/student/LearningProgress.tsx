import React from 'react';
import { motion } from 'framer-motion';

const LearningProgress: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-6 md:p-10 font-sans">
      <div className="max-w-4xl mx-auto space-y-8">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-2"
        >
          <h1 className="text-4xl font-black italic uppercase tracking-tight">
            Learning <span className="text-[#E5B800]">Progress</span>
          </h1>
          <p className="text-gray-400">Track your journey, streak, and earned certificates</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#141414] border border-[#333] p-6 rounded-2xl text-center">
            <h3 className="text-gray-500 font-bold uppercase tracking-wider text-sm mb-2">Current Streak</h3>
            <div className="text-4xl">🔥 7<span className="text-xl text-gray-400 ml-1">Days</span></div>
          </div>
          
          <div className="bg-[#141414] border border-[#333] p-6 rounded-2xl text-center">
            <h3 className="text-gray-500 font-bold uppercase tracking-wider text-sm mb-2">Simulations Done</h3>
            <div className="text-4xl">💼 2</div>
          </div>

          <div className="bg-[#141414] border border-[#333] p-6 rounded-2xl text-center">
            <h3 className="text-gray-500 font-bold uppercase tracking-wider text-sm mb-2">Certificates Earned</h3>
            <div className="text-4xl">🎓 3</div>
          </div>
        </div>

        <div className="bg-[#141414] border border-[#222] rounded-3xl p-8">
          <h2 className="text-2xl font-bold mb-6 text-[#E5B800] uppercase italic">
            <span className="text-white">🏆 Your</span> Achievements
          </h2>
          
          <div className="space-y-4">
            {/* Dummy certificates */}
            {[
              { title: 'JPMorgan Chase — Software Engineering', date: 'Oct 15, 2023', platform: 'Forage' },
              { title: 'Python for Beginners', date: 'Nov 02, 2023', platform: 'Simplilearn' },
              { title: 'Scientific Computing with Python', date: 'Jan 10, 2024', platform: 'freeCodeCamp' }
            ].map((cert, i) => (
              <div key={i} className="flex flex-col sm:flex-row justify-between sm:items-center bg-[#1a1a1a] p-4 rounded-xl border border-[#333] gap-4">
                <div className="flex items-center gap-4">
                  <div className="text-3xl">✅</div>
                  <div>
                    <h4 className="font-bold text-lg">{cert.title}</h4>
                    <p className="text-sm text-gray-400">{cert.platform} • Earned on {cert.date}</p>
                  </div>
                </div>
                <button className="px-4 py-2 border border-[#E5B800] text-[#E5B800] rounded-lg text-sm font-bold hover:bg-[#E5B800] hover:text-black transition-colors whitespace-nowrap">
                  Attach to Profile
                </button>
              </div>
            ))}
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default LearningProgress;
