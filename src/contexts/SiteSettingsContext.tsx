import React, { createContext, useContext, useEffect, useState } from "react"
import {
  getSiteSettings,
  type SiteSettings,
  updateSiteSettings,
} from "../lib/api"

interface SiteSettingsContextType {
  settings: SiteSettings
  loading: boolean
  setShowNewsEvents: (value: boolean) => Promise<void>
}

const defaultSettings: SiteSettings = { showNewsEvents: true }

const SiteSettingsContext = createContext<SiteSettingsContextType | undefined>(
  undefined,
)

export function SiteSettingsProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getSiteSettings().then((result) => {
      if (!result.error) setSettings(result.data)
      setLoading(false)
    })
  }, [])

  const setShowNewsEvents = async (value: boolean) => {
    const prev = settings
    setSettings({ ...settings, showNewsEvents: value })

    const result = await updateSiteSettings({ showNewsEvents: value })
    if (result.error) {
      setSettings(prev)
      console.error("Failed to update setting:", result.error.message)
    }
  }

  return (
    <SiteSettingsContext.Provider
      value={{ settings, loading, setShowNewsEvents }}
    >
      {children}
    </SiteSettingsContext.Provider>
  )
}

export function useSiteSettings() {
  const context = useContext(SiteSettingsContext)
  if (context === undefined) {
    throw new Error("useSiteSettings must be used within a SiteSettingsProvider")
  }
  return context
}
