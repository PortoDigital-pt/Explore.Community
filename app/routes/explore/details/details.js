import React, { useEffect } from 'react';
import { string, func } from 'prop-types';
import { matchShape, routerShape } from 'found';
import { connectToStores } from 'fluxible-addons-react';
import withBreakpoint from '../../../util/withBreakpoint';
import Loading from '../../../component/Loading';
import useModal from '../../../hooks/useModal';
import useSelectedData from '../../../hooks/useSelectedData';
import { DetailsContent, DetailsContentModal } from '../common';

const DetailsPage = (
  {
    language,
    breakpoint,
    getDataById,
    onErrorPath,
    PageContent,
    MobileContent
  },
  { match, router }
) => {
  const { isOpen, open, close } = useModal();
  const { selectedData, error } = useSelectedData({
    id: match.params.id,
    language,
    getDataById
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
        <MobileContent onDetails={open} selectedData={selectedData} showShare />
      )}
      {isOpen && (
        <DetailsContentModal
          isOpen={isOpen}
          data={selectedData}
          onBackBtnClick={close}
          showShare
          PageContent={PageContent}
        />
      )}
    </section>
  );
};

DetailsPage.contextTypes = {
  match: matchShape.isRequired,
  router: routerShape.isRequired
};

DetailsPage.propTypes = {
  language: string.isRequired,
  breakpoint: string.isRequired,
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
