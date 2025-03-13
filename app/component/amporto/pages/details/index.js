import React, { useEffect, useMemo, Suspense, Fragment } from 'react';
import { string, func, node, shape, bool } from 'prop-types';
import distance from '@digitransit-search-util/digitransit-search-util-distance';
import { intlShape } from 'react-intl';
import { matchShape, routerShape } from 'found';
import { connectToStores } from 'fluxible-addons-react';
import { locationShape } from '../../../../util/shapes';
import withBreakpoint from '../../../../util/withBreakpoint';
import Loading from '../../../Loading';
import useModal from '../../../../hooks/useModal';
import Modal from '../../modal';
import ScrollableWrapper from '../../../ScrollableWrapper';
import BackButton from '../../../BackButton';

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
  { match, router, intl }
) => {
  const { isOpen, open, close } = useModal();
  const { selectedData, error } = useSelectedData({
    id: match.params.id,
    language
  });

  const distanceToDataPoint = useMemo(() => {
    if (!selectedData || !location.hasLocation) {
      return null;
    }

    return distance(selectedData, location);
  }, [location.hasLocation, selectedData]);

  useEffect(() => {
    if (error) {
      // force 404 page
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
  intl: intlShape.isRequired
};

DetailsPage.propTypes = {
  language: string.isRequired,
  breakpoint: string.isRequired,
  location: locationShape.isRequired,
  useSelectedData: func.isRequired,
  onErrorPath: string.isRequired,
  PageContent: node.isRequired,
  MobileContent: node.isRequired
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
  PageContent
}) => {
  const Wrapper = modal ? ScrollableWrapper : Fragment;

  return (
    <>
      <BackButton
        key={selectedData.id}
        title={selectedData.name}
        subtitle={selectedData.category}
        onBackBtnClick={onBackBtnClick}
      />
      <Wrapper scrollable className="page">
        <PageContent selectedData={selectedData} intl={intl} />
      </Wrapper>
    </>
  );
};

Content.propTypes = {
  selectedData: shape().isRequired,
  intl: intlShape.isRequired,
  onBackBtnClick: func,
  modal: bool,
  PageContent: node.isRequired
};
