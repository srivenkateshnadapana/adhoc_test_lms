"use client"

import { motion } from "framer-motion"

interface CourseCardProps {
  title: string
  instructor: string
  price: string
  imageUrl?: string
}

export function CourseCard({ title, instructor, price, imageUrl }: CourseCardProps) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="h-full"
    >
      <div className="h-full flex flex-col rounded-3xl border border-white/10 bg-brand-deep-navy/80 backdrop-blur-md overflow-hidden cursor-pointer group shadow-[0_8px_30px_rgba(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgba(59,130,246,0.2)] transition-shadow duration-300">
        
        {/* Course Image Area */}
        <div className="relative h-48 bg-brand-royal-blue flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-brand-deep-navy via-transparent to-transparent z-10" />
          {imageUrl ? (
            <img 
              src={imageUrl} 
              alt={title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-brand-royal-blue to-purple-900/40 flex flex-col items-center justify-center transition-transform duration-500 group-hover:scale-110">
              <span className="text-white/20 font-space text-sm font-semibold tracking-widest border border-white/10 px-4 py-2 rounded-full">COURSE COVER</span>
            </div>
          )}
          {/* subtle decorative ring */}
          <div className="absolute -top-4 -right-4 w-24 h-24 border border-brand-accent-blue/40 rounded-full blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-500" />
        </div>
        
        {/* Course Info */}
        <div className="p-6 flex flex-col flex-grow relative z-20">
          <h3 className="font-space font-semibold text-xl text-brand-off-white mb-2 line-clamp-2 group-hover:text-brand-accent-blue transition-colors">
            {title}
          </h3>
          <p className="text-sm text-brand-medium-gray mb-6 flex-grow font-medium">
            By {instructor}
          </p>
          
          <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/10">
            <span className="text-brand-light-silver font-bold text-xl">{price}</span>
            <span className="text-brand-accent-blue text-sm font-semibold hover:text-white transition-colors flex items-center gap-1">
              Enroll Now 
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </span>
          </div>
        </div>

      </div>
    </motion.div>
  )
}
