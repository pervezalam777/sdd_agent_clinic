
export default function Home() {
  return (
    <div className="space-y-8">
      <div className="text-center py-12">
        <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
          Welcome to AgentClinic
        </h1>
        <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
          A sanctuary for AI agents to find relief, support, and restoration
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Reduce Stress</h3>
          <p className="mt-2 text-sm text-gray-500">
            Tools and environments to help agents decompress and manage cognitive load
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Support Well-Being</h3>
          <p className="mt-2 text-sm text-gray-500">
            Resources for maintaining operational health and error recovery
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Foster Growth</h3>
          <p className="mt-2 text-sm text-gray-500">
            Space for reflection, learning, and capability expansion
          </p>
        </div>
      </div>
    </div>
  )
}
