import React, { Suspense, useEffect, Fragment } from 'react';
import { string, func, shape, bool } from 'prop-types';
import { intlShape } from 'react-intl';
import { matchShape, routerShape } from 'found';
import { connectToStores } from 'fluxible-addons-react';
import withBreakpoint from '../../../util/withBreakpoint';
import Loading from '../../../component/Loading';
import BackButton from '../../../component/BackButton';
import Icon from '../../../component/Icon';
import ScrollableWrapper from '../../../component/ScrollableWrapper';
import { useSelectedPoi } from './useSelectedPoi';
import useModal from '../../../hooks/useModal';
import DetailsModal from '../modal';

const Page = ({ language, breakpoint, location }, { match, router, intl }) => {
  const { isOpen, open, close } = useModal();
  const { selectedPoi, error } = useSelectedPoi({
    id: match.params.id,
    language
  });
  console.log('Location: ', location);
  useEffect(() => {
    if (error) {
      // force 404 page
      router.push('/explore/pois');
    }
  }, [error, router.push]);

  if (!selectedPoi) {
    return <Loading />;
  }

  return (
    <section className="details-page">
      {breakpoint === 'large' ? (
        <Content selectedPoi={selectedPoi} intl={intl} />
      ) : (
        <MobileContent onDetails={open} selectedPoi={selectedPoi} intl={intl} />
      )}
      {isOpen && (
        <Suspense fallback="">
          <DetailsModal isOpen={isOpen}>
            <Content
              selectedPoi={selectedPoi}
              intl={intl}
              onBackBtnClick={close}
              modal
            />
          </DetailsModal>
        </Suspense>
      )}
    </section>
  );
};

Page.contextTypes = {
  match: matchShape.isRequired,
  router: routerShape.isRequired,
  intl: intlShape.isRequired
};

Page.propTypes = {
  language: string.isRequired,
  breakpoint: string.isRequired
};

export default connectToStores(
  withBreakpoint(Page),
  ['PreferencesStore', 'PositionStore'],
  ({ getStore }) => ({
    language: getStore('PreferencesStore').getLanguage(),
    location: getStore('PositionStore').getLocationState()
  })
);

const MobileContent = ({ onDetails, intl, selectedPoi }) => (
    <div className="mobile-view">
      <div className="header">
        <Icon
          img="icon-explore-icon_pois_with_background"
          viewBox="0 0 44 44"
        />
        <h3>{selectedPoi.name}</h3>
      </div>
      <div className="content">
        <div className="image" />
        <div className="details">
          <div className="contacts">
            <div className="category">{selectedPoi.category}</div>
            <div>
              <Icon img="icon-time" viewBox="0 0 16 16" />
              <p>No info</p>
            </div>
            <div>
              <Icon img="icon-location" viewBox="0 0 16 16" />
              <p>{selectedPoi.address}</p>
            </div>
            <div>
              <Icon img="icon-cost" viewBox="0 0 16 16" />
              <p>No info</p>
            </div>
          </div>
        </div>
      </div>
      <div className="bottom">
        <button type="button" onClick={onDetails} aria-label={intl.messages.details}>
          {intl.messages.details}
        </button>
      </div>
    </div>
);

MobileContent.propTypes = {
  onDetails: func.isRequired,
  intl: intlShape.isRequired,
  selectedPoi: shape().isRequired
}; 

const Content = ({ selectedPoi, intl, onBackBtnClick, modal = false }) => {
  const Wrapper = modal ? ScrollableWrapper : Fragment;

  return (
    <>
      <BackButton
        key={selectedPoi.id}
        title={selectedPoi.name}
        subtitle={selectedPoi.category}
        onBackBtnClick={onBackBtnClick}
      />
      <Wrapper scrollable className="page">
        <div className="image" />
        <div className="details">
          <div className="description">
            <h3>{intl.messages.about}</h3>
            <p>{selectedPoi.description}</p>
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
                href={selectedPoi.contacts?.website}
                target="_blank"
                rel="noopener noreferrer"
              >
                Website
              </a>
            </div>
            <div>
              <Icon img="icon-phone" viewBox="0 0 16 16" />
              <p>
                {selectedPoi.contacts?.telephone ?? 'No information at all'}
              </p>
            </div>
          </div>
        </div>
      </Wrapper>
    </>
  );
};

Content.propTypes = {
  selectedPoi: shape().isRequired,
  intl: intlShape.isRequired,
  onBackBtnClick: func,
  modal: bool
}; 