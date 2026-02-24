import { useEffect, useRef } from 'react';
import { useSubscriptionStatusQuery } from '../../api/queries/subscription.query';

const TAWK_PROPERTY_ID = '699db04ab2f3e31c2e61fc38';
const TAWK_WIDGET_ID = '1ji7vh96l';
const TAWK_SCRIPT_URL = `https://embed.tawk.to/${TAWK_PROPERTY_ID}/${TAWK_WIDGET_ID}`;

/** Statuses that are allowed to see the Tawk chat widget */
const ELIGIBLE_SUBSCRIPTION_STATUSES = ['active', 'grace'];

/**
 * Customize widget appearance. Position (tl/tr/cl/cr/bl/br) and offsets
 * can be set in Tawk dashboard: Administration > Channels > Chat Widget > Widget Appearance.
 */
const TAWK_CONFIG = {
  zIndex: 1000000,
};

const TawkWidget = () => {
  const { data: subscription, isLoading } = useSubscriptionStatusQuery();
  const loaded = useRef(false);

  useEffect(() => {
    if (isLoading || loaded.current) return;

    const status = subscription?.data?.current_subscription?.status;
    const isEligible = status && ELIGIBLE_SUBSCRIPTION_STATUSES.includes(status.toLowerCase());

    if (!isEligible) return;

    loaded.current = true;

    window.Tawk_API = window.Tawk_API || {};
    window.Tawk_LoadStart = new Date();

    // Must be set before the widget script loads
    window.Tawk_API.customStyle = {
      zIndex: TAWK_CONFIG.zIndex,
    };

    const script = document.createElement('script');
    script.async = true;
    script.src = TAWK_SCRIPT_URL;
    script.charset = 'UTF-8';
    script.setAttribute('crossorigin', '*');
    document.body.appendChild(script);
  }, [subscription, isLoading]);

  return null;
};

export default TawkWidget;
