import React from 'react';
import { intlShape } from 'react-intl';
import { bool } from 'prop-types';
import Icon from '../../../../component/Icon';
import { routesShape } from './shape';

export const RoutesDetails = (
  { selectedData },
  { intl }
) => (
  <div className="detail-info">
    <div className="pois-and-duration">
      <div>
        <Icon img="icon-camera" viewBox="0 0 16 16" />
        <p>
          {selectedData.pois?.length} {intl.messages.pois.toLowerCase()}
        </p>
      </div>
      <div>
        <Icon img="icon-icon_clock" viewBox="0 0 16 16" />
        <p>{selectedData.duration}h</p>
      </div>
    </div>

    <div>
      <Icon img="icon-difficulty" viewBox="0 0 16 16" />
      <p>
        {intl.messages['routes-card-difficulty-label']}:{' '}
        {
          intl.messages[
            `routes-card-difficulty-description-${selectedData.difficulty}`
          ]
        }
      </p>
    </div>
  </div>
);

RoutesDetails.propTypes = {
  selectedData: routesShape.isRequired,
  showDescription: bool
};

RoutesDetails.contextTypes = {
  intl: intlShape.isRequired
};
