'use client'

import Hero from '@/components/Hero'
import TopicsSection from '@/components/TopicsSection'
import FlashcardsSection from '@/components/FlashcardsSection'
import ProgressSection from '@/components/ProgressSection'
import AboutSection from '@/components/AboutSection'

export default function Home() {
  return (
    <main>
      <Hero />
      <TopicsSection />
      <FlashcardsSection />
      <ProgressSection />
      <AboutSection />
    </main>
  )
}
