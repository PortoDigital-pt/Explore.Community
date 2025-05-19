import { RedirectException } from 'found';
import connectToStores from 'fluxible-addons-react/connectToStores';
import { bool, node } from 'prop-types';
import { configShape } from '../util/shapes';

const TopLevelContainer = ({ onboarded, children }, { config }) => {
  if (config.onboarding === null) {
    return children;
  }

  if (!onboarded) {
    throw new RedirectException('/onboarding', 302);
  }

  return children;
};

TopLevelContainer.contextTypes = {
  config: configShape.isRequired
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
