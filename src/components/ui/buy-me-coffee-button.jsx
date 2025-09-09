import React from 'react'

export const BuyMeCoffeeButton = ({ className = '' }) => {
  return (
    <div className={`flex items-center ${className}`}>
      <a 
        href="https://www.buymeacoffee.com/mdustinmoore" 
        target="_blank" 
        rel="noopener noreferrer"
        className="inline-flex items-center px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-black font-medium text-sm rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md"
        style={{ 
          fontFamily: 'Poppins, sans-serif',
          backgroundColor: '#FFDD00',
          color: '#000000'
        }}
      >
        <span className="mr-2">☕</span>
        Buy me a coffee
      </a>
    </div>
  )
}