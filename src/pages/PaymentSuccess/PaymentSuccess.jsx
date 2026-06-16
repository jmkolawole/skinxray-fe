import { useEffect, useState, useContext } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Icon, PrimaryButton, Text } from '../../ds';
import * as S from './PaymentSuccess.style';
import { toast } from 'react-toastify';
import { useVerifyCheckoutSession } from '../../api/mutations/subscription.mutation';
import { AccountContext } from '../../contexts';

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [verificationStatus, setVerificationStatus] = useState('loading');
  const { mutate: verifyCheckoutSession } = useVerifyCheckoutSession();
  const { setAccount } = useContext(AccountContext);
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    if (!sessionId) {
      setVerificationStatus('error');
      return;
    }

    verifyCheckoutSession(
      { session_id: sessionId },
      {
        onSuccess: () => {
          setAccount((prev) => ({
            ...prev,
            user: { ...prev.user, subscription_plan: 'expert-care' },
          }));
          setVerificationStatus('success');
          toast.success('Successfully upgraded to Expert Care!');
        },
        onError: (error) => {
          setVerificationStatus('error');
          toast.error(error.error);
        },
      }
    );
  }, [sessionId, verifyCheckoutSession, setAccount]);

  const renderContent = () => {
    switch (verificationStatus) {
      case 'loading':
        return (
          <S.LoadingWrapper>
            <S.Spinner />
            <Text size="lg" weight={500}>Verifying your payment...</Text>
            <Text color="neutral.600">Please wait while we confirm your subscription</Text>
          </S.LoadingWrapper>
        );

      case 'success':
        return (
          <>
            <S.IconWrapper $success>
              <Icon name="checkCircle" size={36} bg="inherit" color="primary.1000" weight={0} />
            </S.IconWrapper>
            <Text type="h3" weight={700} style={{ marginBottom: 12 }}>Payment Successful!</Text>
            <Text color="neutral.600" style={{ marginBottom: 8 }}>
              Thank you for upgrading to Expert Care. Your subscription is now active.
            </Text>
            <S.ButtonGroup>
              <PrimaryButton onClick={() => navigate('/home')}>Start Scanning</PrimaryButton>
              <PrimaryButton variant="outline" onClick={() => navigate('/subscription')}>
                View Subscription
              </PrimaryButton>
            </S.ButtonGroup>
          </>
        );

      case 'error':
        return (
          <>
            <S.IconWrapper>
              <Icon name="x" size={32} bg="inherit" color="destructive.600" weight={0} />
            </S.IconWrapper>
            <Text type="h3" weight={700} style={{ marginBottom: 12 }}>Verification Failed</Text>
            <Text color="neutral.600" style={{ marginBottom: 8 }}>
              We couldn&apos;t verify your payment. If you believe this is an error, contact support.
            </Text>
            <S.ButtonGroup>
              <PrimaryButton onClick={() => navigate('/plans')}>Try Again</PrimaryButton>
              <PrimaryButton variant="outline" onClick={() => navigate('/home')}>
                Go to Scan
              </PrimaryButton>
            </S.ButtonGroup>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <S.Container>
      <S.Card>{renderContent()}</S.Card>
    </S.Container>
  );
};

export default PaymentSuccess;
