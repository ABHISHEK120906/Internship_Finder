import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { roadmapsData, getRoadmapSteps } from '../../data/roadmaps';
import { getYoutubeResources } from '../../data/youtubeResources';
import { getCertificates, freePlatforms } from '../../data/certificates';
import { getForageSimulations } from '../../data/forageSimulations';

const RoadmapDetail: React.FC = () => {
  const { fieldId } = useParams<{ fieldId: string }>();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<'roadmap' | 'resources' | 'certificates' | 'forage' | 'claude'>('roadmap');

  const field = roadmapsData.find(f => f.id === fieldId) || { id: 'unknown', emoji: '❓', title: 'Unknown Field', category: 'Other' };
  const roadmapSteps = getRoadmapSteps(field.id);
  const youtubeResources = getYoutubeResources(field.id);
  const certificates = getCertificates(field.id);
  const forageSims = getForageSimulations(field.id);

  // Claude States Placeholder
  const [claudeGoal, setClaudeGoal] = useState('');
  const [claudeResponse, setClaudeResponse] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleClaudeGenerate = async () => {
    setIsGenerating(true);
    // Simulate API Call for now
    setTimeout(() => {
      setClaudeResponse(`Here is your custom plan for becoming a **${claudeGoal || field.title}**...\n\n### Week 1-2: Fundamentals\nFocus on the basics. Understand the core concepts...`);
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-6 md:p-10 font-sans pb-24">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header bar */}
        <button onClick={() => navigate(-1)} className="text-sm font-bold text-gray-400 hover:text-[#E5B800] flex items-center gap-2 mb-4 transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Hub
        </button>

        <div className="bg-[#141414] border border-[#222] rounded-3xl p-8 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#E5B800]/5 rounded-full blur-3xl" />
          <div className="text-7xl md:text-9xl">{field.emoji}</div>
          <div className="space-y-4 relative z-10 flex-1">
            <span className="bg-[#E5B800]/10 text-[#E5B800] px-4 py-1 rounded-full text-sm font-bold tracking-widest uppercase">
              {field.category}
            </span>
            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight">{field.title}</h1>
            <p className="text-gray-400 text-lg">
              Complete guide, tools, resources, and job simulations for {field.title}.
            </p>
          </div>
        </div>

        {/* Dynamic History Section (Mocked Claude integration) */}
        <div className="bg-[#141414] border border-[#222] rounded-3xl p-8">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-[#E5B800] uppercase italic">
            <span className="text-white">📖 What is</span> {field.title}?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-gray-300">
            <div className="space-y-3">
              <p><strong className="text-white">Created focus:</strong> Modern application development.</p>
              <p><strong className="text-white">Who uses it:</strong> Google, Netflix, Meta, Startups globally.</p>
              <p><strong className="text-white">Average Salary:</strong> ₹6L - ₹25L/year (India) | $85k-$130k (Global)</p>
            </div>
            <div className="space-y-3">
              <h4 className="text-white font-bold mb-2">Real World Use Cases:</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li>Building scalable web applications</li>
                <li>Data analysis and machine learning</li>
                <li>Cybersecurity and automation</li>
                <li>Enterprise scalable systems</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex overflow-x-auto gap-4 border-b border-[#333] pb-4 scrollbar-hide">
          {[
            { id: 'roadmap', label: '🗺️ Roadmap' },
            { id: 'resources', label: '📺 Free Courses' },
            { id: 'certificates', label: '🎓 Certificates' },
            { id: 'forage', label: '💼 Job Simulations' },
            { id: 'claude', label: '🤖 Claude AI Planner' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`whitespace-nowrap px-6 py-3 rounded-xl font-bold transition-all ${
                activeTab === tab.id 
                ? 'bg-[#E5B800] text-black shadow-[0_0_15px_rgba(229,184,0,0.3)]' 
                : 'bg-[#1a1a1a] text-gray-400 hover:bg-[#222] hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="min-h-[400px]">
          
          {/* ROADMAP TAB */}
          {activeTab === 'roadmap' && (
            <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
              
              <div className="space-y-6">
                <h3 className="text-2xl font-bold bg-[#1a1a1a] inline-block px-4 py-2 border-l-4 border-[#E5B800] uppercase">🟢 Beginner (Month 1-2)</h3>
                <div className="grid gap-3">
                  {roadmapSteps.beginner.map((step, idx) => (
                    <div key={idx} className="flex items-center gap-4 bg-[#141414] p-4 rounded-xl border border-[#222] hover:border-[#E5B800] transition-colors">
                      <input type="checkbox" className="w-5 h-5 accent-[#E5B800] rounded cursor-pointer" />
                      <span className="text-lg text-gray-200">{step.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-2xl font-bold bg-[#1a1a1a] inline-block px-4 py-2 border-l-4 border-[#E5B800] uppercase">🟡 Intermediate (Month 3-4)</h3>
                <div className="grid gap-3">
                  {roadmapSteps.intermediate.map((step, idx) => (
                    <div key={idx} className="flex items-center gap-4 bg-[#141414] p-4 rounded-xl border border-[#222] hover:border-[#E5B800] transition-colors">
                      <input type="checkbox" className="w-5 h-5 accent-[#E5B800] rounded cursor-pointer" />
                      <span className="text-lg text-gray-200">{step.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-2xl font-bold bg-[#1a1a1a] inline-block px-4 py-2 border-l-4 border-[#E5B800] uppercase">🔴 Advanced (Month 5-6)</h3>
                <div className="grid gap-3">
                  {roadmapSteps.advanced.map((step, idx) => (
                    <div key={idx} className="flex items-center gap-4 bg-[#141414] p-4 rounded-xl border border-[#222] hover:border-[#E5B800] transition-colors">
                      <input type="checkbox" className="w-5 h-5 accent-[#E5B800] rounded cursor-pointer" />
                      <span className="text-lg text-gray-200">{step.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* RESOURCES TAB */}
          {activeTab === 'resources' && (
            <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
              
              <div className="grid md:grid-cols-2 gap-8">
                {/* English */}
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-[#E5B800] flex items-center gap-2">
                    🇬🇧 English Channels
                  </h3>
                  <div className="space-y-4">
                    {youtubeResources.english.map((res, i) => (
                      <a key={i} href={res.link} target="_blank" rel="noreferrer" className="block p-5 bg-[#141414] border border-[#222] hover:border-[#E5B800] rounded-2xl transition-all hover:-translate-y-1 group">
                        <h4 className="text-xl font-bold text-white group-hover:text-[#E5B800] transition-colors">{res.name}</h4>
                        <p className="text-gray-400 mt-1">{res.detail}</p>
                      </a>
                    ))}
                  </div>
                </div>

                {/* Hindi */}
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-[#E5B800] flex items-center gap-2">
                    🇮🇳 Hindi Channels
                  </h3>
                  <div className="space-y-4">
                    {youtubeResources.hindi.map((res, i) => (
                      <a key={i} href={res.link} target="_blank" rel="noreferrer" className="block p-5 bg-[#141414] border border-[#222] hover:border-[#E5B800] rounded-2xl transition-all hover:-translate-y-1 group">
                        <h4 className="text-xl font-bold text-white group-hover:text-[#E5B800] transition-colors">{res.name}</h4>
                        <p className="text-gray-400 mt-1">{res.detail}</p>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* CERTIFICATES TAB */}
          {activeTab === 'certificates' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {certificates.map((cert, i) => (
                  <div key={i} className="bg-[#141414] border border-[#333] p-6 rounded-2xl flex flex-col justify-between">
                    <div>
                      <span className="text-xs font-bold bg-[#1a1a1a] text-gray-400 px-3 py-1 rounded-full uppercase">{cert.platform}</span>
                      <h4 className="text-lg font-bold text-white mt-4">{cert.name}</h4>
                    </div>
                    <a href={cert.link} target="_blank" rel="noreferrer" className="mt-6 w-full py-3 bg-[#E5B800] text-black font-bold text-center rounded-xl hover:bg-yellow-400 transition-colors shadow-[0_0_15px_rgba(229,184,0,0.3)] hover:shadow-[0_0_25px_rgba(229,184,0,0.5)]">
                      Get Free Certificate
                    </a>
                  </div>
                ))}
              </div>

              <h3 className="text-2xl font-bold pt-8 border-t border-[#333] text-center">🌐 ALL FREE PLATFORMS</h3>
              <div className="flex flex-wrap justify-center gap-3">
                {freePlatforms.map((plat, i) => (
                  <a key={i} href={plat.url} target="_blank" rel="noreferrer" className="px-4 py-2 bg-[#222] text-sm text-gray-300 rounded-full hover:bg-[#E5B800] hover:text-black transition-colors font-semibold">
                    {plat.name}
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* FORAGE TAB */}
          {activeTab === 'forage' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              
              <div className="bg-[#1a1a1a] border border-[#333] p-6 rounded-2xl space-y-3">
                <h3 className="text-xl font-bold text-[#E5B800] flex items-center gap-2">⚡ HOW FORAGE WORKS</h3>
                <p className="text-gray-300">1. Click a link below to register for free on theforage.com</p>
                <p className="text-gray-300">2. Complete real company tasks (fix bugs, build dashboards, etc)</p>
                <p className="text-gray-300">3. Download your certificate instantly upon completion</p>
                <p className="text-gray-300">4. Add to your profile and LinkedIn — employers love this!</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {forageSims.map((sim, i) => (
                  <div key={i} className="bg-[#141414] border border-[#222] hover:border-[#E5B800]/50 p-6 rounded-2xl transition-all">
                    <div className="flex justify-between items-start mb-4">
                      <h4 className="text-xl font-black text-white">{sim.company}</h4>
                      <span className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded-md">{sim.duration}</span>
                    </div>
                    <p className="text-[#E5B800] font-bold mb-2">{sim.role}</p>
                    <p className="text-sm text-gray-500 mb-6">Skills: {sim.skills}</p>
                    
                    <a href={sim.link} target="_blank" rel="noreferrer" className="block w-full py-3 border border-[#E5B800] text-[#E5B800] font-bold text-center rounded-xl hover:bg-[#E5B800] hover:text-black transition-all">
                      Start Simulation
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CLAUDE TAB */}
          {activeTab === 'claude' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-3xl mx-auto py-8">
              <div className="text-center space-y-4 mb-8">
                <h3 className="text-3xl font-black italic uppercase">Get Your <span className="text-[#E5B800]">Personalized</span> Plan</h3>
                <p className="text-gray-400">Tell Claude AI what your specific goal is, and get a tailored step-by-step roadmap to achieve it.</p>
              </div>

              <div className="flex flex-col gap-4">
                <input 
                  type="text" 
                  value={claudeGoal}
                  onChange={(e) => setClaudeGoal(e.target.value)}
                  placeholder="e.g. I want to become a Backend Engineer in 4 months..."
                  className="w-full p-4 bg-[#141414] border border-[#333] rounded-xl text-white placeholder-gray-600 focus:border-[#E5B800] focus:ring-1 focus:ring-[#E5B800] outline-none"
                />
                <button 
                  onClick={handleClaudeGenerate}
                  disabled={isGenerating}
                  className="py-4 bg-[#E5B800] text-black font-black uppercase tracking-wider rounded-xl hover:bg-yellow-400 transition-colors disabled:opacity-50"
                >
                  {isGenerating ? 'Generating Power Plan...' : 'Generate Plan ⚡'}
                </button>
              </div>

              {claudeResponse && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-8 p-6 bg-[#141414] border border-[#333] rounded-2xl whitespace-pre-wrap text-gray-300 leading-relaxed font-mono text-sm"
                >
                  {claudeResponse}
                </motion.div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default RoadmapDetail;
