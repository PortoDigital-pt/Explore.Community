import React from 'react';
import classname from 'classnames';
import { intlShape } from 'react-intl';
import { func } from 'prop-types';
import ImageSlider from '../../../../../component/amporto/image-slider';
import Icon from '../../../../../component/Icon';
import { poiShape } from '../../pois/page';

export const DesktopContent = (
  { selectedData, onStartItinerary },
  { intl }
) => (
  <>
    {selectedData.images && (
      <div className="image">
        <ImageSlider images={selectedData.images} name={selectedData.name} />
      </div>
    )}
    <div
      className={classname('details', { lower: selectedData.images === null })}
    >
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
            <p>{selectedData.contacts.telephone ?? 'No information at all'}</p>
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

DesktopContent.propTypes = {
  selectedData: poiShape.isRequired,
  onStartItinerary: func.isRequired
};

DesktopContent.contextTypes = {
  intl: intlShape.isRequired
};
