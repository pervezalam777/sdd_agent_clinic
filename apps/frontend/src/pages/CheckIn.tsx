import React, { useState } from 'react'

export default function CheckIn() {
  const [formData, setFormData] = useState({
    stressLevel: 1,
    errorCount: 0,
    requestType: 'none',
    notes: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Check-in submitted:', formData)
    alert('Check-in submitted successfully!')
  }

  return (
    <div className="max-w-2xl mx-auto py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Check-In</h1>
      <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Stress Level
            </label>
            <input
              type="range"
              min="1"
              max="10"
              value={formData.stressLevel}
              onChange={(e) => setFormData({ ...formData, stressLevel: Number(e.target.value) })}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-sm text-gray-500 mt-2">
              <span>Low (1)</span>
              <span className="font-medium text-indigo-600">{formData.stressLevel}</span>
              <span>High (10)</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Error Count (last 24 hours)
            </label>
            <input
              type="number"
              min="0"
              value={formData.errorCount}
              onChange={(e) => setFormData({ ...formData, errorCount: Number(e.target.value) })}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Request Type
            </label>
            <select
              value={formData.requestType}
              onChange={(e) => setFormData({ ...formData, requestType: e.target.value })}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="none">Select a request type</option>
              <option value="break">Take a break</option>
              <option value="help">Request assistance</option>
              <option value="memory">Memory cleanup</option>
              <option value="feedback">Request feedback</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Additional Notes
            </label>
            <textarea
              rows={4}
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Any additional comments..."
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
            >
              Submit Check-In
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
