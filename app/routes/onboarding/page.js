import React, { useState } from 'react';
import { func, string } from 'prop-types';
import classnames from 'classnames';
import useRouter from 'found/useRouter';
import { intlShape } from 'react-intl';
import connectToStores from 'fluxible-addons-react/connectToStores';
import LanguageSelect from '../../component/amporto/language';
import { configShape } from '../../util/shapes';
import { setOnboarded } from '../../action/userPreferencesActions';
import withBreakpoint from '../../util/withBreakpoint';
import { Content } from './content';

// TODO: onboarding

const OnboardingPage = (
  { breakpoint, currentLanguage, firstAccess },
  { config: { title }, executeAction, intl }
) => {
  const {
    match: { location },
    router
  } = useRouter();

  /*
  () => { 
    executeAction(setOnboarded, true);
    // execute navigation in the next event loop tick - allowing time to process the store update.
    // this ensures onboarded store state updates before the Main component reads it on the next page.
    setTimeout(() => {
      router.push(firstAccess === location.pathname ? '/' : firstAccess);
    }, 10);
  }
  */
 

  return (
    <div className="onboarding">
      <div className="top">
        <h1>{title}</h1>
        <LanguageSelect
          classname={classnames({
            hide: breakpoint === 'small'
          })}
        />
      </div>
      <LanguageSelect
        classname={classnames({
          hide: breakpoint !== 'small'
        })}
      />
      <Content />

      <button 
        aria-label={intl.messages['onboarding-start-exploring']}
        type="button"
        onClick={()=> {}} 
      >
        {intl.messages['onboarding-start-exploring']}
      </button>
    </div>
  );
};

OnboardingPage.propTypes = {
  breakpoint: string.isRequired,
  currentLanguage: string.isRequired,
  firstAccess: string.isRequired
};

OnboardingPage.contextTypes = {
  executeAction: func.isRequired,
  config: configShape.isRequired,
  intl: intlShape.isRequired
};

const connectedComponent = connectToStores(
  withBreakpoint(OnboardingPage),
  ['PreferencesStore'],
  context => ({
    currentLanguage: context.getStore('PreferencesStore').getLanguage(),
    firstAccess: context.getStore('PreferencesStore').getFirstAccess()
  })
);

export { connectedComponent as default, OnboardingPage as Component };
