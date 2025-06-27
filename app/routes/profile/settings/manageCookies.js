import React from 'react';
import { intlShape } from 'react-intl';
import { bool, func } from 'prop-types';
import connectToStores from 'fluxible-addons-react/connectToStores';
import BackButton from '../../../component/BackButton';
import CustomModal from '../../../component/amporto/modal';
import Toggle from '../../../component/Toggle';
import { setAllowedCookies } from '../../../action/userPreferencesActions';

const ManageCookies = (
  { intl, isOpen, close, hasCookies },
  { executeAction }
) => {
  return (
    <CustomModal
      isOpen={isOpen}
      className="settings-cookies-popup"
      overlayClassName="settings-cookies-popup-overlay"
      shouldFocusAfterRender
      shouldCloseOnEsc
    >
      <BackButton
        onBackBtnClick={close}
        title={intl.messages['settings-cookies-popup-backbutton-title']}
        fallback="back"
      />

      <div className="content">
        <h3>{intl.messages['settings-cookies-popup-title']}</h3>

        <div className="info-bold">
          {intl.messages['settings-cookies-popup-info']}
        </div>

        <div className="info">
          {intl.messages['settings-cookies-popup-info-2']}
        </div>

        <div className="action">
          <span>Cookies</span>
          <label htmlFor="settings-toggle-cookies">
            <Toggle
              id="settings-toggle-cookies"
              toggled={hasCookies}
              title="accessibility"
              onToggle={() => {
                executeAction(setAllowedCookies, !hasCookies);
              }}
            />
          </label>
        </div>
      </div>
    </CustomModal>
  );
};

ManageCookies.propTypes = {
  intl: intlShape.isRequired,
  isOpen: func.isRequired,
  close: func.isRequired,
  hasCookies: bool.isRequired
};

ManageCookies.contextTypes = {
  executeAction: func.isRequired
};

export default connectToStores(
  ManageCookies,
  ['PreferencesStore'],
  context => ({
    hasCookies: context.getStore('PreferencesStore').getAllowedCookies()
  })
);
