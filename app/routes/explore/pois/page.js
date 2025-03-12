import React, { useEffect } from 'react';
import { string } from 'prop-types';
import { intlShape } from 'react-intl';
import { matchShape, routerShape } from 'found';
import { connectToStores } from 'fluxible-addons-react';
import withBreakpoint from '../../../util/withBreakpoint';
import Loading from '../../../component/Loading';
import BackButton from '../../../component/BackButton';
import Icon from '../../../component/Icon';
import { useSelectedPoi } from './useSelectedPoi';

const Page = ({ language, breakpoint }, { match, router, intl }) => {
  const { selectedPoi, error } = useSelectedPoi({ id: match.params.id, language });

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
    <div className="details-page">
      {breakpoint === 'large' && <BackButton key={selectedPoi.id} title={selectedPoi.name} subtitle={selectedPoi.category} />}
      <div className="image" />
      <div className="details">
        <div className="description">
            <h3>{intl.messages['about']}</h3>
            <p>{selectedPoi.description}</p>
        </div>
        <div className="description">
            <h3>{intl.messages['opening-hours']}</h3>
            <p>{'No information at all'}</p>
        </div>
        <div className="contacts">
          <div>
            <Icon img={'icon-cost'} viewBox="0 0 16 16" />
            <p>{`${intl.messages['poi-tickets']}: No information at all`}</p>
          </div>
          <div>
            <Icon img={'icon-website'} viewBox="0 0 16 16" />
            <a href={selectedPoi.contacts?.website} target="_blank" rel="noopener noreferrer">Website</a>
          </div>
          <div>
            <Icon img={'icon-phone'} viewBox="0 0 16 16" />
            <p>{selectedPoi.contacts?.telephone ?? 'No information at all'}</p>
          </div>
        </div>
      </div>
    </div>
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
  ['PreferencesStore', 'MapLayerStore'],
  ({ getStore }) => ({
    language: getStore('PreferencesStore').getLanguage()
  })
);
