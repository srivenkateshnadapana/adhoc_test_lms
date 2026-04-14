"use client"
import Link from "next/link"
import { motion } from "framer-motion"

export function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.15, delayChildren: 0.2 } 
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 70, damping: 15 } }
  }

  return (
    <section className="relative overflow-hidden bg-surface py-24 px-8">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <motion.div 
          className="relative z-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 variants={itemVariants} className="text-6xl font-headline font-extrabold text-primary tracking-tight leading-[1.1] mb-6">
            Start Your <br /><span className="text-on-primary-container">Learning Journey</span>
          </motion.h1>
          <motion.p variants={itemVariants} className="text-xl text-on-surface-variant mb-10 max-w-lg leading-relaxed">
            Access 1000+ premium courses taught by industry experts. Elevate your skills with our curated curriculum designed for the modern era.
          </motion.p>
          <motion.div variants={itemVariants} className="flex gap-4">
            <Link href="/catalog">
              <motion.div 
                whileHover={{ scale: 1.05, boxShadow: "0px 15px 35px rgba(0,2,14,0.15)" }} 
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 signature-gradient text-white rounded-xl font-bold text-lg transition-colors flex items-center gap-2"
              >
                Explore Courses
                <span className="material-symbols-outlined">arrow_forward</span>
              </motion.div>
            </Link>
          </motion.div>
          <motion.div variants={itemVariants} className="mt-12 flex items-center gap-4">
            <div className="flex -space-x-3">
              <img alt="Student 1" className="w-10 h-10 rounded-full border-2 border-surface shadow-sm" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAnxEbj-aOe_Olq1iJnIkZyfOUT05MW5T_Ck5oWNCpim0ZUkVLdRZM_aFkTjpcuh2HIcJZUeZLU9Wvn9_EDJ5Cbl75IqbD3VwV1qYYUIEugyiYSK3BP5oRoXyF7x4kOEC_ipzFVkuA-PqM2m_SaHcLa1mio3J4AsqkXvbS0GPCvQHrXme28FFNlkmIoe4EQinmqHHrn6OIo81Bqu3mWwgVkxZjgXLLPbzYGXKv63U-QnIcdABR6P2qw_qr3PuLZciIMkzbrINhiRvv8" />
              <img alt="Student 2" className="w-10 h-10 rounded-full border-2 border-surface shadow-sm" src="https://lh3.googleusercontent.com/aida-public/AB6AXuABfP8mPaESbBjP5_TM4TziAeJwsM-QRo0rCFDfwJTir9GkKbYEluk0Mn9QudopZ1kMRUHkc5NT4TY66OwvkxORMz34bFncR0rtcqFHHnVxnppI-QamL0T9WAW3Z3uKSh-uPsuu7UqZfB06h09BGDPK4mx1TgXs_LWrEpu8g75ze-EN03Pnyz8G7Z8PiOitmOeue6uA0q9k8ul2kXp8NzUHqDUqJJRfRuJBtLtwaeFuNKOnZE4p0yMd6tQnJTt6J8tKZAKrX_wNqfV9" />
              <img alt="Student 3" className="w-10 h-10 rounded-full border-2 border-surface shadow-sm" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAoQpCbwsP1Jf76a15DJcXnMLletbXMTkGOQv3QwFX0yKIlmox9bZdOvtO9izC0P7WiyuXtEp4iZktyIlG4enLEE7mGfD8jCJWNQHhQJTpOzH6GVzGyEPitUZsynr8N4ZXYPcZ6RjVmPUHqXN6xnN3MDQtWoR6vpeg1divTjRC0vka9sifqcxSSDdd8pSaLurS_Lq8h8GqjzQh5X9L-8YjvH2rdHt-IJpKBCdGc1fRID8-Gp2lrLBGbjDYz1iz745J4NauR9odc3PSP" />
            </div>
            <p className="text-sm font-medium text-secondary">Joined by <span className="text-primary font-bold">12,000+</span> ambitious learners</p>
          </motion.div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative"
        >
          <div className="absolute -top-12 -left-12 w-64 h-64 bg-primary-fixed opacity-30 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-secondary-fixed opacity-30 rounded-full blur-3xl"></div>
          
          <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border-8 border-surface-container-lowest">
            <motion.img 
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 1.5, ease: "linear" }}
              alt="Students Learning" 
              className="w-full h-[500px] object-cover" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBlOuQbG8MqKj7yvxf9pYbE_nrzqBt3Ze1tWeHBfDzIUn6NCxRf-wTVITa_4CJqT750BEItfKOa82L8OC2NXX9EqUFujIWdN7uG-47sI6bqSckjpdElNs7hcqo3wG4zhrHyAh5rrZIC3JBipZ8HJeds3Y_2cSGzV4ggU2x_pq0IeXpCWcj2yVzo23_jqiT_7-eRLLpadXKq9fZDTGr7t-Zjh9JBCpD5d3IEikTdBJJcri4NA2wCvL7HojoPsWU8WByc6MakKSLcjaYT" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent pointer-events-none"></div>
            
            <motion.div 
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8, type: "spring", stiffness: 100 }}
              drag
              dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
              dragElastic={0.1}
              className="absolute bottom-8 left-8 p-6 bg-surface-container-lowest/80 backdrop-blur-md rounded-2xl shadow-lg max-w-[240px] cursor-grab active:cursor-grabbing"
            >
              <p className="text-primary font-bold text-2xl font-headline">98%</p>
              <p className="text-xs font-semibold text-secondary uppercase tracking-widest">Course Completion Rate</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
