import { Plus, Minus } from "lucide-react"

export default function FaqPage() {
  return (
    <main className="min-h-screen bg-brand-deep-navy text-brand-off-white relative overflow-hidden">
      {/* Ambience */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-royal-blue/20 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="mx-auto max-w-4xl px-4 py-16 md:px-8 md:py-24 relative z-10">
        <header className="mb-14 text-center">
          <span className="text-brand-accent-blue font-semibold tracking-wider text-sm uppercase mb-2 block">
            Got Questions?
          </span>
          <h1 className="font-space text-4xl md:text-5xl font-bold text-white">
            Frequently Asked Questions
          </h1>
          <p className="text-brand-medium-gray mt-4 max-w-2xl mx-auto text-lg">
            Everything you need to know about the ADHOC LMS platform, billing, and certificates.
          </p>
        </header>

        <div className="space-y-6">
          {/* FAQ Item 1 */}
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-md group hover:border-brand-accent-blue/30 transition-all cursor-pointer">
            <div className="flex justify-between items-center">
              <h3 className="font-space font-bold text-xl text-white">How do I enroll in a course?</h3>
              <div className="p-2 bg-brand-royal-blue/30 rounded-full text-brand-accent-blue"><Plus className="w-5 h-5"/></div>
            </div>
            <div className="mt-4 text-brand-light-silver leading-relaxed pr-8">
              Navigate to our course catalog, explore the dynamic horizontal carousels or filtered lists, click on any course to open its detailed syllabus, and securely enroll using the 'Enroll Now' checkout button.
            </div>
          </div>
          
          {/* FAQ Item 2 */}
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-md group hover:border-brand-accent-blue/30 transition-all cursor-pointer">
            <div className="flex justify-between items-center">
              <h3 className="font-space font-bold text-xl text-white">Are the certificates officially validated?</h3>
              <div className="p-2 bg-brand-royal-blue/30 rounded-full text-brand-accent-blue"><Plus className="w-5 h-5"/></div>
            </div>
            <div className="mt-4 text-brand-light-silver leading-relaxed pr-8">
              Yes. Upon completing all modules in a certified course track, our client-side generation engine automatically renders a digitally branded ADHOC PDF certificate imprinted dynamically with your synchronized authentication name.
            </div>
          </div>

          {/* FAQ Item 3 */}
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-md group hover:border-brand-accent-blue/30 transition-all cursor-pointer">
            <div className="flex justify-between items-center">
              <h3 className="font-space font-bold text-xl text-white">Can I download courses offline?</h3>
              <div className="p-2 bg-brand-royal-blue/30 rounded-full text-brand-accent-blue"><Plus className="w-5 h-5"/></div>
            </div>
            <div className="mt-4 text-brand-light-silver leading-relaxed pr-8">
              Currently, ADHOC LMS requires an active internet connection to securely stream our high-definition modules, validate interactive labs, and preserve anti-piracy operations across our Cybersecurity syllabus.
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
