import { Text, Icon, Button } from '../../ds';
import * as S from './Subscription.style';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Subscription = () => {
  const navigate = useNavigate();
  const subscription = {
    current_subscription: {
      status: "active",
      plan_type: "expert-care",
      current_period_end: "2025-05-15T10:35:29.000000Z",
      amount: "3.99",
      features: {
        scans_per_day: "Unlimited",
        analysis_type: "Detailed",
        live_consultancy: true,
        ai_chat_support: true,
        priority_response: true,
        health_insights: "Detailed"
      }
    },
    next_billing: {
      date: "2025-05-15 10:35:29",
      amount: "3.99"
    },
    payment_history: [
      {
        amount: 29.99,
        status: "succeeded",
        payment_method: "card",
        date: "2024-03-20 00:00:00"
      }
    ],
    customer_portal_url: null
  };

  const handleManageSubscription = () => {
    if (subscription.customer_portal_url) {
      window.location.href = subscription.customer_portal_url;
    } else {
      toast.info('Subscription management is currently unavailable. Please try again later.');
    }
  };

  const features = [
    { icon: 'scan', label: `${subscription.current_subscription.features.scans_per_day} Scans per Day` },
    { icon: 'chart', label: `${subscription.current_subscription.features.analysis_type} Analysis` },
    { icon: 'chat', label: 'Live Consultancy' },
    { icon: 'robot', label: 'AI Chat Support' },
    { icon: 'bolt', label: 'Priority Response' },
    { icon: 'heart', label: `${subscription.current_subscription.features.health_insights} Health Insights` }
  ];

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
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <div>
                <Text size="lg" weight={600} style={{ marginBottom: '0.5rem' }}>
                  {subscription.current_subscription.plan_type.split('-').map(word => 
                    word.charAt(0).toUpperCase() + word.slice(1)
                  ).join(' ')}
                </Text>
                <Text color="neutral.600">
                  ${subscription.current_subscription.amount}/month
                </Text>
              </div>
              <S.StatusBadge status={subscription.current_subscription.status}>
                {subscription.current_subscription.status.charAt(0).toUpperCase() + 
                 subscription.current_subscription.status.slice(1)}
              </S.StatusBadge>
            </div>

            <Text color="neutral.600" style={{ marginBottom: '1rem' }}>
              Current period ends on {format(new Date(subscription.current_subscription.current_period_end), 'MMMM d, yyyy')}
            </Text>

            <S.FeaturesList>
              {features.map((feature, index) => (
                <S.FeatureItem key={index}>
                  <S.IconWrapper>
                    <Icon name={feature.icon} size={16} />
                  </S.IconWrapper>
                  <Text>{feature.label}</Text>
                </S.FeatureItem>
              ))}
            </S.FeaturesList>
          </S.Card>

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
                  {subscription.payment_history.map((payment, index) => (
                    <tr key={index}>
                      <td>{format(new Date(payment.date), 'MMM d, yyyy')}</td>
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
        </div>

        <S.Card>
          <Text size="lg" weight={600} style={{ marginBottom: '1rem' }}>
            Next Billing
          </Text>
          <Text color="neutral.600" style={{ marginBottom: '0.5rem' }}>
            Amount: ${subscription.next_billing.amount}
          </Text>
          <Text color="neutral.600" style={{ marginBottom: '1.5rem' }}>
            Date: {format(new Date(subscription.next_billing.date), 'MMMM d, yyyy')}
          </Text>
          
          <Button 
            variant="primary" 
            fullWidth
            onClick={handleManageSubscription}
          >
            Manage Subscription
          </Button>
        </S.Card>
      </S.Grid>
    </S.Container>
  );
};

export default Subscription; 