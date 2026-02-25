import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { HelmetProvider } from "react-helmet-async"
import App from "./App"
import { AuthProvider } from "./contexts/AuthContext"
import { SiteSettingsProvider } from "./contexts/SiteSettingsContext"
import "./index.css"

const rootElement = document.querySelector("#root")
if (!rootElement) throw new Error("Root element not found")
const root = createRoot(rootElement)

root.render(
  <StrictMode>
    <HelmetProvider>
      <AuthProvider>
        <SiteSettingsProvider>
          <App />
        </SiteSettingsProvider>
      </AuthProvider>
    </HelmetProvider>
  </StrictMode>,
)
