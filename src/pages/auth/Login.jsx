import * as React from "react"
import { motion } from "framer-motion"
import { toast } from "sonner"
import { useNavigate, Link, useSearchParams } from "react-router-dom"
import { StorageService } from "../../services/storage"

export default function Login() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [isLoading, setIsLoading] = React.useState(false)
  const [errors, setErrors] = React.useState({})
  
  const successRedirect = searchParams.get("redirect") || "/dashboard"

  const validate = () => {
    const newErrors = {}
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email address"
    }
    if (!password || password.length < 8) {
      newErrors.password = "Password must be 8+ characters"
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return

    setIsLoading(true)
    await new Promise(r => setTimeout(r, 800)) // Simulated delay

    // LocalStorage Auth Logic
    const authState = StorageService.getAuthState()
    // For this prototype, we'll allow any login but simulate logic
    // In a real local-only app, we'd check against a 'users' key in storage
    
    // Mock user for now
    const user = { 
      id: "u1", 
      name: email.split('@')[0], 
      email, 
      role: email.includes('admin') ? 'admin' : 'student' 
    }
    
    StorageService.setAuthState({ isAuthenticated: true, user })
    StorageService.setToken("mock-jwt-token")
    
    toast.success(`Welcome back, ${user.name}!`)
    navigate(successRedirect)
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-surface">
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }} 
        animate={{ opacity: 1, scale: 1 }} 
        className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-12 min-h-[700px] rounded-2xl overflow-hidden ambient-shadow bg-surface-container-lowest border border-surface-dim"
      >
        <section className="md:col-span-5 p-8 md:p-16 flex flex-col justify-center">
          <div className="mb-10">
            <h1 className="font-headline text-4xl font-extrabold tracking-tighter text-primary mb-3 italic">WELCOME BACK</h1>
            <p className="text-secondary text-sm font-body uppercase tracking-[0.2em] font-bold">Secure Access Protocol</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-primary uppercase tracking-widest ml-1">Identity (Email)</label>
              <input 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                className="w-full px-5 py-4 bg-surface-container-low border border-outline-variant/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-body"
                placeholder="alex@protocol.com"
                type="email"
                required
              />
              {errors.email && <p className="text-xs text-error mt-1 px-1">{errors.email}</p>}
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-primary uppercase tracking-widest ml-1">Access Key</label>
              <input 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                className="w-full px-5 py-4 bg-surface-container-low border border-outline-variant/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-body"
                placeholder="••••••••"
                type="password"
                required
              />
              {errors.password && <p className="text-xs text-error mt-1 px-1">{errors.password}</p>}
            </div>
            <div className="text-right">
              <Link to="/auth/forgot-password" size="sm" className="text-xs text-primary font-bold hover:underline">Forgot Access Key?</Link>
            </div>
            <motion.button 
              whileHover={{ scale: 1.01 }} 
              whileTap={{ scale: 0.98 }} 
              disabled={isLoading}
              className="w-full py-5 signature-gradient text-on-primary rounded-2xl font-bold transition-all shadow-xl disabled:opacity-50"
            >
              {isLoading ? "AUTHORIZING..." : "AUTHORIZE ENTRY"}
            </motion.button>
          </form>
          <div className="mt-8 text-center">
            <p className="text-secondary text-sm">
              Need a new identity? 
              <Link to="/auth/register" className="text-primary font-bold hover:underline ml-1">Initialize Account</Link>
            </p>
          </div>
        </section>
        
        <section className="hidden md:flex md:col-span-7 relative bg-primary-container overflow-hidden">
           <img src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay" alt="Background" />
           <div className="relative z-10 p-16 flex flex-col justify-end text-white bg-gradient-to-t from-primary/80 via-transparent to-transparent h-full w-full">
              <h2 className="text-5xl font-headline font-extrabold mb-4 italic tracking-tighter">THE ACADEMY AWAITS.</h2>
              <p className="text-xl font-light opacity-90 max-w-md italic">Unlock world-class curriculum through our secure decentralized knowledge platform.</p>
           </div>
        </section>
      </motion.div>
    </div>
  )
}
