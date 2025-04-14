import PropTypes from 'prop-types';
import { FaCheck } from 'react-icons/fa';
import {
  Container,
  PlanCard,
  PlanHeader,
  PlanPrice,
  PlanFeatures,
  Feature,
  SelectButton
} from './PricingComponent.style';

const PricingComponent = ({ onSelectPlan, selectedPlan, isLoading }) => {
  const plans = [
    {
      id: 'basic',
      name: 'Basic',
      price: 29,
      period: 'month',
      features: [
        'Up to 5 users',
        'Basic analytics',
        'Email support',
        '2GB storage',
        'Basic reporting'
      ]
    },
    {
      id: 'professional',
      name: 'Professional',
      price: 59,
      period: 'month',
      features: [
        'Up to 20 users',
        'Advanced analytics',
        'Priority email support',
        '10GB storage',
        'Advanced reporting',
        'Custom integrations'
      ]
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 99,
      period: 'month',
      features: [
        'Unlimited users',
        'Premium analytics',
        '24/7 phone support',
        'Unlimited storage',
        'Custom reporting',
        'API access',
        'Dedicated account manager'
      ]
    }
  ];

  return (
    <Container>
      {plans.map((plan) => (
        <PlanCard key={plan.id} isSelected={selectedPlan === plan.id}>
          <PlanHeader>
            <h2>{plan.name}</h2>
          </PlanHeader>
          <PlanPrice>
            <span>$</span>
            {plan.price}
            <span>/{plan.period}</span>
          </PlanPrice>
          <PlanFeatures>
            {plan.features.map((feature) => (
              <Feature key={feature}>
                <FaCheck />
                {feature}
              </Feature>
            ))}
          </PlanFeatures>
          <SelectButton
            onClick={() => onSelectPlan(plan.id)}
            disabled={isLoading}
            isSelected={selectedPlan === plan.id}
          >
            {isLoading && selectedPlan === plan.id ? (
              'Processing...'
            ) : selectedPlan === plan.id ? (
              <>
                <i className="fas fa-check" />
                Selected
              </>
            ) : (
              'Select Plan'
            )}
          </SelectButton>
        </PlanCard>
      ))}
    </Container>
  );
};

PricingComponent.propTypes = {
  onSelectPlan: PropTypes.func.isRequired,
  selectedPlan: PropTypes.string,
  isLoading: PropTypes.bool
};

PricingComponent.defaultProps = {
  selectedPlan: null,
  isLoading: false
};

export default PricingComponent; 