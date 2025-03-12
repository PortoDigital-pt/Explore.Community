import React from 'react';
import classnames from 'classnames';
import { string, func } from 'prop-types';
import { intlShape } from 'react-intl';
import connectToStores from 'fluxible-addons-react/connectToStores';
import { setLanguage } from '../../../action/userPreferencesActions';
import { configShape } from '../../../util/shapes';
import configureMoment from '../../../util/configure-moment';

const LanguageSelect = (
  { currentLanguage, classname },
  { config, executeAction, intl }
) => (
  <div className="language-select">
    {config.availableLanguages.map(language => {
      const selected = language === currentLanguage;
      const aria = selected
        ? intl.formatMessage(
            { id: 'search-current-suggestion' },
            { selection: language }
          )
        : intl.formatMessage({ id: 'lang-selection' }, { language });

      return (
        <button
          key={language}
          aria-label={aria}
          className={classnames('language', classname, { selected })}
          type="button"
          onClick={() => {
            configureMoment(language, config);
            executeAction(setLanguage, language);
          }}
        >
          {language}
        </button>
      );
    })}
  </div>
);

LanguageSelect.propTypes = {
  currentLanguage: string.isRequired,
  classname: string
};

LanguageSelect.contextTypes = {
  executeAction: func.isRequired,
  config: configShape.isRequired,
  intl: intlShape.isRequired
};

export default connectToStores(
  LanguageSelect,
  ['PreferencesStore'],
  context => ({
    currentLanguage: context.getStore('PreferencesStore').getLanguage()
  })
);
