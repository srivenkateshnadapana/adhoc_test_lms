"use client"

import * as React from "react"
import { AdminProtectedRoute } from "@/components/auth/admin-protected-route"
import { ManageCourseForm } from "@/components/admin/manage-course-form"

export default function NewCoursePage() {
  return (
    <AdminProtectedRoute>
      <div className="min-h-screen bg-surface pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <header className="mb-12">
            <h1 className="text-4xl font-headline font-extrabold text-primary tracking-tight">Launch Asset</h1>
            <p className="text-secondary mt-1 italic">Deploy a new learning protocol to the master curriculum.</p>
          </header>
          
          <ManageCourseForm />
        </div>
      </div>
    </AdminProtectedRoute>
  )
}
