import React from 'react';
import { bool } from 'prop-types';
import Icon from '../../Icon';

const ShareButton = ({ withBackground }) => {
  const isShareAvailable = true; // typeof navigator.share === 'function';

  const share = async () => {
    try {
      await navigator.share({
        url: 'https://localhost:3000'
      });
    } catch (err) {
      console.trace('Error calling navigator.share', err);
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

export default ShareButton;
