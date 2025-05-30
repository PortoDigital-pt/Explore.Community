import React from 'react';
import { intlShape } from 'react-intl';
import Icon from '../../../../component/Icon';
import { blockShape } from './shape';

export const BlockDetails = ({ selectedData }, { intl }) => (
  <div className="detail-info">
    <div className="pois-and-duration">
      {selectedData.pois?.length > 0 && (
        <div>
          <Icon img="icon-camera" viewBox="0 0 16 16" />
          <p>
            {selectedData.pois.length} {intl.messages.pois.toLowerCase()}
          </p>
        </div>
      )}
    </div>

    {selectedData.events?.length > 0 && (
      <div>
        <Icon img="icon-events" viewBox="0 0 16 16" />
        <p>
          {selectedData.events.length}{' '}
          {intl.messages['events-blocks'].toLowerCase()}
        </p>
      </div>
    )}
  </div>
);

BlockDetails.propTypes = {
  selectedData: blockShape.isRequired
};

BlockDetails.contextTypes = {
  intl: intlShape.isRequired
};
