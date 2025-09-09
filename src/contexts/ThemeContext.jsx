import { createContext, useContext, useEffect, useState } from 'react'

const ThemeContext = createContext()

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return context
}

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light')
  const [isLoading, setIsLoading] = useState(true)

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    const stored = localStorage.getItem('theme')
    if (stored && (stored === 'light' || stored === 'dark')) {
      setTheme(stored)
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark')
    }
    setIsLoading(false)
  }, [])

  // Apply theme class to document
  useEffect(() => {
    if (isLoading) return
    
    document.documentElement.classList.remove('light', 'dark')
    document.documentElement.classList.add(theme)
    localStorage.setItem('theme', theme)
  }, [theme, isLoading])

  // Listen for system preference changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = (e) => {
      // Only auto-switch if user hasn't manually set a preference
      if (!localStorage.getItem('theme')) {
        setTheme(e.matches ? 'dark' : 'light')
      }
    }
    
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light')
  }

  const setLightTheme = () => setTheme('light')
  const setDarkTheme = () => setTheme('dark')

  return (
    <ThemeContext.Provider value={{ 
      theme, 
      setTheme, 
      toggleTheme,
      setLightTheme,
      setDarkTheme,
      isLoading 
    }}>
      {children}
    </ThemeContext.Provider>
  )
}