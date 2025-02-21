import React from 'react';
import { RedirectException } from 'found';
import connectToStores from 'fluxible-addons-react/connectToStores';
import { bool} from 'prop-types';

const TopLevelContainer = ({ onboarded, children }) => {
    if (!onboarded) {
        throw new RedirectException('/about', 302);
    }

    return <>{children}</>;
};

TopLevelContainer.propTypes = {
    onboarded: bool.isRequired
};

export default connectToStores(
    TopLevelContainer,
    ['PreferencesStore'],
    context => ({
      onboarded: context.getStore('PreferencesStore').getOnboarded()
    })
);