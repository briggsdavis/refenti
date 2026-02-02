import { useState, useEffect, useRef } from "react"

interface LazyImageProps {
  src: string
  alt: string
  className?: string
  threshold?: number
}

function LazyImage({
  src,
  alt,
  className = "",
  threshold = 0.1,
}: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      { threshold }
    )

    if (imgRef.current) observer.observe(imgRef.current)
    return () => observer.disconnect()
  }, [threshold])

  return (
    <img
      ref={imgRef}
      src={isInView ? src : undefined}
      alt={alt}
      className={`${className} ${isLoaded ? "opacity-100" : "opacity-0"} transition-opacity duration-500`}
      onLoad={() => setIsLoaded(true)}
      loading="lazy"
    />
  )
}

export default LazyImage
