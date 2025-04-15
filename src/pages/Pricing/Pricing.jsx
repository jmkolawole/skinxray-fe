import {useContext, useEffect, useMemo} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {AccountContext} from '../../contexts';
import PricingComponent from '../../components/Pricing/Pricing';
import * as S from './Pricing.style';
import {toast} from 'react-toastify';
import { Icon } from '../../ds';
import { useCreateCheckoutSession } from '../../api/mutations/subscription.mutation';

const PricingPage = () => {
  const {account} = useContext(AccountContext);
  const navigate = useNavigate();
  const location = useLocation();
  const { mutate: createCheckoutSession, isLoading } = useCreateCheckoutSession();

  // Get the selected plan from URL if it exists
  const searchParams = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const selectedPlan = searchParams.get('plan');

  // If user is not logged in and didn't come from signup, redirect to landing
  useEffect(() => {
    const fromSignup = searchParams.get('from') === 'signup';
    if (!account?.token && !fromSignup) {
      navigate('/');
    }
  }, [account, navigate, searchParams]);

  const handlePlanSelect = async (plan) => {
    if (plan === account?.user?.subscription_plan) {
      return; // Don't do anything if selecting current plan
    }

    createCheckoutSession(
      { 
        plan_type: 'expert-care',
        success_url: `${window.location.origin}/payment/success`,
        cancel_url: `${window.location.origin}/pricing`
      },
      {
        onSuccess: (response) => {
          const url = response.data.url;
          window.location.href = url;
        },
        onError: (error) => {
          console.error('Failed to initiate checkout:', error);
          toast.error(error.error);
        }
      }
    );
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
        currentPlan={account?.user?.subscription_plan || 'basic'}
        selectedPlan={selectedPlan}
        onPlanSelect={handlePlanSelect}
        onSignUp={() => {}} // Not needed here as we're already in pricing page
        isLoading={isLoading}
      />
    </S.Container>
  );
};

export default PricingPage;
