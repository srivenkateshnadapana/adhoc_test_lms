import * as React from "react"
import { toast } from "sonner"
import { ProtectedRoute } from "../../context/ProtectedRoute"
import { StorageService, AUTH_KEY } from "../../services/storage"
import { Shield, Bell, Key, Trash2, Sun, Moon, Award, Heart, Gift, Copy } from "lucide-react"

export default function Profile() {
  return (
    <ProtectedRoute fallbackPath="/auth">
      <ProfileContent />
    </ProtectedRoute>
  )
}

function ProfileContent() {
  const [authState, setAuthState] = React.useState(StorageService.getAuthState())
  const [enrollments, setEnrollments] = React.useState([])
  const [theme, setTheme] = React.useState(localStorage.getItem('theme') || 'light')

  React.useEffect(() => {
    const handleUpdate = () => {
      setAuthState(StorageService.getAuthState())
      setEnrollments(StorageService.getEnrollments())
    }
    
    handleUpdate()
    window.addEventListener(`storage-update-${AUTH_KEY}`, handleUpdate)
    
    const syncTheme = () => setTheme(localStorage.getItem('theme') || 'light')
    window.addEventListener('themeSync', syncTheme)
    
    return () => {
      window.removeEventListener(`storage-update-${AUTH_KEY}`, handleUpdate)
      window.removeEventListener('themeSync', syncTheme)
    }
  }, [])

  const user = authState.user || { name: "Guest", email: "guest@example.com" }
  const favorites = new Set(StorageService.getFavorites())

  const handleUpdatePassword = () => {
    toast.success("Security configuration updated in local archives.")
  }

  const handleToggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
    document.documentElement.classList.toggle('dark', newTheme === 'dark')
    localStorage.setItem('theme', newTheme)
    window.dispatchEvent(new Event('themeSync'))
  }

  const handleCopyReferral = () => {
    if (user.referralCode) {
      navigator.clipboard.writeText(user.referralCode)
      toast.success("Referral code copied to clipboard!")
    }
  }

  const handleCopyLink = () => {
    if (user.referralCode) {
      const link = `${window.location.origin}/register?ref=${user.referralCode}`
      navigator.clipboard.writeText(link)
      toast.success("Referral link copied to clipboard!")
    }
  }

  return (
    <main className="min-h-screen bg-surface relative overflow-hidden pt-8 pb-24">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-6 text-on-surface">
        <div className="mb-10 border-b border-surface-dim pb-8">
          <h1 className="font-headline text-4xl font-extrabold mb-2 text-primary">My Account</h1>
          <p className="text-secondary text-lg">Manage your credentials and platform preferences.</p>
        </div>

        {/* User Stats Card */}
        <section className="mb-12 bg-surface-container-low border border-surface-dim rounded-[2.5rem] p-10 ambient-shadow flex flex-col md:flex-row items-center gap-8">
          <div className="w-24 h-24 bg-primary text-on-primary rounded-full flex items-center justify-center text-4xl font-headline font-bold">
            {user.name.substring(0, 2).toUpperCase()}
          </div>
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-3xl font-headline font-extrabold text-primary mb-1">{user.name}</h2>
            <p className="text-secondary font-medium mb-4">{user.email}</p>
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              <span className="bg-surface-container-high px-4 py-1.5 rounded-full text-xs font-bold text-primary border border-surface-dim uppercase tracking-widest">{enrollments.length} Courses</span>
              <span className="bg-surface-container-high px-4 py-1.5 rounded-full text-xs font-bold text-primary border border-surface-dim uppercase tracking-widest">Active Member</span>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Security */}
          <div className="bg-surface-container-lowest border border-surface-dim rounded-[2rem] p-8 ambient-shadow">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-surface-container-low rounded-xl text-primary"><Shield className="w-6 h-6" /></div>
              <h3 className="text-xl font-headline font-bold text-primary">Security Settings</h3>
            </div>
            <div className="space-y-5">
              <input type="password" placeholder="Current Access Key" className="w-full bg-surface-container-low border border-surface-dim rounded-xl px-4 py-3.5" />
              <input type="password" placeholder="New Access Key" className="w-full bg-surface-container-low border border-surface-dim rounded-xl px-4 py-3.5" />
              <button onClick={handleUpdatePassword} className="w-full bg-primary text-on-primary font-bold rounded-xl py-4 hover:opacity-90 transition-all uppercase tracking-widest text-sm">Update Security</button>
            </div>
          </div>

          {/* Preferences and Referrals */}
          <div className="flex flex-col gap-8">
            {/* Referral Program */}
            {enrollments.length > 0 && user.referralCode && (
              <div className="bg-surface-container-lowest border border-surface-dim rounded-[2rem] p-8 ambient-shadow relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-[100px] pointer-events-none" />
                <div className="flex items-center gap-3 mb-6 relative z-10">
                  <div className="p-3 bg-primary/10 rounded-xl text-primary"><Gift className="w-6 h-6" /></div>
                  <h3 className="text-xl font-headline font-bold text-primary">Referral Program</h3>
                </div>
                <p className="text-secondary text-sm mb-6 relative z-10">
                  Share your referral code with friends. When they register using your code, you'll earn a <span className="font-bold text-primary">10% discount</span> on your next purchase!
                </p>
                <div className="flex flex-col gap-4 relative z-10">
                  <div className="bg-surface-container border border-surface-dim/30 p-4 rounded-xl flex items-center justify-between">
                    <div>
                      <p className="text-[10px] font-bold text-secondary uppercase tracking-widest mb-1">Your Referral Code</p>
                      <p className="text-2xl font-headline font-extrabold text-primary tracking-widest">{user.referralCode}</p>
                    </div>
                    <button onClick={handleCopyReferral} className="p-3 bg-surface-container-high rounded-xl text-primary hover:bg-primary/10 transition-colors" title="Copy Code">
                      <Copy className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="bg-surface-container border border-surface-dim/30 p-4 rounded-xl flex items-center justify-between">
                    <div className="flex-1 overflow-hidden mr-4">
                      <p className="text-[10px] font-bold text-secondary uppercase tracking-widest mb-1">Your Referral Link</p>
                      <p className="text-xs font-medium text-primary truncate opacity-70">
                        {`${window.location.origin}/register?ref=${user.referralCode}`}
                      </p>
                    </div>
                    <button onClick={handleCopyLink} className="p-3 bg-primary text-on-primary rounded-xl hover:opacity-90 transition-all flex items-center gap-2 text-xs font-bold shrink-0" title="Copy Link">
                      <Copy className="w-4 h-4" />
                      Copy Link
                    </button>
                  </div>
                  <div className="flex items-center justify-between bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-xl">
                    <span className="font-bold text-emerald-700">Available Discounts</span>
                    <span className="text-xl font-extrabold text-emerald-700 bg-emerald-500/20 px-3 py-1 rounded-lg">
                      {user.availableDiscounts || 0}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Preferences */}
            <div className="bg-surface-container-lowest border border-surface-dim rounded-[2rem] p-8 ambient-shadow">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-surface-container-low rounded-xl text-primary"><Bell className="w-6 h-6" /></div>
                <h3 className="text-xl font-headline font-bold text-primary">Platform Preferences</h3>
              </div>
              <div className="flex items-center justify-between p-4 bg-surface-container-low rounded-2xl">
                <div>
                  <div className="font-bold text-primary">Visual Theme</div>
                  <div className="text-xs text-secondary">Switch between Light and Dark interface.</div>
                </div>
                <button onClick={handleToggleTheme} className="p-2 bg-surface-container-lowest rounded-xl border border-surface-dim">
                  {theme === 'dark' ? <Sun className="w-5 h-5 text-yellow-500" /> : <Moon className="w-5 h-5 text-primary" />}
                </button>
              </div>
            </div>

            <div className="border border-error/20 bg-error/5 rounded-[2rem] p-8">
              <h3 className="text-xl font-headline font-bold text-error mb-2">Danger Zone</h3>
              <p className="text-xs text-secondary mb-6">Irreversible deletion of your entire academic record.</p>
              <button className="w-full py-4 bg-surface-container-lowest text-error font-bold rounded-xl border border-error/20 hover:bg-error hover:text-white transition-all uppercase tracking-widest text-xs">Delete Identity</button>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
