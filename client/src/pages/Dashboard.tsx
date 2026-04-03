import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Home, 
  Briefcase, 
  Users, 
  Settings, 
  Bell, 
  Search,
  TrendingUp,
  TrendingDown,
  Calendar,
  FileText,
  Award,
  ChevronRight
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  Line,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const Dashboard: React.FC = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');

  // Sample data for charts
  const lineChartData = [
    { name: 'Jan', applications: 4, interviews: 2 },
    { name: 'Feb', applications: 8, interviews: 3 },
    { name: 'Mar', applications: 12, interviews: 5 },
    { name: 'Apr', applications: 15, interviews: 8 },
    { name: 'May', applications: 18, interviews: 12 },
    { name: 'Jun', applications: 22, interviews: 15 }
  ];

  const pieData = [
    { name: 'Applied', value: 45, fill: '#C0C0C0' },
    { name: 'Shortlisted', value: 25, fill: '#C9A84C' },
    { name: 'Interview', value: 20, fill: '#3B82F6' },
    { name: 'Selected', value: 10, fill: '#10B981' }
  ];

  const getTimeGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'GOOD MORNING';
    if (hour < 17) return 'GOOD AFTERNOON';
    return 'GOOD EVENING';
  };

  const navSections = [
    { 
      id: 'main', 
      label: 'MAIN', 
      items: [
        { id: 'overview', label: 'Overview', icon: Home },
        { id: 'applications', label: 'Applications', icon: Briefcase },
        { id: 'companies', label: 'Companies', icon: Users }
      ]
    },
    { 
      id: 'tools', 
      label: 'TOOLS', 
      items: [
        { id: 'calendar', label: 'Calendar', icon: Calendar },
        { id: 'documents', label: 'Documents', icon: FileText },
        { id: 'achievements', label: 'Achievements', icon: Award }
      ]
    },
    { 
      id: 'account', 
      label: 'ACCOUNT', 
      items: [
        { id: 'settings', label: 'Settings', icon: Settings }
      ]
    }
  ];

  const statsCards = [
    {
      title: 'Total Applications',
      value: '47',
      trend: 'up',
      trendValue: '12%',
      icon: Briefcase,
      color: 'gold'
    },
    {
      title: 'Interviews Scheduled',
      value: '8',
      trend: 'up',
      trendValue: '25%',
      icon: Calendar,
      color: 'gold'
    },
    {
      title: 'Profile Strength',
      value: '94%',
      trend: 'up',
      trendValue: '5%',
      icon: Award,
      color: 'gold'
    },
    {
      title: 'Response Rate',
      value: '68%',
      trend: 'down',
      trendValue: '3%',
      icon: TrendingUp,
      color: 'silver'
    }
  ];

  const recentApplications = [
    {
      company: 'Google',
      position: 'Software Engineer Intern',
      status: 'interview',
      date: '2 days ago',
      logo: 'G'
    },
    {
      company: 'Microsoft',
      position: 'Data Science Intern',
      status: 'shortlisted',
      date: '5 days ago',
      logo: 'M'
    },
    {
      company: 'Amazon',
      position: 'Product Management Intern',
      status: 'applied',
      date: '1 week ago',
      logo: 'A'
    },
    {
      company: 'Apple',
      position: 'UI/UX Design Intern',
      status: 'selected',
      date: '2 weeks ago',
      logo: 'A'
    }
  ];

  const getStatusBadge = (status: string) => {
    const styles = {
      applied: 'bg-silver-400/10 text-silver-400',
      shortlisted: 'bg-gold-500/10 text-gold-500',
      interview: 'bg-blue-500/10 text-blue-500',
      selected: 'bg-green-500/10 text-green-500',
      rejected: 'bg-red-500/10 text-red-500'
    };
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[status as keyof typeof styles] || styles.applied}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <div className="min-h-screen flex bg-black">
      {/* Sidebar */}
      <aside className="w-60 bg-[#050505] border-r border-white/4">
        {/* Logo */}
        <div className="p-6 border-b border-white/4">
          <div className="flex items-center gap-2">
            <span className="text-white font-black text-lg italic">ELITEX</span>
            <span className="text-gold-500 font-black text-lg">•</span>
            <span className="text-silver-400 font-black text-lg">AI</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4">
          {navSections.map((section) => (
            <div key={section.id} className="mb-6">
              <div className="text-xs tracking-[0.4em] text-white/20 mb-3 px-4">
                {section.label}
              </div>
              {section.items.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-all duration-200 relative ${
                    activeSection === item.id
                      ? 'bg-gold-500/8 text-gold-500'
                      : 'text-white/30 hover:bg-white/3 hover:text-white/60'
                  }`}
                >
                  {activeSection === item.id && (
                    <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-gold-500 to-gold-300 rounded-r" />
                  )}
                  <item.icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          ))}
        </nav>

        {/* User Profile */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold-500 to-gold-300 flex items-center justify-center">
              <span className="text-black font-black text-sm">JD</span>
            </div>
            <div className="flex-1">
              <div className="text-white font-medium text-sm">John Doe</div>
              <div className="text-gold-500 text-xs">Premium Member</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-black">
        {/* Header */}
        <header className="border-b border-white/4 px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-black text-white mb-1">
                {getTimeGreeting()}, JOHN
              </h1>
              <p className="text-silver-400 text-sm">
                {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} • Here's your overview
              </p>
            </div>
            <div className="flex items-center gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/30" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-white/4 border border-white/8 rounded-lg text-white placeholder-white/30 focus:border-gold-500/50 focus:outline-none transition-colors duration-300 text-sm"
                />
              </div>
              
              {/* Notifications */}
              <button className="relative p-2 text-white/60 hover:text-white transition-colors duration-200">
                <Bell className="w-5 h-5" />
                <div className="absolute top-1 right-1 w-2 h-2 bg-gold-500 rounded-full" />
              </button>
              
              {/* Avatar */}
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold-500 to-gold-300 border-2 border-gold-500/30 flex items-center justify-center">
                <span className="text-black font-black text-sm">JD</span>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {statsCards.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="spotlight-card p-8"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-full bg-gold-500/10 border border-gold-500/30 flex items-center justify-center">
                    <stat.icon className="w-5 h-5 text-gold-500" />
                  </div>
                  <div className={`flex items-center gap-1 text-xs ${
                    stat.trend === 'up' ? 'text-green-500' : 'text-red-500'
                  }`}>
                    {stat.trend === 'up' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                    <span>{stat.trendValue}</span>
                  </div>
                </div>
                <div className={`text-5xl font-black mb-2 ${
                  stat.color === 'gold' ? 'shimmer-text' : 'text-white'
                }`}>
                  {stat.value}
                </div>
                <div className="text-xs text-silver-400 tracking-[0.3em] uppercase">
                  {stat.title}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Line Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="lg:col-span-2 spotlight-card p-8"
            >
              <h3 className="text-lg font-bold text-white mb-6">Application Trends</h3>
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={lineChartData}>
                  <defs>
                    <linearGradient id="colorGold" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#C9A84C" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#C9A84C" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                  <XAxis dataKey="name" stroke="rgba(255,255,255,0.3)" />
                  <YAxis stroke="rgba(255,255,255,0.3)" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#000', 
                      border: '1px solid #C9A84C',
                      borderRadius: '8px'
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="applications" 
                    stroke="#C9A84C" 
                    fill="url(#colorGold)" 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="interviews" 
                    stroke="#C0C0C0" 
                    strokeWidth={2}
                    dot={false}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </motion.div>

            {/* Donut Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.5 }}
              className="spotlight-card p-8"
            >
              <h3 className="text-lg font-bold text-white mb-6">Application Status</h3>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#000', 
                      border: '1px solid #C9A84C',
                      borderRadius: '8px'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="text-center mt-4">
                <div className="text-2xl font-black text-white">47</div>
                <div className="text-xs text-silver-400">TOTAL</div>
              </div>
            </motion.div>
          </div>

          {/* Recent Applications Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.6 }}
            className="spotlight-card p-8"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-white">Recent Applications</h3>
              <button className="text-gold-500 hover:text-gold-400 transition-colors duration-200 flex items-center gap-1 text-sm">
                View All
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/6">
                    <th className="text-left pb-4 text-xs tracking-[0.3em] uppercase text-silver-400">Company</th>
                    <th className="text-left pb-4 text-xs tracking-[0.3em] uppercase text-silver-400">Position</th>
                    <th className="text-left pb-4 text-xs tracking-[0.3em] uppercase text-silver-400">Status</th>
                    <th className="text-left pb-4 text-xs tracking-[0.3em] uppercase text-silver-400">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {recentApplications.map((app, index) => (
                    <tr 
                      key={index}
                      className="border-b border-white/3 hover:bg-gold-500/3 transition-colors duration-200"
                    >
                      <td className="py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gold-500/20 to-gold-300/20 flex items-center justify-center">
                            <span className="text-gold-500 font-black text-xs">{app.logo}</span>
                          </div>
                          <span className="text-white font-medium">{app.company}</span>
                        </div>
                      </td>
                      <td className="py-4 text-silver-400 text-sm">{app.position}</td>
                      <td className="py-4">{getStatusBadge(app.status)}</td>
                      <td className="py-4 text-silver-400 text-sm">{app.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
