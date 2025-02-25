import React, { useCallback } from 'react';
import { func, string, bool } from 'prop-types';
import classnames from 'classnames';
import useRouter from 'found/useRouter';
import { intlShape } from 'react-intl';
import connectToStores from 'fluxible-addons-react/connectToStores';
import LanguageSelect from '../../component/amporto/language';
import { configShape } from '../../util/shapes';
import { setOnboarded } from '../../action/userPreferencesActions';
import withBreakpoint from '../../util/withBreakpoint';
import { Content } from './content';
import SidebarMenu from '../../component/amporto/navigation/sidebar';

const OnboardingPage = (
  { breakpoint, currentLanguage, firstAccess, onboarded },
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
        !firstAccess || firstAccess === location.pathname
          ? '/explore'
          : firstAccess
      );
    }, 10);
  }, [executeAction, firstAccess, router.push, location.pathname]);

  return (
    <div className="onboarding">
      <div className="top">
        <h1>{title}</h1>
        <div className="top-right">
          <LanguageSelect
            classname={classnames({
              hide: breakpoint === 'small'
            })}
          />
          {onboarded && <SidebarMenu />}
        </div>
      </div>
      <LanguageSelect
        classname={classnames({
          hide: breakpoint !== 'small'
        })}
      />
      <div className="content-wrapper">
        <Content pages={onboarding} currentLanguage={currentLanguage} />
        <div className="image">
          <img src="/img/onboarding.jpg" alt="onboarding" />
        </div>
      </div>
      {!onboarded && (
        <button
          aria-label={intl.messages['onboarding-start-exploring']}
          type="button"
          onClick={onStartExploring}
        >
          {intl.messages['onboarding-start-exploring']}
        </button>
      )}
    </div>
  );
};

OnboardingPage.propTypes = {
  breakpoint: string.isRequired,
  currentLanguage: string.isRequired,
  firstAccess: string.isRequired,
  onboarded: bool.isRequired
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
    onboarded: context.getStore('PreferencesStore').getOnboarded()
  })
);
