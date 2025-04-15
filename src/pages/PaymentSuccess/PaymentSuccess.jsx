import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button, Text } from '../../ds';
import * as S from './PaymentSuccess.style';
import { toast } from 'react-toastify';
import { useVerifyCheckoutSession } from '../../api/mutations/subscription.mutation';

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [verificationStatus, setVerificationStatus] = useState('loading'); // loading, success, error
  const { mutate: verifyCheckoutSession } = useVerifyCheckoutSession();
  
  // Get the session_id from URL
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
          setVerificationStatus('success');
          toast.success('Successfully upgraded to Expert Care plan!');
        },
        onError: (error) => {
          console.error('Payment verification failed:', error);
          setVerificationStatus('error');
          toast.error(error.error);
        }
      }
    );
  }, [sessionId, verifyCheckoutSession]);

  const renderContent = () => {
    switch (verificationStatus) {
      case 'loading':
        return (
          <S.LoadingWrapper>
            <S.Spinner />
            <Text size="lg" weight={500}>
              Verifying your payment...
            </Text>
            <Text color="neutral.600">
              Please wait while we confirm your subscription
            </Text>
          </S.LoadingWrapper>
        );

      case 'success':
        return (
          <>
            <S.IconWrapper success>
              <i className="fas fa-check"></i>
            </S.IconWrapper>
            <Text type="h3" weight={600} style={{ marginBottom: '16px' }}>
              Payment Successful!
            </Text>
            <Text color="neutral.600" style={{ marginBottom: '24px' }}>
              Thank you for upgrading to Expert Care. Your subscription is now active.
            </Text>
            <S.ButtonGroup>
              <Button
                variant="primary"
                onClick={() => navigate('/home')}
              >
                Go to Dashboard
              </Button>
              <Button
                variant="secondary"
                onClick={() => navigate('/settings')}
              >
                View Subscription
              </Button>
            </S.ButtonGroup>
          </>
        );

      case 'error':
        return (
          <>
            <S.IconWrapper>
              <i className="fas fa-times"></i>
            </S.IconWrapper>
            <Text type="h3" weight={600} style={{ marginBottom: '16px' }}>
              Verification Failed
            </Text>
            <Text color="neutral.600" style={{ marginBottom: '24px' }}>
              We couldn&apos;t verify your payment. If you believe this is an error,
              please contact our support team.
            </Text>
            <S.ButtonGroup>
              <Button
                variant="primary"
                onClick={() => navigate('/pricing')}
              >
                Try Again
              </Button>
              <Button
                variant="secondary"
                onClick={() => navigate('/home')}
              >
                Go to Dashboard
              </Button>
            </S.ButtonGroup>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <S.Container>
      <S.Card>
        {renderContent()}
      </S.Card>
    </S.Container>
  );
};

export default PaymentSuccess; 