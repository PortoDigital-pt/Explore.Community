import React, { useEffect } from 'react';
import { string } from 'prop-types';
import { matchShape, routerShape } from 'found';
import { connectToStores } from 'fluxible-addons-react';
import withBreakpoint from '../../../util/withBreakpoint';
import Loading from '../../../component/Loading';
import { useSelectedPoi } from './useSelectedPoi';

const Page = ({ language, breakpoint }, { match, router }) => {
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

  return <div className="pois">{JSON.stringify(selectedPoi)}</div>;
};

Page.contextTypes = {
  match: matchShape.isRequired,
  router: routerShape.isRequired,
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
