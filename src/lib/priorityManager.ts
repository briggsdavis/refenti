/**
 * Priority Manager for Content Loading
 * Implements aggressive prefetching, viewport-first priority, and request hijacking
 */

type PriorityLevel = "critical" | "high" | "medium" | "low"

interface PendingRequest {
  controller: AbortController
  priority: PriorityLevel
  type: "image" | "data"
  id: string
}

class PriorityManager {
  private pendingRequests: Map<string, PendingRequest> = new Map()
  private preloadedImages: Set<string> = new Set()
  private currentViewport: string | null = null

  /**
   * Preload an image with specified priority
   */
  preloadImage(src: string, priority: PriorityLevel = "medium"): Promise<void> {
    // Skip if already preloaded
    if (this.preloadedImages.has(src)) {
      return Promise.resolve()
    }

    return new Promise((resolve, reject) => {
      const img = new Image()
      const controller = new AbortController()

      // Track this request
      const requestId = `img-${src}`
      this.pendingRequests.set(requestId, {
        controller,
        priority,
        type: "image",
        id: requestId,
      })

      // Handle abort
      controller.signal.addEventListener("abort", () => {
        img.src = ""
        this.pendingRequests.delete(requestId)
        reject(new Error("Image preload aborted"))
      })

      img.onload = () => {
        this.preloadedImages.add(src)
        this.pendingRequests.delete(requestId)
        resolve()
      }

      img.onerror = () => {
        this.pendingRequests.delete(requestId)
        reject(new Error(`Failed to preload image: ${src}`))
      }

      // Set fetchpriority if supported
      if ("fetchPriority" in img) {
        ;(img as HTMLImageElement & { fetchPriority: string }).fetchPriority =
          priority === "critical" ? "high" : priority
      }

      img.src = src
    })
  }

  /**
   * Cancel all requests below a certain priority level
   */
  cancelLowerPriority(minPriority: PriorityLevel) {
    const priorityLevels = ["critical", "high", "medium", "low"]
    const minIndex = priorityLevels.indexOf(minPriority)

    this.pendingRequests.forEach((request, id) => {
      const requestIndex = priorityLevels.indexOf(request.priority)
      if (requestIndex > minIndex) {
        request.controller.abort()
        this.pendingRequests.delete(id)
      }
    })
  }

  /**
   * Set the current viewport (page/route) - cancels non-critical requests
   */
  setViewport(viewportId: string) {
    if (this.currentViewport === viewportId) return

    // Cancel all medium and low priority requests when viewport changes
    this.cancelLowerPriority("high")
    this.currentViewport = viewportId
  }

  /**
   * Preload multiple images in parallel
   */
  async preloadImages(
    sources: string[],
    priority: PriorityLevel = "medium",
  ): Promise<void> {
    await Promise.allSettled(
      sources.map((src) => this.preloadImage(src, priority)),
    )
  }

  /**
   * Check if an image is already preloaded
   */
  isPreloaded(src: string): boolean {
    return this.preloadedImages.has(src)
  }

  /**
   * Clear all preloaded image cache
   */
  clearCache() {
    this.preloadedImages.clear()
  }

  /**
   * Get the number of pending requests
   */
  getPendingCount(): number {
    return this.pendingRequests.size
  }
}

// Export singleton instance
export const priorityManager = new PriorityManager()

// Hero image preloading helpers
export const preloadHeroImage = (src: string) => {
  return priorityManager.preloadImage(src, "critical")
}

export const preloadOnHover = (src: string) => {
  return priorityManager.preloadImage(src, "high")
}
