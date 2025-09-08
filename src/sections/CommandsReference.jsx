import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card.jsx'

export default function CommandsReference() {
  const commands = [
    { command: 'claude-code', description: 'Launch Claude Code in interactive mode', example: 'claude-code' },
    { command: 'claude-code --help', description: 'Display comprehensive help information', example: 'claude-code --help' },
    { command: 'claude-code --version', description: 'Display current version of Claude Code', example: 'claude-code --version' },
    { command: 'claude-code init', description: 'Initialize Claude Code configuration in project', example: 'claude-code init' },
    { command: 'claude-code --config', description: 'Access and modify configuration settings', example: 'claude-code --config api-key set [key]' },
    { command: 'claude-code --headless --task [name]', description: 'Run in headless mode for automation', example: 'claude-code --headless --task format-code' },
    { command: '/clear', description: 'Clear conversation history while maintaining context', example: '/clear' },
    { command: '/save [filename]', description: 'Save current conversation to file', example: '/save debugging-session.md' },
    { command: '/load [filename]', description: 'Load previously saved conversation', example: '/load debugging-session.md' },
    { command: '/diff [filename]', description: 'Display detailed diff view for file changes', example: '/diff src/components/UserAuth.tsx' },
    { command: '/undo', description: 'Revert last set of changes applied by Claude', example: '/undo' },
    { command: '/commit [message]', description: 'Create git commit with message', example: '/commit "Add user authentication"' },
    { command: '/status', description: 'Display current session information', example: '/status' },
    { command: '/files', description: 'List all files in conversation context', example: '/files' },
    { command: '/search [query]', description: 'Search across codebase for terms or patterns', example: '/search "getUserProfile"' },
    { command: '/export [format]', description: 'Export conversation or code changes', example: '/export markdown' },
    { command: '/test [component]', description: 'Generate and run tests for component', example: '/test UserAuth' },
    { command: '/deploy [environment]', description: 'Deploy project to specified environment', example: '/deploy staging' },
    { command: '/refactor [pattern]', description: 'Apply refactoring patterns across codebase', example: '/refactor extract-components' },
    { command: '/docs [component]', description: 'Generate documentation for components', example: '/docs api' }
  ]

  return (
    <section data-section="reference" className="mb-16">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">Essential Commands Reference</h2>
      
      {/* Core Commands */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Core Commands</CardTitle>
          <CardDescription>Essential commands for launching and configuring Claude Code</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {commands.slice(0, 6).map((cmd, index) => (
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

      {/* Session Management Commands */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Session Management</CardTitle>
          <CardDescription>Commands for managing your development sessions and conversation history</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {commands.slice(6, 12).map((cmd, index) => (
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

      {/* Development Commands */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Development & Project Commands</CardTitle>
          <CardDescription>Commands for development workflow, testing, and project management</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {commands.slice(12).map((cmd, index) => (
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

      {/* Quick Reference Table */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Reference Table</CardTitle>
          <CardDescription>All commands at a glance for quick lookup</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 font-semibold">Command</th>
                  <th className="text-left py-2 font-semibold">Description</th>
                  <th className="text-left py-2 font-semibold">Example</th>
                </tr>
              </thead>
              <tbody>
                {commands.map((cmd, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-3">
                      <code className="bg-gray-100 px-2 py-1 rounded text-xs font-mono">
                        {cmd.command}
                      </code>
                    </td>
                    <td className="py-3 text-gray-600 text-sm">{cmd.description}</td>
                    <td className="py-3">
                      <code className="bg-gray-100 px-2 py-1 rounded text-xs font-mono">
                        {cmd.example}
                      </code>
                    </td>
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