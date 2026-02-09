import { Link, Route, Routes, useLocation } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import AdminEvents from "./AdminEvents"
import AdminInquiries from "./AdminInquiries"
import AdminNews from "./AdminNews"
import AdminProjectEditor from "./AdminProjectEditor"
import AdminProjects from "./AdminProjects"

function AdminNavbar() {
  const location = useLocation()
  const { signOut } = useAuth()

  const links = [
    { name: "Projects", path: "/admin/projects" },
    { name: "Events", path: "/admin/events" },
    { name: "News", path: "/admin/news" },
    { name: "Inquiries", path: "/admin/inquiries" },
  ]

  return (
    <nav className="fixed top-0 left-0 z-100 flex h-14 w-full items-center justify-between border-b border-gray-200 bg-white px-6">
      <div className="flex items-center gap-8">
        <Link to="/" className="text-sm font-bold text-refenti-charcoal">
          Refenti <span className="font-normal text-gray-400">Admin</span>
        </Link>
        <div className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <Link
              key={l.path}
              to={l.path}
              className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                location.pathname.startsWith(l.path)
                  ? "bg-refenti-gold/10 text-refenti-gold"
                  : "text-gray-500 hover:bg-gray-50 hover:text-refenti-charcoal"
              }`}
            >
              {l.name}
            </Link>
          ))}
        </div>
      </div>
      <button
        onClick={() => signOut()}
        className="text-sm text-gray-400 transition-colors hover:text-red-500"
      >
        Sign out
      </button>
    </nav>
  )
}

function Admin() {
  return (
    <div className="min-h-screen bg-refenti-offwhite text-refenti-charcoal">
      <AdminNavbar />
      <div className="pt-14">
        <Routes>
          <Route path="/" element={<AdminProjects />} />
          <Route path="/projects" element={<AdminProjects />} />
          <Route path="/projects/new" element={<AdminProjectEditor />} />
          <Route path="/projects/edit/:id" element={<AdminProjectEditor />} />
          <Route path="/events" element={<AdminEvents />} />
          <Route path="/news" element={<AdminNews />} />
          <Route path="/inquiries" element={<AdminInquiries />} />
        </Routes>
      </div>
    </div>
  )
}

export default Admin
