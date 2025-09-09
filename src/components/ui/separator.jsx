export const Separator = ({ orientation = 'horizontal', className = '', ...props }) => {
  const classes = orientation === 'horizontal' 
    ? `border-b border-gray-200 w-full ${className}`
    : `border-l border-gray-200 h-full ${className}`
  
  return <div className={classes} {...props} />
}