// src/pages/auth/ForgotPassword.jsx
import * as React from "react"
import { Link } from "react-router-dom"
import { Mail, ArrowRight, Loader2, CheckCircle2 } from "lucide-react"

export default function ForgotPassword() {
  const [email, setEmail] = React.useState("")
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState("")
  const [success, setSuccess] = React.useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false)
      if (email) {
        setSuccess(true)
      } else {
        setError("Please enter a valid email address.")
      }
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full">
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 signature-gradient rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <span className="text-white font-headline font-bold text-2xl">A</span>
          </div>
          <h1 className="text-3xl font-headline font-bold text-primary mb-2">Reset Password</h1>
          <p className="text-secondary">Enter your email to receive reset instructions</p>
        </div>

        {/* Forgot Password Form */}
        <div className="bg-surface-container-lowest rounded-3xl p-8 border border-surface-dim/20 shadow-xl">
          {success ? (
            <div className="text-center space-y-6">
              <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8 text-green-500" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-on-surface mb-2">Check your email</h3>
                <p className="text-secondary text-sm">
                  We've sent password reset instructions to <br />
                  <span className="font-medium text-on-surface">{email}</span>
                </p>
              </div>
              <Link
                to="/login"
                className="block w-full py-3 signature-gradient text-white rounded-xl font-bold hover:opacity-90 transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
              >
                Back to Login
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div>
                <label className="block text-xs font-bold text-secondary uppercase tracking-wider mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-secondary" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-surface-container rounded-xl border border-surface-dim/20 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-on-surface placeholder:text-secondary"
                    placeholder="you@example.com"
                    required
                  />
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3">
                  <p className="text-red-500 text-sm text-center">{error}</p>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading || !email}
                className="w-full py-3 signature-gradient text-white rounded-xl font-bold hover:opacity-90 transition-all flex items-center justify-center gap-2 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    Send Reset Link
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>
          )}

          {/* Back to Login Link */}
          {!success && (
            <div className="mt-6 text-center">
              <p className="text-secondary text-sm">
                Remember your password?{" "}
                <Link to="/login" className="text-primary font-bold hover:underline">
                  Sign In
                </Link>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
