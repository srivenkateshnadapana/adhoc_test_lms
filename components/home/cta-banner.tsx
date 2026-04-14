"use client"

import { motion } from "framer-motion"
import Link from "next/link"

export function CtaBanner() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-brand-royal-blue via-brand-accent-blue/80 to-purple-800/80 p-10 lg:p-14 shadow-2xl border border-white/20">
        {/* Abstract shapes */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-[40px] pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-brand-accent-blue/40 rounded-full blur-[60px] pointer-events-none" />
        
        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="text-center lg:text-left max-w-2xl">
            <h2 className="text-3xl lg:text-4xl font-space font-bold text-white mb-4">
              Ready to Advance Your Cybersecurity Career?
            </h2>
            <p className="text-white/80 text-lg">
              Join thousands of professionals already upgrading their skills. Get started today.
            </p>
          </div>
          
          <div className="flex-shrink-0">
            <Link
              href="/auth"
              className="btn-slant inline-flex items-center justify-center h-14 px-10 text-lg font-black bg-white text-[#0B1B3B] hover:bg-[#E3E3E3] hover:shadow-[0_0_30px_rgba(255,255,255,0.6)] transition-all duration-300 transform hover:-translate-y-1 rounded-sm"
            >
              Get Started Free
            </Link>
          </div>
        </div>
      </div>
    </motion.section>
  )
}
