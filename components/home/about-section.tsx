"use client"
import React from 'react'
import { motion } from 'framer-motion'

export function AboutSection() {
  const textVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } }
  }

  return (
    <section className="py-24 bg-surface-container-low px-8 overflow-hidden" id="about">
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-7xl mx-auto flex flex-col md:flex-row gap-20 items-center"
      >
        <div className="md:w-1/2 grid grid-cols-2 gap-4">
          <div className="space-y-4">
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="h-48 rounded-2xl bg-surface-container overflow-hidden shadow-lg"
            >
              <img alt="About" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCv7-kAV6H-gCY5b53Egp3QEikfqVEdNo-YVOqfE4OqjZFENDAJ_WyKUrHfZSL4rfNyKsxc2jmnI3DF2EY7XVBG4xeuAcwZHQP-GQWiLgue5aY2lN7ZpmM5Xj-igHT49bl1h7lWJne81ayagmpkyK0H_JkVvQjNpNZqHqwBEGfnYoTP-Q39iHq4-UJyNK_ZHUL1w67GQZkr7OHKz8qWU3YG7yz_l9tX4HKEb8kUgbTHuL7N_k1k7iqNo5u5xNZZj_SWIKF9WpLt3LIr" />
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.02, y: -5 }}
              className="h-64 rounded-2xl bg-primary-container overflow-hidden p-8 flex flex-col justify-end shadow-lg cursor-pointer"
            >
              <span className="material-symbols-outlined text-surface-container-lowest text-4xl mb-4">school</span>
              <h4 className="text-white font-bold text-xl">Legacy of Excellence</h4>
            </motion.div>
          </div>
          <div className="space-y-4 pt-12">
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="h-64 rounded-2xl bg-secondary overflow-hidden shadow-lg"
            >
              <img alt="Study" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC-c-Ss7inqR2tfyUStY1132ZaCASW_iOvXXWxXmKWryRyGwwdhyRIVP6D13AS397bKxgY4XxI_GIY9FBG9RLxJacybXTSeEwUY3HWmpGJPDZZHDUig9WVLG0s9EJE0Fw1ASwJV7BO3rOgvPso0mmtN7JPoHmqk5O-qE3Vw2rNYf5g3nJUTm0XTN4T-hcjDj11G5eGCDEye1RmRNxPv7s8WgTrzUN1xvvB7KJKAmFdLXwsklU1aRveiNoUX5p-8cto0LJgNgEoNTk6d" />
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.02, rotate: 2 }}
              className="h-48 rounded-2xl bg-surface-container-highest shadow-inner"
            ></motion.div>
          </div>
        </div>
        
        <motion.div variants={textVariants} className="md:w-1/2">
          <span className="inline-block px-4 py-1 rounded-full bg-primary-fixed text-on-primary-fixed font-bold text-xs uppercase tracking-widest mb-6 shadow-sm">Our Mission</span>
          <h2 className="text-4xl font-headline font-bold text-primary mb-8 leading-tight">Empowering Minds Through Curated Digital Education</h2>
          <p className="text-on-surface-variant text-lg mb-6 leading-relaxed">Adhoc Network Tech is more than just a platform. We are a digital curator of knowledge, bridging the gap between ivory-tower theory and real-world industrial practice.</p>
          <p className="text-on-surface-variant text-lg mb-8 leading-relaxed">
            Our instructors are not just teachers—they are practitioners, leaders, and innovators who bring their daily challenges and triumphs into the virtual classroom.
          </p>
          <div className="grid grid-cols-2 gap-8">
            <motion.div whileHover={{ scale: 1.05 }} className="cursor-default">
              <p className="text-3xl font-headline font-extrabold text-primary">150+</p>
              <p className="text-sm font-medium text-secondary">Expert Mentors</p>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} className="cursor-default">
              <p className="text-3xl font-headline font-extrabold text-primary">45k+</p>
              <p className="text-sm font-medium text-secondary">Global Alumni</p>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
