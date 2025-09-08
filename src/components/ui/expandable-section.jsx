import React, { useState } from 'react'
import { ChevronDown, ChevronRight } from 'lucide-react'

export const ExpandableSection = ({ 
  title, 
  children, 
  defaultExpanded = false, 
  className = '' 
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded)

  return (
    <div className={`border rounded-lg ${className}`}>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
      >
        <span className="font-medium text-gray-900">{title}</span>
        {isExpanded ? (
          <ChevronDown className="w-5 h-5 text-gray-500" />
        ) : (
          <ChevronRight className="w-5 h-5 text-gray-500" />
        )}
      </button>
      
      {isExpanded && (
        <div className="px-4 pb-4 border-t bg-gray-50">
          <div className="pt-4">
            {children}
          </div>
        </div>
      )}
    </div>
  )
}