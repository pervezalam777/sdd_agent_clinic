import { useEffect, useState } from 'react'
import { profileEngagementService } from '../services/profile-engagement'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

type TimeRange = '7d' | '14d' | '30d'

interface MetricsData {
  totalViews: number
  uniqueViewers: number
  totalEdits: number
  avgTimeBetweenEdits: number | null
  fieldChanges: Record<string, number>
  lastActivity: string | null
  timeRange: {
    start: string
    end: string
  }
}

interface DailyTrend {
  date: string
  views: number
  edits: number
}

interface MetricsDashboardProps {
  profileId: string
}

export default function MetricsDashboard({ profileId }: MetricsDashboardProps) {
  const [metrics, setMetrics] = useState<MetricsData | null>(null)
  const [dailyTrends, setDailyTrends] = useState<DailyTrend[]>([])
  const [timeRange, setTimeRange] = useState<TimeRange>('7d')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchMetrics()
  }, [profileId, timeRange])

  const fetchMetrics = async () => {
    try {
      setLoading(true)
      setError(null)

      const [metricsResponse, trendsResponse] = await Promise.all([
        profileEngagementService.getProfileMetrics(profileId, undefined, undefined, timeRange),
        profileEngagementService.getDailyTrends(profileId, undefined, undefined, timeRange),
      ])

      setMetrics(metricsResponse)
      setDailyTrends(trendsResponse)
    } catch (err) {
      setError('Failed to load metrics. Please try again.')
      console.error('Error fetching metrics:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleTimeRangeChange = (newRange: TimeRange) => {
    setTimeRange(newRange)
  }

  const chartData = {
    labels: dailyTrends.map((t) => t.date),
    datasets: [
      {
        label: 'Views',
        data: dailyTrends.map((t) => t.views),
        backgroundColor: 'rgba(79, 70, 229, 0.5)',
        borderColor: 'rgba(79, 70, 229, 1)',
        borderWidth: 1,
        pointBackgroundColor: 'rgba(79, 70, 229, 1)',
        fill: true,
      },
      {
        label: 'Edits',
        data: dailyTrends.map((t) => t.edits),
        backgroundColor: 'rgba(239, 68, 68, 0.5)',
        borderColor: 'rgba(239, 68, 68, 1)',
        borderWidth: 1,
        pointBackgroundColor: 'rgba(239, 68, 68, 1)',
        fill: true,
      },
    ],
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Daily Engagement Trends',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
    },
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading metrics...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <h3 className="text-red-800 font-medium">Error loading metrics</h3>
        <p className="text-red-600 mt-2">{error}</p>
        <button
          onClick={fetchMetrics}
          className="mt-4 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
        >
          Retry
        </button>
      </div>
    )
  }

  if (!metrics) {
    return <div className="text-center text-gray-500">No metrics available for this profile</div>
  }

  return (
    <div className="space-y-6">
      {/* Time Range Selector */}
      <div className="flex flex-wrap gap-2 items-center">
        <span className="text-sm font-medium text-gray-700">Time Range:</span>
        {(['7d', '14d', '30d'] as TimeRange[]).map((range) => (
          <button
            key={range}
            onClick={() => handleTimeRangeChange(range)}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
              timeRange === range
                ? 'bg-indigo-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            Last {range}
          </button>
        ))}
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-sm font-medium text-gray-500">Total Views</p>
          <p className="mt-2 text-3xl font-bold text-gray-900">{metrics.totalViews}</p>
          <p className="mt-1 text-sm text-green-600">+{metrics.uniqueViewers} unique viewers</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-sm font-medium text-gray-500">Total Edits</p>
          <p className="mt-2 text-3xl font-bold text-gray-900">{metrics.totalEdits}</p>
          <p className="mt-1 text-sm text-blue-600">
            {metrics.avgTimeBetweenEdits !== null
              ? `${metrics.avgTimeBetweenEdits.toFixed(1)}s avg between edits`
              : 'Not enough data'}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-sm font-medium text-gray-500">Last Activity</p>
          <p className="mt-2 text-lg font-semibold text-gray-900">
            {metrics.lastActivity ? new Date(metrics.lastActivity).toLocaleString() : 'N/A'}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-sm font-medium text-gray-500">Field Changes</p>
          <div className="mt-2 space-y-2">
            {Object.entries(metrics.fieldChanges).length > 0 ? (
              Object.entries(metrics.fieldChanges).map(([field, count]) => (
                <div key={field} className="flex justify-between text-sm">
                  <span className="text-gray-600">{field}</span>
                  <span className="font-medium text-gray-900">{count}</span>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">No field changes tracked</p>
            )}
          </div>
        </div>
      </div>

      {/* Trend Chart */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Engagement Trends</h3>
        <div className="h-80">
          <Bar data={chartData} options={chartOptions} />
        </div>
      </div>
    </div>
  )
}
