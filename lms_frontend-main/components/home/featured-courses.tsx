"use client"
import React from 'react'
import { motion } from 'framer-motion'

export function FeaturedCourses() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.15 } 
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { type: "spring", stiffness: 100, damping: 20 } 
    }
  }

  const courses = [
    {
      title: "Advanced Data Analytics & AI Architecture",
      category: "Technology",
      rating: "4.9",
      price: "$199",
      desc: "Master the complexities of neural networks and predictive modeling with real-world datasets.",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCfVedum0AA_TPeI-1c8Jx7_KhvK15Ytkfe3UuvmoQlqA85bOIN2FB8lhUpDG_JgA1WZjHDqdiSseBgnRqDeTK51lGpYvrCXyqH3nrWNSxzW-17mqaVCO_0d6Z7QCQPBCpc5Y9-ESK9H2xK_XSBQLy9I8GYDI8XQHEAUVX9gBdC0WO04JYolhPBXi2FZlyFdKkaspbNvJ9vlOXfM7c2eIwAMAOmTq25lQQWmt1_d7zOiZ2DAdUD12o5EoWRJbSgZd5QZX8SyjH2CRfC"
    },
    {
      title: "Editorial Design Systems & Visual Identity",
      category: "Design",
      rating: "4.8",
      price: "$149",
      desc: "Learn the art of high-end layout, typography, and cohesive brand storytelling for global brands.",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDzrO4cTOVnN4AeVSit8zwa0Wd5xp5dZOs1vmJw1LvM5tflMtyYwF8-PiRmoXQbih3fH5v3v6Is1Fruz4rONMQf1mbkooO_jSY1H1T6sIvA8G7ddM_mjkfw4oehmVYRSXbUezauw0QXzMhYKKSze-TZ6vjMs9e5yCk-y2VRbByqx2dgBTTQtvWet0USBEPEesyPXRDvWE_iV7tvlh7qI8RYhXm4QVRoyT21-Ghd732f8fIH9Nwfa0bVxOmEnRbvUaQrIQab5WprXYnG"
    },
    {
      title: "Strategic Leadership in the Digital Age",
      category: "Business",
      rating: "4.7",
      price: "$179",
      desc: "Develop the management frameworks needed to lead remote-first, agile organizations.",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDgnp00emzzStWySQy2B-FnB1VUXYdTgDc70x1r-w1c7NfCNXPpJVLBl-xyJQWVxGXKYIijyYrASK2YNGKSoJ7J8PS8QZunrZbiuJc2XD1BmVP0r5KezTPXGreuHk2mblTwWRNt3M-jXFY2IBaW-6VIMTcb4dHgdiOWYWId8EkYRGpbCUOFJ0kgWXurUVSStsW3s01vy3Idk51rIol8yWLu47-T9hMrmXzXTYBCfAA5dV81p-wvMHikGm9VahLzUOMJ-pcnpxO0pbcH"
    }
  ]

  return (
    <section className="py-24 px-8" id="courses">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-16">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h2 className="text-4xl font-headline font-bold text-primary mb-4">Featured Disciplines</h2>
            <p className="text-on-surface-variant max-w-md">Master the most in-demand skills with our top-rated academic programs.</p>
          </motion.div>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="hidden md:flex items-center gap-2 text-primary font-bold border-b-2 border-primary pb-1 transition-all"
          >
            Browse Catalog
            <span className="material-symbols-outlined text-sm">open_in_new</span>
          </motion.button>
        </div>
        
        <motion.div 
          className="grid md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {courses.map((course, idx) => (
            <motion.div 
              key={idx}
              variants={cardVariants}
              whileHover={{ y: -10, boxShadow: "0px 20px 40px rgba(0,2,14,0.08)" }}
              className="group bg-surface-container-low rounded-[2rem] overflow-hidden cursor-pointer"
            >
              <div className="h-56 overflow-hidden relative">
                <motion.img 
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                  alt={course.title} 
                  className="w-full h-full object-cover" 
                  src={course.img} 
                />
                <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors duration-300"></div>
              </div>
              <div className="p-8 relative bg-surface-container-low z-10">
                <div className="flex justify-between items-center mb-4">
                  <span className="bg-surface-container-highest text-on-surface-variant px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">{course.category}</span>
                  <div className="flex items-center gap-1 text-on-tertiary-container">
                    <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    <span className="text-sm font-bold">{course.rating}</span>
                  </div>
                </div>
                <h3 className="text-xl font-headline font-bold text-primary mb-3 leading-tight">{course.title}</h3>
                <p className="text-on-surface-variant text-sm mb-6 line-clamp-2 leading-relaxed">{course.desc}</p>
                <div className="flex justify-between items-center pt-6 border-t border-outline-variant/20">
                  <span className="text-primary font-extrabold text-xl">{course.price}</span>
                  <button className="text-primary font-bold flex items-center gap-1 group/btn">
                    Enroll Now
                    <span className="material-symbols-outlined group-hover/btn:translate-x-1 transition-transform">chevron_right</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
