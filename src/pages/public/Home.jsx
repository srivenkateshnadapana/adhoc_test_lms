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
    <div className="bg-surface text-on-surface">
      {/* Hero Section with Animation */}
      <motion.section 
        ref={heroRef}
        initial="hidden"
        animate={isHeroInView ? "visible" : "hidden"}
        variants={fadeUp}
        className="relative overflow-hidden py-16 px-4 sm:px-8 lg:py-28"
      >
        {/* Background Gradient */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/3 rounded-full blur-[80px] pointer-events-none" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="relative z-10 space-y-8">
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
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg text-secondary font-medium max-w-lg leading-relaxed"
            >
              Access premium courses designed by industry experts. Experience a sophisticated curriculum structured for modern professionals.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 pt-4"
            >
              <Link
                to="/catalog"
                className="px-8 py-4 bg-primary text-on-primary rounded-xl font-bold hover:scale-105 transition-transform ambient-shadow flex items-center justify-center gap-2 group"
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
              className="flex flex-wrap gap-6 pt-4"
            >
              {stats.map((stat, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <stat.icon className="w-5 h-5 text-primary/60" />
                  <div>
                    <p className="text-xl font-bold text-primary">{stat.value}</p>
                    <p className="text-[10px] font-bold text-secondary uppercase tracking-wider">{stat.label}</p>
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
            className="relative rounded-[2rem] overflow-hidden bg-surface-container-low border border-surface-dim/20 p-1.5 sm:p-2 ambient-shadow hidden sm:block"
          >
            <div className="relative rounded-3xl overflow-hidden h-[300px] sm:h-[400px] lg:h-[500px]">
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
                <button className="w-12 h-12 rounded-full bg-primary text-on-primary flex items-center justify-center hover:scale-110 transition-transform">
                  <PlayCircle className="w-5 h-5 fill-current text-white" />
                </button>
              </div>
            </div>
            
            {/* Floating badge */}
           <div className="absolute top-5 right-5 bg-primary text-on-primary px-3 py-1 rounded-full text-xs font-bold shadow-lg">
              Limited Spots
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Philosophy Section */}
      <section className="py-20 sm:py-24 px-4 sm:px-8 bg-surface-container-lowest border-y border-surface-dim/10">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          <div className="lg:w-1/2 space-y-8">
            <h2 className="text-4xl font-headline font-bold text-primary">Academic Authority, Digital Speed.</h2>
            <p className="text-secondary text-lg leading-relaxed">
              We reject the generic "boxed-in" aesthetic of traditional educational platforms. Instead, we embrace intentional asymmetry, deep navy tones, and clean typography to guide your eye effortlessly through complex knowledge material.
            </p>
            <ul className="space-y-4">
              {[
                "150+ Expert Mentors from Global Firms",
                "Certifications recognized across the tech industry",
                "Lifetime access to premium course assets",
                "24/7 Mentor Support & Community Access"
              ].map((text, i) => (
                <li key={i} className="flex items-center gap-3 text-on-surface font-medium group">
                  <ShieldCheck className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
                  {text}
                </li>
              ))}
            </ul>
            <Link to="/about" className="inline-flex items-center gap-2 text-primary font-semibold group">
              Learn more about our mission
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <div className="lg:w-1/2 grid grid-cols-2 gap-4 w-full">
            <div className="h-48 sm:h-64 rounded-3xl bg-surface-container overflow-hidden hover:scale-105 transition-transform duration-500">
              <img src="https://images.unsplash.com/photo-1523240715630-991f2e811347?w=800&auto=format&fit=crop&q=60" className="w-full h-full object-cover" alt="Campus Life" />
            </div>
            <div className="h-56 sm:h-72 mt-8 sm:mt-12 rounded-3xl bg-surface-container overflow-hidden hover:scale-105 transition-transform duration-500">
              <img src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&auto=format&fit=crop&q=60" className="w-full h-full object-cover" alt="Study" />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses Section (NEW) */}
      <section className="py-24 px-8 bg-surface">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 text-center max-w-2xl mx-auto">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary font-bold text-xs uppercase tracking-widest mb-4">
              Featured Curriculum
            </span>
            <h2 className="text-4xl font-headline font-bold text-primary mb-4">Most Popular Pathways</h2>
            <p className="text-secondary">Join thousands of professionals accelerating their careers with our flagship programs.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
            className="flex flex-col sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <motion.div 
              variants={fadeUp}
              className="w-full sm:col-span-2 bg-surface-container-low p-6 sm:p-10 rounded-[2rem] border border-surface-dim/20 hover:border-primary/20 transition-all group relative overflow-hidden"
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
              className="w-full sm:col-span-1 bg-primary text-on-primary p-8 sm:p-10 rounded-[2rem] shadow-xl ambient-shadow flex flex-col justify-between group hover:scale-[1.02] transition-transform"
            >
              <Brain className="w-12 h-12 mb-6 group-hover:rotate-6 transition-transform" />
              <div>
                <h3 className="text-2xl font-headline font-bold mb-2">Expert Focus</h3>
                <p className="opacity-80 text-sm">Mentors leading deep technical pathways from FAANG and Fortune 500.</p>
              </div>
            </motion.div>

            <motion.div 
              variants={fadeUp}
              className="bg-surface-container-lowest p-10 rounded-[2rem] border border-surface-dim/20 ambient-shadow hover:shadow-xl transition-all"
            >
              <History className="w-10 h-10 text-primary mb-6" />
              <h3 className="text-xl font-headline font-bold mb-2">Lifetime Access</h3>
              <p className="text-secondary text-sm">Purchase once, review forever. All future updates included.</p>
            </motion.div>

            <motion.div 
              variants={fadeUp}
              className="bg-surface-container-lowest p-10 rounded-[2rem] border border-surface-dim/20 ambient-shadow hover:shadow-xl transition-all"
            >
              <Globe className="w-10 h-10 text-primary mb-6" />
              <h3 className="text-xl font-headline font-bold mb-2">Global Network</h3>
              <p className="text-secondary text-sm">Join 45k+ alumni worldwide across 80+ countries.</p>
            </motion.div>
            
            <motion.div 
              variants={fadeUp}
              className="w-full sm:col-span-2 bg-surface-container-low flex flex-col sm:flex-row items-center justify-between rounded-[2rem] border border-surface-dim/20 p-8 gap-6"
            >
              <div>
                <p className="text-sm text-secondary uppercase tracking-wide mb-1">Ready to begin?</p>
                <p className="text-xl font-headline font-bold">Start your free trial today</p>
              </div>
              <Link 
                to="/register" 
                className="px-6 py-3 bg-primary text-on-primary font-bold rounded-xl hover:scale-105 transition-transform group flex items-center gap-2"
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
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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

      {/* CTA Section (NEW) */}
      <section className="py-20 px-8 signature-gradient">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl font-headline font-bold mb-4">Ready to Elevate Your Career?</h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Join thousands of professionals who have transformed their careers with our premium courses.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/catalog" 
              className="px-8 py-4 bg-primary text-on-primary rounded-xl font-bold hover:scale-105 transition-transform shadow-lg"
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