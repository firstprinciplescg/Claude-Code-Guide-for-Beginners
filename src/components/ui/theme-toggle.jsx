import { useTheme } from '@/contexts/ThemeContext'
import { Moon, Sun } from 'lucide-react'
import { Button } from './button'

export const ThemeToggle = () => {
  const { theme, toggleTheme, isLoading } = useTheme()
  
  if (isLoading) {
    return (
      <Button
        variant="ghost" 
        size="sm"
        className="min-h-[48px] min-w-[48px] p-3"
        disabled
        aria-label="Loading theme"
      >
        <div className="w-5 h-5 animate-pulse bg-gray-300 rounded" />
      </Button>
    )
  }
  
  return (
    <Button
      variant="ghost" 
      size="sm"
      onClick={toggleTheme}
      className="min-h-[48px] min-w-[48px] p-3 transition-all duration-200 hover:scale-105"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      <div className="relative w-5 h-5">
        <Sun className={`absolute inset-0 transition-all duration-300 ${
          theme === 'dark' ? 'rotate-90 scale-0' : 'rotate-0 scale-100'
        }`} />
        <Moon className={`absolute inset-0 transition-all duration-300 ${
          theme === 'dark' ? 'rotate-0 scale-100' : '-rotate-90 scale-0'
        }`} />
      </div>
    </Button>
  )
}