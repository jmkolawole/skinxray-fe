import {Text, Button} from '../../ds';
import PropTypes from 'prop-types';
import * as S from './Pricing.style';

const Pricing = ({
  onSignUp,
  currentPlan,
  isLoggedIn,
  onPlanSelect,
  selectedPlan,
}) => { 
  const handlePlanAction = (plan) => {
    if (!isLoggedIn) {
      onSignUp(plan);
      return;
    }
    onPlanSelect(plan);
  };

  const getButtonProps = (plan) => {
    if (!isLoggedIn) {
      const isSelected = selectedPlan === plan;
      return {
        onClick: () => handlePlanAction(plan),
        children: plan === 'basic-scan' ? 'Get Started Free' : 'Get Started',
        variant: plan === 'basic-scan' ? 'secondary' : 'primary',
        style: {
          width: '100%',
          ...(isSelected && {
            borderColor: 'var(--color-primary-500)',
            boxShadow: '0 0 0 2px var(--color-primary-100)',
          }),
        },
      };
    }

    if (currentPlan === plan) {
      return {
        disabled: true,
        children: 'Current Plan',
        variant: 'secondary',
        style: {width: '100%'},
      };
    }

    if (plan === 'basic-scan') {
      return {
        onClick: () => handlePlanAction(plan),
        children: 'Switch to Basic Scan',
        variant: 'secondary',
        style: {width: '100%'},
      };
    }

    if (currentPlan === 'expert-care') {
      return {
        onClick: () => handlePlanAction(plan),
        children: 'Switch to Basic Scan',
        variant: 'secondary',
        style: {width: '100%'},
      };
    }

    return {
      onClick: () => handlePlanAction(plan),
      children: 'Upgrade Now',
      variant: 'primary',
      style: {width: '100%'},
    };
  };

  return (
    <S.PricingSection>
      <Text weight={700} type="h3" align="center">
        Choose Your Plan
      </Text>

      {!isLoggedIn && (
        <Text align="center" color="neutral.600" style={{marginTop: '16px'}}>
          Create an account to get started with your selected plan
        </Text>
      )}

      <S.PricingCards>
        <S.PricingCard selected={!isLoggedIn && selectedPlan === 'basic-scan'}>
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
            <Text size="lg" color="neutral.600" style={{marginLeft: '8px'}}>
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
          <Button {...getButtonProps('basic')} />
        </S.PricingCard>

        <S.PricingCard selected={!isLoggedIn && selectedPlan === 'expert-care'}>
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
            <Text size="lg" color="neutral.600" style={{marginLeft: '8px'}}>
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
          <Button {...getButtonProps('expert-care')} />
        </S.PricingCard>
      </S.PricingCards>
    </S.PricingSection>
  );
};

Pricing.propTypes = {
  onSignUp: PropTypes.func.isRequired,
  onPlanSelect: PropTypes.func,
  currentPlan: PropTypes.oneOf(['basic-scan', 'expert-care']),
  isLoggedIn: PropTypes.bool,
  selectedPlan: PropTypes.oneOf(['basic-scan', 'expert-care']),
};

Pricing.defaultProps = {
  onPlanSelect: () => {},
  currentPlan: null,
  isLoggedIn: false,
  selectedPlan: null,
};

export default Pricing;
