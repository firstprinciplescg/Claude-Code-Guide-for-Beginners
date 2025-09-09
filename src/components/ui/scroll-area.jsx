export const ScrollArea = ({ children, className = '', ...props }) => (
  <div className={`overflow-auto ${className}`} {...props}>
    {children}
  </div>
)