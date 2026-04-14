"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export function Footer() {
  const pathname = usePathname()

  if (pathname === "/auth") {
    return null;
  }

  return (
    <footer className="w-full border-t border-surface-dim bg-surface mt-auto">
      <div className="flex flex-col md:flex-row justify-between items-center w-full px-8 py-12 gap-6 max-w-7xl mx-auto">
        <div className="flex flex-col gap-4">
          <span className="font-headline font-bold text-lg text-primary">ADHOC LMS</span>
          <p className="text-secondary max-w-xs text-sm">© {new Date().getFullYear()} ADHOC LMS. All rights reserved.</p>
        </div>
        <div className="flex gap-8 font-body text-sm">
          <Link className="text-secondary hover:text-primary transition-all opacity-100" href="/privacy">Privacy Policy</Link>
          <Link className="text-secondary hover:text-primary transition-all opacity-100" href="/terms">Terms of Service</Link>
          <Link className="text-secondary hover:text-primary transition-all opacity-100" href="/contact">Contact Us</Link>
          <Link className="text-secondary hover:text-primary transition-all opacity-100" href="/faq">Help Center</Link>
        </div>
      </div>
    </footer>
  )
}
