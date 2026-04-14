export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-brand-deep-navy text-brand-off-white relative overflow-hidden">
      <div className="absolute top-20 left-10 w-[400px] h-[400px] bg-brand-royal-blue/20 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="mx-auto max-w-4xl px-4 py-16 md:px-8 md:py-24 relative z-10">
        <header className="mb-14">
          <span className="text-brand-accent-blue font-semibold tracking-wider text-sm uppercase mb-2 block">
            Legal
          </span>
          <h1 className="font-space text-4xl md:text-5xl font-bold text-white mb-6">
            Privacy Policy
          </h1>
          <div className="h-px bg-gradient-to-r from-brand-accent-blue/50 to-transparent w-full max-w-md" />
        </header>

        <div className="rounded-3xl border border-white/10 bg-[#0B1B3B]/80 p-10 backdrop-blur-xl shadow-2xl space-y-8">
          
          <section>
            <h2 className="text-2xl font-space font-bold text-white mb-4">1. Data Sovereignty and Local Storage</h2>
            <p className="text-brand-light-silver leading-relaxed">
              At ADHOC LMS, we respect your digital footprint. As a prototype demonstration, all of your authentication states, dynamic profile names, and saved courses are persisted entirely locally strictly inside your browser's <code>localStorage</code> API. We do not transmit or monetize your tracking telemetry.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-space font-bold text-white mb-4">2. Client-Side Processing</h2>
            <p className="text-brand-light-silver leading-relaxed">
              When you download an official certificate, the <code>pdf-lib</code> engine reconstructs the entire PDF locally on zero-trust execution contexts. Your synchronization string is embedded into the artifact seamlessly without pinging an external generation node.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-space font-bold text-white mb-4">3. Security</h2>
            <p className="text-brand-light-silver leading-relaxed">
              While we utilize highly robust and visually excellent glassmorphism and modern UI standards, please note this is a dedicated client-side demonstration. This architecture is designed to operate independently of a traditional centralized backend, ensuring data privacy through immediate local processing.
            </p>
          </section>
        </div>
      </div>
    </main>
  )
}
