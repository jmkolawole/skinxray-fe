import {useContext, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {Button, Icon, Text} from '../../ds';
import {AccountContext} from '../../contexts';
import Pricing from '../../components/Pricing/Pricing';
import * as S from './Landing.style';
import heroImage from '../../assets/images/hero.jpg';

const Landing = () => {
  const {account} = useContext(AccountContext);
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
    // If plan is premium, include it in the URL
    if (plan === 'premium') {
      navigate('/signup?plan=premium');
    } else {
      navigate('/signup');
    }
  };

  return (
    <S.Container>
      <S.HeroSection>
        <S.HeroContent>
          <S.LogoContainer>
            <S.Logo>
              <i className="fas fa-heartbeat"></i>
            </S.Logo>
            <Text weight={700} type="h1" color="primary.1000">
              Skinxray AI
            </Text>
          </S.LogoContainer>

          <S.Tagline>
            <Text weight={700} type="h2">
              Advanced Skin Health Diagnostics
            </Text>
          </S.Tagline>

          <S.Subtitle>
            <Text color="neutral.700" size="lg">
              Get instant AI-powered analysis of your skin conditions. Upload an
              image or describe your symptoms for personalized insights.
            </Text>
          </S.Subtitle>

          <S.ButtonGroup>
            <Button
              onClick={() => handleSignUp('basic-scan')}
              size="lg"
              variant="primary"
            >
              Sign Up Free
            </Button>
            <Button onClick={handleLogin} size="lg" variant="secondary">
              Log In
            </Button>
          </S.ButtonGroup>
        </S.HeroContent>

        <S.HeroImage>
          <img
            src={heroImage}
            alt="Skin health diagnostic visualization"
            style={{
              maxWidth: '100%',
              maxHeight: '500px',
              borderRadius: '16px',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
            }}
          />
        </S.HeroImage>
      </S.HeroSection>

      <S.FeaturesSection>
        <Text weight={700} type="h3" align="center">
          How Skinxray AI Works
        </Text>

        <S.FeatureCards>
          <S.FeatureCard>
            <S.FeatureIcon>
              <Icon name="camera" size="24" color="primary.1000" />
            </S.FeatureIcon>
            <Text weight={600} type="h5">
              Upload an Image
            </Text>
            <Text color="neutral.600">
              Take a photo of your skin condition and upload it for instant
              analysis.
            </Text>
          </S.FeatureCard>

          <S.FeatureCard>
            <S.FeatureIcon>
              <Icon name="medical" size="28" color="primary.1000" />
            </S.FeatureIcon>
            <Text weight={600} type="h5">
              Describe Symptoms
            </Text>
            <Text color="neutral.600">
              Alternatively, describe your symptoms in detail for a
              comprehensive assessment.
            </Text>
          </S.FeatureCard>

          <S.FeatureCard>
            <S.FeatureIcon>
              <Icon name="robot" size="28" color="primary.1000" />
            </S.FeatureIcon>
            <Text weight={600} type="h5">
              AI Analysis
            </Text>
            <Text color="neutral.600">
              Our advanced AI analyzes your input and provides detailed
              insights.
            </Text>
          </S.FeatureCard>

          <S.FeatureCard>
            <S.FeatureIcon>
              <Icon name="result" size="28" color="primary.1000" />
            </S.FeatureIcon>
            <Text weight={600} type="h5">
              Get Results
            </Text>
            <Text color="neutral.600">
              Receive a comprehensive report with assessment and
              recommendations.
            </Text>
          </S.FeatureCard>
        </S.FeatureCards>
      </S.FeaturesSection>

      <Pricing onSignUp={handleSignUp} />

      <S.DisclaimerSection>
        <S.DisclaimerIcon>
          <Icon
            bg="inherit"
            color="warning.500"
            name="warning"
            size={20}
            weight={0}
          />
        </S.DisclaimerIcon>
        <S.DisclaimerContent>
          <Text weight={600} size="md" color="neutral.800">
            Medical Disclaimer
          </Text>
          <Text size="sm" color="neutral.700">
            Skinxray AI is for informational purposes only and is not a
            substitute for professional medical advice, diagnosis, or treatment.
            Always seek the advice of your physician or other qualified health
            provider with any questions you may have regarding a medical
            condition.
          </Text>
        </S.DisclaimerContent>
      </S.DisclaimerSection>

      <S.Footer>
        <Text size="sm" color="neutral.500">
          © {new Date().getFullYear()} Skinxray AI. All rights reserved.
        </Text>
      </S.Footer>
    </S.Container>
  );
};

export default Landing;
