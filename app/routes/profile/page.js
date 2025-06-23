import React, { useCallback, useEffect } from 'react';
import { useRouter } from 'found';
import { intlShape } from 'react-intl';
import getContext from 'recompose/getContext';
import connectToStores from 'fluxible-addons-react/connectToStores';
import { shape } from 'prop-types';
import Icon from '../../component/Icon';
import BackButton from '../../component/BackButton';
import { configShape, userShape } from '../../util/shapes';
import LoadingPage from '../../component/LoadingPage';

const Page = props => {
  const { intl, config, user } = props;
  const { router } = useRouter();

  const {
    profile: profileConfig,
    URL: { ROOTLINK: rootLink }
  } = config;

  const handleLogout = useCallback(
    e => {
      e.preventDefault();
      window.location.href = `${rootLink}/logout`;
    },
    [rootLink]
  );

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

  return !config.allowLogin ? (
    <>
      <BackButton title={intl.messages['profile-page-back-button-title']} />
      <div className="profile-page">
        <div className="profile-page-container">
          <div className="cards">
            <button
              type="button"
              className="card-item"
              aria-label={intl.messages['profile-page-favorite-card-title']}
              onClick={() => router.push('/profile/favourites')}
            >
              <Icon
                img="icon-favourites"
                className="left-icon"
                viewBox="0 0 25 24"
              />

              <div className="text-container">
                <span className="title">
                  {intl.messages['profile-page-favorite-card-title']}
                </span>
                <span className="subtitle">
                  {intl.messages['profile-page-favorite-card-subtitle']}
                </span>
              </div>

              <Icon
                img="icon-chevron-right"
                className="right-icon"
                viewBox="0 0 24 24"
              />
            </button>

            {profileConfig.showNotification && (
              <button
                type="button"
                className="card-item"
                aria-label={
                  intl.messages['profile-page-notifications-card-title']
                }
                onClick={() => null}
              >
                <Icon
                  img="icon-bell"
                  className="left-icon"
                  viewBox="0 0 20 20"
                />

                <div className="text-container">
                  <span className="title">
                    {intl.messages['profile-page-notifications-card-title']}
                  </span>
                  <span className="subtitle">
                    {intl.messages['profile-page-notifications-card-subtitle']}
                  </span>
                </div>

                <Icon
                  img="icon-chevron-right"
                  className="right-icon"
                  viewBox="0 0 24 24"
                />
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  ) : user.name ? (
    <>
      <BackButton title={intl.messages['profile-page-back-button-title']} />
      <div className="profile-page">
        <div className="profile-page-container">
          {profileConfig.showAuthenticationInfo && (
            <div className="avatar-section">
              <Icon
                img="icon-default-avatar"
                className="avatar"
                viewBox="0 0 64 64"
              />
              <h3>{user?.name}</h3>
            </div>
          )}
          <div className="cards">
            <button
              type="button"
              className="card-item"
              aria-label={intl.messages['profile-page-favorite-card-title']}
              onClick={() => router.push('/profile/favourites')}
            >
              <Icon
                img="icon-favourites"
                className="left-icon"
                viewBox="0 0 25 24"
              />
              <div className="text-container">
                <span className="title">
                  {intl.messages['profile-page-favorite-card-title']}
                </span>
                <span className="subtitle">
                  {intl.messages['profile-page-favorite-card-subtitle']}
                </span>
              </div>

              <Icon
                img="icon-chevron-right"
                className="right-icon"
                viewBox="0 0 24 24"
              />
            </button>

            {profileConfig.showNotification && (
              <button
                type="button"
                className="card-item"
                aria-label={
                  intl.messages['profile-page-notifications-card-title']
                }
                onClick={() => null}
              >
                <Icon
                  img="icon-bell"
                  className="left-icon"
                  viewBox="0 0 20 20"
                />

                <div className="text-container">
                  <span className="title">
                    {intl.messages['profile-page-notifications-card-title']}
                  </span>
                  <span className="subtitle">
                    {intl.messages['profile-page-notifications-card-subtitle']}
                  </span>
                </div>

                <Icon
                  img="icon-chevron-right"
                  className="right-icon"
                  viewBox="0 0 24 24"
                />
              </button>
            )}

            {profileConfig.showAuthenticationInfo && (
              <button
                type="button"
                className="card-item"
                aria-label={intl.messages['profile-page-settings-card-title']}
                onClick={() => router.push('/profile/settings')}
              >
                <Icon
                  img="icon-gear"
                  className="left-icon"
                  viewBox="0 0 20 20"
                />

                <div className="text-container">
                  <span className="title">
                    {intl.messages['profile-page-settings-card-title']}
                  </span>
                  <span className="subtitle">
                    {intl.messages['profile-page-settings-card-subtitle']}
                  </span>
                </div>

                <Icon
                  img="icon-chevron-right"
                  className="right-icon"
                  viewBox="0 0 24 24"
                />
              </button>
            )}
          </div>

          {profileConfig.showAuthenticationInfo && (
            <button
              type="button"
              className="logout-button"
              aria-label={intl.messages['profile-page-logout-button']}
              onClick={handleLogout}
            >
              {intl.messages['profile-page-logout-button']}
            </button>
          )}
        </div>
      </div>
    </>
  ) : (
    <LoadingPage />
  );
};

Page.propTypes = {
  config: shape(configShape),
  intl: shape(intlShape),
  user: shape(userShape)
};

const ProfilePage = connectToStores(
  getContext({
    config: configShape.isRequired,
    intl: intlShape.isRequired
  })(Page),
  ['UserStore'],
  context => ({
    user: context.getStore('UserStore').getUser()
  })
);

export default ProfilePage;
