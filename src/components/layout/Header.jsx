// src/components/layout/Header.jsx
import * as React from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { Menu, X, LogOut, Sun, Moon, User, BookOpen, Award, Settings, Gift, MessageCircle, ChevronDown, LayoutDashboard } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"
import { StorageService, AUTH_KEY } from "../../services/storage"

const NAV_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/catalog", label: "Courses" },
  { href: "/my-courses", label: "My Courses" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/certificates", label: "Certificates" },
  { href: "/my-doubts", label: "Doubts" },
]

const DROPDOWN_ITEMS = [
  { href: "/profile", label: "Profile", icon: User },
  { href: "/my-courses", label: "My Courses", icon: BookOpen },
  { href: "/certificates", label: "Certificates", icon: Award },
  { href: "/my-doubts", label: "My Doubts", icon: MessageCircle },
  { href: "/settings", label: "Settings", icon: Settings },
  { href: "/referral", label: "Refer & Earn", icon: Gift },
]

export function Header() {
  const navigate = useNavigate()
  const location = useLocation()
  const [isOpen, setIsOpen] = React.useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false)
  const [isAtTop, setIsAtTop] = React.useState(true)
  const [authState, setAuthState] = React.useState({ isAuthenticated: false, user: null })
  const [theme, setTheme] = React.useState(localStorage.getItem('theme') || 'light')
  const dropdownRef = React.useRef(null)

  React.useEffect(() => {
    // Load initial auth state
    setAuthState({
      isAuthenticated: StorageService.isAuthenticated(),
      user: StorageService.getUser()
    })

    // Listen for auth changes
    const handleAuthUpdate = () => {
      setAuthState({
        isAuthenticated: StorageService.isAuthenticated(),
        user: StorageService.getUser()
      })
    }
    
    window.addEventListener(`storage-update-${AUTH_KEY}`, handleAuthUpdate)
    return () => window.removeEventListener(`storage-update-${AUTH_KEY}`, handleAuthUpdate)
  }, [])

  React.useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    localStorage.setItem('theme', theme)
  }, [theme])

  React.useEffect(() => {
    const update = () => setIsAtTop(window.scrollY === 0)
    update()
    window.addEventListener("scroll", update, { passive: true })
    return () => window.removeEventListener("scroll", update)
  }, [])

  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleToggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  const handleSignOut = () => {
    StorageService.logout()
    setIsOpen(false)
    setIsDropdownOpen(false)
    navigate("/auth")
  }

  const { isAuthenticated, user } = authState

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isAtTop ? 'bg-surface/90' : 'bg-surface shadow-sm border-b border-surface-dim'}`}>
      <div className="flex justify-between items-center w-full px-4 sm:px-8 py-4 max-w-7xl mx-auto">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-4 group">
          <div className="w-9 h-9 signature-gradient rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
            <span className="text-white font-headline font-bold text-lg">A</span>
          </div>
          <span className="text-xl font-bold tracking-tighter text-primary font-headline">ADHOC LMS</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6 font-headline font-semibold tracking-tight">
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

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          {/* Theme Toggle (Always Visible) */}
          <button
            onClick={handleToggleTheme}
            className="p-2 bg-surface-container-high rounded-full border border-surface-dim hover:bg-surface-dim transition-colors"
            title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            {theme === "dark" ? <Sun className="h-4 w-4 text-yellow-500" /> : <Moon className="h-4 w-4 text-primary" />}
          </button>

          {!isAuthenticated ? (
            <>
              <Link to="/auth" className="px-5 py-2 text-primary font-semibold hover:opacity-80 transition-all duration-200 active:scale-95">Login</Link>
              <Link to="/auth/register" className="px-6 py-2 signature-gradient text-white rounded-lg font-semibold hover:opacity-90 transition-all duration-200 active:scale-95 shadow-md">Sign Up</Link>
            </>
          ) : (
            <div className="flex items-center gap-4">
              {user?.role === 'admin' && (
                <Link to="/admin" className="px-4 py-1.5 border border-primary text-primary rounded-lg text-xs font-bold hover:bg-primary/5 transition-all uppercase tracking-widest">
                  Admin Console
                </Link>
              )}
              
              {/* User Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-2 p-1 rounded-full hover:bg-surface-container-high transition"
                >
                  <div className="w-9 h-9 bg-primary-container rounded-full flex items-center justify-center">
                    <span className="text-on-primary-fixed text-sm font-bold">
                      {user?.name?.charAt(0).toUpperCase() || 'U'}
                    </span>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-on-surface-variant transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-surface-container rounded-xl shadow-lg border border-outline-variant overflow-hidden z-50">
                    <div className="px-4 py-3 border-b border-outline-variant">
                      <p className="text-sm font-semibold text-on-surface">{user?.name}</p>
                      <p className="text-xs text-on-surface-variant">{user?.email}</p>
                    </div>
                    
                    <div className="py-1">
                      {DROPDOWN_ITEMS.map((item) => (
                        <Link
                          key={item.href}
                          to={item.href}
                          className="flex items-center gap-3 px-4 py-2 text-sm text-on-surface hover:bg-surface-container-high transition"
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          <item.icon className="w-4 h-4" />
                          {item.label}
                        </Link>
                      ))}
                    </div>
                    
                    <div className="border-t border-outline-variant py-1">
                      <button
                        onClick={handleSignOut}
                        className="flex items-center gap-3 w-full px-4 py-2 text-sm text-error hover:bg-error-container transition"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md p-2 text-on-surface hover:bg-surface-dim md:hidden"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
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
              
              <div className="border-t border-surface-dim my-2"></div>
              
              <Link to="/settings" className="rounded-md px-3 py-2 text-sm font-medium text-on-surface hover:bg-surface-dim" onClick={() => setIsOpen(false)}>
                Settings
              </Link>
              <Link to="/referral" className="rounded-md px-3 py-2 text-sm font-medium text-on-surface hover:bg-surface-dim" onClick={() => setIsOpen(false)}>
                Refer & Earn
              </Link>
              
              <button
                onClick={() => {
                  handleToggleTheme()
                  setIsOpen(false)
                }}
                className="rounded-md px-3 py-2 text-sm font-medium text-on-surface hover:bg-surface-dim text-left flex items-center gap-2"
              >
                {theme === "dark" ? <Sun className="h-4 w-4 text-yellow-500" /> : <Moon className="h-4 w-4 text-primary" />}
                {theme === "dark" ? "Light Mode" : "Dark Mode"}
              </button>
              
              {!isAuthenticated ? (
                <>
                  <Link to="/auth" className="mt-1 rounded-md px-3 py-2 text-sm font-semibold text-primary hover:bg-surface-dim" onClick={() => setIsOpen(false)}>
                    Login
                  </Link>
                  <Link to="/auth/register" className="mt-1 rounded-md px-3 py-2 text-sm font-semibold text-primary hover:bg-surface-dim" onClick={() => setIsOpen(false)}>
                    Sign Up
                  </Link>
                </>
              ) : (
                <>
                  {user?.role === 'admin' && (
                    <Link to="/admin" className="rounded-md px-3 py-2 text-sm font-medium text-primary hover:bg-surface-dim" onClick={() => setIsOpen(false)}>
                      Admin Console
                    </Link>
                  )}
                  <button onClick={handleSignOut} className="mt-1 rounded-md px-3 py-2 text-left text-sm font-semibold text-error hover:bg-error-container">
                    Sign Out
                  </button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}