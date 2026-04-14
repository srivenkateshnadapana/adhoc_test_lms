"use client"
import React from 'react'
import { motion } from 'framer-motion'

export function AdvantagesBento() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  }

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 80, damping: 15 } }
  }

  return (
    <section className="py-24 px-8 bg-primary text-white overflow-hidden relative">
      <motion.div 
        initial={{ opacity: 0, rotate: -45 }}
        whileInView={{ opacity: 0.1, rotate: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-white rounded-full blur-[150px] -translate-y-1/2 translate-x-1/2"></div>
      </motion.div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-headline font-bold mb-4">The Academic Advantage</h2>
          <p className="text-on-primary-container max-w-xl mx-auto">Discover why students around the world choose our platform to accelerate their professional growth.</p>
        </motion.div>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-4"
        >
          <motion.div 
            variants={itemVariants} 
            whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.05)" }}
            className="md:col-span-2 bg-primary-container p-10 rounded-[2rem] border border-white/5 flex flex-col justify-between cursor-default transition-colors"
          >
            <motion.span 
              whileHover={{ rotate: 15, scale: 1.1 }}
              className="material-symbols-outlined text-5xl text-primary-fixed mb-6 origin-left inline-block"
            >
              verified
            </motion.span>
            <div>
              <h3 className="text-2xl font-bold font-headline mb-3">Industry Accredited</h3>
              <p className="text-on-primary-container leading-relaxed">Our certifications are recognized by top global tech and creative firms, giving you a competitive edge in any interview.</p>
            </div>
          </motion.div>
          
          <motion.div 
            variants={itemVariants} 
            whileHover={{ y: -5, boxShadow: "0px 10px 30px rgba(0,0,0,0.5)" }}
            className="bg-surface-container-highest/10 backdrop-blur-md p-10 rounded-[2rem] border border-white/5 cursor-default"
          >
            <span className="material-symbols-outlined text-4xl text-white mb-6">psychology</span>
            <h3 className="text-xl font-bold font-headline mb-2">Expert Instructors</h3>
            <p className="text-sm text-on-primary-container">Learn directly from CTOs, Creative Directors, and Founders.</p>
          </motion.div>
          
          <motion.div 
            variants={itemVariants} 
            whileHover={{ y: -5, boxShadow: "0px 10px 30px rgba(0,0,0,0.5)" }}
            className="bg-surface-container-highest/10 backdrop-blur-md p-10 rounded-[2rem] border border-white/5 cursor-default"
          >
            <span className="material-symbols-outlined text-4xl text-white mb-6">history</span>
            <h3 className="text-xl font-bold font-headline mb-2">Lifetime Access</h3>
            <p className="text-sm text-on-primary-container">Purchase once and revisit the materials anytime as industries evolve.</p>
          </motion.div>
          
          <motion.div 
            variants={itemVariants} 
            whileHover={{ y: -5, boxShadow: "0px 10px 30px rgba(0,0,0,0.5)" }}
            className="bg-white/5 p-10 rounded-[2rem] border border-white/5 cursor-default"
          >
            <span className="material-symbols-outlined text-4xl text-white mb-6">groups</span>
            <h3 className="text-xl font-bold font-headline mb-2">Exclusive Community</h3>
            <p className="text-sm text-on-primary-container">Join a private network of peers and mentors in your specific field.</p>
          </motion.div>
          
          <motion.div 
            variants={itemVariants} 
            whileHover={{ scale: 1.01 }}
            className="md:col-span-3 bg-gradient-to-br from-primary-container to-primary p-10 rounded-[2rem] border border-white/5 flex items-center gap-10 cursor-default shadow-2xl relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-white/5 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 rounded-[2rem]"></div>
            <div className="flex-1 relative z-10">
              <h3 className="text-2xl font-bold font-headline mb-3">Flexible Learning Schedules</h3>
              <p className="text-on-primary-container leading-relaxed">Balance your career and education with our modular, self-paced content designed for busy professionals.</p>
            </div>
            <div className="hidden lg:block w-1/3 relative z-10">
              <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: "75%" }}
                  transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                  className="h-full bg-white"
                ></motion.div>
              </div>
              <div className="mt-4 flex justify-between text-xs text-on-primary-container font-mono">
                <span>COURSE PROGRESS</span>
                <span>75%</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
