import { useState } from 'react';
import { Text, Button, Icon } from '../../ds';
import { EXPERT_CARE_PRICING } from '../../constants/pricing';
import PropTypes from 'prop-types';
import * as S from './Pricing.style';

const Pricing = ({
  onSignUp,
  onPlanSelect = () => {},
  currentPlan = null,
  isLoggedIn = false,
  selectedPlan = null,
}) => {
  const [billingPeriod, setBillingPeriod] = useState('monthly');
  const expertPricing = EXPERT_CARE_PRICING[billingPeriod];

  const handlePlanAction = (plan) => {
    if (!isLoggedIn) {
      onSignUp(plan, billingPeriod);
      return;
    }
    onPlanSelect(plan, billingPeriod);
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
        style: { width: '100%' },
      };
    }

    if (plan === 'basic-scan') {
      return {
        onClick: () => handlePlanAction(plan),
        children: 'Switch to Basic Scan',
        variant: 'secondary',
        style: { width: '100%' },
      };
    }

    if (currentPlan === 'expert-care') {
      return {
        onClick: () => handlePlanAction(plan),
        children: 'Switch to Basic Scan',
        variant: 'secondary',
        style: { width: '100%' },
      };
    }

    return {
      onClick: () => handlePlanAction(plan),
      children: 'Upgrade Now',
      variant: 'primary',
      style: { width: '100%' },
    };
  };

  return (
    <S.PricingSection>
      <Text weight={700} type="h3" align="center">
        Choose Your Plan
      </Text>

      <S.BillingToggle role="tablist" aria-label="Billing period">
        <S.BillingToggleInner>
          <S.BillingToggleButton
          type="button"
          role="tab"
          aria-selected={billingPeriod === 'monthly'}
          $active={billingPeriod === 'monthly'}
          onClick={() => setBillingPeriod('monthly')}
        >
          Monthly
        </S.BillingToggleButton>
        <S.BillingToggleButton
          type="button"
          role="tab"
          aria-selected={billingPeriod === 'yearly'}
          $active={billingPeriod === 'yearly'}
          onClick={() => setBillingPeriod('yearly')}
        >
          Yearly
          <S.SavingsBadge>Save {EXPERT_CARE_PRICING.yearly.savingsPercent}%</S.SavingsBadge>
        </S.BillingToggleButton>
        </S.BillingToggleInner>
      </S.BillingToggle>

      {!isLoggedIn && (
        <Text align="center" color="text.secondary" style={{ marginTop: '16px' }}>
          Create an account to get started with your selected plan
        </Text>
      )}

      <S.PricingCards>
        <S.PricingCard selected={!isLoggedIn && selectedPlan === 'basic-scan'}>
          <S.FeatureIcon>
            <Icon bg="inherit" color="primary" name="search" size={20} weight={0} />
          </S.FeatureIcon>
          <Text weight={600} type="h4">
            Basic Scan
          </Text>
          <S.PriceTag>
            <Text weight={700} type="h2" color="primary">
              $0
            </Text>
            <Text size="lg" color="text.secondary" style={{ marginLeft: '8px' }}>
              /month
            </Text>
          </S.PriceTag>
          <S.PriceFeatures>
            <S.PriceFeature>
              <Icon bg="inherit" color="primary" name="check" size={18} weight={0} />
              <Text color="text.secondary">2 AI scans per day</Text>
            </S.PriceFeature>
            <S.PriceFeature>
              <Icon bg="inherit" color="primary" name="check" size={18} weight={0} />
              <Text color="text.secondary">Basic analysis reports</Text>
            </S.PriceFeature>
            <S.PriceFeature>
              <Icon bg="inherit" color="primary" name="check" size={18} weight={0} />
              <Text color="text.secondary">Access to symptom checker</Text>
            </S.PriceFeature>
          </S.PriceFeatures>
          <Button {...getButtonProps('basic-scan')} />
        </S.PricingCard>

        <S.PricingCard selected={!isLoggedIn && selectedPlan === 'expert-care'} style={{ position: 'relative' }}>
          <S.RecommendedBadge>Recommended</S.RecommendedBadge>
          <S.FeatureIcon>
            <Icon bg="inherit" color="primary" name="star" size={22} weight={0} />
          </S.FeatureIcon>
          <Text weight={600} type="h4">
            Expert Care
          </Text>
          <S.PriceTag>
            <div>
              {billingPeriod === 'yearly' && (
                <S.CompareAtPrice>{EXPERT_CARE_PRICING.yearly.compareAtDisplay}/year</S.CompareAtPrice>
              )}
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center' }}>
                <Text weight={700} type="h2" color="primary">
                  {expertPricing.display}
                </Text>
                <Text size="lg" color="text.secondary" style={{ marginLeft: '8px' }}>
                  {expertPricing.periodLabel}
                </Text>
              </div>
              {billingPeriod === 'yearly' && (
                <S.SavingsNote>
                  Save ${EXPERT_CARE_PRICING.yearly.savingsAmount.toFixed(2)} vs monthly billing
                </S.SavingsNote>
              )}
            </div>
          </S.PriceTag>
          <S.PriceFeatures>
            <S.PriceFeature>
              <Icon bg="inherit" color="primary" name="check" size={18} weight={0} />
              <Text color="text.secondary">Unlimited AI scans</Text>
            </S.PriceFeature>
            <S.PriceFeature>
              <Icon bg="inherit" color="primary" name="check" size={18} weight={0} />
              <Text color="text.secondary">Live expert consultancy</Text>
            </S.PriceFeature>
            <S.PriceFeature>
              <Icon bg="inherit" color="primary" name="check" size={18} weight={0} />
              <Text color="text.secondary">Real-time AI chat support</Text>
            </S.PriceFeature>
            <S.PriceFeature>
              <Icon bg="inherit" color="primary" name="check" size={18} weight={0} />
              <Text color="text.secondary">Priority response time</Text>
            </S.PriceFeature>
            <S.PriceFeature>
              <Icon bg="inherit" color="primary" name="check" size={18} weight={0} />
              <Text color="text.secondary">Detailed AI insights</Text>
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

export default Pricing;
