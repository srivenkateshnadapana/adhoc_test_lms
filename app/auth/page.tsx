import { AuthForm } from "@/components/auth/auth-form"
import { Suspense } from "react"

export default function AuthPage() {
  return (
    <main className="min-h-screen bg-surface flex items-center justify-center p-4 md:p-8">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-fixed opacity-30 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary-fixed opacity-30 rounded-full blur-3xl" />
      </div>
      
      {/* Auth form full-screen widget */}
      <div className="relative z-10 w-full max-w-[1200px] mx-auto flex items-center justify-center">
        <Suspense fallback={<div className="text-center p-8 text-primary">Loading secure checkpoint...</div>}>
          <AuthForm />
        </Suspense>
      </div>
    </main>
  )
}
