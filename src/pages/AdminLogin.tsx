import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"

export default function AdminLogin() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const { signIn, session } = useAuth()
  const navigate = useNavigate()

  // Redirect if already authenticated
  useEffect(() => {
    if (session) {
      navigate("/admin", { replace: true })
    }
  }, [session, navigate])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    const { error } = await signIn(email, password)

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      navigate("/admin")
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-refenti-charcoal px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="font-display text-4xl tracking-tighter text-refenti-gold">
            REFENTI ADMIN
          </h1>
          <p className="mt-2 text-sm text-white/60">
            Sign in to access the admin panel
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-bold tracking-ultra text-white/80 uppercase"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-2 w-full border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/40 focus:border-refenti-gold focus:outline-none"
                placeholder="admin@refenti.com"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-xs font-bold tracking-ultra text-white/80 uppercase"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-2 w-full border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/40 focus:border-refenti-gold focus:outline-none"
                placeholder="••••••••"
              />
            </div>
          </div>

          {error && (
            <div className="border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-refenti-gold px-6 py-3 text-xs font-bold tracking-ultra text-white uppercase transition-all hover:bg-refenti-gold/90 disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  )
}
