import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Activity, 
  ShieldAlert, 
  Monitor, 
  Smartphone, 
  MapPin, 
  Search, 
  Filter, 
  ShieldCheck, 
  Zap, 
  TrendingUp, 
  Users, 
  Target,
  User,
  Building,
  Briefcase,
  FileText,
  Settings,
  Bell,
  ChevronRight,
  Edit,
  Trash2,
  Eye,
  Calendar,
  ArrowUp,
  ArrowDown,
  MoreVertical
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Cell,
  PieChart,
  Pie,
  LineChart,
  Line
} from 'recharts';
import { useAuth } from '../../hooks/useAuth';

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');

  // Mock data for charts
  const applicationStatusData = [
    { name: 'Applied', value: 45, color: 'var(--silver-primary)' },
    { name: 'Shortlisted', value: 28, color: 'var(--gold-primary)' },
    { name: 'Interview', value: 15, color: '#3B82F6' },
    { name: 'Selected', value: 12, color: '#10B981' },
    { name: 'Rejected', value: 8, color: '#EF4444' }
  ];

  const monthlyPlacementsData = [
    { month: 'Jan', placements: 12 },
    { month: 'Feb', placements: 18 },
    { month: 'Mar', placements: 25 },
    { month: 'Apr', placements: 32 },
    { month: 'May', placements: 28 },
    { month: 'Jun', placements: 35 }
  ];

  const skillsData = [
    { skill: 'JavaScript', count: 145 },
    { skill: 'React', count: 128 },
    { skill: 'Python', count: 112 },
    { skill: 'Node.js', count: 98 },
    { skill: 'TypeScript', count: 87 }
  ];

  const topCompaniesData = [
    { company: 'Google', hires: 12 },
    { company: 'Microsoft', hires: 10 },
    { company: 'Amazon', hires: 8 },
    { company: 'Meta', hires: 7 },
    { company: 'Apple', hires: 6 }
  ];

  const visitorAlerts = [
    { id: 1, action: 'Page Visit', page: '/student/dashboard', location: 'Mumbai, India', device: 'Desktop', time: '10s ago', color: '#4CAF50' },
    { id: 2, action: 'Form Submit', page: '/register', location: 'Bangalore, India', device: 'Mobile', time: '1m ago', color: '#2196F3' },
    { id: 3, action: 'Resume Download', page: '/student/profile', location: 'Nagpur, India', device: 'Desktop', time: '2m ago', color: '#f44336' },
    { id: 4, action: 'Job Application', page: '/browse-jobs', location: 'Delhi, India', device: 'Mobile', time: '3m ago', color: '#FF9800' },
    { id: 5, action: 'Profile Update', page: '/company/dashboard', location: 'Chennai, India', device: 'Desktop', time: '5m ago', color: '#9C27B0' }
  ];

  const mockUsers = [
    { id: 1, name: 'Rahul Sharma', email: 'rahul@example.com', role: 'student', status: 'active', joined: '2024-01-15' },
    { id: 2, name: 'Priya Patel', email: 'priya@example.com', role: 'student', status: 'active', joined: '2024-01-20' },
    { id: 3, name: 'Tech Solutions Inc', email: 'hr@techsolutions.com', role: 'company', status: 'active', joined: '2024-02-01' },
    { id: 4, name: 'Amit Kumar', email: 'amit@example.com', role: 'student', status: 'inactive', joined: '2024-02-10' },
    { id: 5, name: 'Global Systems Ltd', email: 'careers@global.com', role: 'company', status: 'active', joined: '2024-02-15' }
  ];

  const stats = [
    { label: 'Total Students', value: 1247, icon: Users, trend: '+12%', color: 'var(--gold-primary)' },
    { label: 'Total Companies', value: 89, icon: Building, trend: '+8%', color: 'var(--gold-primary)' },
    { label: 'Active Jobs', value: 156, icon: Briefcase, trend: '+15%', color: 'var(--silver-primary)' },
    { label: 'Total Applications', value: 3421, icon: FileText, trend: '+23%', color: 'var(--silver-primary)' },
    { label: 'Placed Students', value: 423, icon: Target, trend: '+18%', color: 'var(--gold-primary)' },
    { label: 'Pending Reviews', value: 67, icon: Calendar, trend: '-5%', color: 'var(--silver-primary)' }
  ];

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'student': return 'text-blue-400 bg-blue-subtle';
      case 'admin': return 'text-gold-primary bg-gold-subtle';
      case 'company': return 'text-green-400 bg-green-subtle';
      default: return 'text-silver-primary bg-silver-subtle';
    }
  };

  const getStatusColor = (status: string) => {
    return status === 'active' ? 'text-green-400 bg-green-subtle' : 'text-red-400 bg-red-subtle';
  };

  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === 'all' || user.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="space-y-12">
      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-16">
        <div>
          <h2 className="text-5xl font-black tracking-tighter mb-4">ADMIN <span className="gold-text gold-glow">CONSOLE</span></h2>
          <p className="text-silver-primary font-black text-xs uppercase tracking-[0.5em] mt-8 pl-1">Complete System Control</p>
        </div>
        <div className="flex gap-4">
           <button className="gold-btn flex items-center gap-2">
             <Settings size={18} /> System Settings
           </button>
           <button className="silver-btn flex items-center gap-2">
             <FileText size={18} /> Export Report
           </button>
        </div>
      </header>

      {/* Stats Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {stats.map((stat, idx) => (
          <motion.div key={idx} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: idx * 0.1 }} className="luxury-card p-6 group relative overflow-hidden">
             <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-gold-primary/20 to-transparent blur-2xl group-hover:scale-150 transition-all duration-700"></div>
             <stat.icon size={20} className="mb-4" style={{ color: stat.color }} />
             <h4 className="text-3xl font-black mb-2 tracking-tighter gold-text">{stat.value}</h4>
             <div className="flex items-center gap-2">
               <p className="text-silver-primary font-bold text-xs uppercase tracking-widest">{stat.label}</p>
               <span className={`text-xs px-2 py-1 rounded-full font-black ${stat.trend.includes('+') ? 'bg-gold-subtle text-gold-primary border border-gold-primary/30' : 'bg-silver-muted text-silver-primary border border-silver-border'}`}>
                 {stat.trend}
               </span>
             </div>
          </motion.div>
        ))}
      </section>

      {/* Charts Section */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Application Status Pie Chart */}
        <div className="luxury-card p-8">
          <h3 className="text-xl font-black uppercase tracking-tighter mb-8 flex items-center gap-4">
            <div className="w-8 h-[2px] bg-gold-primary"></div> Application Status
          </h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={applicationStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {applicationStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: 'var(--black-card)', border: '1px solid var(--gold-primary)', borderRadius: '12px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-6">
            {applicationStatusData.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                <span className="text-xs text-silver-primary">{item.name}: {item.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Monthly Placements Line Chart */}
        <div className="luxury-card p-8">
          <h3 className="text-xl font-black uppercase tracking-tighter mb-8 flex items-center gap-4">
            <div className="w-8 h-[2px] bg-gold-primary"></div> Monthly Placements
          </h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyPlacementsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--silver-border)" />
                <XAxis dataKey="month" stroke="var(--silver-primary)" fontSize={12} axisLine={false} tickLine={false} />
                <YAxis stroke="var(--silver-primary)" fontSize={12} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ backgroundColor: 'var(--black-card)', border: '1px solid var(--gold-primary)', borderRadius: '12px' }} />
                <Line type="monotone" dataKey="placements" stroke="var(--gold-primary)" strokeWidth={3} dot={{ fill: 'var(--gold-primary)', r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      {/* More Charts */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Skills Distribution */}
        <div className="luxury-card p-8">
          <h3 className="text-xl font-black uppercase tracking-tighter mb-8 flex items-center gap-4">
            <div className="w-8 h-[2px] bg-gold-primary"></div> Top Skills
          </h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={skillsData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" stroke="var(--silver-border)" />
                <XAxis type="number" stroke="var(--silver-primary)" fontSize={12} axisLine={false} tickLine={false} />
                <YAxis dataKey="skill" type="category" stroke="var(--silver-primary)" fontSize={12} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ backgroundColor: 'var(--black-card)', border: '1px solid var(--gold-primary)', borderRadius: '12px' }} />
                <Bar dataKey="count" fill="var(--gold-primary)" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Companies */}
        <div className="luxury-card p-8">
          <h3 className="text-xl font-black uppercase tracking-tighter mb-8 flex items-center gap-4">
            <div className="w-8 h-[2px] bg-gold-primary"></div> Top Hiring Companies
          </h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topCompaniesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--silver-border)" />
                <XAxis dataKey="company" stroke="var(--silver-primary)" fontSize={12} axisLine={false} tickLine={false} />
                <YAxis stroke="var(--silver-primary)" fontSize={12} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ backgroundColor: 'var(--black-card)', border: '1px solid var(--gold-primary)', borderRadius: '12px' }} />
                <Bar dataKey="hires" fill="var(--gold-primary)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      {/* User Management Table */}
      <section className="luxury-card p-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
          <h3 className="text-xl font-black uppercase tracking-tighter flex items-center gap-4">
            <div className="w-8 h-[2px] bg-gold-primary"></div> User Management
          </h3>
          <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
            <div className="relative">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-silver-primary" />
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 bg-black-pure border border-silver-border rounded-lg text-white placeholder-silver-primary focus:outline-none focus:border-gold-primary w-full md:w-64"
              />
            </div>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="px-4 py-2 bg-black-pure border border-silver-border rounded-lg text-white focus:outline-none focus:border-gold-primary"
            >
              <option value="all">All Roles</option>
              <option value="student">Students</option>
              <option value="company">Companies</option>
              <option value="admin">Admins</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-silver-border">
                <th className="text-left pb-4 text-xs font-black uppercase tracking-widest text-silver-primary">User</th>
                <th className="text-left pb-4 text-xs font-black uppercase tracking-widest text-silver-primary">Email</th>
                <th className="text-left pb-4 text-xs font-black uppercase tracking-widest text-silver-primary">Role</th>
                <th className="text-left pb-4 text-xs font-black uppercase tracking-widest text-silver-primary">Status</th>
                <th className="text-left pb-4 text-xs font-black uppercase tracking-widest text-silver-primary">Joined</th>
                <th className="text-left pb-4 text-xs font-black uppercase tracking-widest text-silver-primary">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="border-b border-silver-border/50 hover:bg-gold-subtle/5 transition-colors">
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-black-pure border border-silver-border flex items-center justify-center">
                        <User size={18} className="text-gold-primary" />
                      </div>
                      <span className="font-bold text-white">{user.name}</span>
                    </div>
                  </td>
                  <td className="py-4 text-silver-primary">{user.email}</td>
                  <td className="py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${getRoleColor(user.role)}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${getStatusColor(user.status)}`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="py-4 text-silver-primary">{user.joined}</td>
                  <td className="py-4">
                    <div className="flex items-center gap-2">
                      <button className="p-2 hover:bg-gold-subtle rounded-lg transition-colors">
                        <Eye size={16} className="text-silver-primary" />
                      </button>
                      <button className="p-2 hover:bg-gold-subtle rounded-lg transition-colors">
                        <Edit size={16} className="text-silver-primary" />
                      </button>
                      <button className="p-2 hover:bg-red-subtle rounded-lg transition-colors">
                        <Trash2 size={16} className="text-silver-primary" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Live Activity Feed */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 luxury-card p-8">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-black uppercase tracking-tighter flex items-center gap-4">
              <div className="w-8 h-[2px] bg-gold-primary"></div> System Activity
            </h3>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-gold-primary animate-pulse"></div>
              <span className="text-xs uppercase font-black text-silver-primary tracking-widest">Live</span>
            </div>
          </div>
          <div className="space-y-4 max-h-[400px] overflow-y-auto">
            {visitorAlerts.map((alert) => (
              <motion.div key={alert.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="p-4 rounded-xl bg-black-pure border border-silver-border flex items-center gap-4 hover:border-gold-primary transition-all">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${alert.color}22`, border: `1px solid ${alert.color}44` }}>
                  {alert.device === 'Desktop' ? <Monitor size={20} style={{ color: alert.color }} /> : <Smartphone size={20} style={{ color: alert.color }} />}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h5 className="font-bold text-sm uppercase gold-text">{alert.action}</h5>
                    <span className="text-xs text-silver-primary">{alert.time}</span>
                  </div>
                  <p className="text-silver-primary text-sm">Page: <span className="text-white">{alert.page}</span> • {alert.location}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="luxury-card p-8">
          <h3 className="text-xl font-black uppercase tracking-tighter mb-8 flex items-center gap-4">
            <div className="w-8 h-[2px] bg-gold-primary"></div> Quick Actions
          </h3>
          <div className="space-y-4">
            <button className="w-full p-4 bg-black-pure border border-silver-border rounded-xl text-left hover:border-gold-primary transition-all group">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-white mb-1">Send Broadcast</h4>
                  <p className="text-xs text-silver-primary">Notify all users</p>
                </div>
                <Bell size={20} className="text-silver-primary group-hover:text-gold-primary" />
              </div>
            </button>
            <button className="w-full p-4 bg-black-pure border border-silver-border rounded-xl text-left hover:border-gold-primary transition-all group">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-white mb-1">Manage Jobs</h4>
                  <p className="text-xs text-silver-primary">Review postings</p>
                </div>
                <Briefcase size={20} className="text-silver-primary group-hover:text-gold-primary" />
              </div>
            </button>
            <button className="w-full p-4 bg-black-pure border border-silver-border rounded-xl text-left hover:border-gold-primary transition-all group">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-white mb-1">Security Audit</h4>
                  <p className="text-xs text-silver-primary">View logs</p>
                </div>
                <ShieldCheck size={20} className="text-silver-primary group-hover:text-gold-primary" />
              </div>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdminDashboard;
