import * as React from "react"
import { Link } from "react-router-dom"
import { ArrowRight, PlayCircle, ShieldCheck, Star, Brain, History, Globe, Award } from "lucide-react"

export default function Home() {
  return (
    <div className="bg-surface text-on-surface">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 px-8 lg:py-32">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="relative z-10 space-y-8">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary font-bold text-xs uppercase tracking-widest">
              The Digital Curator
            </span>
            <h1 className="text-5xl lg:text-7xl font-headline font-extrabold text-primary tracking-tight leading-[1.1]">
              Elevate Your <br />
              <span className="opacity-80">Learning Journey</span>
            </h1>
            <p className="text-lg text-secondary font-medium max-w-lg leading-relaxed">
              Access premium courses designed by industry experts. Experience a sophisticated curriculum structured for modern professionals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link
                to="/catalog"
                className="px-8 py-4 signature-gradient text-primary-foreground rounded-xl font-bold hover:scale-105 transition-transform ambient-shadow flex items-center justify-center gap-2 group"
              >
                Explore Courses
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            
            <div className="flex items-center gap-4 pt-8">
              <div className="flex -space-x-3">
                {[1, 2, 3].map(i => (
                  <img
                    key={i}
                    src={`https://i.pravatar.cc/150?img=${i + 10}`}
                    className="w-12 h-12 rounded-full border-4 border-surface shadow-sm object-cover"
                    alt="Learner"
                  />
                ))}
              </div>
              <div>
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                </div>
                <p className="text-xs font-bold text-secondary mt-1">Trusted by 12,000+ professionals</p>
              </div>
            </div>
          </div>

          <div className="relative rounded-[2rem] overflow-hidden bg-surface-container-low border border-surface-dim/20 p-2 ambient-shadow">
            <div className="relative rounded-3xl overflow-hidden h-[500px]">
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
                  <PlayCircle className="w-6 h-6 fill-current" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-24 px-8 bg-surface-container-lowest border-y border-surface-dim/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
          <div className="md:w-1/2 space-y-8">
            <h2 className="text-4xl font-headline font-bold text-primary">Academic Authority, Digital Speed.</h2>
            <p className="text-secondary text-lg leading-relaxed">
              We reject the generic "boxed-in" aesthetic of traditional educational platforms. Instead, we embrace intentional asymmetry, deep navy tones, and clean typography to guide your eye effortlessly through complex knowledge material.
            </p>
            <ul className="space-y-4">
              {[
                "150+ Expert Mentors from Global Firms",
                "Certifications recognized across the tech industry",
                "Lifetime access to premium course assets"
              ].map((text, i) => (
                <li key={i} className="flex items-center gap-3 text-on-surface font-medium">
                  <ShieldCheck className="w-5 h-5 text-primary" />
                  {text}
                </li>
              ))}
            </ul>
          </div>
          <div className="md:w-1/2 grid grid-cols-2 gap-4">
               <div className="h-64 rounded-3xl bg-surface-container overflow-hidden">
                 <img src="https://images.unsplash.com/photo-1523240715630-991f2e811347?w=800&auto=format&fit=crop&q=60" className="w-full h-full object-cover" alt="Campus Life" />
               </div>
               <div className="h-72 mt-12 rounded-3xl bg-surface-container overflow-hidden">
                 <img src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&auto=format&fit=crop&q=60" className="w-full h-full object-cover" alt="Study" />
               </div>
          </div>
        </div>
      </section>

      {/* Bento Grid Features */}
      <section className="py-24 px-8 bg-surface">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 text-center max-w-2xl mx-auto">
            <h2 className="text-4xl font-headline font-bold text-primary mb-4">The Editorial Experience</h2>
            <p className="text-secondary">Designed for professionals who demand high-end interfaces and unparalleled curriculum depth.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-surface-container-low p-10 rounded-[2rem] border border-surface-dim/20 hover:border-primary/20 transition-all group md:col-span-2">
              <Award className="w-12 h-12 text-primary mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-2xl font-headline font-bold mb-4">Industry Accreditation</h3>
              <p className="text-secondary max-w-md">Our certs are designed directly with enterprise CTOs, providing immediate professional legitimacy.</p>
            </div>
            
            <div className="bg-primary text-primary-foreground p-10 rounded-[2rem] shadow-xl ambient-shadow flex flex-col justify-between">
              <Brain className="w-12 h-12 mb-6" />
              <div>
                <h3 className="text-2xl font-headline font-bold mb-2">Expert Focus</h3>
                <p className="opacity-80 text-sm">Mentors leading deep technical pathways.</p>
              </div>
            </div>

            <div className="bg-surface-container-lowest p-10 rounded-[2rem] border border-surface-dim/20 ambient-shadow">
              <History className="w-10 h-10 text-primary mb-6" />
              <h3 className="text-xl font-headline font-bold mb-2">Lifetime Access</h3>
              <p className="text-secondary text-sm">Purchase once, review forever.</p>
            </div>

            <div className="bg-surface-container-lowest p-10 rounded-[2rem] border border-surface-dim/20 ambient-shadow">
              <Globe className="w-10 h-10 text-primary mb-6" />
              <h3 className="text-xl font-headline font-bold mb-2">Global Network</h3>
              <p className="text-secondary text-sm">Join 45k+ alumni worldwide.</p>
            </div>
            
            <div className="bg-surface-container-low flex items-center justify-center rounded-[2rem] border border-surface-dim/20">
               <Link to="/catalog" className="px-6 py-3 bg-primary text-primary-foreground font-bold rounded-xl hover:scale-105 transition-transform group flex items-center gap-2">
                 Join Today <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
               </Link>
            </div>
          </div>
        </div>
      </section>
      
    </div>
  )
}
