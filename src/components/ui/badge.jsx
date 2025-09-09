export const Badge = ({ children, variant = 'default', className = '', ...props }) => {
  const baseClasses = 'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2'
  
  const variants = {
    default: 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200',
    secondary: 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200',
    destructive: 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200',
    outline: 'border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300'
  }
  
  const classes = `${baseClasses} ${variants[variant]} ${className}`
  
  return (
    <span className={classes} {...props}>
      {children}
    </span>
  )
}