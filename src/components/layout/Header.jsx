import * as React from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { Menu, X, LogOut, LayoutDashboard, ChevronRight } from "lucide-react"
import { StorageService, AUTH_KEY } from "../../services/storage"

export function Header() {
  const navigate = useNavigate()
  const location = useLocation()
  const [isOpen, setIsOpen] = React.useState(false)
  const [isAtTop, setIsAtTop] = React.useState(true)
  const [authState, setAuthState] = React.useState({ isAuthenticated: false, user: null })

  React.useEffect(() => {
    setAuthState(StorageService.getAuthState())
    const handleUpdate = () => setAuthState(StorageService.getAuthState())
    window.addEventListener(`storage-update-${AUTH_KEY}`, handleUpdate)
    window.addEventListener('auth-change', handleUpdate)
    return () => {
      window.removeEventListener(`storage-update-${AUTH_KEY}`, handleUpdate)
      window.removeEventListener('auth-change', handleUpdate)
    }
  }, [])

  React.useEffect(() => {
    const update = () => setIsAtTop(window.scrollY === 0)
    window.addEventListener("scroll", update, { passive: true })
    return () => window.removeEventListener("scroll", update)
  }, [])

  const handleLogout = () => {
    StorageService.logout()
    setIsOpen(false)
    window.dispatchEvent(new CustomEvent('auth-change'))
    navigate("/")
  }

  const { isAuthenticated, user } = authState

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/#about" },
    { name: "Courses", path: "/catalog" },
  ]

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isAtTop ? 'bg-surface/90' : 'bg-surface-container-lowest/80 backdrop-blur-md shadow-sm border-b border-surface-dim/20'}`}>
      <div className="flex justify-between items-center w-full px-8 py-4 max-w-7xl mx-auto">
        {/* Branding */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 signature-gradient rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
            <span className="text-white font-headline font-bold text-xl">A</span>
          </div>
          <span className="text-xl font-headline font-bold tracking-tighter text-primary">
            Adhoc Network Tech
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-10 font-headline font-semibold tracking-tight">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`text-sm transition-colors relative py-1 ${
                location.pathname === link.path 
                ? 'text-primary' 
                : 'text-secondary hover:text-primary'
              }`}
            >
              {link.name}
              {location.pathname === link.path && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-full transition-all" />
              )}
            </Link>
          ))}
        </div>

        {/* Auth Actions */}
        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <Link 
                to="/dashboard" 
                className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-xl font-headline font-bold text-sm text-primary hover:bg-surface-container transition-all"
              >
                <LayoutDashboard className="w-4 h-4" />
                Dashboard
              </Link>
              <div className="hidden md:flex flex-col items-end border-l border-surface-dim/20 pl-4">
                <span className="text-xs font-bold text-primary truncate max-w-[120px]">{user?.name}</span>
                <span className="text-[10px] text-secondary uppercase tracking-widest">{user?.role}</span>
              </div>
              <button 
                onClick={handleLogout}
                className="p-2.5 rounded-xl text-secondary hover:text-error hover:bg-error/5 transition-all"
                title="Logout"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link 
                to="/auth" 
                className="px-6 py-2.5 text-secondary font-headline font-bold text-sm hover:text-primary transition-all active:scale-95"
              >
                Login
              </Link>
              <Link 
                to="/auth/register" 
                className="px-8 py-2.5 signature-gradient text-white rounded-xl font-headline font-bold text-sm hover:opacity-90 shadow-lg shadow-primary/10 transition-all active:scale-95 flex items-center gap-2"
              >
                Sign Up
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          )}

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 text-primary"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-surface-container-lowest border-t border-surface-dim/20 p-8 space-y-6 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="flex flex-col gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-xl font-headline font-bold text-secondary hover:text-primary transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-6 border-t border-surface-dim/20">
              {isAuthenticated ? (
                <>
                  <Link 
                    to="/dashboard" 
                    className="flex items-center gap-3 py-4 text-primary font-bold text-lg"
                    onClick={() => setIsOpen(false)}
                  >
                    <LayoutDashboard className="w-6 h-6" />
                    Dashboard
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="flex items-center gap-3 py-4 text-error font-bold text-lg w-full text-left"
                  >
                    <LogOut className="w-6 h-6" />
                    Logout
                  </button>
                </>
              ) : (
                <div className="flex flex-col gap-4">
                  <Link 
                    to="/auth" 
                    className="w-full py-5 text-center text-primary font-bold border border-surface-dim rounded-2xl"
                    onClick={() => setIsOpen(false)}
                  >
                    Login
                  </Link>
                  <Link 
                    to="/auth/register" 
                    className="w-full py-5 text-center signature-gradient text-white font-bold rounded-2xl"
                    onClick={() => setIsOpen(false)}
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
