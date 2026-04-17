import * as React from "react"
import { Link } from "react-router-dom"
import { Github, Twitter, Linkedin, Mail, MapPin, Phone } from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()

  const links = {
    platform: [
      { name: "Curriculum", href: "/catalog" },
      { name: "Global Dashboard", href: "/dashboard" },
      { name: "Instructor Portal", href: "/admin" },
      { name: "Certification Pool", href: "#" },
    ],
    company: [
      { name: "About Adhoc", href: "/#about" },
      { name: "Operational Status", href: "#" },
      { name: "Security Protocol", href: "#" },
      { name: "Contact Base", href: "#" },
    ],
    legal: [
      { name: "Terms of Engagement", href: "#" },
      { name: "Privacy Protocol", href: "#" },
      { name: "Cookie Policy", href: "#" },
    ]
  }

  return (
    <footer className="bg-surface-container-lowest border-t border-surface-dim/20 pt-20 pb-12 font-body relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary/3 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-20">
          {/* Brand Shard */}
          <div className="lg:col-span-4">
            <Link to="/" className="inline-flex items-center gap-3 mb-8 group">
              <div className="w-10 h-10 signature-gradient rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                <span className="text-white font-headline font-bold text-xl">A</span>
              </div>
              <span className="text-xl font-headline font-bold tracking-tighter text-primary">Adhoc Tech</span>
            </Link>
            <p className="text-on-surface-variant text-lg font-medium leading-relaxed max-w-sm mb-8 opacity-70 italic">
              Empowering the next generation of academic leaders through sophisticated learning ecosystems and decentralized knowledge protocols.
            </p>
            <div className="flex items-center gap-4">
              {[Twitter, Github, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-secondary hover:bg-primary hover:text-white transition-all shadow-sm">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-bold text-primary uppercase tracking-[0.3em] mb-8 italic">Platform</h4>
            <ul className="space-y-4">
              {links.platform.map(link => (
                <li key={link.name}>
                  <Link to={link.href} className="text-secondary hover:text-primary font-medium transition-colors">{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-xs font-bold text-primary uppercase tracking-[0.3em] mb-8 italic">Academy</h4>
            <ul className="space-y-4">
              {links.company.map(link => (
                <li key={link.name}>
                  <Link to={link.href} className="text-secondary hover:text-primary font-medium transition-colors">{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-xs font-bold text-primary uppercase tracking-[0.3em] mb-8 italic">Protocol</h4>
            <ul className="space-y-4">
              {links.legal.map(link => (
                <li key={link.name}>
                  <Link to={link.href} className="text-secondary hover:text-primary font-medium transition-colors">{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Location Shard */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-bold text-primary uppercase tracking-[0.3em] mb-8 italic">Base</h4>
            <ul className="space-y-6">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span className="text-xs font-medium text-on-surface-variant leading-relaxed opacity-70">
                  Global HQ / Sector 7<br />Adhoc Innovation Terminal
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <span className="text-xs font-medium text-on-surface-variant opacity-70">+1 (800) ADHOC-NET</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Shard */}
        <div className="pt-12 border-t border-surface-dim/20 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs font-bold text-outline uppercase tracking-widest leading-none">
            &copy; {currentYear} Adhoc Network Tech. All Security Protocols Active.
          </p>
          <div className="flex items-center gap-6">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-bold text-secondary uppercase tracking-[0.3em]">Operational Status: Optimum</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
