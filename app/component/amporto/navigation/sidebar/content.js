import React, { useMemo, useCallback } from 'react';
import { useRouter } from 'found';
import { func } from 'prop-types';
import { intlShape } from 'react-intl';
import { configShape } from '../../../../util/shapes';
import Icon from '../../../Icon';
import LanguageSelect from '../../language';
import {
  COMMON_NAVIGATION_ITEMS,
  COMMON_NAVIGATION_ITEMS_PATH_MAP,
  generateNavigationItemsConfig
} from '../common';

const NAVIGATION_PROFILE = 'profile';
const NAVIGATION_ONBOARDING = 'onboarding';

const NAVIGATION_ITEMS_PATH_MAP = {
  ...COMMON_NAVIGATION_ITEMS_PATH_MAP,
  [NAVIGATION_PROFILE]: `/${NAVIGATION_PROFILE}`,
  [NAVIGATION_ONBOARDING]: `/${NAVIGATION_ONBOARDING}`
};

const Content = (
  { onClose },
  {
    config: {
      title,
      onboarding,
      optionalNavigationItems,
      privacyPolicyLink,
      cookiesPolicyLink
    },
    intl
  }
) => {
  const { router } = useRouter();

  const navigationItems = useMemo(
    () =>
      generateNavigationItemsConfig(
        optionalNavigationItems,
        COMMON_NAVIGATION_ITEMS
      ),
    [optionalNavigationItems]
  );

  const navigate = useCallback(
    item => {
      onClose();
      router.push(NAVIGATION_ITEMS_PATH_MAP[item]);
    },
    [router.push, onClose]
  );

  return (
    <>
      <>
        <div className="top">
          <h1>{title}</h1>
          <button
            onClick={onClose}
            type="button"
            aria-label={intl.messages['nav-menu-close']}
          >
            <Icon img="icon-close" viewBox="0 0 33 33" />
          </button>
        </div>
        <LanguageSelect />
        <nav>
          {Object.values(navigationItems).map(item => (
            <button
              key={item}
              onClick={() => navigate(item)}
              type="button"
              aria-label={intl.messages[`nav-item-aria-${item}`]}
            >
              <Icon img={`icon-${item}`} viewBox="0 0 24 24" />
              <span>{intl.messages[`nav-item-${item}`]}</span>
            </button>
          ))}
          <hr />
          <button
            onClick={() => navigate(NAVIGATION_PROFILE)}
            type="button"
            aria-label={intl.messages[`nav-item-aria-${NAVIGATION_PROFILE}`]}
          >
            <Icon img={`icon-${NAVIGATION_PROFILE}`} viewBox="0 0 24 24" />
            <span>{intl.messages[`nav-item-${NAVIGATION_PROFILE}`]}</span>
          </button>
          {onboarding && (
            <>
              <hr />
              <button
                onClick={() => navigate(NAVIGATION_ONBOARDING)}
                type="button"
                aria-label={intl.formatMessage(
                  { id: `nav-item-aria-${NAVIGATION_ONBOARDING}` },
                  { app: title }
                )}
              >
                <Icon
                  img={`icon-${NAVIGATION_ONBOARDING}`}
                  viewBox="0 0 24 24"
                />
                <span>
                  {intl.formatMessage(
                    { id: `nav-item-${NAVIGATION_ONBOARDING}` },
                    { app: title }
                  )}
                </span>
              </button>
            </>
          )}
        </nav>
      </>
      {(privacyPolicyLink || cookiesPolicyLink) && (
        <footer>
          <hr />
          {privacyPolicyLink && (
            <a
              target="_blank"
              href={privacyPolicyLink}
              rel="noreferrer"
              aria-label={intl.messages['privacy-policy-aria']}
            >
              {intl.messages['privacy-policy']}
            </a>
          )}
          {cookiesPolicyLink && (
            <a
              target="_blank"
              href={cookiesPolicyLink}
              rel="noreferrer"
              aria-label={intl.messages['cookies-policy-aria']}
            >
              {intl.messages['cookies-policy']}
            </a>
          )}
        </footer>
      )}
    </>
  );
};

Content.propTypes = {
  onClose: func.isRequired
};

Content.contextTypes = {
  config: configShape.isRequired,
  intl: intlShape.isRequired
};

export default Content;
