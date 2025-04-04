import React from 'react';
import { func } from 'prop-types';
import { intlShape } from 'react-intl';
import Icon from '../../Icon';

const SeeOnMapButton = ({ onClick }, { intl }) => (
  <div className="see-on-map-container">
    <button
      className="see-on-map"
      type="button"
      aria-label={intl.messages['see-map-button-label']}
      onClick={onClick}
    >
      <Icon img="icon-see-on-map" viewBox="0 0 50 50" />
    </button>
    <p className="description">{intl.messages['see-map-button-label']}</p>
  </div>
);

SeeOnMapButton.propTypes = {
  onClick: func.isRequired
};

SeeOnMapButton.contextTypes = {
  intl: intlShape.isRequired
};

export default SeeOnMapButton;
