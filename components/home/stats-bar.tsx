"use client"

import { motion } from "framer-motion"

const stats = [
  { value: "10,000+", label: "Students Enrolled" },
  { value: "200+", label: "Expert Courses" },
  { value: "50+", label: "Top Instructors" },
  { value: "95%", label: "Satisfaction Rate" },
]

export function StatsBar() {
  return (
    <div className="relative z-10 w-full rounded-3xl border border-white/5 bg-brand-deep-navy/40 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.3)] overflow-hidden p-1">
      <div className="absolute inset-0 bg-gradient-to-r from-brand-royal-blue/20 via-brand-accent-blue/5 to-brand-royal-blue/20 pointer-events-none" />
      <div className="relative flex flex-col sm:flex-row items-center justify-around py-10 px-4 gap-8 sm:gap-4 divide-y sm:divide-y-0 sm:divide-x divide-white/10">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            className="text-center flex-1 w-full pt-6 sm:pt-0 first:pt-0"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
          >
            <div className="text-4xl lg:text-5xl font-space font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-brand-light-silver mb-2 drop-shadow-sm">
              {stat.value}
            </div>
            <div className="text-sm font-medium text-brand-medium-gray uppercase tracking-widest">
              {stat.label}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
