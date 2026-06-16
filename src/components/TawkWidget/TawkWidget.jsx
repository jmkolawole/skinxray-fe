import { useEffect, useRef } from 'react';
import { useSubscriptionStatusQuery } from '../../api/queries/subscription.query';

const TAWK_PROPERTY_ID = '699db04ab2f3e31c2e61fc38';
const TAWK_WIDGET_ID = '1ji7vh96l';
const TAWK_SCRIPT_URL = `https://embed.tawk.to/${TAWK_PROPERTY_ID}/${TAWK_WIDGET_ID}`;
const MOBILE_NAV_CLEARANCE = '96px';

/** Statuses that are allowed to see the Tawk chat widget */
const ELIGIBLE_SUBSCRIPTION_STATUSES = ['active', 'grace'];

const TAWK_CONFIG = {
  zIndex: 1000000,
};

const injectTawkMobileOffset = () => {
  const styleId = 'tawk-mobile-offset';
  if (document.getElementById(styleId)) return;

  const style = document.createElement('style');
  style.id = styleId;
  style.textContent = `
    @media (max-width: 899px) {
      #tawk-bubble-container,
      .tawk-min-container,
      .tawk-button {
        bottom: ${MOBILE_NAV_CLEARANCE} !important;
      }
    }
  `;
  document.head.appendChild(style);
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
    injectTawkMobileOffset();

    window.Tawk_API = window.Tawk_API || {};
    window.Tawk_LoadStart = new Date();

    window.Tawk_API.customStyle = {
      zIndex: TAWK_CONFIG.zIndex,
      visibility: {
        desktop: { xOffset: 20, yOffset: 20 },
        mobile: { xOffset: 16, yOffset: 96 },
      },
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
