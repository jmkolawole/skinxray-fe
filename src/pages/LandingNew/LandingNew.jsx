import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { AccountContext } from '../../contexts';
import { ChevronUpIcon } from './landingIcons';
import * as S from './landingShared.style';
import LandingNav from './sections/LandingNav';
import HeroSection from './sections/HeroSection';
import TrustBar from './sections/TrustBar';
import EarlyDisclaimer from './sections/EarlyDisclaimer';
import HowItWorks from './sections/HowItWorks';
import FeaturesSection from './sections/FeaturesSection';
import SampleReportSection from './sections/SampleReportSection';
import TestimonialsSection from './sections/TestimonialsSection';
import PricingSection from './sections/PricingSection';
import FAQSection from './sections/FAQSection';
import CTASection from './sections/CTASection';
import DownloadSection from './sections/DownloadSection';
import ImportantNotice from './sections/ImportantNotice';
import FooterSection from './sections/FooterSection';

const LandingNew = () => {
  const { account } = useContext(AccountContext);
  const navigate = useNavigate();
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    if (account?.token) {
      navigate('/home');
    }
  }, [account, navigate]);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 300);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSignUp = (plan, billingPeriod = 'monthly') => {
    if (plan === 'expert-care') {
      navigate(`/signup?plan=expert-care&billing=${billingPeriod}`);
    } else {
      navigate('/signup');
    }
  };

  return (
    <>
      <Helmet>
        <title>SkinXray — AI Skin Insights</title>
        <meta
          name="description"
          content="Learn about your skin in seconds. Upload a photo or describe symptoms for AI-powered educational insights."
        />
      </Helmet>

      <S.Container>
        <LandingNav
          onScrollTo={scrollToSection}
          onLogin={() => navigate('/login')}
          onSignUp={() => handleSignUp()}
        />

        <HeroSection onSignUp={() => handleSignUp()} onScrollTo={scrollToSection} />
        <TrustBar />
        <EarlyDisclaimer />
        <HowItWorks />
        <FeaturesSection />
        <SampleReportSection />
        <TestimonialsSection />
        <PricingSection onSignUp={handleSignUp} />
        <FAQSection />
        <CTASection onSignUp={() => handleSignUp()} />
        <DownloadSection />
        <ImportantNotice />
        <FooterSection onScrollTo={scrollToSection} />

        {showScrollTop && (
          <S.ScrollToTopButton type="button" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Return to top">
            <ChevronUpIcon />
          </S.ScrollToTopButton>
        )}
      </S.Container>
    </>
  );
};

export default LandingNew;
