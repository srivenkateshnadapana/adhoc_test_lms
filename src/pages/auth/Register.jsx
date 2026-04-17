import * as React from "react"
import { Link, useNavigate } from "react-router-dom"
import { Mail, Lock, User, ArrowRight, ShieldCheck, GraduationCap } from "lucide-react"
import { StorageService } from "../../services/storage"

export default function Register() {
  const [formData, setFormData] = React.useState({ name: "", email: "", password: "", confirmPassword: "" })
  const [error, setError] = React.useState("")
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    setError("")
    
    if (formData.password !== formData.confirmPassword) {
      setError("Passkeys do not match.")
      return
    }

    try {
      StorageService.register({
        id: `u${Date.now()}`,
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: "student"
      })
      navigate("/auth")
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface p-6 font-body">
      <main className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-12 items-stretch min-h-[800px] rounded-[3rem] overflow-hidden ambient-shadow bg-surface-container-lowest border border-surface-dim/20">
        {/* Left Side: Editorial Content */}
        <section className="md:col-span-5 hidden md:flex flex-col justify-between p-16 signature-gradient relative overflow-hidden">
          <div className="relative z-10">
            <Link to="/" className="inline-flex items-center gap-3 mb-16 group">
              <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-md group-hover:scale-110 transition-transform">
                <span className="text-white font-headline font-bold text-xl">A</span>
              </div>
              <span className="text-white font-headline font-bold tracking-tighter text-xl uppercase tracking-widest opacity-80">Adhoc Tech</span>
            </Link>
            <h1 className="text-5xl font-extrabold text-white font-headline tracking-tighter leading-[1.1] mb-8 italic">
              Join the <br />Global Circle.
            </h1>
            <p className="text-primary-fixed opacity-70 text-lg max-w-md font-light leading-relaxed">
              Access world-class educational content curated for the next generation of academic leaders and innovators.
            </p>
          </div>

          <div className="relative z-10 flex gap-8">
            <div className="flex flex-col">
              <span className="text-3xl font-bold text-white font-headline">45k+</span>
              <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Learners</span>
            </div>
            <div className="flex flex-col">
              <span className="text-3xl font-bold text-white font-headline">98%</span>
              <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Completion</span>
            </div>
          </div>

        </section>

        {/* Right Side: Register Form */}
        <section className="md:col-span-7 p-8 md:p-16 flex flex-col justify-center bg-white relative">
          <div className="max-w-md mx-auto w-full">
            <div className="mb-10">
              <h2 className="text-4xl font-extrabold text-primary font-headline tracking-tighter mb-2">Create Account</h2>
              <p className="text-on-surface-variant font-medium">Start your journey toward excellence today.</p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-error/5 border border-error/10 text-error text-sm font-bold flex items-center gap-3 rounded-2xl">
                <div className="w-2 h-2 bg-error rounded-full animate-pulse" />
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-outline uppercase tracking-widest px-1">Full Identity</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-outline">
                    <User className="w-5 h-5 group-focus-within:text-primary transition-colors" />
                  </div>
                  <input
                    type="text"
                    required
                    className="w-full pl-14 pr-6 py-4 bg-surface-container-low border-none rounded-2xl focus:ring-2 focus:ring-primary/10 transition-all font-body text-primary font-semibold placeholder:opacity-30"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-outline uppercase tracking-widest px-1">Email Protocol</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-outline">
                    <Mail className="w-5 h-5 group-focus-within:text-primary transition-colors" />
                  </div>
                  <input
                    type="email"
                    required
                    className="w-full pl-14 pr-6 py-4 bg-surface-container-low border-none rounded-2xl focus:ring-2 focus:ring-primary/10 transition-all font-body text-primary font-semibold placeholder:opacity-30"
                    placeholder="operator@network.tech"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-outline uppercase tracking-widest px-1">Passkey</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-outline">
                      <Lock className="w-5 h-5 group-focus-within:text-primary transition-colors" />
                    </div>
                    <input
                      type="password"
                      required
                      className="w-full pl-14 pr-6 py-4 bg-surface-container-low border-none rounded-2xl focus:ring-2 focus:ring-primary/10 transition-all font-body text-primary font-semibold placeholder:opacity-30 text-sm"
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-outline uppercase tracking-widest px-1">Verify</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-outline">
                      <GraduationCap className="w-5 h-5 group-focus-within:text-primary transition-colors" />
                    </div>
                    <input
                      type="password"
                      required
                      className="w-full pl-14 pr-6 py-4 bg-surface-container-low border-none rounded-2xl focus:ring-2 focus:ring-primary/10 transition-all font-body text-primary font-semibold placeholder:opacity-30 text-sm"
                      placeholder="••••••••"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <button
                  type="submit"
                  className="w-full signature-gradient text-white py-5 rounded-2xl font-headline font-bold text-lg shadow-xl hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-2 group"
                >
                  Create Profile
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </form>

            <div className="mt-10 text-center">
              <p className="text-on-surface-variant font-medium text-sm">
                Already an Operator? 
                <Link to="/auth" className="text-primary font-bold ml-2 underline underline-offset-4 hover:text-primary transition-colors italic">Initiate Portal</Link>
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
