import React, { Suspense, useCallback, useEffect, useState } from 'react';
import { connectToStores } from 'fluxible-addons-react';
import { intlShape } from 'react-intl';
import { func } from 'prop-types';
import { configShape, userShape } from '../../../util/shapes';
import BackButton from '../../../component/BackButton';
import Icon from '../../../component/Icon';
import useModal from '../../../hooks/useModal';
import CustomModal from '../../../component/amporto/modal';
import { deleteAccount } from '../../../util/apiUtils';
import Loading from '../../../component/Loading';

const SettingsPage = ({ user }, { config, intl }) => {
  const { isOpen, open, close } = useModal();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const removeAccount = async () => {
    if (!isLoading) {
      setIsLoading(true);

      const response = await deleteAccount();

      if (response) {
        window.location.href = `${config.URL.ROOTLINK}/logout`;
      } else {
        setError(true);
        close();
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    if (config.allowLogin && !user.name) {
      const url = encodeURI(
        `${window.location.origin || ''}${window.location?.pathname}`
      );
      const params = window.location?.search?.substring(1);
      const loginUrl = `/login?url=${url}&${params}`;
      window.location.href = loginUrl;
    }
  }, [user.name]);

  return (
    <>
      <BackButton
        title={intl.messages['settings-page-title']}
        fallback="back"
      />

      <div className="settings-page">
        <div className="settings-page-container">
          <div className="cards">
            <button
              type="button"
              className="card-item"
              aria-label={intl.messages['settings-page-card-title']}
              onClick={open}
            >
              <Icon
                img="icon-user-login"
                className="left-icon"
                viewBox="0 0 25 24"
              />
              <div className="text-container">
                <span className="title">
                  {intl.messages['settings-page-item-remove-account-title']}
                </span>
              </div>

              <Icon
                img="icon-chevron-right"
                className="right-icon"
                viewBox="0 0 24 24"
              />
            </button>
          </div>

          {isOpen && (
            <Suspense fallback="">
              <CustomModal
                isOpen={isOpen}
                className="settings-popup"
                overlayClassName="settings-popup-overlay"
                shouldFocusAfterRender
                shouldCloseOnEsc
              >
                <BackButton
                  onBackBtnClick={close}
                  title={intl.messages['settings-page-popup-title']}
                  fallback="back"
                />

                <div className="content">
                  {isLoading && (
                    <Loading className="container-spinner-remove-account" />
                  )}
                  {error && (
                    <div className="error">
                      <h3 style={{ color: 'red' }}>
                        {intl.messages['settings-page-popup-error']}
                      </h3>
                    </div>
                  )}
                  <h3>{intl.messages['settings-page-popup-header']}</h3>
                  <p>{intl.messages['settings-page-popup-info']}</p>
                  <div className="buttons">
                    <button
                      type="button"
                      className="cancel"
                      onClick={close}
                      aria-label={
                        intl.messages['settings-page-popup-btn-cancel']
                      }
                      disabled={isLoading}
                    >
                      {intl.messages['settings-page-popup-btn-cancel']}
                    </button>
                    <button
                      type="button"
                      className="confirm"
                      onClick={removeAccount}
                      disabled={isLoading}
                      aria-label={
                        intl.messages['settings-page-popup-btn-remove']
                      }
                    >
                      {intl.messages['settings-page-popup-btn-remove']}
                    </button>
                  </div>
                </div>
              </CustomModal>
            </Suspense>
          )}
        </div>
      </div>
    </>
  );
};

SettingsPage.contextTypes = {
  config: configShape.isRequired,
  intl: intlShape.isRequired,
  executeAction: func.isRequired
};

SettingsPage.propTypes = {
  user: userShape.isRequired
};

export default connectToStores(SettingsPage, ['UserStore'], context => ({
  config: configShape.isRequired,
  user: context.getStore('UserStore').getUser()
}));
