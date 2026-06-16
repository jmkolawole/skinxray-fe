const REASON_LABELS = {
  subscription_renewed: 'Renewed',
  subscription_renewed_webhook: 'Renewed',
  subscription_grace_period_webhook: 'Grace period',
  subscription_expired_webhook: 'Expired',
  subscription_token_unavailable: 'Token unavailable',
  subscription_created: 'Created',
  subscription_changed: 'Plan changed',
};

const PROVIDER_LABELS = {
  stripe: 'Stripe',
  google_play: 'Google Play',
  apple: 'App Store',
};

export const formatHistoryReason = (reason) => {
  if (!reason || typeof reason !== 'string') return '—';
  if (REASON_LABELS[reason]) return REASON_LABELS[reason];
  return reason
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

export const formatProvider = (provider) => {
  if (!provider) return '—';
  return PROVIDER_LABELS[provider] || provider.replace(/_/g, ' ');
};

export const formatStatusLabel = (status) => {
  if (!status || typeof status !== 'string') return 'Unknown';
  return status.charAt(0).toUpperCase() + status.slice(1);
};

export const getStatusBadgeVariant = (status) => {
  switch (status) {
    case 'active':
      return 'premium';
    case 'grace':
      return 'warning';
    case 'expired':
    case 'canceled':
      return 'error';
    default:
      return 'free';
  }
};

export const formatSubscriptionPrice = (subscription) => {
  if (!subscription) return null;

  if (subscription.formatted_amount) {
    if (subscription.is_yearly) return `${subscription.formatted_amount}/year`;
    if (subscription.is_monthly) return `${subscription.formatted_amount}/month`;
    if (subscription.billing_period && subscription.billing_period !== 'N/A') {
      return `${subscription.formatted_amount}/${subscription.billing_period.toLowerCase()}`;
    }
    return subscription.formatted_amount;
  }

  if (subscription.amount != null && subscription.currency) {
    const amount = Number(subscription.amount);
    const suffix = subscription.is_yearly ? '/year' : subscription.is_monthly ? '/month' : '';
    return `${subscription.currency} ${amount.toFixed(2)}${suffix}`;
  }

  return null;
};

export const formatHistoryAmount = (item) => {
  if (item.type === 'subscription_event' || item.provider === 'google_play') {
    return '—';
  }

  if (item.amount == null) return '—';

  const amount = Number(item.amount);
  if (Number.isNaN(amount)) return '—';

  return `$${amount.toFixed(2)}`;
};

export const formatHistoryRow = (item) => ({
  date: item.date || item.changed_at,
  event:
    item.type === 'subscription_event' || item.provider === 'google_play'
      ? formatHistoryReason(item.reason)
      : formatStatusLabel(item.status),
  provider: formatProvider(item.provider),
  amount: formatHistoryAmount(item),
  statusKey:
    item.type === 'subscription_event' || item.provider === 'google_play'
      ? item.reason?.includes('expired')
        ? 'expired'
        : item.reason?.includes('grace')
          ? 'grace'
          : item.reason?.includes('renewed')
            ? 'active'
            : 'unknown'
      : item.status || 'unknown',
});

export const getEffectiveCurrentPlan = (currentSub) => {
  if (!currentSub) return 'basic-scan';
  if (currentSub.status === 'active' || currentSub.status === 'grace') {
    return currentSub.plan_type === 'expert-care' ? 'expert-care' : 'basic-scan';
  }
  return 'basic-scan';
};

export const getProviderManageMessage = (provider) => {
  switch (provider) {
    case 'google_play':
      return 'This subscription was purchased on Android. Manage or renew it in the Google Play Store app.';
    case 'apple':
      return 'This subscription was purchased on iOS. Manage or renew it in the App Store.';
    default:
      return null;
  }
};
