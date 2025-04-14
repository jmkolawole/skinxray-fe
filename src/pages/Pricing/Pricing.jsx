import { useContext, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AccountContext } from '../../contexts';
import PricingComponent from '../../components/Pricing/Pricing';
import * as S from './Pricing.style';

const PricingPage = () => {
  const { account } = useContext(AccountContext);
  const navigate = useNavigate();
  const location = useLocation();

  // Get the selected plan from URL if it exists
  const searchParams = new URLSearchParams(location.search);
  const selectedPlan = searchParams.get('plan');

  // If user is not logged in and didn't come from signup, redirect to landing
  useEffect(() => {
    const fromSignup = searchParams.get('from') === 'signup';
    if (!account?.token && !fromSignup) {
      navigate('/');
    }
  }, [account, navigate, searchParams]);

  const handlePlanSelect = (plan) => {
    // For now, just console.log the selection
    // This will be replaced with payment flow later
    console.log(`Selected plan: ${plan}`);
  };

  return (
    <S.Container>
      <S.Header>
        <S.BackButton onClick={() => navigate(-1)}>
          <i className="fas fa-arrow-left" />
        </S.BackButton>
        <S.Title>Subscription Plans</S.Title>
      </S.Header>

      <PricingComponent
        isLoggedIn={!!account?.token}
        currentPlan={account?.user?.plan || 'basic'}
        selectedPlan={selectedPlan}
        onPlanSelect={handlePlanSelect}
        onSignUp={() => {}} // Not needed here as we're already in pricing page
      />
    </S.Container>
  );
};

export default PricingPage; 