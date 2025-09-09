import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card.jsx'

export default function CommandsReference() {
  const coreCommands = [
    { command: 'claude', description: 'Start Claude Code in interactive mode', example: 'claude' },
    { command: 'claude --version', description: 'Check current version', example: 'claude --version' },
    { command: 'claude doctor', description: 'Run comprehensive diagnostic check', example: 'claude doctor' }
  ]

  const slashCommands = [
    { command: '/clear', description: 'Reset conversation context while maintaining project awareness', example: '/clear' },
    { command: '/model', description: 'Switch between available AI models (Opus 4.1, Sonnet 4, Haiku 3.5)', example: '/model' },
    { command: '/config', description: 'Open configuration options for Claude Code settings', example: '/config' },
    { command: '/logout', description: 'Sign out of Claude Code', example: '/logout' },
    { command: '/status', description: 'Display session information, model in use, and usage statistics', example: '/status' },
    { command: '/bug', description: 'Submit feedback and report issues to Claude Code development team', example: '/bug' },
    { command: '/ide', description: 'Connect Claude Code to your IDE (when used in external terminal)', example: '/ide' }
  ]

  const allCommands = [...coreCommands, ...slashCommands]

  return (
    <section data-section="reference" className="mb-16">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">Essential Commands Reference</h2>
      
      <div className="mb-6 p-4 bg-amber-50 rounded-lg border border-amber-200">
        <p className="text-amber-800 text-sm">
          <strong>Note:</strong> Claude Code uses slash commands for system operations, distinct from your conversational requests. These commands help you manage your sessions effectively.
        </p>
      </div>

      {/* Core Commands */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Core Launch Commands</CardTitle>
          <CardDescription>Essential commands for starting Claude Code and checking system status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {coreCommands.map((cmd, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex flex-col md:flex-row md:items-center gap-2 mb-2">
                  <code className="bg-gray-100 px-3 py-1 rounded font-mono text-sm font-semibold">
                    {cmd.command}
                  </code>
                </div>
                <p className="text-gray-600 mb-2">{cmd.description}</p>
                <div className="bg-gray-50 p-2 rounded">
                  <code className="text-sm font-mono text-gray-700">{cmd.example}</code>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Slash Commands */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Slash Commands</CardTitle>
          <CardDescription>System commands used within Claude Code sessions (all start with /)</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {slashCommands.map((cmd, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex flex-col md:flex-row md:items-center gap-2 mb-2">
                  <code className="bg-blue-100 px-3 py-1 rounded font-mono text-sm font-semibold text-blue-800">
                    {cmd.command}
                  </code>
                </div>
                <p className="text-gray-600 mb-2">{cmd.description}</p>
                <div className="bg-gray-50 p-2 rounded">
                  <code className="text-sm font-mono text-gray-700">{cmd.example}</code>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Reference - Mobile-friendly Layout */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Reference</CardTitle>
          <CardDescription>All commands at a glance for quick lookup</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Mobile Layout - Card Grid */}
          <div className="md:hidden space-y-3">
            {allCommands.map((cmd, index) => (
              <div key={index} className="border rounded-lg p-3 bg-gray-50">
                <div className="mb-2">
                  <code className={`px-2 py-1 rounded text-xs font-mono font-semibold border ${
                    cmd.command.startsWith('/') 
                      ? 'bg-blue-50 text-blue-800 border-blue-200' 
                      : 'bg-white text-gray-800 border-gray-200'
                  }`}>
                    {cmd.command}
                  </code>
                </div>
                <p className="text-gray-600 text-sm mb-2">{cmd.description}</p>
                <div className="bg-white p-2 rounded border">
                  <code className="text-xs font-mono text-gray-700 break-all">
                    {cmd.example}
                  </code>
                </div>
              </div>
            ))}
          </div>
          
          {/* Desktop Layout - Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 font-semibold">Command</th>
                  <th className="text-left py-2 font-semibold">Description</th>
                </tr>
              </thead>
              <tbody>
                {allCommands.map((cmd, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-3">
                      <code className={`px-2 py-1 rounded text-xs font-mono ${
                        cmd.command.startsWith('/') 
                          ? 'bg-blue-100 text-blue-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {cmd.command}
                      </code>
                    </td>
                    <td className="py-3 text-gray-600 text-sm">{cmd.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}