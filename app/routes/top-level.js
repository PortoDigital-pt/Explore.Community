import { RedirectException } from 'found';
import connectToStores from 'fluxible-addons-react/connectToStores';
import { bool, node } from 'prop-types';

const TopLevelContainer = ({ onboarded, children }) => {
  if (!onboarded) {
    throw new RedirectException('/onboarding', 302);
  }

  return children;
};

TopLevelContainer.propTypes = {
  onboarded: bool.isRequired,
  children: node.isRequired
};

export default connectToStores(
  TopLevelContainer,
  ['PreferencesStore'],
  context => ({
    onboarded: context.getStore('PreferencesStore').getOnboarded()
  })
);
