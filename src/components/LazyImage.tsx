import { useEffect, useRef, useState } from "react"

interface LazyImageProps {
  src: string
  alt: string
  className?: string
  threshold?: number
  transition?: string
  priority?: "high" | "low" | "auto"
  rootMargin?: string
}

function LazyImage({
  src,
  alt,
  className = "",
  threshold = 0.01,
  transition = "transition-opacity duration-500",
  priority = "auto",
  rootMargin = "300% 0px", // Aggressive scroll-ahead: load 3 viewports ahead
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
      {
        threshold,
        rootMargin, // Aggressive preloading margin
      },
    )

    if (imgRef.current) observer.observe(imgRef.current)
    return () => observer.disconnect()
  }, [threshold, rootMargin])

  return (
    <img
      ref={imgRef}
      src={isInView ? src : undefined}
      alt={alt}
      className={`${className} ${isLoaded ? "opacity-100" : "opacity-0"} ${transition}`}
      onLoad={() => setIsLoaded(true)}
      loading={priority === "high" ? "eager" : "lazy"}
      fetchPriority={priority}
    />
  )
}

export default LazyImage
