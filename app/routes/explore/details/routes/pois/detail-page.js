import React, { useCallback } from 'react';
import { matchShape, useRouter } from 'found';
import { bool, func, string } from 'prop-types';
import { connectToStores } from 'fluxible-addons-react';
import { intlShape } from 'react-intl';
import RoutesTabs from './routes-tabs';
import Details from '../../details';
import { getRoutesById } from '../../../../../util/amporto/api';
import { routesShape } from '../shape';
import useModal from '../../../../../hooks/useModal';
import { DetailsContentModal } from '../../../common';
import { clearSelectedItem } from '../../../../../action/RoutesActions';
import { DesktopContent } from './desktop';
import { getItineraryPath } from '../util';
import FavouriteExplore from '../../../../../component/FavouriteExploreContainer';
import ShareButton from '../../../../../component/amporto/share-button';
import Icon from '../../../../../component/Icon';
import { locationShape } from '../../../../../util/shapes';

const Page = (
  { selectedData, selectedItem, breakpoint, location },
  { intl, executeAction }
) => {
  const { router } = useRouter();
  const { isOpen, open, close } = useModal();

  const startItinerary = useCallback(() => {
    const point = selectedData?.pois[selectedItem];
    router.push(getItineraryPath(location, point));
  }, [selectedData?.pois, selectedItem]);

  React.useEffect(() => {
    return () => {
      executeAction(clearSelectedItem, null);
    };
  }, []);

  return (
    <div className="routes-content-tabs">
      {breakpoint !== 'large' && (
        <div className="routes-pois-header">
          <div className="title">
            <Icon
              img="icon-explore-icon_routes_with_background"
              viewBox="0 0 50 50"
            />
            <h3>{selectedData?.name}</h3>
          </div>

          <div className="share-and-favourite">
            <ShareButton withBackground />
            <FavouriteExplore data={selectedData} />
          </div>
        </div>
      )}

      <RoutesTabs
        pois={selectedData?.pois}
        breakpoint={breakpoint}
        selectedItem={selectedItem}
        intl={intl}
        onDetails={open}
        onStartItinerary={startItinerary}
      />

      {isOpen && (
        <DetailsContentModal
          data={selectedData?.pois[selectedItem]}
          isOpen={isOpen}
          onBackBtnClick={close}
          showShare
          PageContent={() => (
            <DesktopContent
              selectedData={selectedData?.pois[selectedItem]}
              breakpoint={breakpoint}
              onStartItinerary={startItinerary}
            />
          )}
        />
      )}
    </div>
  );
};

Page.contextTypes = {
  intl: intlShape.isRequired,
  match: matchShape.isRequired,
  executeAction: func.isRequired
};

Page.propTypes = {
  selectedData: routesShape.isRequired,
  selectedItem: bool.isRequired,
  breakpoint: string,
  location: locationShape.isRequired
};

export const Content = connectToStores(
  Page,
  ['PositionStore', 'RoutesStore'],
  ({ getStore }) => ({
    location: getStore('PositionStore').getLocationState(),
    selectedItem: getStore('RoutesStore').getSelectedItem()
  })
);

const RoutesPoiDetailsPage = () => (
  <Details
    getDataById={getRoutesById}
    onErrorPath="/routes"
    PageContent={Content}
    MobileContent={Content}
  />
);

export default RoutesPoiDetailsPage;
