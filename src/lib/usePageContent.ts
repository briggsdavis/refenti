import { useEffect, useState } from "react"
import { getPageContent } from "./api"

export function usePageContent<T extends Record<string, unknown>>(
  pageSlug: string,
  defaults: T,
): { content: T; loading: boolean } {
  const [content, setContent] = useState<T>(defaults)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    const fetch = async () => {
      const { data, error } = await getPageContent(pageSlug)
      if (cancelled) return

      if (!error && data) {
        setContent({ ...defaults, ...(data.content as Partial<T>) })
      }
      setLoading(false)
    }
    fetch()

    return () => {
      cancelled = true
    }
  }, [pageSlug])

  return { content, loading }
}
