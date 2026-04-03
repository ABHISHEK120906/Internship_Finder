import React, { Suspense, lazy } from 'react';
import { 
  BrowserRouter as Router, 
  Routes, Route, Navigate 
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Landing = lazy(() => 
  import('./pages/shared/Landing.tsx'));
const Auth = lazy(() => 
  import('./pages/shared/Auth.tsx'));
const StudentDashboard = lazy(() => 
  import('./pages/student/Dashboard.tsx'));
const AdminDashboard = lazy(() => 
  import('./pages/admin/Dashboard.tsx'));
const CompanyDashboard = lazy(() => 
  import('./pages/company/Dashboard.tsx'));
const CareerRoadmap = lazy(() => 
  import('./pages/student/CareerRoadmap.tsx'));
const RoadmapDetail = lazy(() => 
  import('./pages/student/RoadmapDetail.tsx'));
const LearningProgress = lazy(() => 
  import('./pages/student/LearningProgress.tsx'));

// Loading Screen
const LoadingScreen = () => (
  <div style={{
    height: '100vh',
    width: '100%',
    background: '#000000',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '24px'
  }}>
    <div style={{
      fontSize: '36px',
      fontWeight: '900',
      letterSpacing: '0.3em',
      fontStyle: 'italic'
    }}>
      <span style={{ color: '#ffffff' }}>ELITEX </span>
      <span style={{ color: '#C9A84C' }}>AI</span>
    </div>
    <div style={{
      display: 'flex',
      gap: '8px'
    }}>
      {[0,1,2].map(i => (
        <div key={i} style={{
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          background: '#C9A84C',
          animation: `bounce 1s ${i * 0.2}s infinite` 
        }}/>
      ))}
    </div>
    <style>{`
      @keyframes bounce {
        0%, 100% { transform: translateY(0); opacity: 0.3; }
        50% { transform: translateY(-10px); opacity: 1; }
      }
    `}</style>
  </div>
)

// Error Boundary — shows actual error instead of black screen
interface ErrorState {
  hasError: boolean
  error: string
  componentStack: string
}

class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  ErrorState
> {
  constructor(props: { children: React.ReactNode }) {
    super(props)
    this.state = { 
      hasError: false, 
      error: '',
      componentStack: ''
    }
  }

  static getDerivedStateFromError(error: Error): ErrorState {
    return { 
      hasError: true, 
      error: error.message,
      componentStack: error.stack || ''
    }
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('ELITEX AI Error:', error)
    console.error('Component Stack:', info.componentStack)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          background: '#000000',
          color: '#ffffff',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px',
          gap: '24px',
          fontFamily: 'monospace'
        }}>
          <div style={{
            fontSize: '28px',
            fontWeight: '900',
            color: '#C9A84C',
            letterSpacing: '0.2em'
          }}>
            ⚠️ ELITEX AI — ERROR
          </div>

          <div style={{
            background: '#111111',
            border: '1px solid #ff4444',
            borderRadius: '12px',
            padding: '24px',
            maxWidth: '700px',
            width: '100%'
          }}>
            <div style={{
              color: '#ff6666',
              fontSize: '14px',
              fontWeight: '700',
              marginBottom: '12px'
            }}>
              ❌ ERROR MESSAGE:
            </div>
            <div style={{
              color: '#ffaaaa',
              fontSize: '13px',
              wordBreak: 'break-all',
              lineHeight: '1.6'
            }}>
              {this.state.error}
            </div>
          </div>

          <div style={{
            background: '#111111',
            border: '1px solid #333',
            borderRadius: '12px',
            padding: '24px',
            maxWidth: '700px',
            width: '100%',
            maxHeight: '200px',
            overflow: 'auto'
          }}>
            <div style={{
              color: '#C9A84C',
              fontSize: '12px',
              fontWeight: '700',
              marginBottom: '8px'
            }}>
              📍 STACK TRACE:
            </div>
            <div style={{
              color: '#888',
              fontSize: '11px',
              whiteSpace: 'pre-wrap',
              lineHeight: '1.5'
            }}>
              {this.state.componentStack}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              onClick={() => window.location.reload()}
              style={{
                background: 'linear-gradient(135deg, #C9A84C, #FFD700)',
                color: '#000000',
                border: 'none',
                padding: '12px 32px',
                borderRadius: '6px',
                fontWeight: '800',
                cursor: 'pointer',
                fontSize: '14px',
                letterSpacing: '0.1em'
              }}
            >
              🔄 RELOAD
            </button>
            <button
              onClick={() => window.location.href = '/'}
              style={{
                background: 'transparent',
                color: '#C0C0C0',
                border: '1px solid #333',
                padding: '12px 32px',
                borderRadius: '6px',
                fontWeight: '700',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              🏠 HOME
            </button>
          </div>

          <div style={{
            color: '#555',
            fontSize: '12px',
            textAlign: 'center'
          }}>
            Copy this error and send to developer for fix
          </div>
        </div>
      )
    }
    return this.props.children
  }
}

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <Router>
        <Suspense fallback={<LoadingScreen />}>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Auth />} />
            <Route path="/register" element={<Auth />} />
            <Route 
              path="/student/dashboard" 
              element={<StudentDashboard />} 
            />
            <Route 
              path="/student/career-roadmap" 
              element={<CareerRoadmap />} 
            />
            <Route 
              path="/student/career-roadmap/:fieldId" 
              element={<RoadmapDetail />} 
            />
            <Route 
              path="/student/learning-progress" 
              element={<LearningProgress />} 
            />
            <Route 
              path="/admin/dashboard" 
              element={<AdminDashboard />} 
            />
            <Route 
              path="/company/dashboard" 
              element={<CompanyDashboard />} 
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
        <ToastContainer 
          theme="dark" 
          position="bottom-right"
          toastStyle={{
            background: '#111111',
            border: '1px solid #C9A84C',
            color: '#ffffff'
          }}
        />
      </Router>
    </ErrorBoundary>
  );
};

export default App;
