import React, { useCallback } from 'react';
import { string } from 'prop-types';
import { intlShape } from 'react-intl';
import { connectToStores } from 'fluxible-addons-react';
import { useRouter } from 'found';
import AutoSuggest from '@digitransit-component/digitransit-component-autosuggest';
import { configShape } from '../../../util/shapes';
import { withSearchContext } from '../../WithSearchContext';
import { getStopRoutePath } from '../../../util/path';

const AutoSuggestWithSearchContext = withSearchContext(AutoSuggest);
const SearchButton = ({ lang }, { config, intl }) => {
  const { router } = useRouter();
  const { fontWeights } = config;

  const handleClick = useCallback(
    selectedItem =>
      selectedItem !== null && router.push(getStopRoutePath(selectedItem)),
    [router.push]
  );

  return (
    <div className="search-button-container">
      <AutoSuggestWithSearchContext
        appElement="#app"
        sources={['History', 'Datasource']}
        targets={['Stations', 'Stops', 'Routes', 'Pois', 'Events']}
        id="searchButtonComponent"
        icon="search"
        placeholder={intl.messages['favourites-search-input-placeholder']}
        value=""
        selectHandler={handleClick}
        getAutoSuggestIcons={config.getAutoSuggestIcons}
        lang={lang}
        isMobile
        color="black"
        hoverColor="purple"
        fontWeights={fontWeights}
        required
        modeSet={config.iconModeSet}
        favouriteContext
        buttonMode
        mobileSearchPrefixIconId="search"
        eventSource={config.eventSource}
      />
    </div>
  );
};

SearchButton.contextTypes = {
  config: configShape.isRequired,
  intl: intlShape.isRequired
};

SearchButton.propTypes = {
  lang: string.isRequired
};

export default connectToStores(SearchButton, ['PreferencesStore'], context => ({
  lang: context.getStore('PreferencesStore').getLanguage()
}));
