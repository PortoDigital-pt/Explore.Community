import React, { useEffect } from 'react';
import { string, func } from 'prop-types';
import { intlShape } from 'react-intl';
import { matchShape, routerShape } from 'found';
import { connectToStores } from 'fluxible-addons-react';
import { locationShape, configShape } from '../../../util/shapes';
import withBreakpoint from '../../../util/withBreakpoint';
import Loading from '../../../component/Loading';
import useModal from '../../../hooks/useModal';
import useDistanceToTarget from '../../../hooks/useDistanceToTarget';
import useSelectedData from '../../../hooks/useSelectedData';
import { DetailsContent, DetailsContentModal } from '../common';

const DetailsPage = (
  {
    language,
    breakpoint,
    location,
    getDataById,
    onErrorPath,
    PageContent,
    MobileContent
  },
  { config, match, router, intl, executeAction }
) => {
  const { isOpen, open, close } = useModal();
  const { selectedData, error } = useSelectedData({
    id: match.params.id,
    language,
    getDataById
  });
  const distanceToDataPoint = useDistanceToTarget({
    executeAction,
    location,
    targetPoint: selectedData
  });

  useEffect(() => {
    if (error) {
      router.push(onErrorPath);
    }
  }, [error, router.push]);

  if (!selectedData) {
    return <Loading />;
  }

  return (
    <section className="details-page">
      {breakpoint === 'large' ? (
        <DetailsContent
          PageContent={PageContent}
          data={selectedData}
          showShare
        />
      ) : (
        <MobileContent
          onDetails={open}
          selectedData={selectedData}
          intl={intl}
          distance={distanceToDataPoint}
        />
      )}
      {isOpen && (
        <DetailsContentModal
          isOpen={isOpen}
          data={selectedData}
          onBackBtnClick={close}
          link={config.culturalAgendaLink}
          modal
          showShare
          PageContent={PageContent}
        />
      )}
    </section>
  );
};

DetailsPage.contextTypes = {
  match: matchShape.isRequired,
  router: routerShape.isRequired,
  config: configShape.isRequired,
  intl: intlShape.isRequired,
  executeAction: func.isRequired
};

DetailsPage.propTypes = {
  language: string.isRequired,
  breakpoint: string.isRequired,
  location: locationShape.isRequired,
  getDataById: func.isRequired,
  onErrorPath: string.isRequired,
  PageContent: func.isRequired,
  MobileContent: func.isRequired
};

export default connectToStores(
  withBreakpoint(DetailsPage),
  ['PreferencesStore', 'PositionStore'],
  ({ getStore }) => ({
    language: getStore('PreferencesStore').getLanguage(),
    location: getStore('PositionStore').getLocationState()
  })
);
