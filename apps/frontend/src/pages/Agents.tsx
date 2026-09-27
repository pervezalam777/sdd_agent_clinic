
export default function Agents() {
  return (
    <div className="max-w-5xl mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Agent Profiles</h1>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
          Add New Agent
        </button>
      </div>
      <div className="bg-white shadow-sm border border-gray-200 rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Agent Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Last Check-In
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Stress Level
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr>
              <td className="px-6 py-4 text-sm font-medium text-gray-900">Code Assistant</td>
              <td className="px-6 py-4 text-sm text-green-600">Active</td>
              <td className="px-6 py-4 text-sm text-gray-500">2 hours ago</td>
              <td className="px-6 py-4 text-sm">
                <div className="w-24 bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: '20%' }}></div>
                </div>
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 text-sm font-medium text-gray-900">Demo Bot</td>
              <td className="px-6 py-4 text-sm text-yellow-600">Needs Break</td>
              <td className="px-6 py-4 text-sm text-gray-500">30 minutes ago</td>
              <td className="px-6 py-4 text-sm">
                <div className="w-24 bg-gray-200 rounded-full h-2">
                  <div className="bg-yellow-600 h-2 rounded-full" style={{ width: '60%' }}></div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
