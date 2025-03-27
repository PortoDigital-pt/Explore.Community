import React from 'react';
import { bool } from 'prop-types';
import { intlShape } from 'react-intl';
import Icon from '../../Icon';

const ShareButton = ({ withBackground }, { intl }) => {
  const isShareAvailable = typeof navigator.share === 'function';

  const share = async () => {
    try {
      const url = window.location.href;

      await navigator.share({
        title: intl.messages['poi-share.title'],
        url,
        text: `${intl.messages['poi-share.text']} ${url}`
      });
    } catch (err) {
      console.trace('web-share api not available', err);
    }
  };

  return (
    isShareAvailable && (
      <div className="share-button-container">
        <button
          className="btn-share"
          allow="web-share"
          type="button"
          onClick={e => {
            e.stopPropagation();
            share();
          }}
        >
          <Icon
            className={`share${withBackground ? '-with-background' : ''}`}
            img={`icon-share${withBackground ? '-with-background' : ''}`}
            viewBox={withBackground ? '0 0 36 36' : ''}
          />
        </button>
      </div>
    )
  );
};

ShareButton.propTypes = {
  withBackground: bool
};

ShareButton.contextTypes = {
  intl: intlShape.isRequired
};

export default ShareButton;
