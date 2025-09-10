export const OptimizedImage = ({ 
  webpSrc, 
  pngSrc, 
  alt, 
  className = '', 
  priority = false,
  ...props 
}) => {
  return (
    <picture>
      <source srcSet={webpSrc} type="image/webp" />
      <img 
        src={pngSrc} 
        alt={alt} 
        className={className}
        loading={priority ? "eager" : "lazy"}
        {...props}
      />
    </picture>
  )
}