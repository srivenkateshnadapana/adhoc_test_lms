"use client"

import * as React from "react"
import { Lock, Save, X, Edit2 } from "lucide-react"

interface UserProfileHeaderProps {
  name: string
  email: string
  initials: string
  coursesEnrolled: number
  certificatesCount: number
  memberSince: string
  isLocked?: boolean
  onEditName?: (newName: string) => void
}

export function UserProfileHeader({
  name,
  email,
  initials,
  coursesEnrolled,
  certificatesCount,
  memberSince,
  isLocked = false,
  onEditName,
}: UserProfileHeaderProps) {
  const [isEditing, setIsEditing] = React.useState(false)
  const [editValue, setEditValue] = React.useState(name)

  React.useEffect(() => {
    setEditValue(name)
  }, [name])

  const handleSave = () => {
    if (editValue.trim() && editValue !== name) {
      onEditName?.(editValue.trim())
    }
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditValue(name)
    setIsEditing(false)
  }

  return (
    <div className="relative rounded-[2rem] border border-surface-dim bg-surface-container-lowest p-8 shadow-xl ambient-shadow overflow-hidden">
      {/* Decorative gradient */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-8">
        {/* Avatar */}
        <div className="flex-shrink-0 w-24 h-24 rounded-full signature-gradient flex items-center justify-center shadow-lg">
          <span className="text-3xl font-headline font-bold text-white tracking-wider">
            {initials}
          </span>
        </div>

        {/* User Info */}
        <div className="flex-1 w-full">
          {isEditing ? (
            <div className="flex items-center gap-3 w-full max-w-md mb-2">
              <input 
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                className="bg-surface-container border border-surface-dim text-primary font-headline font-bold text-xl h-11 px-4 rounded-xl focus:ring-2 focus:ring-primary/40 outline-none"
                autoFocus
              />
              <button onClick={handleSave} className="p-2.5 bg-green-500 hover:bg-green-600 text-white rounded-xl transition-colors shadow-md" aria-label="Save name">
                <Save className="w-5 h-5" />
              </button>
              <button onClick={handleCancel} className="p-2.5 bg-surface-container-high text-error hover:bg-error hover:text-white rounded-xl transition-colors" aria-label="Cancel">
                <X className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-3xl font-headline font-extrabold text-primary">{name}</h2>
              {isLocked ? (
                <div title="Name is locked to preserve certificate authenticity." className="flex items-center gap-1.5 px-3 py-1 bg-surface-container-high border border-surface-dim rounded-full text-secondary text-xs font-semibold shadow-sm">
                  <Lock className="w-3 h-3" /> Locked
                </div>
              ) : (
                <button onClick={() => setIsEditing(true)} className="p-1.5 text-secondary hover:text-primary hover:bg-surface-container-high rounded-lg transition-colors" title="Edit Profile Name">
                  <Edit2 className="w-4 h-4" />
                </button>
              )}
            </div>
          )}
          
          <p className="text-secondary text-base mb-6 font-medium">{email}</p>
          
          <div className="flex flex-wrap items-center gap-4 text-sm font-semibold">
            <span className="bg-surface-container-high border border-surface-dim px-4 py-2 rounded-xl text-primary">
              {coursesEnrolled} Enrolled
            </span>
            <span className="bg-surface-container-high border border-surface-dim px-4 py-2 rounded-xl text-primary">
              {certificatesCount} Earned
            </span>
            <span className="bg-surface-container-lowest border border-surface-dim px-4 py-2 rounded-xl text-secondary">
              Member since {memberSince}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
