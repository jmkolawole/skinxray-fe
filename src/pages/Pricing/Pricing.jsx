import { useContext, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { AccountContext } from '../../contexts';
import PricingComponent from '../../components/Pricing/Pricing';
import * as S from './Pricing.style';
import { toast } from 'react-toastify';
import { useCreateCheckoutSession } from '../../api/mutations/subscription.mutation';
import { useSubscriptionStatusQuery } from '../../api/queries/subscription.query';
import { getEffectiveCurrentPlan } from '../../utils/subscription';
import Loader from '../../components/Loader/Loader';

const PlansPage = () => {
  const { account } = useContext(AccountContext);
  const location = useLocation();
  const { mutate: createCheckoutSession, isPending: isCheckoutLoading } = useCreateCheckoutSession();
  const { data: subscription, isLoading: isSubscriptionLoading } = useSubscriptionStatusQuery();

  const searchParams = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const selectedPlan = searchParams.get('plan');
  const currentSub = subscription?.data?.current_subscription;
  const currentPlan = currentSub
    ? getEffectiveCurrentPlan(currentSub)
    : account?.user?.subscription_plan || 'basic-scan';

  const handlePlanSelect = (plan) => {
    if (plan === currentPlan) return;

    if (plan === 'basic-scan') {
      createCheckoutSession(
        {
          plan_type: 'basic-scan',
          success_url: `${window.location.origin}/subscription`,
          cancel_url: `${window.location.origin}/plans`,
        },
        {
          onSuccess: (response) => {
            if (response.data?.url) {
              window.location.href = response.data.url;
              return;
            }
            toast.success('Basic plan activated');
          },
          onError: (error) => {
            toast.error(error.error || 'Unable to switch plans');
          },
        }
      );
      return;
    }

    createCheckoutSession(
      {
        plan_type: 'expert-care',
        success_url: `${window.location.origin}/payment/success`,
        cancel_url: `${window.location.origin}/plans`,
      },
      {
        onSuccess: (response) => {
          if (response.data?.url) {
            window.location.href = response.data.url;
            return;
          }
          toast.error('Unable to start checkout');
        },
        onError: (error) => {
          toast.error(error.error || 'Unable to start checkout');
        },
      }
    );
  };

  if (isSubscriptionLoading) {
    return <Loader size={95} thickness={1} color="primary.1000" fullPage />;
  }

  return (
    <>
      <Helmet>
        <title>Plans — SkinXray</title>
      </Helmet>

      <S.Container>
        <S.PageTitle>Choose Your Plan</S.PageTitle>
        <S.PageSubtitle>Upgrade for unlimited scans and detailed AI insights</S.PageSubtitle>

        <PricingComponent
          isLoggedIn={!!account?.token}
          currentPlan={currentPlan}
          selectedPlan={selectedPlan === 'premium' ? 'expert-care' : selectedPlan}
          onPlanSelect={handlePlanSelect}
          onSignUp={() => {}}
          isLoading={isCheckoutLoading}
        />
      </S.Container>
    </>
  );
};

export default PlansPage;
