import React, { useState } from 'react';
import { Search, MapPin, DollarSign, Clock, Star, SlidersHorizontal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface FilterProps {
  type: 'internship' | 'student' | 'application' | 'visitor';
  onFilter: (filters: any) => void;
  accentColor: string; // Theme-based color
}

const FilterBar: React.FC<FilterProps> = ({ type, onFilter, accentColor }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState<any>({});

  const toggleFilter = (key: string, value: string) => {
    const newFilters = { ...filters };
    if (newFilters[key] === value) {
      delete newFilters[key];
    } else {
      newFilters[key] = value;
    }
    setFilters(newFilters);
    onFilter(newFilters);
  };

  return (
    <div className="w-full mb-8">
      <div className="flex gap-4">
        <div className="flex-1 relative group">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-white transition-colors" size={20} />
          <input type="text" placeholder={`Search ${type}s by name, role, or keywords...`} value={search} onChange={(e) => setSearch(e.target.value)} className="w-full bg-white/5 border border-white/5 rounded-2xl py-5 pl-14 pr-6 text-white text-sm focus:bg-white/10 focus:border-white/20 transition-all outline-none" />
        </div>
        <button onClick={() => setIsOpen(!isOpen)} className={`px-8 rounded-2xl bg-white/5 border border-white/5 flex items-center gap-3 transition-all hover:bg-white/10 ${isOpen ? 'border-opacity-100' : 'border-opacity-0'}`} style={{ borderBottomColor: isOpen ? accentColor : 'transparent' }}>
          <SlidersHorizontal size={20} style={{ color: accentColor }} />
          <span className="font-bold text-xs uppercase tracking-widest text-white/80">Advanced Filters</span>
          {Object.keys(filters).length > 0 && <span className="bg-[#FF6B00] text-black w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black">{Object.keys(filters).length}</span>}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pt-6 pb-12 border-b border-white/5 mx-2">
              
              {/* Location / Remote Filter */}
              <div className="space-y-4">
                <label className="flex items-center gap-2 text-[10px] font-black uppercase text-white/20 tracking-widest"><MapPin size={14} /> Location Type</label>
                <div className="flex flex-wrap gap-2">
                  {['In-Office', 'Remote', 'Hybrid'].map((loc) => (
                    <button key={loc} onClick={() => toggleFilter('location', loc)} className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${filters.location === loc ? 'text-black' : 'border-white/5 text-white/40 hover:text-white'}`} style={{ backgroundColor: filters.location === loc ? accentColor : 'transparent', borderColor: filters.location === loc ? accentColor : 'transparent' }}>{loc}</button>
                  ))}
                </div>
              </div>

              {/* Stipend Range Slider (Mock) */}
              <div className="space-y-4">
                <label className="flex items-center gap-2 text-[10px] font-black uppercase text-white/20 tracking-widest"><DollarSign size={14} /> Stipend Range</label>
                <input title="Stipend Range" type="range" min="0" max="50000" step="5000" className="w-full h-1 bg-white/10 rounded-full appearance-none accent-orange-500 cursor-pointer" style={{ accentColor }} />
                <div className="flex justify-between text-[10px] font-black text-white/40 uppercase tracking-widest">
                  <span>0k</span>
                  <span>25k</span>
                  <span>50k+</span>
                </div>
              </div>

              {/* Duration Filter */}
              <div className="space-y-4">
                <label className="flex items-center gap-2 text-[10px] font-black uppercase text-white/20 tracking-widest"><Clock size={14} /> Duration</label>
                <div className="flex flex-wrap gap-2">
                  {['1-3 M', '3-6 M', '6-12 M'].map((dur) => (
                    <button key={dur} onClick={() => toggleFilter('duration', dur)} className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${filters.duration === dur ? 'text-black' : 'border-white/5 text-white/40 hover:text-white'}`} style={{ backgroundColor: filters.duration === dur ? accentColor : 'transparent', borderColor: filters.duration === dur ? accentColor : 'transparent' }}>{dur}</button>
                  ))}
                </div>
              </div>

              {/* Sort By */}
              <div className="space-y-4">
                <label className="flex items-center gap-2 text-[10px] font-black uppercase text-white/20 tracking-widest"><Star size={14} /> Sort By</label>
                <select title="Sort Results" className="w-full bg-white/5 border border-white/5 rounded-xl p-3 text-[10px] font-black uppercase tracking-widest text-white/80 outline-none hover:bg-white/10 transition-all cursor-pointer">
                  <option value="newest">Newest First</option>
                  <option value="stipend">Highest Stipend</option>
                  <option value="match">Match Percentage</option>
                </select>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FilterBar;
