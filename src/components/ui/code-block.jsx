import { CopyButton } from './copy-button.jsx'

export const CodeBlock = ({ 
  code, 
  language = 'bash', 
  title = '', 
  showCopy = true,
  className = '' 
}) => {
  return (
    <div className={`bg-gray-900 text-gray-100 rounded-lg overflow-hidden ${className}`}>
      {(title || showCopy) && (
        <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
          {title && (
            <span className="text-sm font-medium text-gray-300">{title}</span>
          )}
          {showCopy && (
            <CopyButton 
              text={code} 
              className="bg-gray-700 hover:bg-gray-600 text-gray-200" 
            />
          )}
        </div>
      )}
      
      <pre className="p-4 whitespace-pre-wrap break-words overflow-hidden">
        <code className={`language-${language}`}>
          {code}
        </code>
      </pre>
    </div>
  )
}

export const InlineCode = ({ children, className = '' }) => {
  return (
    <code className={`px-1.5 py-0.5 bg-gray-100 text-gray-800 rounded text-sm font-mono ${className}`}>
      {children}
    </code>
  )
}