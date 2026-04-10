import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Filter, 
  MapPin, 
  Briefcase, 
  Clock, 
  DollarSign,
  Calendar,
  ArrowRight,
  Building
} from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import axios from 'axios';

interface Internship {
  _id: string;
  title: string;
  company: string;
  location: string;
  type: 'remote' | 'onsite' | 'hybrid';
  duration: string;
  stipend: string;
  description: string;
  requirements: string[];
  skills: string[];
  deadline: string;
  postedBy: {
    _id: string;
    name: string;
    email: string;
  };
}

const Internships: React.FC = () => {
  const [internships, setInternships] = useState<Internship[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  
  const { token } = useAuthStore();

  const fetchInternships = useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (searchQuery) params.append('search', searchQuery);
      if (filterType) params.append('type', filterType);
      
      const response = await axios.get(
        `http://localhost:5000/internships?${params.toString()}`
      );
      
      if (response.data.success) {
        setInternships(response.data.internships);
      }
    } catch (error) {
      console.error('Error fetching internships:', error);
    } finally {
      setLoading(false);
    }
  }, [searchQuery, filterType]);

  useEffect(() => {
    fetchInternships();
  }, [fetchInternships]);

  const handleApply = async (internshipId: string) => {
    if (!token) {
      alert('Please login to apply');
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:5000/applications',
        { 
          internshipId,
          coverLetter: 'I am interested in this internship opportunity.',
          resume: 'resume.pdf' // This would be handled by file upload
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        alert('Application submitted successfully!');
        fetchInternships(); // Refresh to update UI if needed
      }
    } catch (error: unknown) {
      const errorMessage = error && typeof error === 'object' && 'response' in error 
        ? (error.response as any)?.data?.message 
        : 'Error applying to internship';
      alert(errorMessage || 'Error applying to internship');
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'remote': return 'bg-green-100 text-green-800';
      case 'onsite': return 'bg-blue-100 text-blue-800';
      case 'hybrid': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-yellow-600 to-yellow-500 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl font-bold text-white mb-4">
              Find Your Perfect Internship
            </h1>
            <p className="text-xl text-yellow-100">
              Discover opportunities from top companies
            </p>
          </motion.div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search internships..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-900 border border-gray-800 rounded-lg focus:outline-none focus:border-yellow-500 text-white"
            />
          </div>
          
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="px-6 py-3 bg-gray-900 border border-gray-800 rounded-lg hover:bg-gray-800 flex items-center gap-2"
          >
            <Filter className="w-4 h-4" />
            Filters
          </button>
        </div>

        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mb-8 p-4 bg-gray-900 rounded-lg border border-gray-800"
          >
            <div className="flex flex-wrap gap-4">
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-yellow-500 text-white"
              >
                <option value="">All Types</option>
                <option value="remote">Remote</option>
                <option value="onsite">On-site</option>
                <option value="hybrid">Hybrid</option>
              </select>
            </div>
          </motion.div>
        )}

        {/* Internships List */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-500"></div>
            <p className="mt-4 text-gray-400">Loading internships...</p>
          </div>
        ) : internships.length === 0 ? (
          <div className="text-center py-12">
            <Briefcase className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-400 mb-2">
              No internships found
            </h3>
            <p className="text-gray-500">
              Try adjusting your search or filters
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {internships.map((internship, index) => (
              <motion.div
                key={internship._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-900 rounded-lg border border-gray-800 p-6 hover:border-yellow-500 transition-colors"
              >
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-white mb-2">
                          {internship.title}
                        </h3>
                        <div className="flex items-center gap-4 text-gray-400 mb-3">
                          <div className="flex items-center gap-1">
                            <Building className="w-4 h-4" />
                            <span>{internship.company}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            <span>{internship.location}</span>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2 mb-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(internship.type)}`}>
                            {internship.type}
                          </span>
                          <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-800 text-gray-300">
                            <Clock className="w-3 h-3 inline mr-1" />
                            {internship.duration}
                          </span>
                          <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-800 text-gray-300">
                            <DollarSign className="w-3 h-3 inline mr-1" />
                            {internship.stipend}
                          </span>
                          <span className="px-3 py-1 rounded-full text-xs font-medium bg-red-900 text-red-300">
                            <Calendar className="w-3 h-3 inline mr-1" />
                            Deadline: {new Date(internship.deadline).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-gray-300 mb-4 line-clamp-2">
                      {internship.description}
                    </p>
                    
                    {internship.skills.length > 0 && (
                      <div className="mb-4">
                        <h4 className="text-sm font-semibold text-gray-400 mb-2">Skills Required:</h4>
                        <div className="flex flex-wrap gap-2">
                          {internship.skills.map((skill, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-1 bg-gray-800 text-gray-300 rounded text-xs"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex flex-col gap-3">
                    <button
                      onClick={() => handleApply(internship._id)}
                      className="px-6 py-3 bg-gradient-to-r from-yellow-600 to-yellow-500 text-black font-semibold rounded-lg hover:from-yellow-500 hover:to-yellow-400 transition-all flex items-center justify-center gap-2"
                    >
                      Apply Now
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Internships;
