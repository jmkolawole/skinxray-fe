import { useMemo, useState } from 'react';
import { Badge, Icon, PrimaryButton, Text } from '../../ds';
import * as S from './Subscription.style';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { toast } from 'react-toastify';
import { useSubscriptionStatusQuery } from '../../api/queries/subscription.query';
import {
  formatHistoryRow,
  formatSubscriptionPrice,
  getProviderManageMessage,
  getStatusBadgeVariant,
  HISTORY_PAGE_SIZE,
} from '../../utils/subscription';
import Loader from '../../components/Loader/Loader';

const Subscription = () => {
  const navigate = useNavigate();
  const { data: subscription, isLoading, error } = useSubscriptionStatusQuery();
  const [historyPage, setHistoryPage] = useState(1);

  const handleManageSubscription = () => {
    if (subscription?.data?.customer_portal_url) {
      window.location.href = subscription.data.customer_portal_url;
    } else {
      toast.info('Subscription management is currently unavailable. Please try again later.');
    }
  };

  const currentSub = subscription?.data?.current_subscription;
  const noSubscription = !currentSub;
  const paymentHistory = subscription?.data?.payment_history ?? [];
  const historyRows = useMemo(() => paymentHistory.map(formatHistoryRow), [paymentHistory]);
  const totalHistoryPages = Math.max(1, Math.ceil(historyRows.length / HISTORY_PAGE_SIZE));
  const paginatedHistory = useMemo(() => {
    const start = (historyPage - 1) * HISTORY_PAGE_SIZE;
    return historyRows.slice(start, start + HISTORY_PAGE_SIZE);
  }, [historyRows, historyPage]);

  const providerMessage = currentSub ? getProviderManageMessage(currentSub.payment_provider) : null;
  const isStripeSubscription = currentSub?.payment_provider === 'stripe';
  const showUpgradeCta =
    noSubscription || currentSub?.status === 'expired' || currentSub?.plan_type === 'basic-scan';

  const features = currentSub?.features
    ? [
        { icon: 'scan', weight: 0.8, label: `${currentSub.features.scans_per_day} scans per day` },
        { icon: 'chart', weight: 1, label: `${currentSub.features.analysis_type} analysis` },
        { icon: 'messages', label: 'Live expert consultancy' },
        { icon: 'robot', label: 'AI chat support' },
        { icon: 'fast', weight: 1, label: 'Priority response' },
        { icon: 'health', weight: 1, label: `${currentSub.features.health_insights} insights` },
      ]
    : [];

  const formatDate = (dateString, short = false) => {
    if (!dateString) return 'Not available';
    try {
      return format(new Date(dateString), short ? 'MMM d, yyyy' : 'MMMM d, yyyy');
    } catch {
      return 'Invalid date';
    }
  };

  const planLabel = currentSub?.plan_type
    ? currentSub.plan_type.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
    : 'Basic Scan';

  const subscriptionPrice = formatSubscriptionPrice(currentSub);
  const historyStart = historyRows.length === 0 ? 0 : (historyPage - 1) * HISTORY_PAGE_SIZE + 1;
  const historyEnd = Math.min(historyPage * HISTORY_PAGE_SIZE, historyRows.length);

  if (isLoading) {
    return <Loader size={95} thickness={1} color="primary.1000" fullPage />;
  }

  if (error) {
    return (
      <S.Container>
        <S.PageTitle>Subscription</S.PageTitle>
        <S.Card>
          <Text color="destructive.500" align="center">
            Failed to load subscription information. Please try again later.
          </Text>
        </S.Card>
      </S.Container>
    );
  }

  return (
    <>
      <Helmet>
        <title>Subscription — SkinXray</title>
      </Helmet>

      <S.Container>
        <S.PageTitle>Subscription</S.PageTitle>
        <S.SectionSubtitle>Your current plan and billing activity</S.SectionSubtitle>

        <S.Card>
          {noSubscription ? (
            <S.BasicContainer>
              <Badge $variant="free">FREE</Badge>
              <S.PlanName>Basic Scan</S.PlanName>
              <S.PlanPrice>You don&apos;t have an active paid subscription.</S.PlanPrice>
              <PrimaryButton fullWidth onClick={() => navigate('/plans')}>
                View Plans
              </PrimaryButton>
            </S.BasicContainer>
          ) : (
            <>
              <S.PlanHeader>
                <div>
                  <S.PlanName>{planLabel}</S.PlanName>
                  {subscriptionPrice && <S.PlanPrice>{subscriptionPrice}</S.PlanPrice>}
                </div>
                <Badge $variant={getStatusBadgeVariant(currentSub.status)}>
                  {(currentSub.status || 'active').toUpperCase()}
                </Badge>
              </S.PlanHeader>

              <Text color="text.secondary" size="sm">
                Current period ends {formatDate(currentSub.current_period_end)}
              </Text>

              {providerMessage && <S.ProviderNote>{providerMessage}</S.ProviderNote>}

              <S.FeaturesList>
                {features.map((feature) => (
                  <S.FeatureItem key={feature.label}>
                    <S.IconWrapper>
                      <Icon name={feature.icon} size={14} weight={feature.weight || 0} bg="inherit" color="primary" />
                    </S.IconWrapper>
                    {feature.label}
                  </S.FeatureItem>
                ))}
              </S.FeaturesList>

              {showUpgradeCta && (
                <div style={{ marginTop: 20 }}>
                  <PrimaryButton fullWidth onClick={() => navigate('/plans')}>
                    View Plans
                  </PrimaryButton>
                </div>
              )}

              {isStripeSubscription && subscription?.data?.customer_portal_url && currentSub.status === 'active' && (
                <div style={{ marginTop: 12 }}>
                  <PrimaryButton fullWidth variant="outline" onClick={handleManageSubscription}>
                    Manage Billing
                  </PrimaryButton>
                </div>
              )}
            </>
          )}
        </S.Card>

        {historyRows.length > 0 && (
          <S.Card style={{ marginTop: 24 }}>
            <S.HistoryHeader>
              <div>
                <S.PlanName style={{ marginBottom: 0 }}>Activity History</S.PlanName>
                <S.HistoryCount>Recent billing and subscription updates</S.HistoryCount>
              </div>
            </S.HistoryHeader>

            <S.HistoryList>
              {paginatedHistory.map((row) => (
                <S.HistoryItem key={row.id}>
                  <S.HistoryItemTop>
                    <div>
                      <S.StatusBadge $status={row.statusKey}>{row.event}</S.StatusBadge>
                      {row.detail && <S.HistoryDetail>{row.detail}</S.HistoryDetail>}
                    </div>
                    {row.amount && <S.HistoryAmount>{row.amount}</S.HistoryAmount>}
                  </S.HistoryItemTop>
                  <S.HistoryMeta>
                    <S.HistoryDate>{formatDate(row.date, true)}</S.HistoryDate>
                    <span>·</span>
                    <span>{row.provider}</span>
                  </S.HistoryMeta>
                </S.HistoryItem>
              ))}
            </S.HistoryList>

            {historyRows.length > HISTORY_PAGE_SIZE && (
              <S.PaginationBar>
                <S.PaginationText>
                  Showing {historyStart}–{historyEnd} of {historyRows.length}
                </S.PaginationText>
                <S.PaginationActions>
                  <S.PaginationButton
                    type="button"
                    disabled={historyPage <= 1}
                    onClick={() => setHistoryPage((page) => Math.max(1, page - 1))}
                  >
                    Previous
                  </S.PaginationButton>
                  <S.PaginationButton
                    type="button"
                    $primary
                    disabled={historyPage >= totalHistoryPages}
                    onClick={() => setHistoryPage((page) => Math.min(totalHistoryPages, page + 1))}
                  >
                    Next
                  </S.PaginationButton>
                </S.PaginationActions>
              </S.PaginationBar>
            )}
          </S.Card>
        )}

        {!noSubscription && subscription?.data?.next_billing && (
          <S.Card style={{ marginTop: 24 }}>
            <S.PlanName style={{ marginBottom: 16 }}>Next Billing</S.PlanName>
            <S.PlanPrice style={{ marginBottom: 8 }}>
              Amount:{' '}
              {subscription.data.next_billing.formatted_amount ||
                `$${subscription.data.next_billing.amount || '0'}`}
            </S.PlanPrice>
            <S.PlanPrice style={{ marginBottom: 24 }}>
              Date: {formatDate(subscription.data.next_billing.date)}
            </S.PlanPrice>
            <PrimaryButton fullWidth onClick={handleManageSubscription}>
              Manage Subscription
            </PrimaryButton>
          </S.Card>
        )}
      </S.Container>
    </>
  );
};

export default Subscription;
