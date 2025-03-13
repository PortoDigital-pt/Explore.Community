import React from 'react';
import { func, shape, number } from 'prop-types';
import { intlShape } from 'react-intl';
import Icon from '../../../component/Icon';
import { showDistance } from '../../../util/geo-utils';
import { useSelectedPoi } from './useSelectedPoi';
import Details from '../../../component/amporto/pages/details';

const PoisPage = () => (
  <Details
    useSelectedData={useSelectedPoi}
    onErrorPath="/explore/pois"
    PageContent={PageContent}
    MobileContent={MobileContent}
  />
);

export default PoisPage;

const MobileContent = ({ onDetails, intl, selectedData, distance }) => (
  <div className="mobile-view">
    <div className="header">
      <div className="top">
        <Icon
          img="icon-explore-icon_pois_with_background"
          viewBox="0 0 44 44"
        />
        <h3>{selectedData.name}</h3>
      </div>
      <div className="distance">
        {distance &&
          `${intl.messages['at-distance']} ${showDistance(distance)}`}
      </div>
    </div>
    <div className="content">
      <div className="image" />
      <div className="details">
        <div className="contacts">
          <div className="category">{selectedData.category}</div>
          <div>
            <Icon img="icon-time" viewBox="0 0 16 16" />
            <p>No info</p>
          </div>
          <div>
            <Icon img="icon-location" viewBox="0 0 16 16" />
            <p>{selectedData.address}</p>
          </div>
          <div>
            <Icon img="icon-cost" viewBox="0 0 16 16" />
            <p>No info</p>
          </div>
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

MobileContent.propTypes = {
  onDetails: func.isRequired,
  intl: intlShape.isRequired,
  selectedData: shape().isRequired,
  distance: number
};

const PageContent = ({ selectedData, intl }) => (
  <>
    <div className="image" />
    <div className="details">
      <div className="description">
        <h3>{intl.messages.about}</h3>
        <p>{selectedData.description}</p>
      </div>
      <div className="description">
        <h3>{intl.messages['opening-hours']}</h3>
        <p>No information at all</p>
      </div>
      <div className="contacts">
        <div>
          <Icon img="icon-cost" viewBox="0 0 16 16" />
          <p>{`${intl.messages['poi-tickets']}: No information at all`}</p>
        </div>
        <div>
          <Icon img="icon-website" viewBox="0 0 16 16" />
          <a
            href={selectedData.contacts?.website}
            target="_blank"
            rel="noopener noreferrer"
          >
            Website
          </a>
        </div>
        <div>
          <Icon img="icon-phone" viewBox="0 0 16 16" />
          <p>{selectedData.contacts?.telephone ?? 'No information at all'}</p>
        </div>
      </div>
    </div>
  </>
);

PageContent.propTypes = {
  selectedData: shape().isRequired,
  intl: intlShape.isRequired
};
