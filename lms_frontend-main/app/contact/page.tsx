"use client"

import React, { useState } from "react"
import { Send, MapPin, Phone, Mail } from "lucide-react"
import { LmsButton } from "@/components/lms"
import { toast } from "sonner"

export default function ContactPage() {
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      toast.success("Message Transmitted", {
        description: "An ADHOC representative will reach out securely within 24 hours.",
      })
      ;(e.target as HTMLFormElement).reset()
    }, 1000)
  }

  return (
    <main className="min-h-screen bg-brand-deep-navy text-brand-off-white relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-brand-royal-blue/20 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="mx-auto max-w-6xl px-4 py-16 md:px-8 md:py-24 relative z-10">
        
        <header className="mb-14 text-center">
          <span className="text-brand-accent-blue font-semibold tracking-wider text-sm uppercase mb-2 block">
            Reach Out
          </span>
          <h1 className="font-space text-4xl md:text-5xl font-bold text-white mb-4">
            Contact Engineering
          </h1>
          <p className="text-brand-medium-gray text-lg max-w-2xl mx-auto">
            Need enterprise licensing or strict infrastructure deployment guidelines? Send a direct beacon to our support perimeter.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Contact Info Block */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-md">
              <h3 className="text-xl font-space font-bold text-white mb-6">Global HQ</h3>
              <div className="space-y-6 text-brand-light-silver">
                <div className="flex gap-4 items-start">
                  <div className="p-2 bg-brand-royal-blue/30 rounded-xl text-brand-accent-blue"><MapPin className="w-5 h-5"/></div>
                  <div>
                    <div className="font-medium text-white mb-1">Sector 7G, Null Island</div>
                    <div className="text-sm">Coordinate Grid 0.0000° N, 0.0000° E</div>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="p-2 bg-brand-royal-blue/30 rounded-xl text-brand-accent-blue"><Phone className="w-5 h-5"/></div>
                  <div>
                    <div className="font-medium text-white mb-1">Encrypted Line</div>
                    <div className="text-sm">+1 (555) 010-0110</div>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="p-2 bg-brand-royal-blue/30 rounded-xl text-brand-accent-blue"><Mail className="w-5 h-5"/></div>
                  <div>
                    <div className="font-medium text-white mb-1">Direct Relay</div>
                    <div className="text-sm">support@adhoclms.global</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form Block */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-md">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="text-xs font-semibold text-brand-medium-gray uppercase mb-2 block tracking-wider">Clearance Name</label>
                  <input required type="text" placeholder="John Doe" className="w-full bg-brand-deep-navy/60 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-brand-accent-blue transition-all" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-brand-medium-gray uppercase mb-2 block tracking-wider">Comm Link (Email)</label>
                  <input required type="email" placeholder="john@example.com" className="w-full bg-brand-deep-navy/60 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-brand-accent-blue transition-all" />
                </div>
              </div>
              <div className="mb-6">
                <label className="text-xs font-semibold text-brand-medium-gray uppercase mb-2 block tracking-wider">Priority Level</label>
                <select className="w-full bg-brand-deep-navy/60 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-brand-accent-blue transition-all">
                  <option>Standard Inquiry (Level 1)</option>
                  <option>Enterprise Deployment (Level 2)</option>
                  <option>Critical Bug Resolution (Level 3)</option>
                </select>
              </div>
              <div className="mb-8">
                <label className="text-xs font-semibold text-brand-medium-gray uppercase mb-2 block tracking-wider">Payload Message</label>
                <textarea required rows={5} placeholder="Describe your operational requirement..." className="w-full bg-brand-deep-navy/60 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-brand-accent-blue transition-all resize-none"></textarea>
              </div>
              
              <LmsButton variant="primary" type="submit" disabled={loading} className="w-full sm:w-auto min-w-[200px]">
                {loading ? "Transmitting..." : <><Send className="w-4 h-4 mr-2" /> Send Beacon</>}
              </LmsButton>
            </form>
          </div>

        </div>
      </div>
    </main>
  )
}
