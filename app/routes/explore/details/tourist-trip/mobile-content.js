import React from 'react';
import { intlShape } from 'react-intl';
import { bool, func, shape } from 'prop-types';
import { connectToStores } from 'fluxible-addons-react';
import { locationShape } from '../../../../util/shapes';
import Card from '../../../../component/amporto/card';
import { touristTripShape } from './shape';

const Mobile = (
  { location, onDetails, selectedData, showShare = false, innerRef },
  { intl, executeAction },
) => {
  return (
    <div className="mobile-view" ref={innerRef}>
      <div className="content">
        <Card
          key={selectedData.id}
          className="large-card"
          onClick={() => onDetails(selectedData)}
          data={selectedData}
          type="touristTrips"
          showDescription
        />
      </div>
    </div>
  );
};

Mobile.propTypes = {
  innerRef: shape(),
  onDetails: func.isRequired,
  selectedData: touristTripShape.isRequired,
  location: locationShape.isRequired,
  showShare: bool
};

Mobile.contextTypes = {
  intl: intlShape.isRequired,
  executeAction: func.isRequired,
};

export const MobileContent = connectToStores(
  Mobile,
  ['PositionStore'],
  ({ getStore }) => ({
    location: getStore('PositionStore').getLocationState(),
  }),
);
