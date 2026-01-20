import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { AccountContext } from '../../contexts';
import heroImage from '../../assets/images/hero.jpg';
import * as S from './LandingNew.style';

// Icons as simple SVG components
const SparklesIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3l1.912 5.813a2 2 0 001.275 1.275L21 12l-5.813 1.912a2 2 0 00-1.275 1.275L12 21l-1.912-5.813a2 2 0 00-1.275-1.275L3 12l5.813-1.912a2 2 0 001.275-1.275L12 3z" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

const ShieldIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const CheckCircleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
    <polyline points="22,4 12,14.01 9,11.01" />
  </svg>
);

const StarIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
  </svg>
);

const UploadIcon = () => (
  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
    <polyline points="17,8 12,3 7,8" />
    <line x1="12" y1="3" x2="12" y2="15" />
  </svg>
);

const ScanIcon = () => (
  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 7V5a2 2 0 012-2h2" />
    <path d="M17 3h2a2 2 0 012 2v2" />
    <path d="M21 17v2a2 2 0 01-2 2h-2" />
    <path d="M7 21H5a2 2 0 01-2-2v-2" />
    <circle cx="12" cy="12" r="3" />
    <path d="M12 8v1" />
    <path d="M12 15v1" />
    <path d="M8 12h1" />
    <path d="M15 12h1" />
  </svg>
);

const FileTextIcon = () => (
  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
    <polyline points="14,2 14,8 20,8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <polyline points="10,9 9,9 8,9" />
  </svg>
);

const CpuIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="4" width="16" height="16" rx="2" ry="2" />
    <rect x="9" y="9" width="6" height="6" />
    <line x1="9" y1="1" x2="9" y2="4" />
    <line x1="15" y1="1" x2="15" y2="4" />
    <line x1="9" y1="20" x2="9" y2="23" />
    <line x1="15" y1="20" x2="15" y2="23" />
    <line x1="20" y1="9" x2="23" y2="9" />
    <line x1="20" y1="14" x2="23" y2="14" />
    <line x1="1" y1="9" x2="4" y2="9" />
    <line x1="1" y1="14" x2="4" y2="14" />
  </svg>
);

const ZapIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13,2 3,14 12,14 11,22 21,10 12,10" />
  </svg>
);

const LockIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0110 0v4" />
  </svg>
);

const ClipboardIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2" />
    <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
  </svg>
);

const TwitterIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const InstagramIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const LinkedInIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const LandingNew = () => {
  const { account } = useContext(AccountContext);
  const navigate = useNavigate();

  // Redirect authenticated users to the home page
  useEffect(() => {
    if (account && account.token) {
      navigate('/home');
    }
  }, [account, navigate]);

  const handleLogin = () => {
    navigate('/login');
  };

  const handleSignUp = (plan) => {
    if (plan === 'premium') {
      navigate('/signup?plan=premium');
    } else {
      navigate('/signup');
    }
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const steps = [
    {
      icon: <UploadIcon />,
      title: 'Upload or Describe',
      description: 'Take a clear photo of your skin concern or describe your symptoms in detail. Our system accepts multiple image formats.'
    },
    {
      icon: <ScanIcon />,
      title: 'AI Analysis',
      description: 'Our advanced AI instantly analyzes your input, identifying potential skin conditions and their characteristics.'
    },
    {
      icon: <FileTextIcon />,
      title: 'Get Recommendations',
      description: 'Receive detailed insights and personalized care recommendations. Know when to seek professional help.'
    }
  ];

  const features = [
    {
      icon: <CpuIcon />,
      title: 'Advanced AI Detection',
      description: 'Trained on 10M+ dermatological images with 95%+ accuracy for common conditions.'
    },
    {
      icon: <ZapIcon />,
      title: 'Instant Results',
      description: 'Get comprehensive analysis in under 30 seconds, anytime, anywhere.'
    },
    {
      icon: <LockIcon />,
      title: 'Privacy First',
      description: 'Your images are encrypted, never stored permanently, and never shared.'
    }
  ];

  const reviews = [
    {
      text: "SkinXray helped me identify a concerning mole early. The AI analysis was spot-on and I got professional help quickly.",
      author: "Sarah M.",
      role: "Verified User",
      initials: "SM"
    },
    {
      text: "As someone with sensitive skin, this app has been invaluable. The recommendations are always helpful and accurate.",
      author: "James K.",
      role: "Verified User",
      initials: "JK"
    },
    {
      text: "Quick, easy, and reliable. I use it regularly to monitor my skin health. Highly recommend to anyone concerned about their skin.",
      author: "Emily R.",
      role: "Verified User",
      initials: "ER"
    }
  ];

  return (
    <>
      <Helmet>
        <title>SkinXray AI - AI-Powered Skin Health Diagnostics</title>
        <meta name="description" content="Get instant AI-powered analysis of your skin conditions. Upload an image or describe your symptoms for personalized insights - anytime, anywhere." />
      </Helmet>

      <S.Container>
        {/* Navigation */}
        <S.Nav>
          <S.NavLogo>
            <S.LogoIcon>
              <ClipboardIcon />
            </S.LogoIcon>
            <S.LogoText>Skin<span>Xray</span></S.LogoText>
          </S.NavLogo>

          <S.NavLinks>
            <S.NavLink onClick={() => scrollToSection('how-it-works')}>How it Works</S.NavLink>
            <S.NavLink onClick={() => scrollToSection('features')}>Features</S.NavLink>
            <S.NavLink onClick={() => scrollToSection('reviews')}>Reviews</S.NavLink>
          </S.NavLinks>

          <S.NavButtons>
            <S.NavButton onClick={handleLogin}>Sign In</S.NavButton>
            <S.NavButton $variant="primary" onClick={() => handleSignUp()}>Get Started</S.NavButton>
          </S.NavButtons>
        </S.Nav>

        {/* Hero Section */}
        <S.HeroSection>
          <S.HeroContent>
            <S.HeroBadge>
              <SparklesIcon />
              AI-Powered Skin Analysis
            </S.HeroBadge>
            <S.HeroTitle>
              Your Skin Health,<br />
              <span>Decoded Instantly</span>
            </S.HeroTitle>
            <S.HeroSubtitle>
              Get instant AI-powered analysis of your skin conditions - anytime, anywhere
            </S.HeroSubtitle>
            <S.HeroCTA onClick={() => handleSignUp()}>
              Get Started
              <ArrowRightIcon />
            </S.HeroCTA>
          </S.HeroContent>
          <S.HeroImageWrapper>
            <S.HeroImage src={heroImage} alt="Skin health analysis" />
          </S.HeroImageWrapper>
        </S.HeroSection>

        {/* Trust Indicators */}
        <S.TrustSection>
          <S.TrustItem>
            <ShieldIcon />
            <S.TrustText>HIPAA Compliant</S.TrustText>
          </S.TrustItem>
          <S.TrustItem>
            <CheckCircleIcon />
            <S.TrustText>50k+ Analyses</S.TrustText>
          </S.TrustItem>
          <S.TrustItem>
            <StarIcon />
            <S.TrustText>4.9/5 Rating</S.TrustText>
          </S.TrustItem>
        </S.TrustSection>

        {/* How It Works Section */}
        <S.HowItWorksSection id="how-it-works">
          <S.SectionLabel>How It Works</S.SectionLabel>
          <S.SectionTitle>Simple Steps to <span>Better Skin Health</span></S.SectionTitle>
          <S.SectionSubtitle>
            Our streamlined process makes it easy to get the skin insights you need in just minutes.
          </S.SectionSubtitle>
          <S.StepsGrid>
            {steps.map((step, index) => (
              <S.StepCard key={index}>
                <S.StepIcon>{step.icon}</S.StepIcon>
                <S.StepTitle>{step.title}</S.StepTitle>
                <S.StepDescription>{step.description}</S.StepDescription>
              </S.StepCard>
            ))}
          </S.StepsGrid>
        </S.HowItWorksSection>

        {/* Features Section */}
        <S.FeaturesSection id="features">
          <S.SectionLabel>Features</S.SectionLabel>
          <S.SectionTitle>Why Choose <span>SkinXray</span></S.SectionTitle>
          <S.SectionSubtitle>
            Cutting-edge technology meets dermatological expertise to give you the most reliable skin health insights.
          </S.SectionSubtitle>
          <S.FeaturesGrid>
            {features.map((feature, index) => (
              <S.FeatureCard key={index}>
                <S.FeatureIcon>{feature.icon}</S.FeatureIcon>
                <S.FeatureTitle>{feature.title}</S.FeatureTitle>
                <S.FeatureDescription>{feature.description}</S.FeatureDescription>
              </S.FeatureCard>
            ))}
          </S.FeaturesGrid>
        </S.FeaturesSection>

        {/* Reviews Section */}
        <S.ReviewsSection id="reviews">
          <S.SectionLabel>Reviews</S.SectionLabel>
          <S.SectionTitle>Trusted by <span>Thousands</span></S.SectionTitle>
          <S.SectionSubtitle>
            See what our users have to say about their experience with SkinXray.
          </S.SectionSubtitle>
          <S.ReviewsGrid>
            {reviews.map((review, index) => (
              <S.ReviewCard key={index}>
                <S.ReviewStars>
                  {[...Array(5)].map((_, i) => (
                    <StarIcon key={i} />
                  ))}
                </S.ReviewStars>
                <S.ReviewText>&ldquo;{review.text}&rdquo;</S.ReviewText>
                <S.ReviewAuthor>
                  <S.ReviewAvatar>{review.initials}</S.ReviewAvatar>
                  <S.ReviewInfo>
                    <S.ReviewName>{review.author}</S.ReviewName>
                    <S.ReviewRole>{review.role}</S.ReviewRole>
                  </S.ReviewInfo>
                </S.ReviewAuthor>
              </S.ReviewCard>
            ))}
          </S.ReviewsGrid>
        </S.ReviewsSection>

        {/* CTA Section */}
        <S.CTASection>
          <S.CTATitle>Ready to Understand Your <span>Skin Better?</span></S.CTATitle>
          <S.CTASubtitle>
            Join thousands of users who have already discovered the power of AI-driven skin health insights.
          </S.CTASubtitle>
          <S.CTAButton onClick={() => handleSignUp()}>
            Get Started
            <ArrowRightIcon />
          </S.CTAButton>
          <S.CTAFeatures>
            Free analysis includes: Condition detection • Care recommendations • Progress tracking
          </S.CTAFeatures>
        </S.CTASection>

        {/* Footer */}
        <S.Footer>
          <S.FooterTop>
            <S.FooterBrand>
              <S.FooterLogo>
                <S.FooterLogoIcon>
                  <ClipboardIcon />
                </S.FooterLogoIcon>
                <S.FooterLogoText>Skin<span>Xray</span></S.FooterLogoText>
              </S.FooterLogo>
              <S.FooterDescription>
                AI-powered skin health diagnostics. Get instant analysis and personalized care recommendations.
              </S.FooterDescription>
            </S.FooterBrand>

            <S.FooterColumn>
              <S.FooterColumnTitle>Product</S.FooterColumnTitle>
              <S.FooterLinks>
                <li><S.FooterExternalLink onClick={() => scrollToSection('features')}>Features</S.FooterExternalLink></li>
                <li><S.FooterExternalLink onClick={() => scrollToSection('how-it-works')}>How It Works</S.FooterExternalLink></li>
                <li><S.FooterExternalLink onClick={() => handleSignUp()}>Pricing</S.FooterExternalLink></li>
                <li><S.FooterExternalLink onClick={() => scrollToSection('reviews')}>FAQ</S.FooterExternalLink></li>
              </S.FooterLinks>
            </S.FooterColumn>

            <S.FooterColumn>
              <S.FooterColumnTitle>Company</S.FooterColumnTitle>
              <S.FooterLinks>
                <li><S.FooterExternalLink>About Us</S.FooterExternalLink></li>
                <li><S.FooterExternalLink>Blog</S.FooterExternalLink></li>
                <li><S.FooterExternalLink>Careers</S.FooterExternalLink></li>
                <li><S.FooterExternalLink>Contact</S.FooterExternalLink></li>
              </S.FooterLinks>
            </S.FooterColumn>

            <S.FooterColumn>
              <S.FooterColumnTitle>Legal</S.FooterColumnTitle>
              <S.FooterLinks>
                <li><S.FooterLink to="/privacy-policy">Privacy Policy</S.FooterLink></li>
                <li><S.FooterExternalLink>Terms of Service</S.FooterExternalLink></li>
                <li><S.FooterExternalLink>HIPAA Compliance</S.FooterExternalLink></li>
                <li><S.FooterExternalLink>Medical Disclaimer</S.FooterExternalLink></li>
              </S.FooterLinks>
            </S.FooterColumn>
          </S.FooterTop>

          <S.FooterBottom>
            <S.FooterCopyright>
              © {new Date().getFullYear()} SkinXray. All rights reserved.
            </S.FooterCopyright>
            <S.FooterSocial>
              <S.SocialLink href="#" aria-label="Twitter">
                <TwitterIcon />
              </S.SocialLink>
              <S.SocialLink href="#" aria-label="Instagram">
                <InstagramIcon />
              </S.SocialLink>
              <S.SocialLink href="#" aria-label="LinkedIn">
                <LinkedInIcon />
              </S.SocialLink>
            </S.FooterSocial>
          </S.FooterBottom>
        </S.Footer>
      </S.Container>
    </>
  );
};

export default LandingNew;
