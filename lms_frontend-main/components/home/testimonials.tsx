"use client"
import React, { useRef, useEffect, useState } from 'react'
import { motion, useAnimation, useInView } from 'framer-motion'

export function Testimonials() {
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })
  const mainControls = useAnimation()

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible")
    }
  }, [isInView, mainControls])

  const staggerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.2 } 
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: { 
      opacity: 1, 
      x: 0, 
      transition: { type: "spring", stiffness: 60, damping: 20 } 
    }
  }

  return (
    <section className="py-24 px-8 overflow-hidden" ref={containerRef}>
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={mainControls}
          variants={{ visible: { opacity: 1, y: 0, transition: { duration: 0.8 } } }}
          className="flex flex-col items-center mb-16"
        >
          <span className="text-primary font-bold text-sm uppercase tracking-widest mb-2">Success Stories</span>
          <h2 className="text-4xl font-headline font-bold text-primary">Voices of Our Graduates</h2>
        </motion.div>
        
        <motion.div 
          variants={staggerVariants}
          initial="hidden"
          animate={mainControls}
          className="flex gap-8 overflow-x-auto pb-12 no-scrollbar snap-x cursor-grab active:cursor-grabbing px-4 -mx-4"
        >
          {/* Testimonial 1 */}
          <motion.div 
            variants={cardVariants}
            whileHover={{ y: -5, boxShadow: "0px 15px 30px rgba(0,0,0,0.05)" }}
            className="min-w-[400px] snap-center bg-surface-container-lowest p-10 rounded-[2.5rem] shadow-xl shadow-primary/5 border border-surface-container transition-shadow"
          >
            <div className="flex gap-1 text-on-tertiary-container mb-6">
              {[1,2,3,4,5].map((i) => <motion.span initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5 + (i * 0.1) }} key={i} className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</motion.span>)}
            </div>
            <p className="text-on-surface text-lg leading-relaxed italic mb-10">
              "The Editorial Design course transformed the way I approach branding. The depth of the curriculum and the instructor's feedback were unparalleled."
            </p>
            <div className="flex items-center gap-4">
              <motion.img whileHover={{ scale: 1.1 }} alt="User 1" className="w-12 h-12 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDckD80xM2YA4RLS9hDF-aWJITezZp7JhZvuiUzFCQE5SNwKFc7UsW6ZbTvp4Us--atxMqIfr5t0_QmvJqrY7aIl431kLwP6IxLYX33uMqKy49Z58HNHl4MsrBo19q9fG9Yk8xyUszsgEmgUJIb1t7wwkgtIbqCAKKRjCT3mFpmzckuqfAgGHyAAwRjeKreGZcMMjm7BKjQ2gkBpsxw9fDE3p-RuAI88SSqN76TPePz48izGnU0V7Np55E8DWfk8zeOrBkhP6_KtT1b" />
              <div>
                <h4 className="text-primary font-bold">Marcus Thorne</h4>
                <p className="text-secondary text-sm">Lead Designer at Verve Digital</p>
              </div>
            </div>
          </motion.div>
          
          {/* Testimonial 2 */}
          <motion.div 
            variants={cardVariants}
            whileHover={{ y: -5, boxShadow: "0px 15px 30px rgba(0,0,0,0.05)" }}
            className="min-w-[400px] snap-center bg-surface-container-lowest p-10 rounded-[2.5rem] shadow-xl shadow-primary/5 border border-surface-container transition-shadow"
          >
            <div className="flex gap-1 text-on-tertiary-container mb-6">
              {[1,2,3,4,5].map((i) => <motion.span initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.7 + (i * 0.1) }} key={i} className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</motion.span>)}
            </div>
            <p className="text-on-surface text-lg leading-relaxed italic mb-10">
              "I went from a junior analyst to a senior role in six months after completing the Data Analytics track. The ROI on this education is incredible."
            </p>
            <div className="flex items-center gap-4">
              <motion.img whileHover={{ scale: 1.1 }} alt="User 2" className="w-12 h-12 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAbX_6o5YyXoNJly0lVeO4tFvtPwfmoPgNFGN0jTSU8E3NrroS8ZQN5NwH6hWeZfjE6-aQe1KG9yppvoSfw72d3WnjgbA4Yq0lnEAWp7Tsrbejp9_wJLjbfwo3UzKuo0NzsB9oo2hC-6Y2g2y1UmNUUK35-deBxn0TY8yleQmLEW5AfE9yXuD9IklQg__YcXJ1wzhAIqhqFjAT9N0Rx7NoNOkPRd6B9AuJtGGI_UuS3viD5SZAMPH2VaxNwV7hMIo5el9DeJOcaGI4V" />
              <div>
                <h4 className="text-primary font-bold">Sarah Jenkins</h4>
                <p className="text-secondary text-sm">Senior Data Analyst</p>
              </div>
            </div>
          </motion.div>
          
          {/* Testimonial 3 */}
          <motion.div 
            variants={cardVariants}
            whileHover={{ y: -5, boxShadow: "0px 15px 30px rgba(0,0,0,0.05)" }}
            className="min-w-[400px] snap-center bg-surface-container-lowest p-10 rounded-[2.5rem] shadow-xl shadow-primary/5 border border-surface-container transition-shadow"
          >
            <div className="flex gap-1 text-on-tertiary-container mb-6">
              {[1,2,3,4,5].map((i) => <motion.span initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.9 + (i * 0.1) }} key={i} className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</motion.span>)}
            </div>
            <p className="text-on-surface text-lg leading-relaxed italic mb-10">
              "The community support here is amazing. I never felt like I was learning in a vacuum. The mentor calls were the highlight of my week."
            </p>
            <div className="flex items-center gap-4">
              <motion.img whileHover={{ scale: 1.1 }} alt="User 3" className="w-12 h-12 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBV-sq9jHFwMiasYBB8Of8X5xw4pQNqwnuEDx65bVPYhohedloNAJP2wFCGaoqGZaILkX1I3mS771Y51sxyJJtJcVA-N8qfa3ncc6FabT7UlhbIOuzf3IOipyw1-FNDSuhKY1CVCzT6Neb6YTtTrJ2jdxOvkOYd0dQqfxJqjFPsoG50Exb4vRIiuf1_rnWjaJQOGSwjOUK2zL4SdDb4O0E5ri1GXBTZsH15G7TZLQxArDjrePwuOmjBwXCQgN6w-wAF4rItMNTKp9mG" />
              <div>
                <h4 className="text-primary font-bold">David Chen</h4>
                <p className="text-secondary text-sm">Frontend Developer</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
