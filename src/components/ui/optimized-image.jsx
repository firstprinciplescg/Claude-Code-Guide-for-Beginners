export const OptimizedImage = ({ 
  webpSrc, 
  pngSrc, 
  alt, 
  className = '', 
  ...props 
}) => {
  return (
    <picture>
      <source srcSet={webpSrc} type="image/webp" />
      <img 
        src={pngSrc} 
        alt={alt} 
        className={className}
        loading="lazy"
        {...props}
      />
    </picture>
  )
}