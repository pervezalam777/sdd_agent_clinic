import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Agents from './pages/Agents'
import CheckIn from './pages/CheckIn'
import ProfileAnalyticsPage from './pages/ProfileAnalyticsPage'

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <span className="text-xl font-bold text-indigo-600">AgentClinic</span>
            </div>
            <div className="flex items-center space-x-4">
              <a href="/" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-200">
                Home
              </a>
              <a href="/about" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-200">
                About
              </a>
              <a href="/agents" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-200">
                Agents
              </a>
              <a href="/check-in" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-200">
                Check-In
              </a>
              <a href="/analytics/profiles" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-200">
                Analytics
              </a>
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/agents" element={<Agents />} />
          <Route path="/check-in" element={<CheckIn />} />
          <Route path="/analytics/profiles/:profileId" element={<ProfileAnalyticsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
