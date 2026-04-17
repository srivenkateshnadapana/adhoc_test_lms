import * as React from "react"
import { motion } from "framer-motion"
import { toast } from "sonner"
import { useNavigate, Link } from "react-router-dom"
import { StorageService } from "../../services/storage"

export default function Register() {
  const navigate = useNavigate()
  const [name, setName] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [confirmPassword, setConfirmPassword] = React.useState("")
  const [isLoading, setIsLoading] = React.useState(false)
  const [errors, setErrors] = React.useState({})

  const validate = () => {
    const newErrors = {}
    if (!name || name.length < 2) newErrors.name = "Name must be at least 2 characters"
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = "Valid email required"
    if (!password || password.length < 8) newErrors.password = "Password must be 8+ characters"
    if (confirmPassword !== password) newErrors.confirmPassword = "Passwords do not match"
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return

    setIsLoading(true)
    await new Promise(r => setTimeout(r, 1000))

    // LocalStorage signup simulation
    toast.success("Account created! Please sign in with your credentials.")
    navigate("/auth")
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-surface">
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }} 
        animate={{ opacity: 1, scale: 1 }} 
        className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 bg-surface-container-lowest rounded-2xl overflow-hidden ambient-shadow border border-surface-dim"
      >
        <section className="hidden lg:flex flex-col justify-between p-12 signature-gradient text-white">
          <div>
            <span className="text-3xl font-bold tracking-tighter font-headline mb-12 block italic">ADHOC LMS</span>
            <h1 className="text-6xl font-extrabold font-headline leading-none mb-6 italic tracking-tighter">JOIN THE <br/>MISSION.</h1>
            <p className="text-xl font-light opacity-80 max-w-xs italic">Establish your profile in our high-end educational ecosystem.</p>
          </div>
          <div className="grid grid-cols-2 gap-8">
            <div><div className="text-4xl font-extrabold font-headline">45k+</div><div className="text-[10px] uppercase tracking-widest opacity-70 font-bold">Agents Enrolled</div></div>
            <div><div className="text-4xl font-extrabold font-headline">99%</div><div className="text-[10px] uppercase tracking-widest opacity-70 font-bold">Success Rate</div></div>
          </div>
        </section>
        
        <section className="p-8 md:p-16 flex flex-col justify-center bg-white">
          <div className="mb-10">
            <h2 className="text-4xl font-bold text-primary font-headline tracking-tighter italic mb-2">INITIALIZE ACCOUNT</h2>
            <p className="text-secondary text-sm font-body font-medium">Configure your academic access parameters.</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-primary uppercase tracking-widest ml-1">Full Name</label>
              <input 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                className="w-full px-5 py-3.5 bg-surface-container-low border border-outline-variant/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-body text-on-surface"
                placeholder="Commander Shepard"
                required
              />
              {errors.name && <p className="text-xs text-error px-1">{errors.name}</p>}
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-primary uppercase tracking-widest ml-1">Identity (Email)</label>
              <input 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                className="w-full px-5 py-3.5 bg-surface-container-low border border-outline-variant/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-body text-on-surface"
                placeholder="alex@protocol.com"
                type="email"
                required
              />
              {errors.email && <p className="text-xs text-error px-1">{errors.email}</p>}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-primary uppercase tracking-widest ml-1">Access Key</label>
                <input 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  className="w-full px-5 py-3.5 bg-surface-container-low border border-outline-variant/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-body text-on-surface"
                  placeholder="••••••••"
                  type="password"
                  required
                />
                {errors.password && <p className="text-xs text-error px-1">{errors.password}</p>}
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-primary uppercase tracking-widest ml-1">Confirm Key</label>
                <input 
                  value={confirmPassword} 
                  onChange={(e) => setConfirmPassword(e.target.value)} 
                  className="w-full px-5 py-3.5 bg-surface-container-low border border-outline-variant/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-body text-on-surface"
                  placeholder="••••••••"
                  type="password"
                  required
                />
                {errors.confirmPassword && <p className="text-xs text-error px-1">{errors.confirmPassword}</p>}
              </div>
            </div>
            <motion.button 
              whileHover={{ scale: 1.01 }} 
              whileTap={{ scale: 0.98 }} 
              disabled={isLoading}
              className="w-full py-5 signature-gradient text-on-primary rounded-2xl font-bold transition-all shadow-xl mt-4 disabled:opacity-50"
              type="submit"
            >
              {isLoading ? "INITIALIZING..." : "CREATE ACCOUNT"}
            </motion.button>
          </form>
          <div className="mt-8 text-center">
            <p className="text-secondary text-sm">
              Already registered? 
              <Link to="/auth" className="text-primary font-bold hover:underline ml-1">Login Here</Link>
            </p>
          </div>
        </section>
      </motion.div>
    </div>
  )
}
