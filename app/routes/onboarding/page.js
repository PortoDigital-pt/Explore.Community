/* eslint-disable react/no-array-index-key */
import React from 'react';
import { func, string } from 'prop-types';
import useRouter from 'found/useRouter';
import { FormattedMessage } from 'react-intl';
import connectToStores from 'fluxible-addons-react/connectToStores';
import { configShape } from '../../util/shapes';
import { setOnboarded } from '../../action/userPreferencesActions';

// TODO: onboarding

const OnboardingPage = (
  { currentLanguage, firstAccess },
  { config, executeAction }
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

  return <div className="onboarding" />;
};

OnboardingPage.propTypes = {
  currentLanguage: string.isRequired,
  firstAccess: string.isRequired
};

OnboardingPage.contextTypes = {
  executeAction: func.isRequired,
  config: configShape.isRequired
};

const connectedComponent = connectToStores(
  OnboardingPage,
  ['PreferencesStore'],
  context => ({
    currentLanguage: context.getStore('PreferencesStore').getLanguage(),
    firstAccess: context.getStore('PreferencesStore').getFirstAccess()
  })
);

export { connectedComponent as default, OnboardingPage as Component };
