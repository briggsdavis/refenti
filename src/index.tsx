import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import App from "./App"
import { AuthProvider } from "./contexts/AuthContext"
import "./index.css"

const rootElement = document.querySelector("#root")
if (!rootElement) throw new Error("Root element not found")
const root = createRoot(rootElement)

root.render(
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>,
)
