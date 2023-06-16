import { AboutSection, CompetitionSection, FaqSection, HeroSection, SkemaSection, TimelineSection } from '@/components'
import Head from 'next/head'

export default function Home() {
  return (
    <main>
      <Head>
        <title>IITC</title>
        <meta name="title" content='IITC' />
      </Head>
      <HeroSection />
      <AboutSection />
      <SkemaSection />
      <CompetitionSection />
      <TimelineSection />
      <FaqSection />
    </main>
  )
}
