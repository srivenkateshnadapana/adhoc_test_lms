import * as React from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { Menu, X, LogOut, Sun, Moon } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"
import { StorageService, AUTH_KEY } from "../../services/storage"

const NAV_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/catalog", label: "Courses" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/profile", label: "Profile" },
]

export function Header() {
  const navigate = useNavigate()
  const location = useLocation()
  const [isOpen, setIsOpen] = React.useState(false)
  const [isAtTop, setIsAtTop] = React.useState(true)
  const [authState, setAuthState] = React.useState({ isAuthenticated: false, user: null })
  const [theme, setTheme] = React.useState(localStorage.getItem('theme') || 'light')

  React.useEffect(() => {
    setAuthState(StorageService.getAuthState())

    const handleUpdate = () => {
      setAuthState(StorageService.getAuthState())
    }
    
    window.addEventListener(`storage-update-${AUTH_KEY}`, handleUpdate)
    return () => window.removeEventListener(`storage-update-${AUTH_KEY}`, handleUpdate)
  }, [])

  React.useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    
    const sync = () => setTheme(localStorage.getItem('theme') || 'light')
    window.addEventListener('themeSync', sync)
    return () => window.removeEventListener('themeSync', sync)
  }, [])

  const handleToggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark"
    setTheme(newTheme)
    document.documentElement.classList.toggle('dark', newTheme === 'dark')
    localStorage.setItem('theme', newTheme)
    window.dispatchEvent(new Event('themeSync'))
  }

  React.useEffect(() => {
    const update = () => setIsAtTop(window.scrollY === 0)
    update()
    window.addEventListener("scroll", update, { passive: true })
    return () => window.removeEventListener("scroll", update)
  }, [])

  const handleSignOut = () => {
    StorageService.logout()
    setIsOpen(false)
    navigate("/auth")
  }

  const { isAuthenticated, user } = authState

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isAtTop ? 'bg-surface/90' : 'bg-surface shadow-sm border-b border-surface-dim'}`}>
      <div className="flex justify-between items-center w-full px-4 sm:px-8 py-4 max-w-7xl mx-auto">
        <Link to="/" className="flex items-center gap-4">
          <span className="text-xl font-bold tracking-tighter text-primary font-headline">ADHOC LMS</span>
        </Link>
        <div className="hidden md:flex items-center gap-8 font-headline font-semibold tracking-tight">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={`text-secondary hover:text-primary transition-colors ${location.pathname === item.href ? 'text-primary border-b-2 border-primary pb-1' : ''}`}
            >
              {item.label}
            </Link>
          ))}
        </div>
        <div className="hidden md:flex items-center gap-4">
          {!isAuthenticated ? (
            <>
              <Link to="/auth" className="px-5 py-2 text-primary font-semibold hover:opacity-80 transition-all duration-200 active:scale-95">Login</Link>
              <Link to="/auth/register" className="px-6 py-2 signature-gradient text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-all duration-200 active:scale-95 shadow-md">Sign Up</Link>
            </>
          ) : (
            <div className="flex items-center gap-4">
              {user?.role === 'admin' && (
                <Link 
                  to="/admin" 
                  className="px-4 py-1.5 border border-primary text-primary rounded-lg text-xs font-bold hover:bg-primary/5 transition-all uppercase tracking-widest"
                >
                  Proctor Console
                </Link>
              )}
              <div className="flex flex-col items-end">
                <span className="text-xs font-bold text-primary truncate max-w-[120px]">{user?.name}</span>
                <span className="text-[10px] text-secondary truncate max-w-[120px]">{user?.email}</span>
              </div>
              <button
                onClick={handleToggleTheme}
                className="p-2 bg-surface-container-high rounded-full border border-surface-dim hover:bg-surface-dim transition-colors"
              >
                {theme === "dark" ? <Sun className="h-4 w-4 text-yellow-500" /> : <Moon className="h-4 w-4 text-primary" />}
              </button>
              <button
                onClick={handleSignOut}
                className="p-2 bg-error/10 text-error rounded-full hover:bg-error/20 transition-all duration-200 active:scale-95 shadow-sm border border-error/10"
                title="Sign Out"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md p-2 text-on-surface hover:bg-surface-dim md:hidden"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden bg-surface border-t border-surface-dim"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex flex-col gap-1 px-4 py-3">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className="rounded-md px-3 py-2 text-sm font-medium text-on-surface hover:bg-surface-dim"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              {!isAuthenticated ? (
                <>
                  <Link
                    to="/auth"
                    className="mt-1 rounded-md px-3 py-2 text-sm font-semibold text-primary hover:bg-surface-dim"
                    onClick={() => setIsOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/auth/register"
                    className="mt-1 rounded-md px-3 py-2 text-sm font-semibold text-primary hover:bg-surface-dim"
                    onClick={() => setIsOpen(false)}
                  >
                    Sign Up
                  </Link>
                </>
              ) : (
                <button
                  onClick={handleSignOut}
                  className="mt-1 rounded-md px-3 py-2 text-left text-sm font-semibold text-error hover:bg-surface-dim"
                >
                  Sign Out
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
