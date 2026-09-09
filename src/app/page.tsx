import { getServerCountryCode } from '@/lib/geo';
import { SvgSprites } from '@/components/ui/SvgSprites';
import { WhatsAppFab } from '@/components/WhatsAppFab';
import { RevealManager } from '@/components/RevealManager';
import { ScrollFx } from '@/components/ScrollFx';
import { TextReveal } from '@/components/TextReveal';
import { Nav } from '@/components/sections/Nav';
import { Hero } from '@/components/sections/Hero';
import { HeroCasa } from '@/components/sections/HeroCasa';
import { Partners } from '@/components/sections/Partners';
import { FeaturesIntro } from '@/components/sections/FeaturesIntro';
import { FeatureAiResponse } from '@/components/sections/FeatureAiResponse';
import { FeatureCrm } from '@/components/sections/FeatureCrm';
import { FeatureFollowup } from '@/components/sections/FeatureFollowup';
import { FeatureReports } from '@/components/sections/FeatureReports';
import { FeatureHistory } from '@/components/sections/FeatureHistory';
import { HowItWorks } from '@/components/sections/HowItWorks';
import { Testimonials } from '@/components/sections/Testimonials';
import { Cta } from '@/components/sections/Cta';
import { Footer } from '@/components/sections/Footer';

// Geo detection (getServerCountryCode reads request headers) requires per-request rendering.
export const dynamic = 'force-dynamic';

export default async function Page() {
  const countryCode = await getServerCountryCode();

  return (
    <>
      <SvgSprites />

      <Nav />

      <main id="top">
        <Hero casa={<HeroCasa />} />
        <Partners />
        <FeaturesIntro />
        <FeatureAiResponse />
        <FeatureCrm />
        <FeatureFollowup />
        <FeatureReports />
        <FeatureHistory />
        <HowItWorks />
        <Testimonials />
        <Cta />
      </main>

      <WhatsAppFab countryCode={countryCode} />
      <Footer />

      <RevealManager />
      <ScrollFx />
      <TextReveal />
    </>
  );
}
