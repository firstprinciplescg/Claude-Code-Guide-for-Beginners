import React from 'react'
import { Hash } from 'lucide-react'

export const SectionTOC = ({ sections, className = '' }) => {
  const scrollToSubsection = (subsectionId) => {
    const element = document.querySelector(`[data-subsection="${subsectionId}"]`)
    if (element) {
      const headerHeight = 80
      const elementPosition = element.offsetTop - headerHeight
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      })
    }
  }

  return (
    <div className={`bg-blue-50 border border-blue-200 rounded-lg p-4 ${className}`}>
      <h4 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
        <Hash className="w-4 h-4" />
        In This Section
      </h4>
      <nav className="space-y-2">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => scrollToSubsection(section.id)}
            className="block w-full text-left text-sm text-blue-700 hover:text-blue-900 hover:bg-blue-100 px-2 py-1 rounded transition-colors"
          >
            {section.title}
          </button>
        ))}
      </nav>
    </div>
  )
}