"use client"

import { motion } from "framer-motion"

interface AuthToggleProps {
  mode: "signin" | "signup"
  onModeChange: (mode: "signin" | "signup") => void
}

export function AuthToggle({ mode, onModeChange }: AuthToggleProps) {
  return (
    <div className="relative flex w-full rounded-lg bg-secondary/50 p-1">
      {/* Animated background indicator */}
      <motion.div
        className="absolute inset-y-1 rounded-md bg-primary"
        initial={false}
        animate={{
          x: mode === "signin" ? 4 : "calc(100% - 4px)",
          width: "calc(50% - 4px)",
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
        }}
      />
      
      <button
        onClick={() => onModeChange("signin")}
        className={`relative z-10 flex-1 rounded-md py-2.5 text-sm font-medium transition-colors ${
          mode === "signin" ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"
        }`}
      >
        Sign In
      </button>
      
      <button
        onClick={() => onModeChange("signup")}
        className={`relative z-10 flex-1 rounded-md py-2.5 text-sm font-medium transition-colors ${
          mode === "signup" ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"
        }`}
      >
        Sign Up
      </button>
    </div>
  )
}
