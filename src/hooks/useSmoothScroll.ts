import Lenis from "lenis"
import { useEffect } from "react"

export function useSmoothScroll() {
  useEffect(() => {
    // Initialize Lenis with enhanced inertial effect
    const lenis = new Lenis({
      duration: 2.0, // Increased from default 1.0 for more noticeable effect
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Custom easing
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.5, // Increased multiplier for more momentum
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    })

    // Animation frame loop
    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    // Cleanup
    return () => {
      lenis.destroy()
    }
  }, [])
}
