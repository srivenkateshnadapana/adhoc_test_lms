import * as React from "react"
import { Link } from "react-router-dom"
import { Search, ArrowRight, Star, Verified, Psychology, History, Groups, CheckCircle, ChevronRight, PlayCircle } from "lucide-react"
import { CourseCard } from "../../components/course/CourseCard"
import { SearchFilterBar } from "../../components/course/SearchFilterBar"
import { StorageService } from "../../services/storage"

export default function Home() {
  const [courses, setCourses] = React.useState([])
  const [searchQuery, setSearchQuery] = React.useState("")
  const [activeCategory, setActiveCategory] = React.useState("all")
  const [favorites, setFavorites] = React.useState(new Set(StorageService.getFavorites()))

  React.useEffect(() => {
    setCourses(StorageService.getCourses())
    const handleUpdate = () => setFavorites(new Set(StorageService.getFavorites()))
    window.addEventListener(`storage-update-adhoc-lms-favorites`, handleUpdate)
    return () => window.removeEventListener(`storage-update-adhoc-lms-favorites`, handleUpdate)
  }, [])

  const filteredCourses = React.useMemo(() => {
    let result = [...courses]
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      result = result.filter(c => c.title.toLowerCase().includes(query) || c.instructor.toLowerCase().includes(query))
    }
    if (activeCategory !== "all") {
      result = result.filter(c => c.category === activeCategory)
    }
    return result.slice(0, 6) // Show top 6 for landing
  }, [courses, searchQuery, activeCategory])

  return (
    <div className="bg-surface">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 px-8 lg:py-32">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="relative z-10">
            <h1 className="text-6xl lg:text-7xl font-headline font-extrabold text-primary tracking-tight leading-[1.1] mb-8">
              Start Your <br /><span className="text-on-primary-fixed-variant">Learning Journey</span>
            </h1>
            <p className="text-xl text-on-surface-variant mb-10 max-w-lg leading-relaxed font-medium">
              Access 1000+ premium courses taught by industry experts. Elevate your skills with our curated curriculum designed for the modern era.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                to="/catalog" 
                className="px-10 py-5 signature-gradient text-white rounded-2xl font-bold text-lg hover:opacity-90 transition-all duration-300 shadow-2xl shadow-primary/20 flex items-center justify-center gap-2 group"
              >
                Explore Courses
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <div className="mt-12 flex items-center gap-4">
              <div className="flex -space-x-3">
                {[1, 2, 3].map(i => (
                  <img 
                    key={i} 
                    src={`https://i.pravatar.cc/150?img=${i+10}`} 
                    className="w-12 h-12 rounded-full border-4 border-surface shadow-sm object-cover" 
                    alt="Learner" 
                  />
                ))}
              </div>
              <p className="text-sm font-semibold text-secondary">Joined by <span className="text-primary font-bold">12,000+</span> ambitious learners</p>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -top-12 -left-12 w-64 h-64 bg-primary-fixed opacity-30 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-secondary-fixed opacity-30 rounded-full blur-3xl animate-pulse delay-700"></div>
            <div className="relative rounded-[3rem] overflow-hidden shadow-2xl border-8 border-surface-container-lowest transform hover:scale-[1.02] transition-transform duration-500">
              <img 
                alt="Students Learning" 
                className="w-full h-[600px] object-cover" 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&auto=format&fit=crop&q=60" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent"></div>
              <div className="absolute bottom-8 left-8 right-8 p-8 bg-surface-container-lowest/80 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl flex items-center justify-between">
                <div>
                  <p className="text-primary font-bold text-3xl font-headline leading-none mb-1">98%</p>
                  <p className="text-[10px] font-bold text-secondary uppercase tracking-[0.2em]">Success Rate</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white">
                  <PlayCircle className="w-6 h-6 fill-current" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-24 bg-surface-container-low px-8" id="about">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-20 items-center">
          <div className="md:w-1/2 grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="h-64 rounded-3xl bg-surface-container overflow-hidden">
                <img src="https://images.unsplash.com/photo-1523240715630-991f2e811347?w=800&auto=format&fit=crop&q=60" className="w-full h-full object-cover" alt="Campus Life" />
              </div>
              <div className="h-72 rounded-3xl bg-primary-container overflow-hidden p-8 flex flex-col justify-end">
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined text-white">school</span>
                </div>
                <h4 className="text-white font-headline font-bold text-xl mb-2">Legacy of Excellence</h4>
                <p className="text-white/60 text-sm">Founded on industry-leading principles.</p>
              </div>
            </div>
            <div className="space-y-4 pt-12">
              <div className="h-72 rounded-3xl bg-secondary overflow-hidden">
                <img src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&auto=format&fit=crop&q=60" className="w-full h-full object-cover" alt="Study" />
              </div>
              <div className="h-64 rounded-3xl bg-surface-container-highest flex items-center justify-center">
                <div className="w-20 h-20 rounded-full border-4 border-primary/10 flex items-center justify-center">
                  <div className="w-3 h-3 bg-primary rounded-full" />
                </div>
              </div>
            </div>
          </div>
          <div className="md:w-1/2">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary-fixed text-on-primary-fixed font-bold text-[10px] uppercase tracking-[0.2em] mb-8">Our Mission</span>
            <h2 className="text-5xl font-headline font-bold text-primary mb-8 leading-tight">Empowering Minds Through Curated Digital Education</h2>
            <p className="text-on-surface-variant text-lg mb-8 leading-relaxed font-medium">
              Academic Excellence is more than just a platform. We are a digital curator of knowledge, bridging the gap between ivory-tower theory and real-world industrial practice.
            </p>
            <div className="grid grid-cols-2 gap-10">
              <div>
                <p className="text-4xl font-headline font-extrabold text-primary mb-2">150+</p>
                <p className="text-[10px] font-bold text-secondary uppercase tracking-[0.2em]">Expert Mentors</p>
              </div>
              <div>
                <p className="text-4xl font-headline font-extrabold text-primary mb-2">45k+</p>
                <p className="text-[10px] font-bold text-secondary uppercase tracking-[0.2em]">Global Alumni</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses Section */}
      <section className="py-24 px-8" id="courses">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="max-w-xl">
              <h2 className="text-5xl font-headline font-bold text-primary mb-6">Featured Disciplines</h2>
              <SearchFilterBar 
                searchQuery={searchQuery} 
                onSearchChange={setSearchQuery} 
                activeCategory={activeCategory} 
                onCategoryChange={setActiveCategory} 
              />
            </div>
            <Link 
              to="/catalog" 
              className="group flex items-center gap-2 text-primary font-bold border-b-4 border-primary pb-2 hover:opacity-70 transition-all text-sm uppercase tracking-widest"
            >
              Browse Full Catalog
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course) => (
              <CourseCard key={course.id} {...course} isFavorite={favorites.has(course.id)} onFavoriteToggle={(id) => StorageService.toggleFavorite(id)} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us: Bento Grid */}
      <section className="py-24 px-8 bg-primary text-white overflow-hidden relative rounded-[4rem] mx-4 my-24 lg:mx-8">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-white rounded-full blur-[150px] -translate-y-1/2 translate-x-1/2"></div>
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20 max-w-2xl mx-auto">
            <h2 className="text-5xl font-headline font-bold mb-6 italic tracking-tight">The Academic Advantage</h2>
            <p className="text-on-primary-fixed opacity-70 text-lg">Discover why students around the world choose our platform to accelerate their professional growth.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-6">
            <div className="md:col-span-2 bg-primary-container p-12 rounded-[2.5rem] border border-white/10 flex flex-col justify-between hover:bg-primary-container/80 transition-all group">
              <Verified className="w-16 h-16 text-primary-fixed mb-10 group-hover:scale-110 transition-transform" />
              <div>
                <h3 className="text-3xl font-bold font-headline mb-4">Industry Accredited</h3>
                <p className="text-on-primary-fixed opacity-60 leading-relaxed text-lg">Our certifications are recognized by top global tech and creative firms, giving you a competitive edge.</p>
              </div>
            </div>
            <div className="bg-surface-container-highest/5 backdrop-blur-xl p-10 rounded-[2.5rem] border border-white/5 hover:bg-white/10 transition-all flex flex-col items-center text-center justify-center">
              <Psychology className="w-12 h-12 text-white mb-6" />
              <h3 className="text-xl font-bold font-headline mb-2">Expert Instructors</h3>
              <p className="text-sm text-on-primary-fixed opacity-60">Learn directly from CTOs and Founders.</p>
            </div>
            <div className="bg-surface-container-highest/5 backdrop-blur-xl p-10 rounded-[2.5rem] border border-white/5 hover:bg-white/10 transition-all flex flex-col items-center text-center justify-center">
              <History className="w-12 h-12 text-white mb-6" />
              <h3 className="text-xl font-bold font-headline mb-2">Lifetime Access</h3>
              <p className="text-sm text-on-primary-fixed opacity-60">Purchase once and revisit anytime.</p>
            </div>
            <div className="bg-white/5 p-10 rounded-[2.5rem] border border-white/5 flex flex-col items-center text-center justify-center">
              <Groups className="w-12 h-12 text-white mb-6" />
              <h3 className="text-xl font-bold font-headline mb-2">Global Network</h3>
              <p className="text-sm text-on-primary-fixed opacity-60">Join 45k+ alumni from various sectors.</p>
            </div>
            <div className="md:col-span-3 bg-gradient-to-br from-primary-container to-primary-container/40 p-12 rounded-[2.5rem] border border-white/10 flex items-center gap-12 group">
              <div className="flex-1">
                <h3 className="text-3xl font-bold font-headline mb-4 group-hover:text-primary-fixed transition-colors">Flexible Learning Schedules</h3>
                <p className="text-on-primary-fixed opacity-60 text-lg">Balance your career and education with our modular, self-paced content.</p>
              </div>
              <div className="hidden lg:block w-1/3">
                <div className="h-3 w-full bg-white/10 rounded-full overflow-hidden mb-4">
                  <div className="h-full w-3/4 bg-white rounded-full"></div>
                </div>
                <div className="flex justify-between text-[10px] font-bold text-white/50 tracking-[0.2em]">
                  <span>COURSE PROGRESS</span>
                  <span>75%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="py-24 px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center mb-20 text-center">
            <span className="text-primary font-bold text-[10px] uppercase tracking-[0.3em] mb-4">Success Stories</span>
            <h2 className="text-5xl font-headline font-bold text-primary italic">Voices of Our Graduates</h2>
          </div>
          <div className="flex gap-8 overflow-x-auto pb-12 no-scrollbar snap-x cursor-grab active:cursor-grabbing">
            {[1, 2, 3].map((i) => (
              <div key={i} className="min-w-[450px] snap-center bg-surface-container-lowest p-12 rounded-[3.5rem] shadow-2xl shadow-primary/5 border border-surface-dim/20 hover:scale-[1.02] transition-all">
                <div className="flex gap-1 text-on-surface-variant mb-8 opacity-40">
                  {[...Array(5)].map((_, idx) => <Star key={idx} className="w-5 h-5 fill-current" />)}
                </div>
                <p className="text-on-surface text-xl leading-relaxed italic mb-12">
                  "The curriculum here transformed my professional trajectory. The depth of insight from the mentors is simply unavailable elsewhere."
                </p>
                <div className="flex items-center gap-6">
                  <img src={`https://i.pravatar.cc/150?img=${i+40}`} className="w-16 h-16 rounded-3xl object-cover" alt="Alumnus" />
                  <div>
                    <h4 className="text-primary font-headline font-extrabold text-lg leading-tight">Alex Rivera</h4>
                    <p className="text-secondary text-xs font-bold uppercase tracking-widest">VP of Product • TechStream</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="w-full bg-surface-container-lowest border-t border-surface-dim/20 pt-24 pb-12 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-16 mb-20">
            <div className="col-span-2">
              <Link to="/" className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 signature-gradient rounded-xl flex items-center justify-center">
                  <span className="text-white font-headline font-bold">A</span>
                </div>
                <span className="text-2xl font-headline font-bold text-primary">Adhoc Network Tech</span>
              </Link>
              <p className="text-on-surface-variant text-lg max-w-sm leading-relaxed font-medium">
                Curation of elite digital knowledge for the next generation of industry leaders and creative visionaries.
              </p>
            </div>
            <div>
              <h4 className="text-xs font-bold text-primary uppercase tracking-[0.3em] mb-8">Navigation</h4>
              <ul className="space-y-4 font-headline font-semibold text-secondary">
                <li><Link to="/catalog" className="hover:text-primary transition-colors">Course Catalog</Link></li>
                <li><Link to="/#about" className="hover:text-primary transition-colors">Our Mission</Link></li>
                <li><Link to="/auth" className="hover:text-primary transition-colors">Member Access</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-bold text-primary uppercase tracking-[0.3em] mb-8">Contact</h4>
              <ul className="space-y-4 font-headline font-semibold text-secondary">
                <li><a href="mailto:hello@adhocnetwork.tech" className="hover:text-primary transition-colors">hello@adhocnetwork.tech</a></li>
                <li className="flex gap-4 pt-4">
                  <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center hover:bg-primary hover:text-white transition-all"><span className="material-symbols-outlined text-sm">public</span></div>
                </li>
              </ul>
            </div>
          </div>
          <div className="pt-12 border-t border-surface-dim/20 flex flex-col md:flex-row justify-between items-center gap-8">
            <p className="text-[10px] font-bold text-outline uppercase tracking-widest">© 2024 Adhoc Network Tech • Excellence in Interaction</p>
            <div className="flex gap-8 text-[10px] font-bold text-outline uppercase tracking-widest">
              <a href="#" className="hover:text-primary transition-colors">Privacy Protocol</a>
              <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
