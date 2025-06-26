import React, { useCallback, useMemo, useState } from 'react';
import moment from 'moment';
import classname from 'classnames';
import {
  string,
  func,
  shape,
  bool,
  oneOfType,
  arrayOf,
  number
} from 'prop-types';
import connectToStores from 'fluxible-addons-react/connectToStores';
import { intlShape } from 'react-intl';
import { useRouter } from 'found';
import { configShape, locationShape } from '../../../../util/shapes';
import Icon from '../../../../component/Icon';
import { showDistance } from '../../../../util/amporto/geo';
import {
  getEventById,
  getEventList,
  getPoiList
} from '../../../../util/amporto/api';
import Details from '../details';
import FavouriteExplore from '../../../../component/FavouriteExploreContainer';
import ShareButton from '../../../../component/amporto/share-button';
import ImageSlider from '../../../../component/amporto/image-slider';
import useDistanceToTarget from '../../../../hooks/useDistanceToTarget';
import useExpandableDescription from '../../../../hooks/useExpandableDescription';
import { NearByList } from '../nearbyList';
import useListData from '../../../../hooks/useListData';
import useModal from '../../../../hooks/useModal';
import { DetailsContentModal } from '../../common';
import { PAGE_CONTENT_TYPE_MAP } from '../page-content-resolver/page-content';
import { eventShape } from './shape';

const DateSection = ({ startDate, endDate }) => {
  const start = moment(startDate);
  const end = moment(endDate);

  const startDay = start.isValid() ? start.format('D MMM') : null;
  const endDay = end.isValid() ? end.format('D MMM') : null;
  const startTime = start.isValid() ? start.format('HH[h]mm') : null;
  const endTime = end.isValid() ? end.format('HH[h]mm') : null;

  const date =
    startDay === endDay
      ? startDay
      : startDay && endDay
        ? `${startDay} - ${endDay}`
        : startDay ?? endDay;
  const time =
    startTime === endTime
      ? startTime
      : startTime && endTime
        ? `${startTime} - ${endTime}`
        : startTime ?? endTime;

  return (
    <>
      {date && (
        <div>
          <Icon img="icon-calendar" viewBox="0 0 16 16" />
          <p>{date}</p>
        </div>
      )}
      {time && (
        <div>
          <Icon img="icon-time" viewBox="0 0 16 16" />
          <p>{time}</p>
        </div>
      )}
    </>
  );
};

DateSection.propTypes = {
  startDate: string,
  endDate: string
};

const Mobile = (
  { location, onDetails, selectedData, showShare = false, innerRef },
  { intl, executeAction }
) => {
  const distanceToEvent = useDistanceToTarget({
    executeAction,
    location,
    targetPoint: selectedData
  });

  return (
    <div className="mobile-view" ref={innerRef}>
      <div className="header">
        <div className="top">
          <div className="title">
            <Icon
              img="icon-explore-icon_events_with_background"
              viewBox="0 0 50 50"
            />
            <h3>{selectedData.name}</h3>
          </div>
          {showShare && <ShareButton withBackground />}
          <FavouriteExplore data={selectedData} />
        </div>
        <div className="distance">
          {!!distanceToEvent &&
            `${intl.messages['at-distance']} ${showDistance(distanceToEvent)}`}
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
          <div className="contacts">
            <div className="categories">
              {Array.isArray(selectedData.category) ? (
                selectedData.category.map(category => (
                  <div key={category} className="category">
                    {category}
                  </div>
                ))
              ) : (
                <div className="category">{selectedData.category}</div>
              )}
            </div>
            <div className="dates">
              <DateSection
                startDate={selectedData.startDate}
                endDate={selectedData.endDate}
              />
            </div>
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
            {selectedData.price && (
              <div>
                <Icon img="icon-cost" viewBox="0 0 16 16" />
                <p>{`${
                  selectedData.price === '0'
                    ? intl.messages['free-of-charge']
                    : selectedData.price
                }`}</p>
              </div>
            )}
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

Mobile.propTypes = {
  innerRef: shape(),
  onDetails: func.isRequired,
  selectedData: eventShape.isRequired,
  location: locationShape.isRequired,
  showShare: bool
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

export const EventContactDetails = ({ selectedData }, { intl }) => (
  <div className="contacts">
    <div className="dates">
      <DateSection
        startDate={selectedData.startDate}
        endDate={selectedData.endDate}
      />
    </div>
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

    {selectedData.price && (
      <div>
        <Icon img="icon-cost" viewBox="0 0 16 16" />
        <p>{`${
          selectedData.price === '0'
            ? intl.messages['free-of-charge']
            : selectedData.price
        }`}</p>
      </div>
    )}
  </div>
);

EventContactDetails.propTypes = {
  selectedData: eventShape.isRequired
};

EventContactDetails.contextTypes = {
  intl: intlShape.isRequired
};

const Content = ({ selectedData, language }, { intl, config }) => {
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
      limit: 11
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

  const nearEventsArgs = useMemo(() => {
    const mappedCategories = selectedData?.category?.map(
      cat =>
        Object.values(config.filters.events).find(
          // eslint-disable-next-line no-unused-vars
          value => value[language] === cat
        )[0]
    );
    return {
      language,
      limit: 11,
      categories: mappedCategories
    };
  }, [language, selectedData?.category]);

  const { data: nearEventsData } = useListData({
    enabled: !!selectedData,
    getData: getEventList,
    coordinatesBounds: config.coordinatesBounds,
    location: {
      lat: selectedData.lat,
      lon: selectedData.lon,
      hasLocation: selectedData.lat && selectedData.lon
    },
    args: nearEventsArgs
  });

  const filterEventsData = nearEventsData?.filter(
    event => event.id !== selectedData.id
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
        <EventContactDetails selectedData={selectedData} />
        <div className="description">
          {selectedData.description && (
            <>
              <h3>{intl.messages.about}</h3>
              <ExpandableDescription />
            </>
          )}

          <a
            href={selectedData.website}
            target="_blank"
            rel="noopener noreferrer"
          >
            {intl.messages['know-more']}
          </a>
        </div>
      </div>

      {filterEventsData && (
        <div className="list">
          <h3 className="list-title">{intl.messages['near-to-event-title']}</h3>
          <div className="list-scroll">
            <NearByList
              type="events"
              cardType="large"
              data={filterEventsData}
              open={open}
              setSelected={setSelected}
            />
          </div>
        </div>
      )}

      {(poiData ?? selectedData.id)?.length > 0 && (
        <div className="list">
          <h3 className="list-title">{intl.messages['near-here']}</h3>
          <div className="list-scroll">
            <NearByList
              type="pois"
              cardType="small"
              data={poiData}
              open={open}
              setSelected={setSelected}
            />
          </div>
        </div>
      )}

      {isOpen && selected !== null && ModalPageContent && (
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
  selectedData: eventShape.isRequired,
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

const EventDetailsPage = () => (
  <Details
    getDataById={getEventById}
    onErrorPath="/events"
    PageContent={PageContent}
    MobileContent={MobileContent}
  />
);

export default EventDetailsPage;
