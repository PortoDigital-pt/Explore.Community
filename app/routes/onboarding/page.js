import React, { useCallback } from 'react';
import { func, string, bool } from 'prop-types';
import useRouter from 'found/useRouter';
import { intlShape } from 'react-intl';
import connectToStores from 'fluxible-addons-react/connectToStores';
import LanguageSelect from '../../component/amporto/language';
import { configShape } from '../../util/shapes';
import {
  setOnboarded,
  setAllowedCookies
} from '../../action/userPreferencesActions';
import withBreakpoint from '../../util/withBreakpoint';
import { Content } from './content';
import SidebarMenu from '../../component/amporto/navigation/sidebar';
import Cookies from './cookies';

const OnboardingPage = (
  { breakpoint, currentLanguage, firstAccess, onboarded, allowedCookies },
  { config: { title, onboarding }, executeAction, intl }
) => {
  const {
    match: { location },
    router
  } = useRouter();

  const onStartExploring = useCallback(() => {
    executeAction(setOnboarded, true);
    // execute navigation in the next event loop tick - allowing time to process the store update.
    // this ensures onboarded store state updates before the Main component reads it on the next page.
    setTimeout(() => {
      router.push(
        !firstAccess || firstAccess === location.pathname ? '/' : firstAccess
      );
    }, 10);
  }, [executeAction, firstAccess, router.push, location.pathname]);

  const onAcceptCookies = useCallback(() => {
    executeAction(setAllowedCookies, true);
  }, [executeAction]);

  const onRejectCookies = useCallback(() => {
    executeAction(setAllowedCookies, false);
  }, [executeAction]);

  return (
    <div className="onboarding">
      <div className="top">
        <h1>{title}</h1>
        <div className="top-right">
          {breakpoint !== 'small' && <LanguageSelect />}
          {onboarded && <SidebarMenu />}
        </div>
      </div>
      {breakpoint === 'small' && <LanguageSelect />}
      <div className="content-wrapper">
        <Content
          pages={onboarding}
          currentLanguage={currentLanguage}
          hideArrows={breakpoint === 'small'}
          onExplore={onStartExploring}
          showOnExplore={!onboarded}
          onExploreDescription={intl.messages['onboarding-start-exploring']}
        />
        <div className="image">
          <img src="/img/onboarding.jpg" alt="onboarding" />
        </div>
      </div>

      <Cookies
        startOpen={!onboarded && !allowedCookies}
        language={currentLanguage}
        onAcceptCookies={onAcceptCookies}
        onRejectCookies={onRejectCookies}
      />
    </div>
  );
};

OnboardingPage.propTypes = {
  breakpoint: string.isRequired,
  currentLanguage: string.isRequired,
  firstAccess: string.isRequired,
  onboarded: bool.isRequired,
  allowedCookies: bool.isRequired
};

OnboardingPage.contextTypes = {
  executeAction: func.isRequired,
  config: configShape.isRequired,
  intl: intlShape.isRequired
};

export default connectToStores(
  withBreakpoint(OnboardingPage),
  ['PreferencesStore'],
  context => ({
    currentLanguage: context.getStore('PreferencesStore').getLanguage(),
    firstAccess: context.getStore('PreferencesStore').getFirstAccess(),
    onboarded: context.getStore('PreferencesStore').getOnboarded(),
    allowedCookies: context.getStore('PreferencesStore').getAllowedCookies()
  })
);
