import {
  HeroSection,
  AboutSection,
  FeaturedCourses,
  AdvantagesBento,
  Testimonials,
} from "@/components/home"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-surface text-on-surface relative overflow-x-hidden">
      <div className="flex flex-col">
        <HeroSection />
        <AboutSection />
        <FeaturedCourses />
        <AdvantagesBento />
        <Testimonials />
      </div>
    </main>
  )
}
