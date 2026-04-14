"use client"

import * as React from "react"
import { toast } from "sonner"
import {
  UserProfileHeader,
  CertificateCard,
  FavoriteCourseCard,
} from "@/components/profile"
import { ProtectedRoute } from "@/components/auth"
import { StorageHub, AUTH_KEY, USERS_KEY, FAVORITES_KEY } from "@/lib/storage-hub"
import { generateCertificatePDF } from "@/lib/certificate-generator"
import { Shield, Bell, Key, Trash2, Sun, Moon } from "lucide-react"
import { useTheme } from "next-themes"

// Mock certificates
const certificatesData = [
  {
    id: "cert-1",
    title: "Advanced Network Penetration Testing",
    completedDate: "Jan 15, 2024",
    certificateId: "CERT-2024-001",
  }
]

// Mock favorites
const favoriteCourses = [
  { id: "fav-1", title: "Zero Trust Architecture", instructor: "Michael Chen" },
  { id: "fav-2", title: "Cloud Security Posture", instructor: "Elena Rodriguez" },
]

export default function ProfilePage() {
  return (
    <ProtectedRoute fallbackPath="/auth">
      <ProfileContent />
    </ProtectedRoute>
  )
}

function ProfileContent() {
  const [authState, setAuthState] = React.useState(StorageHub.getAuthState())
  const [isHydrated, setIsHydrated] = React.useState(false)

  const [enrollments, setEnrollments] = React.useState<any[]>([])
  const { theme, setTheme } = useTheme()

  React.useEffect(() => {
    const handleUpdate = () => {
      setAuthState(StorageHub.getAuthState())
    }
    
    const fetchEnrollments = async () => {
      const data = await StorageHub.getEnrollments()
      setEnrollments(data)
    }
    
    setIsHydrated(true)
    fetchEnrollments()
    window.addEventListener(`storage-update-${AUTH_KEY}`, handleUpdate)
    return () => window.removeEventListener(`storage-update-${AUTH_KEY}`, handleUpdate)
  }, [])

  const user = authState.user || { name: "Guest", email: "guest@example.com" }
  
  const activeUser = {
    name: user.name,
    email: user.email,
    initials: user.name.substring(0, 2).toUpperCase(),
    coursesEnrolled: enrollments.length,
    memberSince: "2024",
  }

  const { favorites, toggleFavorite } = {
    favorites: new Set(StorageHub.getFavorites()),
    toggleFavorite: StorageHub.toggleFavorite
  }

  const handleEditProfileName = (newName: string) => {
    if (authState.user) {
      const updatedUser = { ...authState.user, name: newName }
      const users = JSON.parse(localStorage.getItem(USERS_KEY) || "{}")
      users[updatedUser.email] = updatedUser
      localStorage.setItem(USERS_KEY, JSON.stringify(users))
      localStorage.setItem(AUTH_KEY, JSON.stringify({ ...authState, user: updatedUser }))
      window.dispatchEvent(new CustomEvent(`storage-update-${AUTH_KEY}`, { detail: updatedUser }))
      toast.success("Profile name updated successfully!")
    }
  }

  const handleFavoriteToggle = (id: string) => {
    const isCurrentlyFavorite = favorites.has(id)
    StorageHub.toggleFavorite(id)
    toast.success(
      isCurrentlyFavorite ? "Removed from favorites" : "Added to favorites"
    )
  }

  const handleDownloadCertificate = async (id: string) => {
    const downloadPromise = (async () => {
      const certData = certificatesData.find(c => c.id === id)
      if (!certData) throw new Error("Certificate data not found")
      
      await generateCertificatePDF({
        name: activeUser?.name || "Distinguished Scholar",
        courseTitle: certData.title,
        date: certData.completedDate,
        certId: certData.certificateId
      })
    })()

    toast.promise(downloadPromise, {
      loading: 'Securing your high-fidelity certificate...',
      success: 'Certificate downloaded successfully!',
      error: (err) => `Generation failed: ${err.message}`
    })
  }

  return (
    <main className="min-h-screen bg-surface relative overflow-hidden pt-24 pb-24">
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-6 text-on-surface">
        {/* Page Title */}
        <div className="mb-10 border-b border-surface-dim pb-8">
          <h1 className="font-headline text-4xl font-extrabold mb-2 text-primary">
            My Account
          </h1>
          <p className="text-secondary text-lg">
            Manage your credentials, certifications, and settings.
          </p>
        </div>

        {/* User Profile Header */}
        <section className="mb-12">
          <UserProfileHeader
            {...activeUser}
            certificatesCount={certificatesData.length}
            isLocked={certificatesData.length > 0}
            onEditName={handleEditProfileName}
          />
        </section>

        {/* Certificates */}
        <section className="mb-12">
          <h2 className="font-headline text-2xl font-bold text-primary mb-6 flex items-center gap-3">
            Earned Certificates
            <span className="bg-primary text-white text-xs py-1 px-3 rounded-full shadow-sm">{certificatesData.length}</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {certificatesData.map((cert) => (
              <CertificateCard
                key={cert.id}
                {...cert}
                onDownload={handleDownloadCertificate}
              />
            ))}
            {certificatesData.length === 0 && (
              <div className="col-span-full border border-surface-dim rounded-[2rem] bg-surface-container-lowest p-12 text-center ambient-shadow">
                <p className="text-secondary font-medium">No certificates earned yet. Complete your first module!</p>
              </div>
            )}
          </div>
        </section>

        {/* Favorite Courses */}
        <section className="mb-16">
          <h2 className="font-headline text-2xl font-bold text-primary mb-6">
            Saved for Later
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favoriteCourses.map((course) => (
                <FavoriteCourseCard
                  key={course.id}
                  {...course}
                  isFavorite={favorites.has(course.id)}
                  onFavoriteToggle={handleFavoriteToggle}
                />
            ))}
          </div>
        </section>

        {/* Profile Settings */}
        <section className="pt-12 border-t border-surface-dim">
          <h2 className="font-headline text-2xl font-bold text-primary mb-8">
            Account Preferences
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Security & Password */}
            <div className="bg-surface-container-lowest border border-surface-dim rounded-3xl p-8 ambient-shadow">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-surface-container-high rounded-xl text-primary border border-surface-dim shadow-sm"><Shield className="w-6 h-6" /></div>
                <h3 className="text-xl font-headline font-bold text-primary">Security</h3>
              </div>
              
              <div className="space-y-5">
                <div>
                  <label className="text-sm font-semibold text-secondary block mb-2">Current Password</label>
                  <input type="password" placeholder="••••••••" className="w-full bg-surface-container border border-surface-dim rounded-xl px-4 py-3.5 text-primary focus:outline-none focus:ring-2 focus:ring-primary/40 transition-shadow" />
                </div>
                <div>
                  <label className="text-sm font-semibold text-secondary block mb-2">New Password</label>
                  <input type="password" placeholder="••••••••" className="w-full bg-surface-container border border-surface-dim rounded-xl px-4 py-3.5 text-primary focus:outline-none focus:ring-2 focus:ring-primary/40 transition-shadow" />
                </div>
                <button className="flex items-center justify-center w-full mt-4 bg-surface hover:bg-surface-container-high text-primary font-bold border border-surface-dim rounded-xl py-3.5 transition-colors shadow-sm">
                  <Key className="w-4 h-4 mr-2" /> Update Password
                </button>
              </div>
            </div>

            {/* Notifications & Danger Zone */}
            <div className="flex flex-col gap-8">
              
              <div className="bg-surface-container-lowest border border-surface-dim rounded-3xl p-8 ambient-shadow">
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-3 bg-surface-container-high rounded-xl text-primary border border-surface-dim shadow-sm"><Bell className="w-6 h-6" /></div>
                  <h3 className="text-xl font-headline font-bold text-primary">Preferences</h3>
                </div>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-primary font-bold">Interface Theme</div>
                      <div className="text-sm text-secondary font-medium mt-1">Switch between dark and light modes.</div>
                    </div>
                    <button 
                      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                      className="p-2 bg-surface-container-high rounded-xl border border-surface-dim hover:bg-surface-dim transition-colors"
                    >
                      {theme === "dark" ? <Sun className="w-5 h-5 text-yellow-500" /> : <Moon className="w-5 h-5 text-primary" />}
                    </button>
                  </div>
                  <div className="w-full h-px bg-surface-dim"></div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-primary font-bold">New Course Alerts</div>
                      <div className="text-sm text-secondary font-medium mt-1">Get notified when new content arrives.</div>
                    </div>
                    <div className="w-12 h-6 bg-primary rounded-full relative cursor-pointer border border-primary">
                      <div className="absolute right-0.5 top-0.5 bg-white w-4 h-4 rounded-full shadow-sm" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Danger Zone */}
              <div className="border border-error/20 bg-error/5 rounded-3xl p-8">
                <h3 className="text-xl font-headline font-bold text-error mb-2">Danger Zone</h3>
                <p className="text-sm text-secondary mb-6 font-medium">Once you delete your account, there is no going back. Please be certain.</p>
                <button className="flex items-center justify-center w-full gap-2 py-3.5 bg-white text-error font-bold rounded-xl border border-error/20 hover:bg-error hover:text-white transition-all shadow-sm">
                  <Trash2 className="w-4 h-4" /> Delete Account
                </button>
              </div>

            </div>
          </div>
        </section>

      </div>
    </main>
  )
}
