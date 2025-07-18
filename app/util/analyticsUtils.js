/**
 * This file contains functions for UI analytics.
 * Contains code used in both client and server
 */

/**
 * Add an analytics event to be sent to analytics server
 * Currently events have fields { event, category, action, name }
 *
 * @param {object} event
 *
 * @return void
 */
export function addAnalyticsEvent(event) {
  let newEvent = event;
  const config = window.state?.context?.plugins['extra-context-plugin'].config;
  if (event.event === undefined) {
    // this is the default event field if none is defined
    newEvent = { event: 'sendMatomoEvent', ...event };
  }

  if (
    (config?.useCookiesPrompt &&
      window.CookieInformation?.getConsentGivenFor('cookie_cat_statistic')) ||
    !config?.useCookiesPrompt
  ) {
    window.dataLayer.push(newEvent);
  }
}

/**
 * Get code to initialize UI analytics in server side
 *
 * @param {number|string} GTMid Google Tag Manager id
 *
 * @return string
 */
export function getAnalyticsInitCode(config, hostname) {
  if (
    config.analyticsScript &&
    hostname &&
    (!hostname.match(/dev|test/) || config.devAnalytics)
  ) {
    return config.analyticsScript(
      hostname,
      config.sendAnalyticsCustomEventGoals
    );
  }

  if (config.GTMid) {
    // Google Tag Manager script
    return `<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','${config.GTMid}');</script>\n`;
  }
  return '';
}

export function initMatomoClientAnalytics({ url, siteId }) {
  if (process.env.NODE_ENV === 'development') {
    return;
  }

  const _paq = (window._paq = window._paq || []);

  // Configure Matomo
  _paq.push(['trackPageView']);
  _paq.push(['enableLinkTracking']);

  // Set up the tracking script
  (function () {
    _paq.push(['setTrackerUrl', `${url}matomo.php`]);
    _paq.push(['setSiteId', siteId]); // Make sure this matches your site ID
    const d = document;
    const g = d.createElement('script');
    const s = d.getElementsByTagName('script')[0];
    g.async = true;
    g.src = `${url}matomo.js`;
    s.parentNode.insertBefore(g, s);
  })();

  // Track route changes
  const originalHistoryPush = window.history.pushState;
  const originalHistoryReplace = window.history.replaceState;

  function trackPageView(url) {
    if (window._paq) {
      window._paq.push(['setCustomUrl', url]);
      window._paq.push(['setDocumentTitle', document.title]);
      window._paq.push(['trackPageView']);
    }
  }

  // Override history methods to track route changes
  window.history.pushState = function (state, title, url) {
    originalHistoryPush.call(window.history, state, title, url);
    trackPageView(url);
  };

  window.history.replaceState = function (state, title, url) {
    originalHistoryReplace.call(window.history, state, title, url);
    trackPageView(url);
  };

  // Listen for popstate events (back/forward buttons)
  window.addEventListener('popstate', function () {
    trackPageView(window.location.pathname + window.location.search);
  });
}

const handleChange = () => {
  if (!window.CookieInformation) {
    return false;
  }
  return window.CookieInformation.getConsentGivenFor('cookie_cat_statistics');
};
/**
 * Client side intialization for UI analytics
 *
 * @return void
 */
export function initAnalyticsClientSide(config) {
  window.dataLayer = window.dataLayer || [];
  if (config?.useCookiesPrompt) {
    window.addEventListener(
      'CookieInformationConsentGiven',
      handleChange,
      false
    );
  }
}

/**
 * Handle user analytics
 * @param {object} user - user object
 * @param {object} config - configuration object
 */
export function handleUserAnalytics(user, config) {
  if (config.loginAnalyticsEventName && user?.sub) {
    addAnalyticsEvent({
      event: config.loginAnalyticsEventName,
      [config.loginAnalyticsKey]: user.sub
    });
  }
}
