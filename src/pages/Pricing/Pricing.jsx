import {useContext, useEffect, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {AccountContext} from '../../contexts';
import PricingComponent from '../../components/Pricing/Pricing';
import * as S from './Pricing.style';
import {toast} from 'react-toastify';
import { Icon } from '../../ds';

const PricingPage = () => {
  const {account} = useContext(AccountContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);

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

  const handlePlanSelect = async (plan) => {
    if (plan === account?.user?.plan) {
      return; // Don't do anything if selecting current plan
    }

    try {
      setIsLoading(true);

      // TODO: When backend is ready
      // const response = await createCheckoutSession({
      //   plan,
      //   successUrl: `${window.location.origin}/payment/success`,
      //   cancelUrl: `${window.location.origin}/pricing`,
      // });
      // window.location.href = response.data.url;

      // For now, just simulate loading
      toast.info('Payment processing will be available soon!');
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    } catch (error) {
      console.error('Failed to initiate checkout:', error);
      toast.error('Failed to start checkout process. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <S.Container>
      <S.Header>
        <S.BackButton onClick={() => navigate(-1)}>
          <Icon
            bg="standalone.2"
            color="shades.0"
            name="chevronLeft"
            padding={7}
            radius={100}
            size={25}
            weight={0}
          />
        </S.BackButton>
        <S.Title>Subscription Plans</S.Title>
      </S.Header>

      <PricingComponent
        isLoggedIn={!!account?.token}
        currentPlan={account?.user?.plan || 'basic'}
        selectedPlan={selectedPlan}
        onPlanSelect={handlePlanSelect}
        onSignUp={() => {}} // Not needed here as we're already in pricing page
        isLoading={isLoading}
      />
    </S.Container>
  );
};

export default PricingPage;
