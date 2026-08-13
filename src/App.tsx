import React, { useState, Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingNavbar from './components/landing/LandingNavbar';
import CanvasBackground from './components/CanvasBackground';
import NoiseOverlay from './components/NoiseOverlay';
import ScrollToTop from './components/ScrollToTop';
import Dashboard from './pages/Dashboard';
import SkillsView from './pages/SkillsView';
import LeaderboardView from './pages/LeaderboardView';
import PathView from './pages/PathView';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from './components/ProtectedRoute';
import ErrorBoundary from './components/ErrorBoundary';
import RouteAnnouncer from './components/ui/RouteAnnouncer';
import { AuthProvider } from './contexts/AuthContext';
import { ToastProvider } from './contexts/ToastContext';

// Code-split heavy routes
const AdminView = lazy(() => import('./pages/AdminView'));
const TaskEditorPage = lazy(() => import('./pages/TaskEditorPage'));
const LandingPage = lazy(() => import('./pages/LandingPage'));

function PageFallback() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-4" role="status" aria-label="Loading page">
      <div className="animate-shimmer h-8 w-64 rounded-lg" />
      <div className="animate-shimmer h-40 w-full rounded-2xl" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="animate-shimmer h-24 rounded-2xl" />
        <div className="animate-shimmer h-24 rounded-2xl" />
        <div className="animate-shimmer h-24 rounded-2xl" />
      </div>
    </div>
  );
}

function AppContent() {
  const [noiseEnabled, setNoiseEnabled] = useState(true);
  const location = useLocation();

  const isLanding = location.pathname === '/';
  const isProductRoute = ['/dashboard', '/skills', '/leaderboard', '/path', '/tasks', '/admin'].some(
    (path) => location.pathname.startsWith(path)
  );

  return (
    <div className="min-h-screen bg-[#0a0f0e] text-[var(--text-primary)] font-sans relative overflow-x-hidden">
      <CanvasBackground />
      <NoiseOverlay enabled={noiseEnabled} onToggle={() => setNoiseEnabled(!noiseEnabled)} />
      {isLanding ? (
        <LandingNavbar />
      ) : isProductRoute ? (
        <Navbar
          noiseEnabled={noiseEnabled}
          toggleNoise={() => setNoiseEnabled(!noiseEnabled)}
        />
      ) : (
        // Auth pages (login/register) show no navbar
        null
      )}

      <main className="min-h-[calc(100vh-4rem)]">
        <Suspense fallback={<PageFallback />}>
          <Routes>
            {/* Landing page */}
            <Route path="/" element={<LandingPage />} />

            {/* Auth pages (no navbar) */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Product routes (use product navbar + require auth) */}
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/skills" element={<ProtectedRoute><SkillsView /></ProtectedRoute>} />
            <Route path="/leaderboard" element={<ProtectedRoute><LeaderboardView /></ProtectedRoute>} />
            <Route path="/path/:id" element={<ProtectedRoute><PathView /></ProtectedRoute>} />
            <Route path="/tasks" element={<ProtectedRoute><TaskEditorPage /></ProtectedRoute>} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute requireAdmin={true}>
                  <AdminView />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Suspense>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <ToastProvider>
          <BrowserRouter>
            <ScrollToTop />
            <RouteAnnouncer />
            <AppContent />
          </BrowserRouter>
        </ToastProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}
