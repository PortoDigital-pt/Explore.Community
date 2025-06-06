import React, { useState, useMemo, useCallback } from 'react';
import connectToStores from 'fluxible-addons-react/connectToStores';
import { string, func, shape, bool } from 'prop-types';
import { intlShape } from 'react-intl';
import { useRouter } from 'found';
import classname from 'classnames';
import { locationShape, configShape } from '../../../../util/shapes';
import ImageSlider from '../../../../component/amporto/image-slider';
import Card from '../../../../component/amporto/card';
import Skeleton from '../../../../component/amporto/skeleton';
import { blockShape } from './shape';
import useListData from '../../../../hooks/useListData';
import useModal from '../../../../hooks/useModal';
import useExpandableDescription from '../../../../hooks/useExpandableDescription';
import {
  getPoiList,
  getRoutesList,
  getBlockById,
  getEventList
} from '../../../../util/amporto/api';
import { DetailsContentModal } from '../../common';
import { PAGE_CONTENT_TYPE_MAP } from '../page-content-resolver/page-content';
import Icon from '../../../../component/Icon';
import Details from '../details';
import { getItineraryPath } from '../routes/util';
import FavouriteExplore from '../../../../component/FavouriteExploreContainer';
import ShareButton from '../../../../component/amporto/share-button';
import useDistanceToTarget from '../../../../hooks/useDistanceToTarget';
import { showDistance } from '../../../../util/amporto/geo';

export const Mobile = ({ onDetails, selectedData, innerRef }) => (
  <div className="mobile-view" ref={innerRef}>
    <div className="content">
      <Card
        key={selectedData.id}
        className="large-card"
        onClick={onDetails}
        data={selectedData}
        type="blocks"
        showDescription
      />
    </div>
  </div>
);

Mobile.propTypes = {
  innerRef: shape(),
  onDetails: func.isRequired,
  selectedData: shape().isRequired
};

const List = ({ type, data, cardType, setSelected, open }) => {
  return data === null
    ? Array.from({ length: 10 }, (_, i) => (
        <Skeleton key={`${i}-item`} className={`${cardType}-card`} />
      ))
    : data.map(item => (
        <Card
          key={item.id}
          className={`${cardType}-card`}
          onClick={() => {
            setSelected(item);
            open();
          }}
          data={item}
          type={type}
        />
      ));
};

const Content = (
  { selectedData, language },
  { intl, config: { coordinatesBounds } }
) => {
  const ExpandableDescription = useExpandableDescription({
    description: selectedData.description,
    intl
  });
  const { isOpen, open, close } = useModal();
  const [selected, setSelected] = useState(null);
  const { router } = useRouter();

  const poiArgs = useMemo(
    () => ({
      language,
      block: selectedData.id
    }),
    [language, selectedData]
  );
  const routeArgs = useMemo(
    () => ({
      language,
      block: selectedData.id
    }),
    [language, selectedData]
  );

  const eventArgs = useMemo(
    () => ({
      language,
      limit: 10
    }),
    [language]
  );

  const ModalPageContent = useMemo(
    () => PAGE_CONTENT_TYPE_MAP[selected?.type],
    [selected?.type]
  );

  const { data: poiData } = useListData({
    enabled: selectedData.pois?.length > 0,
    getData: getPoiList,
    args: poiArgs
  });

  const { data: routeData } = useListData({
    enabled: selectedData.routes?.length > 0,
    getData: getRoutesList,
    args: routeArgs
  });

  const { data: eventData } = useListData({
    enabled: !!selectedData,
    coordinatesBounds,
    location: {
      lat: selectedData.lat,
      lon: selectedData.lon,
      hasLocation: true
    },
    getData: getEventList,
    args: eventArgs
  });

  const navigate = useCallback(
    id => router.push(`/${selected?.type}/${id}`),
    [router.push, selected?.type]
  );

  return (
    <>
      {selectedData.images && (
        <div className="image">
          <ImageSlider images={selectedData.images} name={selectedData.name} />
        </div>
      )}
      <div
        className={classname('details', {
          lower: selectedData.images === null
        })}
      >
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
        </div>
        {selectedData.description && (
          <div className="description">
            <h3>{intl.messages.about}</h3>
            <ExpandableDescription />
          </div>
        )}
      </div>

      {(poiData ?? selectedData.pois)?.length > 0 && (
        <div className="list">
          <h3 className="list-title">{intl.messages['pois-blocks-title']}</h3>
          <div className="list-scroll">
            <List
              type="pois"
              cardType="small"
              data={poiData}
              open={open}
              setSelected={setSelected}
            />
          </div>
        </div>
      )}

      {(routeData ?? selectedData.routes)?.length > 0 && (
        <div className="list">
          <h3 className="list-title">{intl.messages['routes-blocks-title']}</h3>
          <div className="list-scroll">
            <List
              type="routes"
              cardType="large"
              data={routeData}
              open={open}
              setSelected={setSelected}
            />
          </div>
        </div>
      )}

      <div className="list">
        <h3 className="list-title">{`${intl.messages['events-blocks-title']} ${selectedData.name}`}</h3>
        <div className="list-scroll">
          <List
            type="events"
            cardType="large"
            data={eventData}
            open={open}
            setSelected={setSelected}
          />
        </div>
      </div>

      <button
        className="start-trip-button padding"
        type="button"
        onClick={() => router.push(getItineraryPath(selectedData))}
        aria-label={`${intl.messages['block-directions']} ${selectedData.name}`}
      >
        {`${intl.messages['block-directions']} ${selectedData.name}`}
      </button>

      {isOpen && selected !== null && (
        <DetailsContentModal
          isOpen={isOpen}
          data={selected}
          onBackBtnClick={() => {
            setSelected(null);
            close();
          }}
          onSeeOnMap={() => {
            close();
            navigate(selected.id);
          }}
          PageContent={ModalPageContent}
        />
      )}
    </>
  );
};

Content.propTypes = {
  selectedData: blockShape.isRequired,
  language: string.isRequired
};

Content.contextTypes = {
  intl: intlShape.isRequired,
  config: configShape.isRequired
};

export const PageContent = connectToStores(
  Content,
  ['PreferencesStore'],
  ({ getStore }) => ({
    language: getStore('PreferencesStore').getLanguage()
  })
);

const MobileDetails = (
  { location, onDetails, selectedData, showShare = false },
  { intl, executeAction }
) => {
  const ExpandableDescription = useExpandableDescription({
    description: selectedData.description,
    intl
  });
  const distanceToBlock = useDistanceToTarget({
    executeAction,
    location,
    targetPoint: selectedData
  });

  return (
    <div className="mobile-view">
      <div className="header">
        <div className="top">
          <div className="title">
            <Icon
              img="icon-explore-icon_blocks_with_background"
              viewBox="0 0 50 50"
            />
            <h3>{selectedData.name}</h3>
          </div>
          {showShare && <ShareButton withBackground />}
          <FavouriteExplore data={selectedData} />
        </div>
        <div className="distance">
          {!!distanceToBlock &&
            `${intl.messages['at-distance']} ${showDistance(distanceToBlock)}`}
        </div>
      </div>

      <div className="content">
        {selectedData.images && (
          <div className="image">
            <img
              src={selectedData.images[0]}
              alt={selectedData.name}
              loading="lazy"
            />
          </div>
        )}
        <div className="details">
          <div className="description">
            <ExpandableDescription />
          </div>
        </div>
      </div>

      <div className="bottom">
        <button
          type="button"
          onClick={onDetails}
          aria-label={intl.messages.details}
        >
          {intl.messages.details}
        </button>
      </div>
    </div>
  );
};

MobileDetails.propTypes = {
  onDetails: func.isRequired,
  selectedData: blockShape.isRequired,
  location: locationShape.isRequired,
  showShare: bool
};

MobileDetails.contextTypes = {
  intl: intlShape.isRequired,
  executeAction: func.isRequired
};

const MobileDetailsContent = connectToStores(
  MobileDetails,
  ['PositionStore'],
  ({ getStore }) => ({
    location: getStore('PositionStore').getLocationState()
  })
);

const BlockDetailsPage = () => (
  <Details
    getDataById={getBlockById}
    onErrorPath="/blocks"
    PageContent={PageContent}
    MobileContent={MobileDetailsContent}
  />
);

export default BlockDetailsPage;
