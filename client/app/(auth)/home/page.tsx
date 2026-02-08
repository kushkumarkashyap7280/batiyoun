import { TechStackTicker } from '@/components/marketing/home/TechStackTicker';
import { HeroSection, FeaturesSection, CTASection } from '@/components/marketing/home';
import { Footer } from '@/components/landing/Footer';

export default function HomePage() {
  return (
    <main className="overflow-hidden bg-background">
      <HeroSection />
      <TechStackTicker />
      <FeaturesSection />
      <CTASection />
      <Footer />
    </main>
  );
}
