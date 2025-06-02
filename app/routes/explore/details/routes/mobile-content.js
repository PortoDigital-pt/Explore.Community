import React from 'react';
import { func, shape } from 'prop-types';
import Card from '../../../../component/amporto/card';
import { routesShape } from './shape';

export const MobileContent = ({ onDetails, selectedData, innerRef }) => (
  <div className="mobile-view" ref={innerRef}>
    <div className="content">
      <Card
        key={selectedData.id}
        className="large-card"
        onClick={onDetails}
        data={selectedData}
        type="routes"
        showDescription
      />
    </div>
  </div>
);

MobileContent.propTypes = {
  innerRef: shape(),
  onDetails: func.isRequired,
  selectedData: routesShape.isRequired
};