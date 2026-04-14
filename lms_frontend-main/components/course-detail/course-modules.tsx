"use client"

import { motion } from "framer-motion"
import { Check } from "lucide-react"
import { GlassCard } from "@/components/lms"

interface Module {
  id: string
  title: string
  completed: boolean
}

interface CourseModulesProps {
  modules: Module[]
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
}

export function CourseModules({ modules }: CourseModulesProps) {
  return (
    <GlassCard>
      <h2 className="text-xl font-semibold text-foreground mb-6">
        Course Modules
      </h2>
      
      <motion.ul
        className="space-y-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {modules.map((module, index) => (
          <motion.li
            key={module.id}
            variants={itemVariants}
            className="flex items-center gap-3"
          >
            <div
              className={`flex h-6 w-6 items-center justify-center rounded ${
                module.completed
                  ? "bg-emerald-500"
                  : "bg-muted/50 border border-border"
              }`}
            >
              {module.completed && (
                <Check className="h-4 w-4 text-white" />
              )}
            </div>
            <span
              className={`text-sm ${
                module.completed ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              {index + 1}. {module.title}
            </span>
          </motion.li>
        ))}
      </motion.ul>
    </GlassCard>
  )
}
