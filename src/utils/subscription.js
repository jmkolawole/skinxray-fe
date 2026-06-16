const REASON_LABELS = {
  subscription_renewed: 'Subscription renewed',
  subscription_renewed_webhook: 'Subscription renewed',
  subscription_grace_period_webhook: 'Grace period started',
  subscription_expired_webhook: 'Subscription expired',
  subscription_token_unavailable: 'Billing sync issue',
  subscription_created: 'Subscription started',
  subscription_changed: 'Plan changed',
  subscription_revoked_webhook: 'Purchase revoked',
  subscription_paused_webhook: 'Subscription paused',
  subscription_canceled_webhook: 'Subscription canceled',
  apple_subscription_renewed_webhook: 'Subscription renewed',
  apple_subscription_confirmed_webhook: 'Subscription confirmed',
  apple_plan_changed_on_renewal_webhook: 'Plan changed at renewal',
  apple_plan_changed_and_auto_renew_enabled_webhook: 'Plan changed · auto-renew on',
  apple_plan_changed_webhook: 'Plan changed',
  apple_auto_renew_enabled_webhook: 'Auto-renew enabled',
  apple_auto_renew_disabled_webhook: 'Auto-renew disabled',
  apple_renewal_failed_webhook: 'Renewal failed',
  apple_expired_voluntary_webhook: 'Subscription expired',
  apple_expired_billing_retry_webhook: 'Expired after billing retry',
  apple_expired_price_increase_webhook: 'Expired (declined price increase)',
  apple_expired_product_unavailable_webhook: 'Expired (product unavailable)',
  apple_expired_webhook: 'Subscription expired',
  apple_grace_period_expired_webhook: 'Grace period ended',
  apple_revoked_webhook: 'Subscription revoked',
  apple_upgrade_completed_webhook: 'Upgrade completed',
  apple_downgrade_scheduled_webhook: 'Downgrade scheduled',
  apple_offer_redeemed_webhook: 'Promotional offer applied',
  apple_price_increase_pending_webhook: 'Price increase pending',
  apple_price_increase_accepted_webhook: 'Price increase accepted',
  apple_price_increase_webhook: 'Price update',
};

const PROVIDER_LABELS = {
  stripe: 'Web (Stripe)',
  google_play: 'Google Play',
  apple: 'App Store',
};

export const HISTORY_PAGE_SIZE = 8;

export const formatPlanTypeLabel = (planType) => {
  if (!planType || typeof planType !== 'string') return null;
  return planType
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

export const resolveHistoryProvider = (item) => {
  if (item?.provider === 'stripe') return 'stripe';
  if (item?.new_provider) return item.new_provider;
  if (item?.old_provider) return item.old_provider;
  if (item?.reason?.startsWith('apple_')) return 'apple';
  return item?.provider || 'google_play';
};

export const formatHistoryReason = (reason) => {
  if (!reason || typeof reason !== 'string') return 'Account update';
  if (REASON_LABELS[reason]) return REASON_LABELS[reason];
  return reason
    .replace(/_webhook$/i, '')
    .replace(/^apple_/i, '')
    .replace(/^subscription_/i, '')
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

export const formatProvider = (provider) => {
  if (!provider) return '—';
  return PROVIDER_LABELS[provider] || provider.replace(/_/g, ' ');
};

export const formatStatusLabel = (status) => {
  if (!status || typeof status !== 'string') return 'Update';
  const labels = {
    succeeded: 'Payment successful',
    paid: 'Paid',
    active: 'Active',
    failed: 'Payment failed',
    pending: 'Pending',
  };
  return labels[status] || status.charAt(0).toUpperCase() + status.slice(1);
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
  if (item.type !== 'payment' && item.provider !== 'stripe') {
    return null;
  }

  if (item.amount == null) return null;

  const amount = Number(item.amount);
  if (Number.isNaN(amount)) return null;

  if (item.currency && item.currency !== 'USD') {
    return `${item.currency} ${amount.toFixed(2)}`;
  }

  return `$${amount.toFixed(2)}`;
};

const getHistoryStatusKey = (item, reason) => {
  const reasonText = reason?.toLowerCase() || '';

  if (reasonText.includes('expired') || reasonText.includes('revoked') || reasonText.includes('canceled')) {
    return 'expired';
  }
  if (reasonText.includes('grace') || reasonText.includes('failed') || reasonText.includes('pending')) {
    return reasonText.includes('failed') ? 'expired' : 'grace';
  }
  if (
    reasonText.includes('renewed') ||
    reasonText.includes('confirmed') ||
    reasonText.includes('upgrade') ||
    reasonText.includes('created') ||
    reasonText.includes('enabled')
  ) {
    return 'active';
  }

  if (item.type === 'payment') {
    if (item.status === 'succeeded' || item.status === 'paid') return 'active';
    if (item.status === 'failed') return 'expired';
  }

  return 'unknown';
};

export const formatHistoryRow = (item) => {
  const provider = resolveHistoryProvider(item);
  const isPayment = item.type === 'payment' || provider === 'stripe';
  const reason = item.reason;
  const event = isPayment ? formatStatusLabel(item.status) : formatHistoryReason(reason);
  const oldPlan = formatPlanTypeLabel(item.old_plan_type);
  const newPlan = formatPlanTypeLabel(item.new_plan_type);
  const detail =
    oldPlan && newPlan && item.old_plan_type !== item.new_plan_type
      ? `${oldPlan} → ${newPlan}`
      : newPlan && !oldPlan
        ? newPlan
        : null;

  return {
    id: item.id ?? `${item.date}-${reason}-${item.subscription_id}`,
    date: item.date || item.changed_at,
    event,
    detail,
    provider: formatProvider(provider),
    amount: formatHistoryAmount({ ...item, provider }),
    statusKey: getHistoryStatusKey(item, reason),
  };
};

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
