"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { toast } from "sonner"
import { useRouter, useSearchParams } from "next/navigation"
import { StorageHub } from "@/lib/storage-hub"

interface ValidationErrors {
  email?: string
  password?: string
  confirmPassword?: string
  name?: string
}

export function AuthForm() {
  const searchParams = useSearchParams()
  const initialMode = searchParams.get("mode") === "signup" ? "signup" : "signin"
  
  const [mode, setMode] = React.useState<"signin" | "signup">(initialMode)
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [confirmPassword, setConfirmPassword] = React.useState("")
  const [name, setName] = React.useState("")
  const [errors, setErrors] = React.useState<ValidationErrors>({})
  const [touched, setTouched] = React.useState<Record<string, boolean>>({})
  const [isLoading, setIsLoading] = React.useState(false)
  const router = useRouter()
  
  const successRedirect = searchParams.get("redirect") || "/dashboard"

  React.useEffect(() => {
    const newErrors: ValidationErrors = {}
    if (touched.email && email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email address"
    }
    if (touched.password && password && password.length < 8) {
      newErrors.password = "Password must be 8+ characters"
    }
    if (mode === "signup" && touched.confirmPassword && confirmPassword && confirmPassword !== password) {
      newErrors.confirmPassword = "Passwords do not match"
    }
    if (mode === "signup" && touched.name && name && name.length < 2) {
      newErrors.name = "Name must be at least 2 characters"
    }
    setErrors(newErrors)
  }, [email, password, confirmPassword, name, mode, touched])

  const handleBlur = (field: string) => setTouched((prev) => ({ ...prev, [field]: true }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validation check
    if (Object.keys(errors).length > 0) {
      toast.error("Please fix the errors in the form")
      return
    }

    setIsLoading(true)
    await new Promise(r => setTimeout(r, 800)) // Simulated delay

    if (mode === "signup") {
      const res = await StorageHub.signup({ id: Math.random().toString(), name, email, password })
      if (res.success) {
        toast.success("Account created! Please sign in.")
        setMode("signin")
      } else {
        toast.error(res.error || "Signup failed")
      }
    } else {
      const res = await StorageHub.signin(email, password)
      if (res.success) {
        toast.success(`Welcome back, ${res.user?.name}!`)
        router.push(successRedirect)
      } else {
        toast.error(res.error || "Invalid credentials")
      }
    }
    setIsLoading(false)
  }

  const handleSocialAuth = async (provider: "google") => {
    setIsLoading(true)
    await new Promise(r => setTimeout(r, 1200))
    const res = StorageHub.socialLogin(provider)
    toast.success("Authenticated with Google!")
    router.push(successRedirect)
    setIsLoading(false)
  }

  const formStagger = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  }

  const inputVariant = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <AnimatePresence mode="wait">
        {mode === "signin" ? (
          <motion.div 
            key="signin" 
            initial={{ opacity: 0, scale: 0.98 }} 
            animate={{ opacity: 1, scale: 1 }} 
            exit={{ opacity: 0, scale: 0.98 }}
            className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-12 min-h-[700px] rounded-2xl overflow-hidden ambient-shadow bg-surface-container-lowest border border-surface-dim"
          >
            <section className="md:col-span-5 p-8 md:p-16 flex flex-col justify-center">
              <div className="mb-10">
                <h1 className="font-headline text-4xl font-extrabold tracking-tighter text-primary mb-3 italic">WELCOME BACK</h1>
                <p className="text-secondary text-sm font-body uppercase tracking-[0.2em] font-bold">Secure Access Protocol</p>
              </div>
              <motion.form variants={formStagger} initial="hidden" animate="visible" onSubmit={handleSubmit} className="space-y-6">
                <motion.div variants={inputVariant} className="space-y-2">
                  <label className="text-[10px] font-bold text-primary uppercase tracking-widest ml-1">Identity (Email)</label>
                  <input 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    onBlur={() => handleBlur("email")}
                    className="w-full px-5 py-4 bg-surface-container-low border border-outline-variant/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-body"
                    placeholder="alex@protocol.com"
                    type="email"
                    required
                  />
                  {touched.email && errors.email && <p className="text-xs text-error mt-1 px-1">{errors.email}</p>}
                </motion.div>
                <motion.div variants={inputVariant} className="space-y-2">
                  <label className="text-[10px] font-bold text-primary uppercase tracking-widest ml-1">Access Key</label>
                  <input 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    onBlur={() => handleBlur("password")}
                    className="w-full px-5 py-4 bg-surface-container-low border border-outline-variant/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-body"
                    placeholder="••••••••"
                    type="password"
                    required
                  />
                  {touched.password && errors.password && <p className="text-xs text-error mt-1 px-1">{errors.password}</p>}
                </motion.div>
                <motion.button 
                  whileHover={{ scale: 1.01 }} 
                  whileTap={{ scale: 0.98 }} 
                  disabled={isLoading}
                  className="w-full py-5 signature-gradient text-on-primary rounded-2xl font-bold transition-all shadow-xl disabled:opacity-50"
                >
                  {isLoading ? "AUTHORIZING..." : "AUTHORIZE ENTRY"}
                </motion.button>
              </motion.form>
              <div className="mt-8 text-center">
                <p className="text-secondary text-sm">
                  Need a new identity? 
                  <button onClick={() => setMode("signup")} className="text-primary font-bold hover:underline ml-1">Initialize Account</button>
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
        ) : (
          <motion.div 
            key="signup" 
            initial={{ opacity: 0, scale: 0.98 }} 
            animate={{ opacity: 1, scale: 1 }} 
            exit={{ opacity: 0, scale: 0.98 }}
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
              <motion.form variants={formStagger} initial="hidden" animate="visible" onSubmit={handleSubmit} className="space-y-4">
                <motion.div variants={inputVariant} className="space-y-1">
                  <label className="text-[10px] font-bold text-primary uppercase tracking-widest ml-1">Full Name</label>
                  <input 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    onBlur={() => handleBlur("name")}
                    className="w-full px-5 py-3.5 bg-surface-container-low border border-outline-variant/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-body text-on-surface"
                    placeholder="Commander Shepard"
                    required
                  />
                  {touched.name && errors.name && <p className="text-xs text-error px-1">{errors.name}</p>}
                </motion.div>
                <motion.div variants={inputVariant} className="space-y-1">
                  <label className="text-[10px] font-bold text-primary uppercase tracking-widest ml-1">Identity (Email)</label>
                  <input 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    onBlur={() => handleBlur("email")}
                    className="w-full px-5 py-3.5 bg-surface-container-low border border-outline-variant/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-body text-on-surface"
                    placeholder="alex@protocol.com"
                    type="email"
                    required
                  />
                  {touched.email && errors.email && <p className="text-xs text-error px-1">{errors.email}</p>}
                </motion.div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <motion.div variants={inputVariant} className="space-y-1">
                    <label className="text-[10px] font-bold text-primary uppercase tracking-widest ml-1">Access Key</label>
                    <input 
                      value={password} 
                      onChange={(e) => setPassword(e.target.value)} 
                      onBlur={() => handleBlur("password")}
                      className="w-full px-5 py-3.5 bg-surface-container-low border border-outline-variant/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-body text-on-surface"
                      placeholder="••••••••"
                      type="password"
                      required
                    />
                    {touched.password && errors.password && <p className="text-xs text-error px-1">{errors.password}</p>}
                  </motion.div>
                  <motion.div variants={inputVariant} className="space-y-1">
                    <label className="text-[10px] font-bold text-primary uppercase tracking-widest ml-1">Confirm Key</label>
                    <input 
                      value={confirmPassword} 
                      onChange={(e) => setConfirmPassword(e.target.value)} 
                      onBlur={() => handleBlur("confirmPassword")}
                      className="w-full px-5 py-3.5 bg-surface-container-low border border-outline-variant/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-body text-on-surface"
                      placeholder="••••••••"
                      type="password"
                      required
                    />
                    {touched.confirmPassword && errors.confirmPassword && <p className="text-xs text-error px-1">{errors.confirmPassword}</p>}
                  </motion.div>
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
              </motion.form>
              <div className="mt-8 text-center">
                <p className="text-secondary text-sm">
                  Already registered? 
                  <button onClick={() => setMode("signin")} className="text-primary font-bold hover:underline ml-1">Login Here</button>
                </p>
              </div>
            </section>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
