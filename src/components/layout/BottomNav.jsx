// src/components/layout/BottomNav.jsx
import * as React from "react"
import { Link, useLocation } from "react-router-dom"
import { StorageService } from "../../services/storage"

const BOTTOM_NAV_ITEMS = [
  { href: "/", icon: Home, label: "Home", active: true },
  { href: "/catalog", icon: BookOpen, label: "Courses", active: true },
  { href: "/my-courses", icon: LayoutDashboard, label: "My Courses", active: true },
  { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard", active: true },
  { href: "/certificates", icon: Award, label: "Cert", active: true },
  { href: "/my-doubts", icon: MessageCircle, label: "Doubts", active: false },
  { href: "/profile", icon: User, label: "Profile", active: true },
]

export function BottomNav({ customItems = null }) {
  const location = useLocation()
  const [authState, setAuthState] = React.useState({ 
    isAuthenticated: StorageService.isAuthenticated(), 
    user: StorageService.getUser() 
  })

  React.useEffect(() => {
    const handleAuthUpdate = () => {
      setAuthState({
        isAuthenticated: StorageService.isAuthenticated(),
        user: StorageService.getUser()
      })
    }
    
    window.addEventListener('adhoc-lms-auth-update', handleAuthUpdate)
    return () => window.removeEventListener('adhoc-lms-auth-update', handleAuthUpdate)
  }, [])

  const navItems = customItems || BOTTOM_NAV_ITEMS.filter(item => item.active)

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-surface-container/95 backdrop-blur-md border-t border-outline-variant md:hidden z-50 safe-bottom">
      <div className="flex justify-around items-center h-16 px-1 lg:px-4">
        {navItems.map((item) => {
          const isActive = location.pathname === item.href || 
                          (item.href !== "/" && location.pathname.startsWith(item.href))
          
          const isProfile = item.href === "/profile"
          
          return (
            <Link
              key={item.href}
              to={item.href}
              className="relative flex flex-col items-center justify-center flex-1 h-full py-1 group min-w-0"
            >
              {isActive && (
                <motion.div
                  layoutId="bottom-nav-indicator"
                  className="absolute -top-0.5 w-8 h-0.5 bg-primary rounded-full"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
              
              {isProfile && authState.isAuthenticated ? (
                <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-200 shrink-0 ${
                  isActive ? 'bg-primary scale-110' : 'bg-surface-container-high group-hover:bg-primary/20'
                }`}>
                  <span className={`text-[10px] font-bold ${isActive ? 'text-white' : 'text-primary'}`}>
                    {authState.user?.name?.charAt(0).toUpperCase() || 'U'}
                  </span>
                </div>
              ) : (
                <item.icon 
                  className={`w-5 h-5 transition-all duration-200 shrink-0 ${
                    isActive 
                      ? 'text-primary scale-110' 
                      : 'text-on-surface-variant group-hover:text-primary/70'
                  }`}
                />
              )}
              
              <span className={`text-[9px] sm:text-[10px] font-bold mt-1 transition-colors truncate w-full text-center px-0.5 ${
                isActive ? 'text-primary' : 'text-on-surface-variant'
              }`}>
                {item.label}
              </span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}