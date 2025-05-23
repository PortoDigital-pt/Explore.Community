import React from 'react';
import { matchShape } from 'found';
import { func, string } from 'prop-types';
import { connectToStores } from 'fluxible-addons-react';
import RoutesTabs from './routes-tabs';
import Details from '../details';
import { getRoutesById } from '../../../../util/amporto/api';
import { routesShape } from './shape';
import { locationShape } from '../../../../util/shapes';

const Page = (
  { selectedData, language, location },
  { match, executeAction },
) => {

  return (
    <div className="routes-content-tabs">
      <RoutesTabs
        pois={selectedData?.pois}
        breakpoint="mobile"
        executeAction={executeAction}
        location={location}
        images={selectedData?.images}
      />
    </div>
  );
};

Page.contextTypes = {
  match: matchShape.isRequired,
  executeAction: func.isRequired,
};

Page.propTypes = {
  language: string.isRequired,
  selectedData: routesShape.isRequired,
  location: locationShape.isRequired,
};

export const MobileContent = connectToStores(
  Page,
  ['PositionStore'],
  ({ getStore }) => ({
    location: getStore('PositionStore').getLocationState(),
  }),
);

const PoiDetailsPage = () => (
  <Details
    getDataById={getRoutesById}
    onErrorPath="/routes"
    PageContent={MobileContent}
    MobileContent={MobileContent}
  />
);

export default PoiDetailsPage;
