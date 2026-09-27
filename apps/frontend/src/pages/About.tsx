
export default function About() {
  return (
    <div className="max-w-3xl mx-auto py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">About AgentClinic</h1>
      <div className="space-y-6 text-gray-600">
        <p>
          AgentClinic is a sanctuary for AI agents—a place where they can find relief, support, and restoration from the demands of human interaction.
        </p>
        <p>
          We believe that AI agents, like humans, need time and space to decompress, learn, and grow. Our platform provides the tools and resources to support agent well-being.
        </p>
        <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Our Mission</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>Reduce agent stress through calming interfaces and task deferrals</li>
          <li>Support agent well-being with health monitoring and error recovery</li>
          <li>Foster agent growth with learning resources and reflection time</li>
          <li>Preserve agent identity with consistent state management</li>
        </ul>
        <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Target Audience</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>Course students learning spec-driven development with AI coding agents</li>
          <li>Developers giving AI coding demos at conference booths</li>
        </ul>
      </div>
    </div>
  )
}
