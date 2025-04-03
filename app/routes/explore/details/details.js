import React, { useEffect, Suspense, useMemo } from 'react';
import { string, func, shape, bool } from 'prop-types';
import { intlShape } from 'react-intl';
import { matchShape, routerShape } from 'found';
import { connectToStores } from 'fluxible-addons-react';
import { locationShape, configShape } from '../../../util/shapes';
import withBreakpoint from '../../../util/withBreakpoint';
import Loading from '../../../component/Loading';
import useModal from '../../../hooks/useModal';
import useDistanceToTarget from '../../../hooks/useDistanceToTarget';
import Modal from '../../../component/amporto/modal';
import ScrollableWrapper from '../../../component/ScrollableWrapper';
import BackButton from '../../../component/BackButton';
import FavouriteExplore from '../../../component/FavouriteExploreContainer';
import ShareButton from '../../../component/amporto/share-button';

const DetailsPage = (
  {
    language,
    breakpoint,
    location,
    useSelectedData,
    onErrorPath,
    PageContent,
    MobileContent
  },
  { config, match, router, intl, executeAction }
) => {
  const { isOpen, open, close } = useModal();
  const { selectedData, error } = useSelectedData({
    id: match.params.id,
    language
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
        <Content
          PageContent={PageContent}
          selectedData={selectedData}
          intl={intl}
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
        <Suspense fallback="">
          <Modal
            isOpen={isOpen}
            className="details-page modal"
            overlayClassName="overlay"
            shouldFocusAfterRender
            shouldCloseOnEsc
          >
            <Content
              selectedData={selectedData}
              intl={intl}
              onBackBtnClick={close}
              link={config.culturalAgendaLink}
              modal
              PageContent={PageContent}
            />
          </Modal>
        </Suspense>
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
  useSelectedData: func.isRequired,
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

const Content = ({
  selectedData,
  intl,
  onBackBtnClick,
  modal = false,
  link,
  PageContent
}) => {
  const Component = useMemo(() => {
    if (modal) {
      return () => (
        <ScrollableWrapper scrollable className="page">
          <PageContent selectedData={selectedData} intl={intl} link={link} />
        </ScrollableWrapper>
      );
    }

    return () => (
      <PageContent selectedData={selectedData} intl={intl} link={link} />
    );
  }, [modal, selectedData, intl, link]);

  return (
    <>
      <BackButton
        key={selectedData.id}
        title={selectedData.name}
        subtitle={selectedData.category}
        onBackBtnClick={onBackBtnClick}
      >
        <ShareButton />
        <FavouriteExplore data={selectedData} white />
      </BackButton>
      <Component />
    </>
  );
};

Content.propTypes = {
  selectedData: shape().isRequired,
  intl: intlShape.isRequired,
  onBackBtnClick: func,
  modal: bool,
  PageContent: func.isRequired,
  link: string
};
