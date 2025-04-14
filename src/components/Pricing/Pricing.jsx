import { Text, Button } from '../../ds';
import PropTypes from 'prop-types';
import * as S from './Pricing.style';

const Pricing = ({ onSignUp }) => {
  return (
    <S.PricingSection>
      <Text weight={700} type="h3" align="center">
        Choose Your Plan
      </Text>
      
      <S.PricingCards>
        <S.PricingCard>
          <S.FeatureIcon>
            <i className="fas fa-search"></i>
          </S.FeatureIcon>
          <Text weight={600} type="h4">
            Basic Scan
          </Text>
          <S.PriceTag>
            <Text weight={700} type="h2" color="primary.1000">
              $0
            </Text>
            <Text size="lg" color="neutral.600" style={{ marginLeft: '8px' }}>
              /month
            </Text>
          </S.PriceTag>
          <S.PriceFeatures>
            <S.PriceFeature>
              <i className="fas fa-check"></i>
              <Text>2 AI scans per day</Text>
            </S.PriceFeature>
            <S.PriceFeature>
              <i className="fas fa-check"></i>
              <Text>Basic analysis reports</Text>
            </S.PriceFeature>
            <S.PriceFeature>
              <i className="fas fa-check"></i>
              <Text>Access to symptom checker</Text>
            </S.PriceFeature>
          </S.PriceFeatures>
          <Button 
            onClick={onSignUp}
            size="lg"
            variant="secondary"
            style={{ width: '100%' }}
          >
            Get Started Free
          </Button>
        </S.PricingCard>

        <S.PricingCard>
          <S.FeatureIcon>
            <i className="fas fa-star"></i>
          </S.FeatureIcon>
          <Text weight={600} type="h4">
            Expert Care
          </Text>
          <S.PriceTag>
            <Text weight={700} type="h2" color="primary.1000">
              $3.9
            </Text>
            <Text size="lg" color="neutral.600" style={{ marginLeft: '8px' }}>
              /month
            </Text>
          </S.PriceTag>
          <S.PriceFeatures>
            <S.PriceFeature>
              <i className="fas fa-check"></i>
              <Text>Unlimited AI scans</Text>
            </S.PriceFeature>
            <S.PriceFeature>
              <i className="fas fa-check"></i>
              <Text>Live consultancy with experts</Text>
            </S.PriceFeature>
            <S.PriceFeature>
              <i className="fas fa-check"></i>
              <Text>Real-time AI chat support</Text>
            </S.PriceFeature>
            <S.PriceFeature>
              <i className="fas fa-check"></i>
              <Text>Priority response time</Text>
            </S.PriceFeature>
            <S.PriceFeature>
              <i className="fas fa-check"></i>
              <Text>Detailed health insights</Text>
            </S.PriceFeature>
          </S.PriceFeatures>
          <Button 
            onClick={onSignUp}
            size="lg"
            variant="primary"
            style={{ width: '100%' }}
          >
            Get Started
          </Button>
        </S.PricingCard>
      </S.PricingCards>
    </S.PricingSection>
  );
};

Pricing.propTypes = {
  onSignUp: PropTypes.func.isRequired,
};

export default Pricing; 