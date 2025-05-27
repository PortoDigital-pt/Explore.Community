import React from 'react';
import { matchShape } from 'found';
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

const Page = (
  { selectedData, selectedItem, breakpoint },
  { intl, executeAction }
) => {
  const { isOpen, open, close } = useModal();

  React.useEffect(() => {
    return () => {
      executeAction(clearSelectedItem, null);
    };
  }, []);

  return (
    <div className="routes-content-tabs">
      <RoutesTabs
        pois={selectedData?.pois}
        breakpoint={breakpoint}
        selectedItem={selectedItem}
        images={selectedData?.images}
        intl={intl}
        onDetails={open}
      />

      {isOpen && (
        <DetailsContentModal
          data={selectedData?.pois[selectedItem]}
          isOpen={isOpen}
          onBackBtnClick={close}
          showShare
          PageContent={() => <p>{selectedData?.pois[selectedItem]?.name}</p>}
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
  breakpoint: string
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
