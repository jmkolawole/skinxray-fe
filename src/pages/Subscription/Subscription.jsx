import { Text, Icon, Button } from '../../ds';
import * as S from './Subscription.style';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useSubscriptionStatusQuery } from '../../api/queries/subscription.query';
import Loader from '../../components/Loader/Loader';

const Subscription = () => {
  const navigate = useNavigate();
  const { data: subscription, isLoading, error } = useSubscriptionStatusQuery();

  const handleManageSubscription = () => {
    if (subscription?.data?.customer_portal_url) {
      window.location.href = subscription.data.customer_portal_url;
    } else {
      toast.info('Subscription management is currently unavailable. Please try again later.');
    }
  };

  const features = subscription?.data?.current_subscription?.features ? [
    { icon: 'scan', weight: .8, label: `${subscription.data.current_subscription.features.scans_per_day} Scans per Day` },
    { icon: 'chart', weight: 1, label: `${subscription.data.current_subscription.features.analysis_type} Analysis` },
    { icon: 'messages', label: 'Live Consultancy' },
    { icon: 'robot', label: 'AI Chat Support' },
    { icon: 'fast', weight: 1, label: 'Priority Response' },
    { icon: 'health', weight: 1, label: `${subscription.data.current_subscription.features.health_insights} Health Insights` }
  ] : [];

  const formatDate = (dateString) => {
    if (!dateString) return 'Not available';
    try {
      return format(new Date(dateString), 'MMMM d, yyyy');
    } catch {
      return 'Invalid date';
    }
  };

  if (isLoading) {
    return <Loader size={95}  thickness={1} color="primary.1000" fullPage={true} />;
  }

  if (error) {
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
          <S.Title>Subscription</S.Title>
        </S.Header>
        <S.Card>
          <Text color="destructive.500" align="center">
            Failed to load subscription information. Please try again later.
          </Text>
        </S.Card>
      </S.Container>
    );
  }

  // Handle case when user has no subscription
  const noSubscription = !subscription?.data?.current_subscription;

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
        <S.Title>Subscription</S.Title>
      </S.Header>

      <S.Grid>
        <div>
          <S.Card>
            {noSubscription ? (
              <S.BasicContainer>
                <Text size="lg" weight={600}>
                  Basic Plan
                </Text>
                <Text color="neutral.600" style={{ marginBottom: '1.5rem' }}>
                  You currently don&apos;t have any active paid subscription.
                </Text>
                <Button 
                  variant="primary" 
                  fullWidth
                  onClick={() => navigate('/pricing')}
                >
                  Upgrade Now
                </Button>
              </S.BasicContainer>
            ) : (
              <>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <div>
                    <Text size="lg" weight={600} style={{ marginBottom: '0.5rem' }}>
                      {subscription?.data?.current_subscription?.plan_type?.split('-').map(word => 
                        word.charAt(0).toUpperCase() + word.slice(1)
                      ).join(' ') || 'Basic Plan'}
                    </Text>
                    <Text color="neutral.600">
                      ${subscription?.data?.current_subscription?.amount || '0'}/month
                    </Text>
                  </div>
                  <S.StatusBadge status={subscription?.data?.current_subscription?.status || 'active'}>
                    {(subscription?.data?.current_subscription?.status || 'active').charAt(0).toUpperCase() + 
                     (subscription?.data?.current_subscription?.status || 'active').slice(1)}
                  </S.StatusBadge>
                </div>

                <Text color="neutral.600" style={{ marginBottom: '1rem' }}>
                  Current period ends on {formatDate(subscription?.data?.current_subscription?.current_period_end)}
                </Text>

                <S.FeaturesList>
                  {features.map((feature, index) => (
                    <S.FeatureItem key={index}>
                      <S.IconWrapper>
                        <Icon name={feature.icon} size={16} weight={feature.weight} />
                      </S.IconWrapper>
                      <Text>{feature.label}</Text>
                    </S.FeatureItem>
                  ))}
                </S.FeaturesList>
              </>
            )}
          </S.Card>

          {!noSubscription && subscription?.data?.payment_history?.length > 0 && (
            <S.Card style={{ marginTop: '1.5rem' }}>
              <Text size="lg" weight={600} style={{ marginBottom: '1rem' }}>
                Payment History
              </Text>
              <S.PaymentHistoryTable>
                <S.Table>
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Amount</th>
                      <th>Status</th>
                      <th>Method</th>
                    </tr>
                  </thead>
                  <tbody>
                    {subscription?.data?.payment_history.map((payment, index) => (
                      <tr key={index}>
                        <td>{formatDate(payment.date)}</td>
                        <td>${payment.amount}</td>
                        <td>
                          <S.StatusBadge status={payment.status}>
                            {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                          </S.StatusBadge>
                        </td>
                        <td style={{ textTransform: 'capitalize' }}>{payment.payment_method}</td>
                      </tr>
                    ))}
                  </tbody>
                </S.Table>
              </S.PaymentHistoryTable>
            </S.Card>
          )}
        </div>

        {!noSubscription && subscription?.data?.next_billing && (
          <S.Card>
            <Text size="lg" weight={600} style={{ marginBottom: '1rem' }}>
              Next Billing
            </Text>
            <Text color="neutral.600" style={{ marginBottom: '0.5rem' }}>
              Amount: ${subscription?.data?.next_billing?.amount || '0'}
            </Text>
            <Text color="neutral.600" style={{ marginBottom: '1.5rem' }}>
              Date: {formatDate(subscription?.data?.next_billing?.date)}
            </Text>
            
            <Button 
              variant="primary" 
              fullWidth
              onClick={handleManageSubscription}
            >
              Manage Subscription
            </Button>
          </S.Card>
        )}
      </S.Grid>
    </S.Container>
  );
};

export default Subscription; 