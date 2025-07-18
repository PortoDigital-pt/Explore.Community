import React, { useCallback, useMemo, useState } from 'react';
import {
  string,
  func,
  shape,
  number,
  oneOfType,
  arrayOf,
  bool
} from 'prop-types';
import classname from 'classnames';
import { connectToStores } from 'fluxible-addons-react';
import { intlShape } from 'react-intl';
import { useRouter } from 'found';
import { configShape, locationShape } from '../../../../util/shapes';
import Icon from '../../../../component/Icon';
import { showDistance } from '../../../../util/amporto/geo';
import {
  getPoiById,
  getPoiList,
  getRoutesList
} from '../../../../util/amporto/api';
import Details from '../details';
import FavouriteExplore from '../../../../component/FavouriteExploreContainer';
import ShareButton from '../../../../component/amporto/share-button';
import ImageSlider from '../../../../component/amporto/image-slider';
import useDistanceToTarget from '../../../../hooks/useDistanceToTarget';
import useExpandableDescription from '../../../../hooks/useExpandableDescription';
import useListData from '../../../../hooks/useListData';
import useModal from '../../../../hooks/useModal';
import { DetailsContentModal } from '../../common';
import { PAGE_CONTENT_TYPE_MAP } from '../page-content-resolver/page-content';
import { NearByList } from '../nearbyList';
import { getItineraryPath } from '../routes/util';

export const poiShape = shape({
  type: string.isRequired,
  id: string.isRequired,
  address: shape({
    streetAddress: string,
    streetNumber: string
  }).isRequired,
  category: oneOfType([string, arrayOf(string)]).isRequired,
  contacts: shape({
    telephone: string,
    url: string
  }),
  description: string,
  lon: number.isRequired,
  lat: number.isRequired,
  name: string.isRequired,
  priceRange: string,
  calendar: arrayOf(string),
  districts: arrayOf(string),
  images: arrayOf(string)
});

const Mobile = (
  {
    location,
    onDetails,
    selectedData,
    showShare = false,
    innerRef,
    fromRoutes = false,
    onStartItinerary
  },
  { intl, executeAction }
) => {
  const { router } = useRouter();
  const distanceToPoi = useDistanceToTarget({
    executeAction,
    location,
    targetPoint: selectedData
  });

  return (
    <div className="mobile-view" ref={innerRef}>
      {fromRoutes ? (
        <div className="header">
          <div className="title">
            <Icon img="icon-circle" text={selectedData.position} />
            <h3 className="routes-tab">{selectedData.name}</h3>
          </div>

          <div className="distance">
            {!!distanceToPoi &&
              `${intl.messages['at-distance']} ${showDistance(distanceToPoi)}`}
          </div>
        </div>
      ) : (
        <div className="header">
          <div className="top">
            <div className="title">
              <Icon
                img="icon-explore-icon_pois_with_background"
                viewBox="0 0 50 50"
              />
              <h3>{selectedData.name}</h3>
            </div>
            {showShare && <ShareButton withBackground />}
            <FavouriteExplore data={selectedData} />
          </div>
          <div className="distance">
            {!!distanceToPoi &&
              `${intl.messages['at-distance']} ${showDistance(distanceToPoi)}`}
          </div>
        </div>
      )}

      {fromRoutes ? (
        <div className="buttons">
          <button
            type="button"
            className="button-light"
            aria-label={intl.messages.details}
            onClick={onDetails}
          >
            {intl.messages.details}
          </button>
          <button
            type="button"
            onClick={onStartItinerary}
            aria-label={intl.messages['start-here']}
          >
            {intl.messages['start-here']}
          </button>
        </div>
      ) : (
        <div className="buttons">
          <button
            type="button"
            className="button-light"
            aria-label={intl.messages.directions}
            onClick={() =>
              router.push(getItineraryPath(location, selectedData))
            }
          >
            {intl.messages.directions}
          </button>
          <button
            type="button"
            onClick={onDetails}
            aria-label={intl.messages.details}
          >
            {intl.messages.details}
          </button>
        </div>
      )}

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
          <div className="contacts">
            <div className="categories">
              {!fromRoutes &&
                (Array.isArray(selectedData.category) ? (
                  selectedData.category.map(category => (
                    <div key={category} className="category">
                      {category}
                    </div>
                  ))
                ) : (
                  <div className="category">{selectedData.category}</div>
                ))}
            </div>
            {selectedData.calendar && (
              <div>
                <Icon img="icon-time" viewBox="0 0 16 16" />
                <div className="schedule">
                  {selectedData.calendar.map(schedule => (
                    <p key={schedule}>{schedule}</p>
                  ))}
                </div>
              </div>
            )}
            {selectedData.address.streetAddress && (
              <div>
                <Icon img="icon-location" viewBox="0 0 16 16" />
                <p>{`${selectedData.address.streetAddress}${
                  selectedData.address.streetNumber
                    ? `, ${selectedData.address.streetNumber}`
                    : ''
                }`}</p>
              </div>
            )}
            {selectedData.priceRange && (
              <div>
                <Icon img="icon-cost" viewBox="0 0 16 16" />
                <p>{intl.messages[`tickets-${selectedData.priceRange}`]}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

Mobile.propTypes = {
  innerRef: shape(),
  onDetails: func.isRequired,
  selectedData: poiShape.isRequired,
  location: locationShape.isRequired,
  showShare: bool,
  fromRoutes: bool,
  onStartItinerary: func
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

const Content = ({ selectedData, language, location }, { intl, config }) => {
  const { router } = useRouter();
  const { isOpen, open, close } = useModal();
  const [selected, setSelected] = useState(null);

  const ExpandableDescription = useExpandableDescription({
    description: selectedData.description,
    intl
  });

  const navigate = useCallback(
    id => router.push(`/${selected?.type}/${id}`),
    [router.push, selected?.type]
  );

  const ModalPageContent = useMemo(
    () => PAGE_CONTENT_TYPE_MAP[selected?.type],
    [selected?.type]
  );

  const poiArgs = useMemo(
    () => ({
      language,
      limit: 10,
      categories: Object.keys(config.filters.pois)
    }),
    [language]
  );

  const { data: poiData } = useListData({
    enabled: !!selectedData,
    getData: getPoiList,
    coordinatesBounds: config.coordinatesBounds,
    location: {
      lat: selectedData.lat,
      lon: selectedData.lon,
      hasLocation: selectedData.lat && selectedData.lon
    },
    args: poiArgs
  });

  const filterPoiData =
    poiData?.filter(poi => poi.id !== selectedData.id) ?? null;

  const nearbyRoutesArgs = useMemo(
    () => ({
      language,
      limit: 10,
      itineraryItem: selectedData.id
    }),
    [language, selectedData.id]
  );

  const { data: nearbyRoutesData } = useListData({
    enabled: !!selectedData,
    getData: getRoutesList,
    args: nearbyRoutesArgs
  });

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
        {selectedData.description && (
          <div className="description">
            <h3>{intl.messages.about}</h3>
            <ExpandableDescription />
          </div>
        )}
        {selectedData.calendar && (
          <div className="description">
            <h3>{intl.messages['opening-hours']}</h3>
            {selectedData.calendar.map(schedule => (
              <p key={schedule}>{schedule}</p>
            ))}
          </div>
        )}
        <div className="contacts">
          {selectedData.priceRange && (
            <div>
              <Icon img="icon-cost" viewBox="0 0 16 16" />
              <p>{intl.messages[`tickets-${selectedData.priceRange}`]}</p>
            </div>
          )}
          {selectedData.contacts?.url && (
            <div>
              <Icon img="icon-website" viewBox="0 0 16 16" />
              <a
                href={selectedData.contacts.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                Website
              </a>
            </div>
          )}
          {selectedData.contacts?.telephone && (
            <div>
              <Icon img="icon-phone" viewBox="0 0 16 16" />
              <p>
                {selectedData.contacts.telephone ?? 'No information at all'}
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="list">
        <h3 className="list-title">{intl.messages['near-here']}</h3>
        <div className="list-scroll">
          <NearByList
            type="pois"
            cardType="small"
            data={filterPoiData}
            open={open}
            setSelected={setSelected}
          />
        </div>
      </div>

      {nearbyRoutesData?.length > 0 && (
        <div className="list">
          <h3 className="list-title">{intl.messages['it-is-in-the-routes']}</h3>
          <div className="list-scroll">
            <NearByList
              type="routes"
              cardType="large"
              data={nearbyRoutesData}
              open={open}
              setSelected={setSelected}
            />
          </div>
        </div>
      )}

      <button
        className="start-trip-button padding"
        type="button"
        onClick={() => router.push(getItineraryPath(location, selectedData))}
        aria-label={intl.messages.directions}
      >
        {intl.messages.directions}
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
  selectedData: poiShape.isRequired,
  language: string.isRequired,
  location: locationShape.isRequired
};

Content.contextTypes = {
  intl: intlShape.isRequired,
  config: configShape.isRequired
};

export const PageContent = connectToStores(
  Content,
  ['PreferencesStore'],
  ({ getStore }) => ({
    language: getStore('PreferencesStore').getLanguage(),
    location: getStore('PositionStore').getLocationState()
  })
);

const PoiDetailsPage = () => (
  <Details
    getDataById={getPoiById}
    onErrorPath="/pois"
    PageContent={PageContent}
    MobileContent={MobileContent}
  />
);

export default PoiDetailsPage;
