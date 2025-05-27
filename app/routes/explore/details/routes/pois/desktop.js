import React from 'react';
import classname from 'classnames';
import { intlShape } from 'react-intl';
import { func } from 'prop-types';
import { connectToStores } from 'fluxible-addons-react';
import ImageSlider from '../../../../../component/amporto/image-slider';
import Icon from '../../../../../component/Icon';
import { poiShape } from '../../pois/page';
import useDistanceToTarget from '../../../../../hooks/useDistanceToTarget';
import { locationShape } from '../../../../../util/shapes';
import { showDistance } from '../../../../../util/amporto/geo';

const Content = (
  { location, selectedData, onStartItinerary },
  { intl, executeAction },
) => {
  const distanceToPoi = useDistanceToTarget({
    executeAction,
    location,
    targetPoint: selectedData,
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
          lower: selectedData.images === null,
        })}
      >
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

        {selectedData.description && (
          <div className="description">
            <h3>{intl.messages.about}</h3>
            <p>{selectedData.description}</p>
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

        <div className="buttons">
          <button
            type="button"
            onClick={onStartItinerary}
            aria-label={intl.messages['start-here']}
          >
            {intl.messages['start-here']}
          </button>
        </div>
      </div>
    </>
  );
};

Content.propTypes = {
  location: locationShape.isRequired,
  selectedData: poiShape.isRequired,
  onStartItinerary: func.isRequired,
};

Content.contextTypes = {
  intl: intlShape.isRequired,
  executeAction: func.isRequired,
};

export const DesktopContent = connectToStores(
  Content,
  ['PositionStore'],
  ({ getStore }) => ({
    location: getStore('PositionStore').getLocationState(),
  }),
);
