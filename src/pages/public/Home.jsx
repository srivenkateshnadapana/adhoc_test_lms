// src/pages/public/Home.jsx
import * as React from "react"
import { Link } from "react-router-dom"
import { 
  ArrowRight, 
  PlayCircle, 
  ShieldCheck, 
  Star, 
  Brain, 
  History, 
  Globe, 
  Award,
  TrendingUp,
  Users,
  Video,
  Clock,
  Sparkles,
  ChevronRight
} from "lucide-react"
import { motion, useInView } from "framer-motion"

// Animation variants
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
}

export default function Home() {
  const [hoveredCard, setHoveredCard] = React.useState(null)
  const heroRef = React.useRef(null)
  const isHeroInView = useInView(heroRef, { once: true })

  // Stats data
  const stats = [
    { value: "12,000+", label: "Active Learners", icon: Users },
    { value: "150+", label: "Expert Mentors", icon: Brain },
    { value: "500+", label: "Live Sessions", icon: Video },
    { value: "98%", label: "Success Rate", icon: TrendingUp },
  ]

  // Testimonials
  const testimonials = [
    {
      name: "Dr. Sarah Chen",
      role: "CTO, TechForward",
      content: "The curriculum depth and production quality are unmatched. This platform accelerated our team's upskilling by 3x.",
      rating: 5,
      avatar: "https://i.pravatar.cc/150?img=1"
    },
    {
      name: "Michael Rodriguez",
      role: "Lead Architect",
      content: "Finally, a learning platform that respects design sophistication. The bento layout makes discovery effortless.",
      rating: 5,
      avatar: "https://i.pravatar.cc/150?img=2"
    },
    {
      name: "Priya Sharma",
      role: "Product Manager",
      content: "The certification helped me transition into a leadership role. Highly recommend for serious professionals.",
      rating: 5,
      avatar: "https://i.pravatar.cc/150?img=3"
    }
  ]

  // Featured courses
  const featuredCourses = [
    { title: "AI Fundamentals", level: "Advanced", duration: "8 weeks", students: "2.5k" },
    { title: "Cloud Architecture", level: "Expert", duration: "12 weeks", students: "1.8k" },
    { title: "Data Strategy", level: "Intermediate", duration: "6 weeks", students: "3.2k" },
  ]

  return (
    <div className="bg-surface text-on-surface w-full overflow-x-hidden">
      {/* Hero Section with Animation */}
      <motion.section 
        ref={heroRef}
        initial="hidden"
        animate={isHeroInView ? "visible" : "hidden"}
        variants={fadeUp}
        className="relative overflow-hidden py-16 px-6 sm:px-8 lg:py-32"
      >
        {/* Background Gradient */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/3 rounded-full blur-[80px] pointer-events-none" />

        <div className="max-w-7xl mx-auto flex flex-col md:grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="relative z-10 space-y-6 lg:space-y-8 text-center md:text-left">
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary font-bold text-xs uppercase tracking-widest"
            >
              The Digital Curator
            </motion.span>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl sm:text-5xl lg:text-7xl font-headline font-extrabold text-primary tracking-tight leading-[1.1]"
            >
              Elevate Your <br />
              <span className="opacity-80 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Learning Journey
              </span>
            </motion.h1>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-base sm:text-lg text-secondary font-medium max-w-lg leading-relaxed mx-auto md:mx-0"
            >
              Access premium courses designed by industry experts. Experience a sophisticated curriculum structured for modern professionals.
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 pt-4 justify-center md:justify-start"
            >
              <Link
                to="/catalog"
                className="px-8 py-4 signature-gradient text-primary-foreground rounded-xl font-bold hover:scale-105 transition-transform ambient-shadow flex items-center justify-center gap-2 group text-white"
              >
                Explore Courses
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/catalog"
                className="px-8 py-4 border border-primary/30 text-primary rounded-xl font-bold hover:bg-primary/5 transition-all flex items-center justify-center gap-2 group"
              >
                <PlayCircle className="w-5 h-5" />
                Watch Demo
              </Link>
            </motion.div>
            
            {/* Stats Row */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-4 sm:gap-6 pt-4 justify-center md:justify-start"
            >
              {stats.map((stat, idx) => (
                <div key={idx} className="flex items-center gap-2 sm:gap-3">
                  <stat.icon className="w-4 h-4 sm:w-5 sm:h-5 text-primary/60" />
                  <div>
                    <p className="text-lg sm:text-xl font-bold text-primary">{stat.value}</p>
                    <p className="text-[9px] sm:text-[10px] font-bold text-secondary uppercase tracking-wider">{stat.label}</p>
                  </div>
                </div>
              ))}
            </motion.div>
            
            {/* Social Proof */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex items-center gap-4 pt-4"
            >
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map(i => (
                  <img
                    key={i}
                    src={`https://i.pravatar.cc/150?img=${i + 10}`}
                    className="w-10 h-10 rounded-full border-2 border-surface shadow-sm object-cover"
                    alt="Learner"
                  />
                ))}
              </div>
              <div>
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                </div>
                <p className="text-xs font-bold text-secondary mt-1">Rated 4.9/5 by 12,000+ professionals</p>
              </div>
            </motion.div>
          </div>

          {/* Hero Image Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="relative rounded-[2rem] overflow-hidden bg-surface-container-low border border-surface-dim/20 p-2 ambient-shadow"
          >
            <div className="relative rounded-3xl overflow-hidden h-[350px] sm:h-[450px] lg:h-[500px]">
              <img
                alt="Students Learning"
                className="w-full h-full object-cover"
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&auto=format&fit=crop&q=60"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6 p-6 bg-surface/90 backdrop-blur-md rounded-2xl border border-white/20 flex justify-between items-center">
                <div>
                  <p className="text-3xl font-headline font-bold text-primary leading-none mb-1">98%</p>
                  <p className="text-[10px] font-bold text-secondary uppercase tracking-[0.2em]">Success Rate</p>
                </div>
                <button className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:scale-110 transition-transform">
                  <PlayCircle className="w-8 h-8 text-white" />
                </button>
              </div>
            </div>
            
            {/* Floating badge */}
            <div className="absolute top-4 right-4 bg-orange-500 text-white px-5 py-1 rounded-full text-xs font-bold shadow-lg">
              Limited Spots
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Philosophy Section */}
      <section className="py-16 px-6 sm:px-8 bg-surface-container-lowest border-y border-surface-dim/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 lg:gap-16">
          <div className="md:w-1/2 space-y-6 lg:space-y-8 text-center md:text-left">
            <h2 className="text-3xl sm:text-4xl font-headline font-bold text-primary">Academic Authority, Digital Speed.</h2>
            <p className="text-secondary text-base sm:text-lg leading-relaxed">
              We reject the generic "boxed-in" aesthetic of traditional educational platforms. Instead, we embrace intentional asymmetry, deep navy tones, and clean typography to guide your eye effortlessly through complex knowledge material.
            </p>
            <ul className="space-y-4 text-left inline-block md:block">
              {[
                "150+ Expert Mentors from Global Firms",
                "Certifications recognized across the tech industry",
                "Lifetime access to premium course assets",
                "24/7 Mentor Support & Community Access"
              ].map((text, i) => (
                <li key={i} className="flex items-center gap-3 text-on-surface font-medium group text-sm sm:text-base">
                  <ShieldCheck className="w-5 h-5 text-primary shrink-0 group-hover:scale-110 transition-transform" />
                  {text}
                </li>
              ))}
            </ul>
            <Link to="/about" className="inline-flex items-center gap-2 text-primary font-semibold group">
              Learn more about our mission
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <div className="md:w-1/2 grid grid-cols-2 gap-4 w-full">
            <div className="h-48 sm:h-64 rounded-3xl bg-surface-container overflow-hidden hover:scale-105 transition-transform duration-500">
              <img src="data:image/jpeg;base64,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" className="w-full h-full object-cover" alt="Campus Life" />
            </div>
            <div className="h-56 sm:h-72 mt-8 sm:mt-12 rounded-3xl bg-surface-container overflow-hidden hover:scale-105 transition-transform duration-500">
              <img src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&auto=format&fit=crop&q=60" className="w-full h-full object-cover" alt="Study" />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses Section */}
      <section className="py-16 px-6 sm:px-8 bg-surface">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 sm:mb-16 text-center max-w-2xl mx-auto">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary font-bold text-xs uppercase tracking-widest mb-4">
              Featured Curriculum
            </span>
            <h2 className="text-3xl sm:text-4xl font-headline font-bold text-primary mb-4">Most Popular Pathways</h2>
            <p className="text-secondary text-sm sm:text-base">Join thousands of professionals accelerating their careers with our flagship programs.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredCourses.map((course, idx) => (
              <div 
                key={idx}
                onMouseEnter={() => setHoveredCard(idx)}
                onMouseLeave={() => setHoveredCard(null)}
                className="bg-surface-container-lowest rounded-2xl p-6 border border-surface-dim/20 hover:border-primary/30 transition-all hover:shadow-xl group"
              >
                <div className="flex justify-between items-start mb-4">
                  <Sparkles className="w-8 h-8 text-primary" />
                  <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded-full">
                    {course.level}
                  </span>
                </div>
                <h3 className="text-xl font-headline font-bold mb-2">{course.title}</h3>
                <div className="flex justify-between items-center text-sm text-secondary mb-4">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {course.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="w-3 h-3" /> {course.students} students
                  </span>
                </div>
                <Link 
                  to={`/catalog/${course.title.toLowerCase().replace(/\s+/g, '-')}`}
                  className="inline-flex items-center gap-2 text-primary font-medium text-sm group-hover:gap-3 transition-all"
                >
                  Learn More <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bento Grid Features (Enhanced) */}
      <section className="py-24 px-8 bg-surface-container-lowest">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 text-center max-w-2xl mx-auto">
            <h2 className="text-4xl font-headline font-bold text-primary mb-4">The Editorial Experience</h2>
            <p className="text-secondary">Designed for professionals who demand high-end interfaces and unparalleled curriculum depth.</p>
          </div>
          
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-col md:grid md:grid-cols-3 gap-6"
          >
            <motion.div 
              variants={fadeUp}
              className="w-full md:col-span-2 bg-surface-container-low p-8 sm:p-10 rounded-[2rem] border border-surface-dim/20 hover:border-primary/20 transition-all group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl pointer-events-none" />
              <Award className="w-12 h-12 text-primary mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-2xl font-headline font-bold mb-4">Industry Accreditation</h3>
              <p className="text-secondary max-w-md">Our certs are designed directly with enterprise CTOs, providing immediate professional legitimacy.</p>
              <div className="mt-6 flex items-center gap-2 text-primary text-sm font-medium">
                Recognized by 500+ companies
                <ArrowRight className="w-3 h-3" />
              </div>
            </motion.div>
            
            <motion.div 
              variants={fadeUp}
              className="w-full md:col-span-1 bg-primary text-primary-foreground p-8 sm:p-10 rounded-[2rem] shadow-xl ambient-shadow flex flex-col justify-between group hover:scale-[1.02] transition-transform"
            >
              <Brain className="w-12 h-12 mb-6 group-hover:rotate-6 transition-transform text-white" />
              <div>
                <h3 className="text-2xl font-headline font-bold mb-2 text-white">Expert Focus</h3>
                <p className="opacity-80 text-sm text-white">Mentors leading deep technical pathways from FAANG and Fortune 500.</p>
              </div>
            </motion.div>
            
            <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
            <motion.div 
              variants={fadeUp}
              className="w-full bg-surface-container-lowest p-10 rounded-[2rem] border border-surface-dim/20 ambient-shadow hover:shadow-xl transition-all"
            >
              <History className="w-10 h-10 text-primary mb-6" />
              <h3 className="text-xl font-headline font-bold mb-2">Lifetime Access</h3>
              <p className="text-secondary text-sm">Purchase once, review forever. All future updates included.</p>
            </motion.div>

            <motion.div 
              variants={fadeUp}
              className="w-full bg-surface-container-lowest p-10 rounded-[2rem] border border-surface-dim/20 ambient-shadow hover:shadow-xl transition-all"
            >
              <Globe className="w-10 h-10 text-primary mb-6" />
              <h3 className="text-xl font-headline font-bold mb-2">Global Network</h3>
              <p className="text-secondary text-sm">Join 45k+ alumni worldwide across 80+ countries.</p>
            </motion.div>
            </div>
            <motion.div 
              variants={fadeUp}
              className="w-full md:col-span-3 bg-surface-container-low flex items-center justify-between rounded-[2rem] border border-surface-dim/20 p-8"
            >
              <div>
                <p className="text-sm text-secondary uppercase tracking-wide mb-1">Ready to begin?</p>
                <p className="text-xl font-headline font-bold">Start your free trial today</p>
              </div>
              <Link 
                to="/register" 
                className="px-6 py-3 bg-primary text-primary-foreground font-bold rounded-xl hover:scale-105 transition-transform group flex items-center gap-2 text-white"
              >
                Join Today 
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section (NEW) */}
      <section className="py-24 px-8 bg-surface">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 text-center max-w-2xl mx-auto">
            <h2 className="text-4xl font-headline font-bold text-primary mb-4">What Our Learners Say</h2>
            <p className="text-secondary">Trusted by professionals from leading companies worldwide.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, idx) => (
              <div 
                key={idx}
                className="bg-surface-container-lowest rounded-2xl p-6 border border-surface-dim/20 hover:border-primary/20 transition-all"
              >
                <div className="flex text-amber-400 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                </div>
                <p className="text-on-surface mb-6 leading-relaxed">"{testimonial.content}"</p>
                <div className="flex items-center gap-3">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-bold text-sm">{testimonial.name}</p>
                    <p className="text-xs text-secondary">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link to="/testimonials" className="inline-flex items-center gap-2 text-primary font-medium group">
              Read more success stories
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 sm:px-8 signature-gradient">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl sm:text-4xl font-headline font-bold mb-4">Ready to Elevate Your Career?</h2>
          <p className="text-base sm:text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Join thousands of professionals who have transformed their careers with our premium courses.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/catalog" 
              className="px-8 py-4 bg-white text-primary rounded-xl font-bold hover:scale-105 transition-transform shadow-lg"
            >
              Browse All Courses
            </Link>
            <Link 
              to="/register" 
              className="px-8 py-4 border-2 border-white/30 text-white rounded-xl font-bold hover:bg-white/10 transition-all"
            >
              Start Free Trial
            </Link>
          </div>
          <p className="text-sm opacity-70 mt-6">No credit card required • Cancel anytime</p>
        </div>
      </section>
    </div>
  )
}