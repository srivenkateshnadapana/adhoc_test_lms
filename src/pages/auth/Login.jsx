import * as React from "react"
import { Link, useNavigate } from "react-router-dom"
import { Mail, Lock, ArrowRight, ShieldCheck } from "lucide-react"
import { StorageService } from "../../services/storage"

export default function Login() {
  const [formData, setFormData] = React.useState({ email: "", password: "" })
  const [error, setError] = React.useState("")
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    setError("")
    const success = StorageService.login(formData.email, formData.password)
    if (success) {
      window.dispatchEvent(new CustomEvent('auth-change'))
      navigate("/dashboard")
    } else {
      setError("Invalid security credentials provided.")
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
              Excellence <br />In Interaction.
            </h1>
            <p className="text-primary-fixed opacity-70 text-lg max-w-md font-light leading-relaxed">
              Access high-end editorial content and master your curriculum through our sophisticated learning ecosystem.
            </p>
          </div>

          <div className="relative z-10">
            <div className="flex items-center gap-4 bg-white/5 backdrop-blur-xl p-6 rounded-3xl border border-white/10 w-fit">
              <div className="w-12 h-12 rounded-full bg-primary-fixed flex items-center justify-center text-primary-container">
                <ShieldCheck className="w-6 h-6 fill-current" />
              </div>
              <div>
                <p className="text-white font-headline font-bold text-sm leading-none mb-1">98% Progress</p>
                <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest">Global Security Protocol</p>
              </div>
            </div>
          </div>

          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
        </section>

        {/* Right Side: Login Form */}
        <section className="md:col-span-7 p-8 md:p-20 flex flex-col justify-center bg-white relative">
          <div className="max-w-md mx-auto w-full">
            <div className="mb-12">
              <h2 className="text-4xl font-extrabold text-primary font-headline tracking-tighter mb-3">Welcome back</h2>
              <p className="text-on-surface-variant font-medium">Please enter your credentials to access your dashboard.</p>
            </div>

            {error && (
              <div className="mb-8 p-4 bg-error/5 border border-error/10 text-error text-sm font-bold flex items-center gap-3 rounded-2xl">
                <div className="w-2 h-2 bg-error rounded-full animate-pulse" />
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-outline uppercase tracking-widest px-1">Email Protocol</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-outline">
                    <Mail className="w-5 h-5 group-focus-within:text-primary transition-colors" />
                  </div>
                  <input
                    type="email"
                    required
                    className="w-full pl-14 pr-6 py-5 bg-surface-container-low border-none rounded-2xl focus:ring-2 focus:ring-primary/10 transition-all font-body text-primary font-semibold placeholder:opacity-30"
                    placeholder="operator@network.tech"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center px-1">
                  <label className="text-xs font-bold text-outline uppercase tracking-widest">Access Key</label>
                  <a href="#" className="text-xs font-bold text-primary opacity-40 hover:opacity-100 transition-opacity uppercase tracking-widest">Lost Key?</a>
                </div>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-outline">
                    <Lock className="w-5 h-5 group-focus-within:text-primary transition-colors" />
                  </div>
                  <input
                    type="password"
                    required
                    className="w-full pl-14 pr-6 py-5 bg-surface-container-low border-none rounded-2xl focus:ring-2 focus:ring-primary/10 transition-all font-body text-primary font-semibold placeholder:opacity-30"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  />
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full signature-gradient text-white py-5 rounded-2xl font-headline font-bold text-lg shadow-xl hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-2 group"
                >
                  Initiate Portal
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </form>

            <div className="mt-12 text-center">
              <p className="text-on-surface-variant font-medium text-sm">
                Unregistered Operator? 
                <Link to="/auth/register" className="text-primary font-bold ml-2 underline underline-offset-4 hover:text-primary transition-colors italic">Create Profile</Link>
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
