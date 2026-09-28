import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import MetricsDashboard from '../components/MetricsDashboard'

export default function ProfileAnalyticsPage() {
  const { profileId } = useParams<{ profileId: string }>()
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    // Check if user has admin role
    const user = JSON.parse(localStorage.getItem('user') || 'null')
    if (user && user.roles?.includes('admin')) {
      setIsAdmin(true)
    }
  }, [])

  if (!profileId) {
    return (
      <div className="max-w-7xl mx-auto py-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-600">No profile ID provided</p>
          <Link to="/analytics/profiles" className="text-indigo-600 hover:underline mt-2 inline-block">
            Back to Analytics
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto py-8">
      {/* Navigation */}
      <div className="mb-6">
        <div className="flex items-center">
          <Link to="/analytics/profiles" className="text-gray-500 hover:text-gray-700 mr-2">
            Analytics
          </Link>
          <span className="text-gray-300 mx-2">/</span>
          <span className="text-gray-900 font-medium">Profile Metrics</span>
        </div>
      </div>

      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Profile Analytics</h1>
          <p className="mt-2 text-gray-600">View engagement metrics for this profile</p>
        </div>
        {isAdmin && (
          <div className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
            Admin View
          </div>
        )}
      </div>

      {/* Loading State */}
      {!profileId && (
        <div className="text-center text-gray-500 py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4">Loading profile...</p>
        </div>
      )}

      {/* Metrics Dashboard */}
      {profileId && <MetricsDashboard profileId={profileId} />}
    </div>
  )
}
