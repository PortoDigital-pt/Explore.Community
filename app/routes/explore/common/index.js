import React, { Suspense, useMemo } from 'react';
import { string, func, shape, bool } from 'prop-types';
import { intlShape } from 'react-intl';
import { getContext } from 'recompose';
import Modal from '../../../component/amporto/modal';
import ScrollableWrapper from '../../../component/ScrollableWrapper';
import BackButton from '../../../component/BackButton';
import FavouriteExplore from '../../../component/FavouriteExploreContainer';
import ShareButton from '../../../component/amporto/share-button';
import SeeOnMapButton from '../../../component/amporto/see-on-map-button';

const Content = (
  {
    data,
    onBackBtnClick,
    onSeeOnMap,
    modal = false,
    showShare = false,
    link,
    PageContent
  },
  { intl }
) => {
  const Component = useMemo(() => {
    if (modal) {
      return () => (
        <ScrollableWrapper scrollable className="page">
          <PageContent selectedData={data} intl={intl} link={link} />
        </ScrollableWrapper>
      );
    }

    return () => <PageContent selectedData={data} intl={intl} link={link} />;
  }, [modal, data, intl, link]);

  return (
    <>
      <BackButton
        key={data.id}
        title={data.name}
        subtitle={data.category}
        onBackBtnClick={onBackBtnClick}
      >
        {showShare && <ShareButton />}
        {onSeeOnMap && <SeeOnMapButton onClick={onSeeOnMap} />}
        <FavouriteExplore data={data} white />
      </BackButton>
      <Component />
    </>
  );
};

Content.propTypes = {
  data: shape().isRequired,
  onBackBtnClick: func,
  onSeeOnMap: func,
  modal: bool,
  showShare: bool,
  PageContent: func.isRequired,
  link: string
};

Content.contextTypes = {
  intl: intlShape.isRequired
};

export const DetailsContent = getContext()(Content);

const ContentModal = (
  { isOpen, data, onBackBtnClick, PageContent, link, showShare, onSeeOnMap },
  { intl }
) => (
  <Suspense fallback="">
    <Modal
      isOpen={isOpen}
      className="details-page modal"
      overlayClassName="overlay"
      shouldFocusAfterRender
      shouldCloseOnEsc
    >
      <Content
        data={data}
        intl={intl}
        onBackBtnClick={onBackBtnClick}
        onSeeOnMap={onSeeOnMap}
        link={link}
        showShare={showShare}
        modal
        PageContent={PageContent}
      />
    </Modal>
  </Suspense>
);

ContentModal.propTypes = {
  isOpen: bool.isRequired,
  data: shape().isRequired,
  onBackBtnClick: func,
  onSeeOnMap: func,
  showShare: bool,
  PageContent: func.isRequired,
  link: string
};

ContentModal.contextTypes = {
  intl: intlShape.isRequired
};

export const DetailsContentModal = getContext()(ContentModal);
