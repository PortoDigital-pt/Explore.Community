import React from 'react';
import { intlShape } from 'react-intl';
import { func, shape } from 'prop-types';
import { connectToStores } from 'fluxible-addons-react';
import Card from '../../../../component/amporto/card';
import { touristTripShape } from './shape';

const Mobile = ({ onDetails, selectedData, innerRef }) => (
  <div className="mobile-view" ref={innerRef}>
    <div className="content">
      <Card
        key={selectedData.id}
        className="large-card"
        onClick={() => onDetails(selectedData)}
        data={selectedData}
        type="routes"
        showDescription
      />
    </div>
  </div>
);

Mobile.propTypes = {
  innerRef: shape(),
  onDetails: func.isRequired,
  selectedData: touristTripShape.isRequired
};

Mobile.contextTypes = {
  intl: intlShape.isRequired,
  executeAction: func.isRequired
};

export const MobileContent = connectToStores(
  Mobile,
  ['PositionStore'],
  ({ getStore }) => ({
    location: getStore('PositionStore').getLocationState()
  })
);
