import { alertBoxes, alertTextColors, alertHeadingColors, cn } from '@/lib/styles'

export const Alert = ({ 
  children, 
  variant = 'info', 
  title, 
  className = '',
  ...props 
}) => {
  return (
    <div 
      className={cn(
        'rounded-lg p-4',
        alertBoxes[variant],
        className
      )}
      {...props}
    >
      {title && (
        <h5 className={cn(
          'font-semibold mb-2',
          alertHeadingColors[variant]
        )}>
          {title}
        </h5>
      )}
      <div className={cn(
        'text-sm',
        alertTextColors[variant]
      )}>
        {children}
      </div>
    </div>
  )
}

export const AlertTitle = ({ children, className = '', ...props }) => (
  <h5 className={cn('font-semibold mb-2', className)} {...props}>
    {children}
  </h5>
)

export const AlertDescription = ({ children, className = '', ...props }) => (
  <div className={cn('text-sm', className)} {...props}>
    {children}
  </div>
)