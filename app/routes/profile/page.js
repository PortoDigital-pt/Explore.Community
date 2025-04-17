import React from 'react';
import { useRouter } from 'found';
import { intlShape } from 'react-intl';
import Icon from '../../component/Icon';
import BackButton from '../../component/BackButton';
import { configShape } from '../../util/shapes';

const ProfilePage = (props, { intl, config }) => {
  const { router } = useRouter();
  const { profile: profileConfig } = config;

  return (
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
              <h3>Nome do usuário</h3>
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
                onClick={() => null}
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
              onClick={() => null}
            >
              {intl.messages['profile-page-logout-button']}
            </button>
          )}
        </div>
      </div>
    </>
  );
};

ProfilePage.contextTypes = {
  config: configShape.isRequired,
  intl: intlShape.isRequired
};

export default ProfilePage;
