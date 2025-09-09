/**
 * Reusable style utilities for consistent theming across components
 */

// Common text colors
export const textColors = {
  primary: 'text-gray-900 dark:text-gray-100',
  secondary: 'text-gray-600 dark:text-gray-400',
  muted: 'text-gray-500 dark:text-gray-500',
}

// Common background patterns
export const backgrounds = {
  card: 'bg-white dark:bg-gray-800',
  subtle: 'bg-gray-50 dark:bg-gray-800',
  gradient: 'bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800',
}

// Border colors
export const borders = {
  default: 'border-gray-200 dark:border-gray-700',
  light: 'border-gray-100 dark:border-gray-800',
}

// Alert/Info box styles by variant
export const alertBoxes = {
  info: 'bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700',
  warning: 'bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700',  
  success: 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700',
  error: 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700',
  neutral: 'bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700',
  amber: 'bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700',
}

// Alert text colors to match boxes
export const alertTextColors = {
  info: 'text-blue-800 dark:text-blue-200',
  warning: 'text-yellow-800 dark:text-yellow-200',
  success: 'text-green-800 dark:text-green-200', 
  error: 'text-red-800 dark:text-red-200',
  neutral: 'text-gray-800 dark:text-gray-200',
  amber: 'text-amber-800 dark:text-amber-200',
}

// Alert heading colors
export const alertHeadingColors = {
  info: 'text-blue-900 dark:text-blue-100',
  warning: 'text-yellow-900 dark:text-yellow-100',
  success: 'text-green-900 dark:text-green-100',
  error: 'text-red-900 dark:text-red-100', 
  neutral: 'text-gray-900 dark:text-gray-100',
  amber: 'text-amber-900 dark:text-amber-100',
}

// Transition utilities
export const transitions = {
  colors: 'transition-colors duration-300',
  all: 'transition-all duration-300 ease-in-out',
}

/**
 * Helper function to combine class strings
 */
export const cn = (...classes) => {
  return classes.filter(Boolean).join(' ')
}