import React, { useMemo, useState } from 'react';
import { intlShape } from 'react-intl';
import classname from 'classnames';
import { useRouter } from 'found';
import Icon from '../../../../component/Icon';
import ImageSlider from '../../../../component/amporto/image-slider';
import { routesShape } from './shape';
import { RoutesDetails } from './detail';

export const PageContent = ({ selectedData }, { intl }) => {
  const { router } = useRouter();
  const [showMore, setShowMore] = useState(false);

  const lastIndex = useMemo(() => {
    return selectedData.pois?.findLastIndex(lastIndex => lastIndex);
  }, [selectedData.pois]);

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
        <RoutesDetails selectedData={selectedData} />
        <div className="description">
          {selectedData.description && (
            <>
              <h3>{intl.messages.about}</h3>
              {selectedData.description && <p>{selectedData.description}</p>}
            </>
          )}
        </div>

        <div className="itinerary-header">
          <div className="left">
            <Icon img="icon-icon_walk_no_map" viewBox="0 0 16 16" />
            <p className="label">{intl.messages['routes-itinerary-label']}</p>
          </div>

          <div className="right">
            <p className="key">
              {intl.messages['routes-total-distance-label']}
            </p>
            <p className="value">{selectedData.distance}</p>
          </div>
        </div>

        <div className="itinerary-warning">
          {intl.messages['routes-warning-section']}
        </div>

        <div className="itinerary-list-container">
          {selectedData.pois?.map((poi, index) => {
            if (showMore || index <= 2) {
              return (
                <div className="row" key={poi.item}>
                  <div className="first-column">
                    <Icon img="icon-circle" text={poi.position} />
                    {lastIndex !== index && <div className="vertical-line" />}
                  </div>

                  <div className="second-column">
                    <div className="title">{poi.name}</div>
                    <div className="description">
                      {decodeURIComponent(poi.shortDescription)}
                      <button
                        type="button"
                        onClick={() => router.push(`/pois/${poi.item}`)}
                        className="know-more"
                      >
                        {intl.messages['know-more']}
                      </button>
                    </div>
                  </div>
                </div>
              );
            }

            return null;
          })}

          {selectedData.pois?.length > 3 && (
            <button
              type="button"
              className="show-more-button"
              onClick={() => setShowMore(!showMore)}
              aria-label={intl.messages['routes-itinerary-list-show-more']}
            >
              {showMore
                ? intl.messages['routes-itinerary-list-show-less']
                : intl.messages['routes-itinerary-list-show-more']}
            </button>
          )}
        </div>

        <button
          className="start-trip-button"
          type="button"
          onClick={() => alert('WIP')}
          aria-label={intl.messages['routes-start-trip']}
        >
          {intl.messages['routes-start-trip']}
        </button>
      </div>
    </>
  );
};

PageContent.propTypes = {
  selectedData: routesShape.isRequired
};

PageContent.contextTypes = {
  intl: intlShape.isRequired
};
