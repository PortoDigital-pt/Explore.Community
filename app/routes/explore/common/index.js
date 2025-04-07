import React, { Suspense, useMemo } from 'react';
import { func, shape, bool } from 'prop-types';
import Modal from '../../../component/amporto/modal';
import ScrollableWrapper from '../../../component/ScrollableWrapper';
import BackButton from '../../../component/BackButton';
import FavouriteExplore from '../../../component/FavouriteExploreContainer';
import ShareButton from '../../../component/amporto/share-button';
import SeeOnMapButton from '../../../component/amporto/see-on-map-button';

export const DetailsContent = (
  {
    data,
    onBackBtnClick,
    onSeeOnMap,
    modal = false,
    showShare = false,
    PageContent
  }
) => {
  const Component = useMemo(() => {
    if (modal) {
      return () => (
        <ScrollableWrapper scrollable className="page">
          <PageContent selectedData={data} />
        </ScrollableWrapper>
      );
    }

    return () => <PageContent selectedData={data} />;
  }, [modal, data]);

  return (
    <>
      <BackButton
        key={data.id}
        title={data.name}
        subtitle={data.category}
        onBackBtnClick={onBackBtnClick}
      >
        <>
          {showShare && <ShareButton />}
          {onSeeOnMap && <SeeOnMapButton onClick={onSeeOnMap} />}
          <FavouriteExplore data={data} white showLabel />
        </>
      </BackButton>
      <Component />
    </>
  );
};

DetailsContent.propTypes = {
  data: shape().isRequired,
  onBackBtnClick: func,
  onSeeOnMap: func,
  modal: bool,
  showShare: bool,
  PageContent: func.isRequired
};

export const DetailsContentModal = (
  { isOpen, data, onBackBtnClick, PageContent, showShare, onSeeOnMap }
) => (
  <Suspense fallback="">
    <Modal
      isOpen={isOpen}
      className="details-page modal"
      overlayClassName="overlay"
      shouldFocusAfterRender
      shouldCloseOnEsc
    >
      <DetailsContent
        data={data}
        onBackBtnClick={onBackBtnClick}
        onSeeOnMap={onSeeOnMap}
        showShare={showShare}
        modal
        PageContent={PageContent}
      />
    </Modal>
  </Suspense>
);

DetailsContentModal.propTypes = {
  isOpen: bool.isRequired,
  data: shape().isRequired,
  onBackBtnClick: func,
  onSeeOnMap: func,
  showShare: bool,
  PageContent: func.isRequired
};