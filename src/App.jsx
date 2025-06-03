import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Home from './pages/Home'
import Library from './pages/Library'
import TestPage from './pages/TestPage'
import Login from './pages/Login'
import AdminPanel from './pages/AdminPanel'
import VoiceControl from './components/VoiceControl'
import './App.css'
import Dashboard from './components/Dashboard'
import Profile from './components/Profile'
import Settings from './components/Settings'
import { voiceControl } from './utils/voiceControl'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userRole, setUserRole] = useState('user')

  const ProtectedRoute = ({ children, requiredRole }) => {
    if (!isAuthenticated) {
      return <Navigate to="/login" />
    }
    if (requiredRole && userRole !== requiredRole) {
      return <Navigate to="/" />
    }
    return children
  }

  const handleVoiceCommand = (command) => {
    if (command.type === 'navigation') {
      window.location.href = command.path
    }
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <AnimatePresence mode="wait">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/demo" element={<TestPage isDemo={true} />} />
            <Route
              path="/login"
              element={
                <Login
                  onLogin={(role) => {
                    setIsAuthenticated(true)
                    setUserRole(role)
                  }}
                />
              }
            />

            {/* Protected Routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/library"
              element={
                <ProtectedRoute>
                  <Library />
                </ProtectedRoute>
              }
            />

            <Route
              path="/tests"
              element={
                <ProtectedRoute>
                  <TestPage isDemo={false} />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin"
              element={
                <ProtectedRoute requiredRole="admin">
                  <AdminPanel />
                </ProtectedRoute>
              }
            />

            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />

            <Route
              path="/settings"
              element={
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              }
            />
          </Routes>
        </AnimatePresence>
        <VoiceControl />
      </div>
    </Router>
  )
}

export default App
